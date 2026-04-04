import { Application, Request, Response, NextFunction } from "express";
import { prisma } from "./lib/prisma";
import express from "express";
import Routes from "./routes/index";
import promClient from "prom-client";

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===============================
// 1. Setup Registry & Default Metrics
// ===============================
const registry = new promClient.Registry();
promClient.collectDefaultMetrics({ register: registry });

// ===============================
// 2. HTTP Request Counter (total requests)
// ===============================
const httpRequestCounter = new promClient.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
});
registry.registerMetric(httpRequestCounter);

// ===============================
// 3. HTTP Request Duration Histogram
// ===============================
const httpRequestDurationHistogram = new promClient.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
});
registry.registerMetric(httpRequestDurationHistogram);

// ===============================
// 4. Active Requests Gauge
// ===============================
const activeRequestsGauge = new promClient.Gauge({
  name: "http_requests_active",
  help: "Number of active HTTP requests",
});
registry.registerMetric(activeRequestsGauge);

// ===============================
// 5. Error Counter (5xx responses)
// ===============================
const errorCounter = new promClient.Counter({
  name: "http_errors_total",
  help: "Total number of HTTP 5xx errors",
  labelNames: ["method", "route", "status_code"],
});
registry.registerMetric(errorCounter);

// ===============================
// Middleware to collect metrics
// ===============================
app.use((req: Request, res: Response, next: NextFunction) => {
  // Increase active requests gauge
  activeRequestsGauge.inc();
  
  const start = process.hrtime(); // high-resolution time
  
  // Listen for when the response is finished
  res.on("finish", () => {
    // Calculate duration in seconds
    const diff = process.hrtime(start);
    const duration = diff[0] + diff[1] / 1e9;
    
    const route = req.route?.path || req.path;
    const method = req.method;
    const statusCode = res.statusCode;
    
    // Increment total requests counter
    httpRequestCounter.inc({
      method,
      route,
      status_code: statusCode,
    });
    
    // Observe request duration
    httpRequestDurationHistogram.observe(
      { method, route, status_code: statusCode },
      duration
    );
    
    // Count 5xx errors
    if (statusCode >= 500 && statusCode < 600) {
      errorCounter.inc({ method, route, status_code: statusCode });
    }
    
    // Decrease active requests gauge
    activeRequestsGauge.dec();
  });
  
  next();
});

// ===============================
// Optional: Prisma metrics (if you want DB query stats)
// ===============================
// This requires Prisma client extended with metrics
// Example using `prisma.$metrics` (Prisma 5+)
if (prisma && typeof (prisma as any).$metrics === "function") {
  (async () => {
    const metrics = await (prisma as any).$metrics();
    // You can register custom metrics from Prisma here
    // For simplicity, we'll expose them via the /metrics endpoint automatically
  })();
}

// ===============================
// Metrics endpoint
// ===============================
app.get("/metrics", async (req: Request, res: Response) => {
  res.set("Content-Type", registry.contentType);
  res.end(await registry.metrics());
});

// ===============================
// Health check & example routes
// ===============================
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api", Routes);

// ===============================
// Start server
// ===============================
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
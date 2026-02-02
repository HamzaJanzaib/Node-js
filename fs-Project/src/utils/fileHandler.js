const fs = require("fs");

const CONTACTS_FILE = "contacts.json";

/**
 * Load contacts from file
 * @returns {Array} Array of contact objects
 */
function loadContacts() {
  try {
    if (fs.existsSync(CONTACTS_FILE)) {
      const data = fs.readFileSync(CONTACTS_FILE, "utf8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.log("Error loading contacts, starting fresh.");
  }
  return [];
}

/**
 * Save contacts to file using writeFileSync
 * @param {Array} contacts - Array of contact objects
 */
function saveContacts(contacts) {
  try {
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2), "utf8");
    console.log("✓ Contacts saved successfully!");
  } catch (error) {
    console.log("✗ Error saving contacts:", error.message);
  }
}

module.exports = {
  loadContacts,
  saveContacts,
};

const readline = require("readline");

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Generate unique code for contact
 * @param {Array} contacts - Array of existing contacts
 * @returns {string} Unique code
 */
function generateUniqueCode(contacts) {
  let code;
  do {
    code = "C" + Math.floor(1000 + Math.random() * 9000);
  } while (contacts.some((contact) => contact.code === code));
  return code;
}

/**
 * Prompt user for input
 * @param {string} question - Question to ask user
 * @returns {Promise<string>} User's answer
 */
function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

/**
 * Close readline interface
 */
function closePrompt() {
  rl.close();
}

module.exports = {
  generateUniqueCode,
  prompt,
  closePrompt,
};

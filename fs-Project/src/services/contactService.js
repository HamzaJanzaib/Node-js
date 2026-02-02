const { saveContacts } = require("../utils/fileHandler");
const { generateUniqueCode, prompt } = require("../utils/helpers");

/**
 * Find contact by code
 * @param {Array} contacts - Array of contacts
 * @param {string} code - Unique code to search for
 * @returns {Object|undefined} Contact object or undefined
 */
function findContactByCode(contacts, code) {
  return contacts.find((contact) => contact.code === code);
}

/**
 * Add new contact
 * @param {Array} contacts - Array of contacts
 */
async function addContact(contacts) {
  console.log("\n=== Add New Contact ===");

  const name = await prompt("Enter name: ");
  if (!name) {
    console.log("✗ Name is required!");
    return;
  }

  const contactNumber = await prompt("Enter contact number: ");
  if (!contactNumber) {
    console.log("✗ Contact number is required!");
    return;
  }

  const email = await prompt("Enter email: ");
  if (!email) {
    console.log("✗ Email is required!");
    return;
  }

  const code = generateUniqueCode(contacts);
  const newContact = {
    code,
    name,
    contactNumber,
    email,
    createdAt: new Date().toISOString(),
  };

  contacts.push(newContact);
  saveContacts(contacts);

  console.log("\n✓ Contact added successfully!");
  console.log(`Your unique code is: ${code}`);
  console.log("Keep this code to edit or delete your contact.");
}

/**
 * View all contacts
 * @param {Array} contacts - Array of contacts
 */
function viewContacts(contacts) {
  console.log("\n=== All Contacts ===");

  if (contacts.length === 0) {
    console.log("No contacts found.");
    return;
  }

  contacts.forEach((contact, index) => {
    console.log(`\n${index + 1}. Code: ${contact.code}`);
    console.log(`   Name: ${contact.name}`);
    console.log(`   Contact: ${contact.contactNumber}`);
    console.log(`   Email: ${contact.email}`);
  });
}

/**
 * Edit contact
 * @param {Array} contacts - Array of contacts
 */
async function editContact(contacts) {
  console.log("\n=== Edit Contact ===");

  const code = await prompt("Enter your unique code: ");
  const contact = findContactByCode(contacts, code);

  if (!contact) {
    console.log("✗ Contact not found with this code!");
    return;
  }

  console.log("\nCurrent details:");
  console.log(`Name: ${contact.name}`);
  console.log(`Contact Number: ${contact.contactNumber}`);
  console.log(`Email: ${contact.email}`);

  console.log("\n(Press Enter to keep current value)");

  const newName = await prompt(`New name [${contact.name}]: `);
  const newContactNumber = await prompt(
    `New contact number [${contact.contactNumber}]: `,
  );
  const newEmail = await prompt(`New email [${contact.email}]: `);

  if (newName) contact.name = newName;
  if (newContactNumber) contact.contactNumber = newContactNumber;
  if (newEmail) contact.email = newEmail;
  contact.updatedAt = new Date().toISOString();

  saveContacts(contacts);
  console.log("✓ Contact updated successfully!");
}

/**
 * Delete contact
 * @param {Array} contacts - Array of contacts
 */
async function deleteContact(contacts) {
  console.log("\n=== Delete Contact ===");

  const code = await prompt("Enter your unique code: ");
  const contactIndex = contacts.findIndex((contact) => contact.code === code);

  if (contactIndex === -1) {
    console.log("✗ Contact not found with this code!");
    return;
  }

  const contact = contacts[contactIndex];
  console.log(`\nFound contact: ${contact.name}`);

  const confirm = await prompt("Are you sure you want to delete? (yes/no): ");

  if (confirm.toLowerCase() === "yes" || confirm.toLowerCase() === "y") {
    contacts.splice(contactIndex, 1);
    saveContacts(contacts);
    console.log("✓ Contact deleted successfully!");
  } else {
    console.log("Deletion cancelled.");
  }
}

/**
 * Search contact by code
 * @param {Array} contacts - Array of contacts
 */
async function searchContact(contacts) {
  console.log("\n=== Search Contact ===");

  const code = await prompt("Enter unique code: ");
  const contact = findContactByCode(contacts, code);

  if (!contact) {
    console.log("✗ Contact not found!");
    return;
  }

  console.log("\n--- Contact Details ---");
  console.log(`Code: ${contact.code}`);
  console.log(`Name: ${contact.name}`);
  console.log(`Contact Number: ${contact.contactNumber}`);
  console.log(`Email: ${contact.email}`);
  console.log(`Created: ${new Date(contact.createdAt).toLocaleString()}`);
  if (contact.updatedAt) {
    console.log(`Updated: ${new Date(contact.updatedAt).toLocaleString()}`);
  }
}

module.exports = {
  addContact,
  viewContacts,
  editContact,
  deleteContact,
  searchContact,
};

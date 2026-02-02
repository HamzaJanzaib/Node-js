const fs = require("fs");
const readline = require("readline");

// File to store contacts
const CONTACTS_FILE = "contacts.json";

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Load contacts from file
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

// Save contacts to file using writeFileSync
function saveContacts(contacts) {
  try {
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2), "utf8");
    console.log("✓ Contacts saved successfully!");
  } catch (error) {
    console.log("✗ Error saving contacts:", error.message);
  }
}

// Generate unique code
function generateUniqueCode(contacts) {
  let code;
  do {
    code = "C" + Math.floor(1000 + Math.random() * 9000);
  } while (contacts.some((contact) => contact.code === code));
  return code;
}

// Prompt user for input
function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

// Add new contact
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

// View all contacts
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

// Find contact by code
function findContactByCode(contacts, code) {
  return contacts.find((contact) => contact.code === code);
}

// Edit contact
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

// Delete contact
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

// Search contact by code
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

// Display menu
function displayMenu() {
  console.log("\n╔════════════════════════════════╗");
  console.log("║   CONTACT DIRECTORY SYSTEM     ║");
  console.log("╚════════════════════════════════╝");
  console.log("1. Add New Contact");
  console.log("2. View All Contacts");
  console.log("3. Search Contact by Code");
  console.log("4. Edit Contact");
  console.log("5. Delete Contact");
  console.log("6. Exit");
  console.log("════════════════════════════════");
}

// Main function
async function main() {
  let contacts = loadContacts();

  console.log("Welcome to Contact Directory System!");

  while (true) {
    displayMenu();
    const choice = await prompt("Enter your choice (1-6): ");

    switch (choice) {
      case "1":
        await addContact(contacts);
        break;
      case "2":
        viewContacts(contacts);
        break;
      case "3":
        await searchContact(contacts);
        break;
      case "4":
        await editContact(contacts);
        break;
      case "5":
        await deleteContact(contacts);
        break;
      case "6":
        console.log("\nThank you for using Contact Directory System!");
        rl.close();
        return;
      default:
        console.log("✗ Invalid choice! Please enter 1-6.");
    }
  }
}

// Start the application
main().catch((error) => {
  console.error("An error occurred:", error);
  rl.close();
});

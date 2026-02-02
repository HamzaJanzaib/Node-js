const { loadContacts } = require("./src/utils/fileHandler");
const { prompt, closePrompt } = require("./src/utils/helpers");
const {
  addContact,
  viewContacts,
  editContact,
  deleteContact,
  searchContact,
} = require("./src/services/contactService");
const { displayMenu } = require("./src/ui/menu");

/**
 * Main application function
 */
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
        closePrompt();
        return;
      default:
        console.log("✗ Invalid choice! Please enter 1-6.");
    }
  }
}

// Start the application
main().catch((error) => {
  console.error("An error occurred:", error);
  closePrompt();
});

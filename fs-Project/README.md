# Contact Directory System

A modular Node.js contact management application with file persistence.

## 📁 Project Structure

```
fs-Project/
├── index.js                    # Main entry point
├── package.json                # Project configuration
├── contacts.json              # Data storage (auto-generated)
└── src/
    ├── services/
    │   └── contactService.js  # Contact CRUD operations
    ├── utils/
    │   ├── fileHandler.js     # File I/O operations
    │   └── helpers.js         # Utility functions
    └── ui/
        └── menu.js            # Menu display
```

## 🚀 Features

- **Add Contact**: Create new contacts with name, phone, and email
- **View All Contacts**: Display all stored contacts
- **Search by Code**: Find specific contact using unique code
- **Edit Contact**: Update contact details using unique code
- **Delete Contact**: Remove contact with confirmation
- **Unique Code System**: Each contact gets a unique code (C1000-C9999)
- **File Persistence**: Data saved using `fs.writeFileSync()` to `contacts.json`

## 📦 Installation

```bash
npm install
# or
pnpm install
```

## 🎯 Usage

Run the application:

```bash
npm start
# or
node index.js
```

Follow the menu prompts to manage contacts.

## 🏗️ Architecture

### Modular Design

- **Services Layer** (`src/services/`): Business logic for contact operations
- **Utils Layer** (`src/utils/`): Helper functions and file operations
- **UI Layer** (`src/ui/`): User interface components
- **Main Entry** (`index.js`): Application orchestration

### Key Modules

#### `fileHandler.js`

- `loadContacts()`: Load contacts from JSON file
- `saveContacts(contacts)`: Save contacts using writeFileSync

#### `helpers.js`

- `generateUniqueCode(contacts)`: Generate unique contact codes
- `prompt(question)`: Handle user input
- `closePrompt()`: Close readline interface

#### `contactService.js`

- `addContact(contacts)`: Add new contact
- `viewContacts(contacts)`: Display all contacts
- `editContact(contacts)`: Update contact details
- `deleteContact(contacts)`: Remove contact
- `searchContact(contacts)`: Find contact by code

#### `menu.js`

- `displayMenu()`: Show main menu interface

## 💾 Data Storage

Contacts are stored in JSON format:

```json
[
  {
    "code": "C1234",
    "name": "John Doe",
    "contactNumber": "1234567890",
    "email": "john@example.com",
    "createdAt": "2026-02-03T02:57:41.123Z",
    "updatedAt": "2026-02-03T03:00:00.456Z"
  }
]
```

## 🔑 Unique Code System

Each contact receives a unique 4-digit code (e.g., `C1234`) for:

- Editing contact information
- Deleting contacts
- Searching specific contacts

**Important**: Keep your unique code safe for future modifications!

## 📝 License

ISC

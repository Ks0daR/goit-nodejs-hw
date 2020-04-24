const fs = require('fs');
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');

console.log(contactsPath);

const { promises: fsPromises } = fs;

async function listContacts() {
  return await fsPromises.readFile(contactsPath, 'utf8');
}

async function getContactById(contactId) {
  const fileDB = await listContacts();
  console.log(fileDB.length);
  const contactById = fileDB.find(({ id }) => id === contactId);
  console.log(contactById);
}

getContactById(2);
// function removeContact(contactId) {
//   // ...твой код
// }

// function addContact(name, email, phone) {
//   // ...твой код
// }

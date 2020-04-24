const fs = require('fs');
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');

console.log(contactsPath);

const { promises: fsPromises } = fs;

async function listContacts() {
  const result = await fsPromises.readFile(contactsPath, 'utf8');
  return JSON.parse(result);
}

async function getContactById(contactId) {
  const fileDB = (await listContacts()) || [];
  const contactById = fileDB.find(({ id }) => id === contactId);
  console.log(contactById);
}

async function removeContact(contactId) {
  const fileDB = (await listContacts()) || [];
  const newFileContent = fileDB.filter(({ id }) => id !== contactId);
  await fsPromises.writeFile(
    './db/newContacts.json',
    JSON.stringify(newFileContent)
  );
}

// function addContact(name, email, phone) {
//   // ...твой код
// }

const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "../../db/contacts.json");

const { promises: fsPromises } = fs;

async function listContacts() {
  const fileDB = await fsPromises.readFile(contactsPath, "utf8");
  const result = JSON.parse(fileDB);
  return result;
}

async function getContactById(contactId) {
  const fileDB = (await listContacts()) || [];
  const contactById = fileDB.find(({ id }) => id === contactId);
  return contactById;
}

async function removeContact(contactId) {
  const fileDB = (await listContacts()) || [];
  const newFileContent = fileDB.filter(({ id }) => id !== contactId);
  await fsPromises.writeFile(
    "../../db/contacts.json",
    JSON.stringify(newFileContent)
  );
  return newFileContent;
}

async function addContact(name, email, phone) {
  const fileDB = (await listContacts()) || [];
  fileDB.push({ id: uuidv4(), name, email, phone });
  await fsPromises.writeFile("./db/contacts.json", JSON.stringify(fileDB));
  return fileDB;
}

async function updateContact(id, updatedValue) {
  const contactByID = (await getContactById()) || [];
  const newContact = { ...contactByID, ...updatedValue };
  return newContact;
}

export { listContacts, getContactById, removeContact, addContact, updateContact };

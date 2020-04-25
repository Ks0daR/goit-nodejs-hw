const contacts = require("./contacts");
const argv = require("yargs").argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action.toString()) {
    case "list":
      async function list() {
        const result = await contacts.listContacts();
        console.table(result);
      }
      list();
      break;

    case "get":
      async function get() {
        const result = await contacts.getContactById(id);
        console.table(result);
      }
      get();
      break;

    case "add":
      async function add() {
        const result = await contacts.addContact(name, email, phone);
        console.table(result);
      }
      add();
      break;

    case "remove":
      async function remove() {
        const result = await contacts.removeContact(id);
        console.table(result);
      }
      remove();
      break;

    default:
      console.log(action);
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

// require("yargs").command(

//   "list",
//   "get full contact list",
//   (yargs) => {},
//   (argv) => {
//     console.log("111");
//   }
// ).argv;

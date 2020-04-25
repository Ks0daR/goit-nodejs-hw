const contacts = require("./contacts");
const argv = require("yargs").argv;

console.log(argv);

// async function main() {
//   const result = await contacts.addContact(
//     "luci",
//     "lusi@mail.com",
//     "123-123-123"
//   );
// }

function invokeAction({ _: action, id }) {
  switch (action.toString()) {
    case "list":
      async function main() {
        const result = await contacts.listContacts();
        return console.log(result);
      }
      main();
      break;

    case "get":
      console.log("di", id[1]);
      break;

    //   case 'add':
    //     // ... name email phone
    //     break;

    //   case 'remove':
    //     // ... id
    //     break;

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

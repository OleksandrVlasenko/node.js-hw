const contactsService = require("./contacts");
const { Command } = require("commander");

const program = new Command();
program
	.option("-a, --action <type>", "choose action")
	.option("-i, --id <type>", "user id")
	.option("-n, --name <type>", "user name")
	.option("-e, --email <type>", "user email")
	.option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
    case "list":
      const contactsList = await contactsService.listContacts();
      console.log("contactsList:", contactsList)
      return contactsList;
			break;

		case "get":
			const contactById = await contactsService.getContactById(id);
			console.log("contactById:", contactById);
			return contactById;
			break;

		case "add":
      const addedContact = await contactsService.addContact(name, email, phone);
			console.log("addedContact:", addedContact);
			return addedContact;
			break;

		case "remove":
			const deletedContact = await contactsService.removeContact(id);
			console.log("deletedContact:", deletedContact);
			return deletedContact;
			break;

		default:
			console.warn("\x1B[31m Unknown action type!");
	}
}

invokeAction(argv);

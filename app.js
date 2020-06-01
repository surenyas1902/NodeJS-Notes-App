const validator = require('validator') //Used to validate the data to any type
const notesModule = require('./notes.js')
const chalk = require('chalk')
const yargs = require('yargs')


/*
Use 'nodemon' package from npm modules for continuosly running the file after file changes.
*/
yargs.version('1.1.0')

yargs.command({
    command: "add", //Arguments
    describe: "Add a new note",
    builder: { // To configure the parameter like --title types.
        title: {
            describe: 'Note Title',
            demandOption: true, // To make Mandatory or not
            type: 'string' // Check the type
        },
        body: {
            describe: 'Body of the Note',
            demandOption: true,
            type:'string'
        }
    },
    handler(argv) { // What needs to run after giving the command
        console.log("Adding Notes")
        notesModule.addNotes(argv.title, argv. body)
    }
})

yargs.command({
    command:"remove", // Arguments acts as command
    describe:"Remove a note",
    builder: {
        title: {
            describe: 'Remove a Note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        const title = argv.title
        if (title === '') {
            console.log(chalk.white.inverse("Title is empty"))
            return
        }
        notesModule.removeNotes(title)
    }
})

yargs.command({
    command:"list",
    describe:"List the Notes",
    handler() {
        const Notes = notesModule.listNotes()
        console.log(chalk.underline.bold.green.inverse("Your Notes"))
        Notes.forEach((note) => {
            console.log("Title: " + note.title + " & Body: "+ note.body)
        });
    }
})

yargs.command({
    command:"read",
    describe:"Read a Note",
    builder: {
        title: {
            describe: "Reading the Notes from File",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        const title = argv.title
        const notes = notesModule.readNotes(title);
        if (notes === undefined) {
            console.log(chalk.red("No notes found"))
            return
        }
        console.log(chalk.green(notes.title) + ": " + chalk.blue.italic(notes.body))
    }
})
if (yargs.argv._.length === 0) {
    console.log(chalk.red("app command needs atleast 1 parameters"))
}
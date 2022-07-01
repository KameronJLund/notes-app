const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

const succcessMessage = chalk.green.inverse.bold
const failureMessage = chalk.red.inverse.bold

yargs.command({
    command: 'add',
    describe: 'add a new note',
    builder: {
        title: {
            decribe: 'Note title',
            demandOption: true,
            type: 'string'

        },

        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {

        console.log(succcessMessage('Adding a new note:'), argv.title)
        console.log(succcessMessage('Note title:'), argv.title)
        console.log(succcessMessage('Note body:'), argv.body)

        notes.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'remove a new note',
    builder: {
        title: {
            decribe: 'Note title',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        console.log(succcessMessage('Looking for a note with the title:'), argv.title)

        notes.removeNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'list all notes',
    handler() {
        console.log(succcessMessage('listing notes:'))

        notes.listNotes()
    }
})

yargs.command({
    command: 'read',
    describe: 'read a note',
    builder: {
        title: {
            decribe: 'Note title',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        console.log(succcessMessage('Looking for a note with the title:'), argv.title)

        notes.readNote(argv.title)
    }
})


yargs.parse()
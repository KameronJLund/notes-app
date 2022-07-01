
const fs = require('fs')
const chalk = require('chalk')

const succcessMessage = chalk.green.inverse.bold
const failureMessage = chalk.red.inverse.bold

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter((note) => note.title === title)

    if (duplicateNotes.length > 0) {
        console.log(failureMessage('note has a duplicate title and cannot be added'))
        return
    }

    notes.push({
        title: title,
        body: body
    })

    saveNotes(notes)

    console.log(succcessMessage('new note added'))
}

listNotes = () => { (loadNotes().forEach((note) => console.log(note.title, note.body))) }

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.JSON')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch (e) {
        return []
    }
}


const removeNote = (title) => {
    const notes = loadNotes()
    // const filteredNotes = notes.filter((note) => note.title !== title)
    const duplicateNote = notes.find((note) => note.title === title)

    if (duplicateNote != undefined) {
        saveNotes(filteredNotes)
        console.log(succcessMessage('note successfuly removed!'))
    } else {
        console.log(failureMessage('note cannot be found and cannot be deleted'))
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note != undefined) {
        console.log(succcessMessage(note.title), note.body)
    } else {
        console.log(failureMessage('note cannot be found and cannot be read'))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}
const fs = require('fs')
const chalk = require('chalk')
const addNotes = (title,body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter((note) => note.title === title)
    if (duplicateNotes.length > 0) {
        console.log("Note title taken")
        return;
    }

    notes.push({
        title: title,
        body: body
    })
    saveNotes(notes)
    console.log("Notes saved successfully")
}

const removeNotes = (title) => {
    const notes = loadNotes()
    const isValidTitle = notes.filter((note) => note.title === title)
    if (isValidTitle.length === 0) {
        console.log(chalk.red("Invalid Title"))
        return
    }
    const remNotes = notes.filter((note) => note.title !== title)
    console.log(chalk.green("Notes removed"))
    saveNotes(remNotes)
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    //fs.writeFileSync('notes.json', dataJSON)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {

    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (error) {
        return []
    }
    
}

const listNotes = () => {
    return loadNotes()
}

const readNotes = (title) => {
    const notes = loadNotes()
    const note = notes.find((filter) => filter.title === title) 
    //find returns first value when it matches. otherwise undefined
    return note
}

module.exports = {
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
}
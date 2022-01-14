const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const phonebook = require("./db.json")

app.use(express.json())
app.use(cors())
app.use(express.static("build")) // need this bcs we using static files for front end later
app.use(morgan("tiny"))

app.get("/", (request, response) => {
    response.send("<h1>Phonebook</h1>")
})

app.get("/api/persons", (request, response) => {
    response.json(phonebook)
})

app.get("/info", (request, response) => {
    let line = `Phonebook has info for ${phonebook.length} people`
    line = line + "<br/>" + new Date()
    response.send(line)
})

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    const person = phonebook.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    phonebook = phonebook.filter(person => person.id !== id)

    response.status(204).end()
})

app.post("/api/persons", (request, response) => {
    const id = Math.floor(Math.random() * 10000)
    const body = request.body
    console.log("Body of request:", body)

    if(!body.name) {
        return response.status(400).json({
            error: "Name is missing"
        })
    } else if (!body.number) {
        return response.status(400).json({
            error: "Number is missing"
        })
    }

    const names = phonebook.map(person => person.name)
    if (names.includes(body.name)) {
        return response.status(400).json({
            error: "This name already exists in our phonebook. Please choose another name."
        })
    }

    const newPerson = {
        name: body.name,
        number: body.number,
        id: id
    }

    phonebook.concat(newPerson)
    response.json(newPerson)
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT} port`)
})
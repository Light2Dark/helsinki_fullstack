const express = require("express")
const morgan = require("morgan")
const app = express()

app.use(express.json())
app.use(morgan("tiny"))

let phonebook = 
[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

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

    if(person) {
        response.json(person)
    } else {
        response.statusMessage = "Person not found in our phonebook"
        response.status(404).end()
    }
})

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    phonebook = phonebook.filter(person => person.id !== id)

    response.status(204).end()
})

app.post("/api/persons", (request, response) => {
    const id = Math.floor(Math.random() * 10000)
    const body = request.body

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
        id: id,
        name: body.name,
        number: body.number
    }

    phonebook.concat(newPerson)
    response.json(newPerson)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})
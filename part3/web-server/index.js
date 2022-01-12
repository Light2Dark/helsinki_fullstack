const express = require("express")
const app = express()
const cors = require("cors")

app.use(express.json()) // json-parser
app.use(cors()) // middleware

const requestlogger = (request, response, next) => {
    console.log("Method:", request.method)
    console.log("Path:  ", request.path)
    console.log("Body:  ", request.body)
    console.log("---") 
    next() // passes control to next middleware
}
app.use(requestlogger)

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2019-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2019-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2019-05-30T19:20:14.298Z",
      important: true
    }
]

app.get("/", (request, response) => {
    response.send("<h1>Hello Worleder</h1>")
})

app.get("/api/notes", (request, response) => {
    response.json(notes)
}) // handles HTTP GET requests to the notes path of the application

app.get("/api/notes/:id", (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => {
        // console.log(note.id, typeof note.id, id, typeof id, note.id === id) check terminal for console.logs
        return note.id === id
    })

    if (note) {
        response.json(note) // undefined is a falsy value
    } else {
        response.status(404).end() 
        // response.statusMessage=".."
        // res.status(400).end()
    }

})

app.delete("/api/notes/:id", (req, res) => {
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const maxId = notes.length > 0 
        ? Math.max(...notes.map(note => note.id)) // array is transformed to individual numbers through ...
        : 0

    return maxId + 1
}

app.post("/api/notes", (request, response) => {
    const body = request.body // body part recognized by json parser

    if(!body.content) {
        return response.status(400).json({
            error: "Content missing"
        }) // return is rly important so that the broken note is not stored, cuz rest of post request will still execute
    }

    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId()
    }

    notes = notes.concat(note)

    response.json(note)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: "Unknown endpoint"})
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})

const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const phonebook = require("./db.json")

app.use(express.json())
app.use(cors())
app.use(express.static("build")) // need this bcs we using static files for front end later
app.use(morgan("tiny"))

app.get("/api/persons", (request, response) => {
    response.json(phonebook)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT} port`)
})
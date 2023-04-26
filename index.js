
 const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())
app.use(express.json())

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
app.get("/",(request, response) => {
    response.send("<h1>Hello World</h1>")
})
app.get("/api/notes/:id",(request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if(note){
        response.json(note)
    }else {
        response.status(404).end()
    }

    response.json(note)
})
app.delete("/api/notes/:id", (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end() 
})
const generateId = () => {
    const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
    return maxId + 1
}


app.post("/api/notes", (request, response) => {
   const body = request.body
   
   if(!body.content) {
    return response.status(404).json({
        error: "content missing"
    })
   }
   const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),   
}

notes = notes.concat(note)
response.json(note)

})


app.get("/api/notes",(request, response) => {
    response.json(notes)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

/* const express = require("express")
const app = express()

app.use(express.json())

const persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-122456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
]
app.get("/api/persons", (request, response) => {
    response.json(persons)
})
app.get("/api/info", (request, response) => { 
    response.send(`Phonebook has info for ${persons.length} people \n
    ${(new Date())}  `)
})
app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    const  person = persons.find(person => person.id === id)

    if(person){
         response.send(person)
    }else {
         response.status(404).end()
    }
    response.json(person)
})
const generateId = () => Math.floor(Math.random() * 10)



app.delete("/api/persons/:id" , (request, response) => {
    const id = Number(request.params.id)
     persons = persons.filter(person => person.id !== id)
    response.status(204).end()
    
})
app.post("/api/persons",(request, response) => {
  const body = request.body
if(!body.name || !body.number){
     return response.status(404).json({ error: "number or name is missing" })
}

  const person = {
    id: generateId(),
    number: body.number,
    name: body.name
  }
persons = persons.concat(person)
response.send(person)
})


const PORT = 3002

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
*/
const express = require('express')
const app = express()

app.use(express.json())


let userPhones = [
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

app.get('/', (request, response) => {
    response.send('<h2>Hola el Mundo</h2>')
})

app.get('/api/persons', (request, response) => {
    response.json(userPhones)
})

app.get('/info', (request, response) => {
    response.send(`
        <div>
            <p>Phonebook has info for ${userPhones.length} people</p>
            <p>${new Date()}</p>
        </div>
    `)
})

app.get('/api/persons/:id', (request, response) => {
    const userPhoneId = Number(request.params.id)
    const userPhone = userPhones.find(userphone => userphone.id === userPhoneId)
    if (userPhone){
        response.json(userPhone)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const userPhoneId = Number(request.params.id)
    userPhones = userPhones.filter(userphone => userphone.id !== userPhoneId)
    response.json(userPhones)
    response.status(204).end()
})

// app.post

const PORT = 3001
app.listen(PORT)
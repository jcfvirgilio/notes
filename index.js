
const { application } = require('express')
const express = require('express')
const cors = require('cors')

const app = express()
let notes = [
    { id: 1, content: "HTML is easy : server-HEROKU ", date: "2019-05-30T17:30:31.098Z", important: true },
    { id: 2, content: "Browser can execute only Javascript", date: "2019-05-30T18:39:34.091Z", important: false },
    { id: 3, content: "GET and POST are the most important methods of HTTP protocol", date: "2019-05-30T19:20:14.298Z", important: true }]



app.use(express.json())
app.use(cors())

app.get('/', (request, response) => {
    response.send('<h1>Holaaaa RUN NODE</h1>')
})
app.get('/api/notes', (request, response) => {
    response.json(notes)
})
app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }

})
app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const maxID = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0
    return maxID + 1
}
app.post('/api/notes', (request, response) => {
    console.log(...notes.map(n => n.id))

    console.log(Math.max(...notes.map(n => n.id)))
    const body = request.body
    if (!body.content) {
        return response.status(400).json({ error: 'no tiene descipción' })
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

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`server ejecutandose en el puerto:${PORT}`)
const express = require('express')
const cors = require('cors')
const v4 = require('uuid').v4

const PORT = 3001
// const PORT = process.env.PORT ||  3001

// Note: for testing purposes with a smaller dataset
const JSONData = require('./data/marvel_heroes_list.json')

let heroes = JSONData.map(hero => {
  return {
    ...hero,
    id: v4(),
  }
})


// Create an Express application 
const app = express()
app.disable('x-powered-by')

// Enable CORS for allowed localhost origins only
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];

app.use(cors({
  origin: (origin, callback) => {
    // allow non-browser clients (curl, Postman) when origin is undefined
    if (!origin) return callback(null, true);
    return allowedOrigins.includes(origin)
      ? callback(null, true)
      : callback(new Error('CORS not allowed by server'));
  },
  credentials: true,
}));

// Middleware to parse JSON bodies
/**
 * Own notes: required to get access the data from the body property 
 *    of the request object (POST).
 * Without the json-parser, the body property would be undefined.
 */
app.use(express.json())


// Middleware function to print information about every request
//    that is sent to the server.
const logger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
// Middleware for logging requests
app.use(logger)


// Define routes
app.get('/', (request, response) => {
  response.send('<h1>Backend for `Full stack - learning project`</h1>')
})

// Get all heroes data
app.get('/api/heroes', (request, response) => {
  response.json(heroes)
})

// Get hero by 'id'
app.get('/api/heroes/:id', (request, response) => {
  const id = request.params.id
  const hero = heroes.find(_hero => _hero.id === id)

 if (!hero) {
   return response.status(404).json({ error: 'Hero not found' }).end()
 }

  return response.json(hero)
})

// Add a new hero
// Note: without app.use(express.json()) this will not work -> body will be undefined
app.post('/api/heroes', (request, response) => {
  console.log('request.body', request.body)
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ error: 'name missing' })
  }

  const newHero = {
    id: v4(),
    name: body.name,
    gender: body.gender || null,
    citizenship: body.citizenship || null,
    skills: body.skills || null,
    occupation: body.occupation || null,
    memberOf: body.memberOf || null,
    creator: body.creator || null,
    createAt: new Date().toISOString(),
    updateAt: new Date().toISOString(),
  }
  console.log('newHero', newHero)
  heroes.unshift(newHero)

  response.status(201).json(newHero)
})

// Delete hero by id
app.delete('/api/heroes/:id', (request, response) => {
  const id = request.params.id
  heroes = heroes.filter(_hero => _hero.id !== id)

  // console.log('Deleted hero with id:', id)
  // console.log('really deleted? heroes:', heroes)

  response.status(204).end()
})

// Update hero by id
app.put('/api/heroes/:id', (request, response) => {
  const id = request.params.id
  const body = request.body

  const heroIndex = heroes.findIndex(_hero => _hero.id === id)
  if (heroIndex === -1) {
    return response.status(404).json({ error: 'hero not found' }).end()
  }

  const updatedHero = {
    ...heroes[heroIndex],
    ...body,
    updateAt: new Date().toISOString(),
  }

  heroes[heroIndex] = updatedHero

  response.json(updatedHero)
})



// Middleware function to catch requests to non-existent routes.
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
// Use middleware for handling unknown endpoints
app.use(unknownEndpoint)


// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

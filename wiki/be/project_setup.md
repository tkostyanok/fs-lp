# Setup guide

## Initialization

```
npm init
```

## Simple web server

Create `index.js` file:

```js

const http = require('http') // <-imports Node's built-in web server module

const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('Hello World')
}) // <-creates a server

const PORT = 3001
app.listen(PORT) // <- bind the http server assigned to the app variable, to listen to HTTP requests sent to port 3001
console.log(`Server running on port ${PORT}`)

```

or 

```js

const http = require('http') // <-imports Node's built-in web server module

let data = [{some data},{some data},{some data}];

// Create a server
const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end(JSON.stringify(data)) // <- necessary because the response.end() method expects a string or a buffer to send as the response body
})

const PORT = 3001
app.listen(PORT) // <- bind the http server assigned to the app variable, to listen to HTTP requests sent to port 3001
console.log(`Server running on port ${PORT}`)

```

## `Express`

**Express** is fast, unopinionated, minimalist web framework for Node.js.

```
npm install express
```

BE with `Express`

Update index.js file:

```js

// Create an Express application and store it in the 'app' variable
const express = require('express')
const app = express()

let data = [{some data},{some data},{some data}];

// Define route '/'
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

// Define route '/api/data'
app.get('/api/data', (request, response) => {
  response.json(data)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

```

## Testing with Visual Studio Code

If you use `Visual Studio Code`, you can use the VS Code [`REST client`](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) plugin.

Make a directory at the root of the application named `requests`. Save all the REST client requests in the directory as files that end with the `.rest` extension.

Inside file in top appears suggestion `Send Request`. By clicking the `Send Request` text, the REST client will execute the HTTP request and the response from the server is opened in the editor.


## Middleware

**Middleware** are functions that can be used for handling request and response objects.

The `Express` **json-parser** middleware takes the raw data from the requests that are stored in the `request` object, parses it into a JavaScript object and assigns it to the `request` object as a new property `body`.

In practice, it is possible to use several middlewares at the same time.
**When app has more than one middleware, they're executed one by one in the order that they were listed in the application code.**


Own middleware that prints information about every request that is sent to the server.

```
const logger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
```

**Important:** notice that json-parser is listed before requestLogger , because otherwise request.body will not be initialized when the logger is executed!

Sometimes middleware functions have to be executed before the route event handlers, sometimes after. As example `unknownEndpoint` middleware function to catch requests to
non-existent routes.

```
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
```

## CORS

**Cross-Origin Resource Sharing** (CORS) is a mechanism that allows restricted 
  resources on a web page to be requested from another domain outside the domain 
  from which the first resource was served.


The `cors` is a node.js package for providing a Connect/Express middleware that 
can be used to enable CORS with various options.


To install: 

```
npm install cors
```

Add the middleware to use and allow for requests from all origins in `index.js` file:

```

const cors = require('cors')
app.use(cors())

```

**Note:** When enabling cors, think about how to configure it. Fo this project the backend
  is not expected to be visible to the public in the production environment, and `cors` will
  be used just from a specific origin (the front end). 
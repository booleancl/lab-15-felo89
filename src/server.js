const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const crypto = require('crypto')

const router = require('./routes')
const app = express()

const createHash = () => {
  const current_date = (new Date()).valueOf().toString();
  const random = Math.random().toString();
  return crypto.createHash('sha1')
    .update(current_date + random)
    .digest('hex');
}

// GESTIÓN COOKIES
app.use(cookieParser())

// GESTIÓN RECURSOS ESTÁTICOS

// const staticOptions = {
//   setHeaders(res, path, stat) {
//     // utilizar "sessionId" con "createHash"
//     res.set('Set-Cookie', "myCookie=cookieValue;Path=/")
//   }
// }
//const publicPath = path.resolve('./public')

// app.use(express.static(publicPath, staticOptions))

app.get('/', (req, res) => {
  res.sendFile(
    path.resolve('public/index.html')
  )
})

app.get('/bio', (req, res) => {
  res.sendFile(
    path.resolve('public/biography.html')
  )
})

app.get('/app.js', (req, res) => {
  res.sendFile(
    path.resolve('public/assets/app.js')
  )
})

// GESTIÓN INFORMACIÓN
app.use(express.json())
app.use(router)

// LEVANTAR EL SERVIDOR
const port = process.env.PORT;
const environment = process.env.NODE_ENV

app.listen(port, () => {
  console.log(`App server listening on port ${port} in ${environment} environment`)
})

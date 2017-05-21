const dev = process.env.NODE_ENV !== 'production'
const dir = './compiled'
const moduleAlias = require('module-alias')

// For the development version, we'll use React.
// Because, it support react hot loading and so on.
if (!dev) {
  moduleAlias.addAlias('react', 'inferno-compat')
  moduleAlias.addAlias('react-dom/server', 'inferno-server')
  moduleAlias.addAlias('react-dom', 'inferno-compat')
}

const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const app = next({ dev, dir })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  })
  .listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})

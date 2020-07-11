const http = require('http')

const hostname = 'localhost'
const port = 3000

const server = http.createServer(function(req, res){
    console.log(req.method)
    console.log(req.headers)
    console.log(req.body)

    res.statusCode = 200
    res.setHeader("Content-Type", "text/html")
    res.end('<html><body><strong>Hello</strong></body></html>')
})

server.listen(port, hostname, ()=>{
    console.log(`Server Running at http://${hostname}:${port}`)
})
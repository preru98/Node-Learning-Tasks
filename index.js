const http = require('http')
const fs = require('fs')
const path = require('path')

const hostname = 'localhost'
const port = 4000

const server = http.createServer(function(req, res){
    console.log("Requested URL : "+ req.url + "Requested Method: " + req.method )
    if(req.method=='GET'){
        var fileUrl
        if(req.url=='/'){
            fileUrl='/index.html'
            console.log("fileUrl: "+ fileUrl )
        }
        else{
            fileUrl=req.url
        }
        var filePath=path.resolve('./public' + fileUrl)
        console.log("filePath: "+ filePath )
        const fileExt=path.extname(filePath)
        if(fileExt=='.html'){
            fs.exists(filePath, (exists)=>{
                if(exists){
                    res.statusCode = 200
                    res.setHeader("Content-Type", "text/html")
                    fs.createReadStream(filePath).pipe(res)
                    return
                }
                else{
                    res.statusCode = 404
                    res.setHeader("Content-Type", "text/html")
                    res.end('<html><body><h2>ERROR 404 :</h2><h3>Requested URL '+ fileUrl + 'Not found</h3></body></html>')
                    return 
                }
            })
        }
        else{
            res.statusCode = 404
            res.setHeader("Content-Type", "text/html")
            res.end('<html><body><h2>ERROR 404 :</h2><h3>Requested URL '+ fileUrl + 'Not an HTML file</h3></body></html>')
        }
    }
    else{
        res.statusCode = 404
        res.setHeader("Content-Type", "text/html")
        res.end('<html><body><h2>ERROR 404 :</h2><h3>Requested Method '+ req.method + 'Not Supported</h3></body></html>')
    }
})

server.listen(port, hostname, ()=>{
    console.log(`Server Running at http://${hostname}:${port}`)
})
const app=require('express')
const server=app()

server.get('/',(req,res)=>{
          res.end('hello from express');
})
server.listen(3005)
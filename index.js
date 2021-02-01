const express= require('express')
 const app = express()
 const useragent = require('express-useragent')
const port = 3040
 
//setup db
 const configuredb = require('./config/database')
configuredb()
 
 app.use(express.json())
app.use(useragent.express())
 
//setup routes
 const routes = require('./config/routes')
 app.use('/',routes)
 

app.listen(port,()=>{
    console.log('Listening on port', port)
})     
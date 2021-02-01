const Url = require('../models/Url')
 
// get all categories
module.exports.list = (req, res) => {
    Url.find()
        .then((urls) => {
            res.json(urls)
        })
        .catch((err) => {
            res.json(err)
        })  
}
 
module.exports.create = (req,res)=>{
    console.log('entered express list-post method')
    const body = req.body
    const url= new Url(body)
    url.save( )
    .then((urls)=>{
        res.json(urls)
    })
    .catch((err)=>{
        res.json(err)
    })
 }
 
 module.exports.show= (req,res)=>{
     const id = req.params.id
     Url.findById(id) 
     .then((url)=>{
         if(url){
           res.json(url)
         }else {
             res.json({})
         }
     })
     .catch((err)=>{
             res.json(err)

     })
}

module.exports.update = (req,res)=>{
     const id = req.params.id
     const body = req.body
      Url.findByIdAndUpdate(id,body, {new : true, runValidators : true})
     .then((url)=>{
         if(url){
            res.json(url)
         } else {
             res.json({})
         }
     })
     .catch((err)=>{
        res.json(url)
     })
 }
 
 module.exports.destroy = (req,res)=>{
     const id = req.params.id
     Url.findByIdAndDelete(id)
     .then((url)=>{
         if(url){
             res.json(url)
         } else {
             res.json({})
         }
     })
     .catch((err)=>{
         res.json(err)
     })
 }
 
 module.exports.interchange = (req,res)=>{
     const hash = req.params.hash
     const userData = req.useragent
    
    if(userData.isMobile){
           device = 'Mobile'
       }else if( userData.isDesktop){
           device = 'Desktop'
       }
       const click = [{
            ipAddress : req.ip,
            browser   : userData.browser,
            platform  : userData.platform,
            device    : device
       }]
       Url.findOneAndUpdate({'hashedUrl' : hash}, {$push : {click : click}})
      .then((value)=>{
          console.log(value)
        res.redirect(value.originalUrl)

      })
   
     .catch((err)=>{
         res.json(err)
     })
 }
 
 module.exports.details = (req,res)=>{
     res.send(req.useragent)
 }
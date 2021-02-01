const mongoose = require('mongoose')
const validator = require('validator')
const sh = require('shorthash')
 
const Schema = mongoose.Schema
const urlSchema = new Schema({
    title : {
        type : String,
         required : true    
    },
    originalUrl : {
        type : String,
        required : true,
        validate : {
            validator : function(value){
                return validator.isURL(value)
            },
            message   : function(){
                return 'it must be a valid Url'
            }
        }
    },
    hashedUrl : {
        type : String
    },
    
    click  : [{
        clickDateTime : Date,
            ipAddress : String, 
            browser   : String, 
            platform  : String, 
            device    : String 

            }],
    createdAt : {
        type : Date,
        default : Date.now()
    }
})
 
urlSchema.pre('validate', function(next){
    console.log('pre validate function called')
    next()
})

urlSchema.pre('save', function(next){
   console.log('pre save function called')
   console.log('this value',this)
   this.hashedUrl = sh.unique(this.originalUrl)
     next()
})
 
const Url = mongoose.model('Url', urlSchema)
console.log('Url model function called')
module.exports = Url

console.log('url.js module exports', module.exports)

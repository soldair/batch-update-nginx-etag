var walkdir = require('walkdir')
var pressure = require('pressure-stream')
var etag = require('nginx-etag')
var once = require('once')

module.exports = function(path,filter,done){
  done = once(done)

  var walkEnded = false;
  
  var pending = 0

  var ps = pressure(function(path,cb){
    pending++;
    etag.setContentBased(path,function(err,data){
      pending--
      cb(err,path)
      isdone()
    })

  },{
    high:10,low:10,max:10
  }).on('end',function(){
    isdone()
  }).on('error',function(err){
    done(err)
  })


  function isdone(){
    setImmediate(function(){
      if(!pending && walkEnded) {
        done()
      }
    })
  }


  var em = walkdir(path,function(path){
    path = filter(path)
    if(!path) return
    
    ps.write(path)  
  })

  em.on('end',function(){
    walkEnded = true
  })

}


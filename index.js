var pressure = require('pressure-stream')
var split2 = require('split2')
var etag = require('nginx-etag')
var once = require('once')

module.exports = function(filter,done){
  done = once(done)

  var pending = 0

  var ps = pressure(function(path,cb){
    if(!filter(path)) return cb()

    pending++;
    etag.setContentBased(path,function(err,data){
      if(err) console.error(err)
      pending--
      cb(false,path)
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
      if(!pending) {
        done()
      }
    })
  }

  return ps
}


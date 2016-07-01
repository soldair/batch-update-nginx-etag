var test = require('tape')
var fs = require('fs')
var batcher = require('../') 
var crypto = require('crypto')
var exec = require('child_process').exec

test("can",function(t){
  var random = Math.random()+''

  var testFile = __dirname+'/fixture'
  fs.writeFileSync(testFile,random)

  batcher(__dirname,function(p){
    if(p.indexOf('fixture') > -1) return p
  },function(err){
    t.ok(!err,'should not have error')  

    fs.stat(testFile,function(err,stat){

      var number = crypto.createHash('md5').update(random).digest().readUInt32BE()

      t.equals(stat.mtime/1000,number,'should have correct mtime.')
      t.end()
    })

  })


})


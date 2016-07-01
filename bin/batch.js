#!/usr/bin/env node

var yargs = require('yargs')
  .usage('$0 [options]')
  .option('path', {
    alias: 'p',
    describe: 'directory to scan for files',
    required: true
  })  
  .option('filter',{
    alias:"f",
    describe:"regex for paths you want to match",
    required:true
  })
  .option('dry', {
    alias: 'd',
    describe: 'just print the files this would change but do not change any.',
  })
  .help('h')
  .alias('h', 'help')


var argv = yargs.argv

var batch = require('../')

var regex = new RegExp(argv.filter) 

batch(argv.path,function(file){
  regex.lastIndex = 0
  if(!regex.test(file)) return;

  console.log(file)
  if(argv.dry) return;

  return file
},function(err){
  console.log(arguments)
  console.log('done.')
  if(err) process.exit(1)
})






var execSync = require('exec-sync')
  , logger = require('./log');

var baseCommand = 'python xunlei-lixian/lixian_cli.py'
var commmands = {
  test:baseCommand + ' info',
  add:baseCommand + ' add --bt '
}

function test(){
  logger.log("info","Testing xunlei-lixian cli.")
  var output;
  try{
    output = execSync(commmands.test);
  }catch(e){
    logger.log("error","Run xunlei-lixian cli failed. Login are required before running subsvriber, because we won't save password of xunlei cloud locally.")
    return false;
  }
  return true;
}

function add(link){
  var output = {};
  output = execSync(commmands.add + '"' + link + '"', true);
  // console.log(link)
  if (output.stderr){
    logger.log("error","Add xunlei-lixian task failed.\ninfo:","Error Message: " + output.stderr);
    return false;
  }else{
    logger.log("info","Successfully added xunlei-lixian task.");
    return true;
  }
}

module.exports.add = add;
module.exports.test = test;

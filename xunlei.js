var task = require('lixian-cli')

function add(link){
  promise = task.add(link)
  return promise
}

module.exports.add = add;

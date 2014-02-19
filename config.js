var fs = require('fs')
  , nconf = require('nconf')
  , clone = require('clone')

nconf.use('file', { file: 'config.json' });
nconf.load();

var list = nconf.get('list');
var url = nconf.get('feed_url');

module.exports.getUrl = function(){
  return url;
}

module.exports.getList = function(){
  var extendedList = clone(list);

  extendedList.map(function(element, index){
    var qRegExps = element.q.split(' ').map(function(element){
      return new RegExp(element,'i');
    })
    element.qRegExps = qRegExps;
    element._index = index;
    return element;
  })
  return extendedList;
}

module.exports.updateItem = function(index, episode){
  list[index].last_episode = episode;
  nconf.save();
  list = nconf.get('list');
}
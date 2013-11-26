var FeedParser = require('feedparser')
  , request = require('request')
  , config = require('./config')
  , xunlei = require('./xunlei')
  , logger = require('./log');

var list = config.getList();
var url = config.getUrl();

var episodeRegExps = [
  /\[(\d{1,3})\]/,
  /第(\d{1,3})[话話]/,
  /【(\d{1,3})】/
];

module.exports.run = function(){
  request(url)
    .pipe(new FeedParser())
    .on('error', function(error) {
      logger.log('error','Parse RSS error.');
    })
    .on('readable', function () {
      var stream = this, rssItem;
      while (rssItem = stream.read()) {
        var title = rssItem.title;
        var newer = false;
        list.forEach(function(anime,itemIndex){
          var matched = anime.qRegExps.every(function(qRegExp){
            if(!qRegExp.test(title)){
              return false;
            }else{
              return true;
            }
          })
          if(matched){
            var episode = -1;
            var newer = episodeRegExps.some(function(episodeRegExp,index){
              if(episodeRegExp.test(title)){
                episode = parseInt(episodeRegExp.exec(title)[1]);
                if(episode > list[itemIndex].last_episode){
                  return true;
                }else{
                  return false;
                }
              }else{
                return false;
              }
            })
            if(newer){
              logger.log('info','New! - ' + title);
              xunlei.add(rssItem.enclosures[0].url)
              config.updateItem(itemIndex,episode);
              list = config.getList();
            }
          }
        })
      }
    })
}
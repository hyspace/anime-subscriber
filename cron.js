var CronJob = require('cron').CronJob
  , logger = require('./log'),
  , subscriber = require('.anime-subscriber');

var job = new CronJob('00 */10 * * * *', function(){
    subscriber.run();
  },null,true
);
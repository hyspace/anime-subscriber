var CronJob = require('cron').CronJob
  , logger = require('./log')
  , subscriber = require('./anime-subscriber');

var job = new CronJob('00 */5 * * * *', function(){
    subscriber.run();
  },null,true
);
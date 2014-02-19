var CronJob = require('cron').CronJob
  , subscriber = require('./anime-subscriber');

var job = new CronJob('00 */30 * * * *', function(){
    console.log('Job start. '+ (new Date()).toLocaleTimeString())
    subscriber.run();
  },null,true
);
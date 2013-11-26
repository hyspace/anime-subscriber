var CronJob = require('cron').CronJob
  , logger = require('./log')
  , subscriber = require('./anime-subscriber');

var job = new CronJob('00 */5 * * * *', function(){
    logger.log('info','Job start. '+ (new Date()).toLocaleTimeString())
    subscriber.run();
  },null,true
);
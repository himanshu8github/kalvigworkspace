const { app } = require('@azure/functions');

app.timer('MyTimerFunc', {
    schedule: '0 */5 * * * *', // every 5 minutes
    handler: (myTimer, context) => {
        context.log('Timer function executed at', new Date().toISOString());
    }
});

module.exports = app;

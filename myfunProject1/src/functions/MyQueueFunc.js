const { app } = require('@azure/functions');

app.queue('MyQueueFunc', {
    queueName: 'myqueue',              // name of the queue
    connection: 'AzureWebJobsStorage', // matches local.settings.json
    handler: async (context, message) => {
        context.log('Queue message received:', message);
    }
});

module.exports = app;

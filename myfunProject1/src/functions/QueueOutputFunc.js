const { app } = require('@azure/functions');

app.http('QueueOutputFunc', {
    methods: ['POST'],
    authLevel: 'anonymous',
    extraOutputs: [
        {
            type: 'queue',
            name: 'msg',
            queueName: 'myqueue',
            connection: 'AzureWebJobsStorage',
            direction: 'out'
        }
    ],
    handler: async (req, context) => {
        const body = await req.json();
        context.extraOutputs.set('msg', body);
        return { body: `Message queued: ${JSON.stringify(body)}` };
    }
});

module.exports = app;

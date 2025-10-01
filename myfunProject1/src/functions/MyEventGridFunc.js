const { app } = require('@azure/functions');

app.eventGrid('MyEventGridFunc', {
    authLevel: 'anonymous',
    handler: (event, context) => {
        context.log('Event grid function processed event:', event);
    }
});

module.exports = app;

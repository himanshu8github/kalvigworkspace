const { app } = require('@azure/functions');

app.storageQueue('QueueTriggerFunc', {
    queueName: 'js-queue-items',
    connection: 'AzureWebJobsStorage',
    handler: (queueItem, context) => {
        context.log(' Queue trigger function started');
        context.log(' Received queue item:', queueItem);
        
        // Try to parse JSON
        try {
            const data = typeof queueItem === 'string' ? JSON.parse(queueItem) : queueItem;
            context.log(' Parsed data:', data);
            context.log(`Processing order ID: ${data.orderId || 'N/A'}`);
        } catch (error) {
            context.log(' Not a JSON message:', queueItem);
        }
        
        context.log(' Queue processing completed');
    }
});
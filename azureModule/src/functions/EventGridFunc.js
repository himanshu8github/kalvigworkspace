// const { app } = require('@azure/functions');

// app.eventGrid('EventGridFunc', {
//     handler: (event, context) => {
//         context.log('Event grid function processed event:', event);
//     }
// });


const { app } = require('@azure/functions');

app.eventGrid('EventGridFunc', {
    handler: (event, context) => {
        context.log(' Event Grid trigger function started');

        
        // Log event details
        context.log(' Event Type:', event.eventType);
        context.log(' Subject:', event.subject);
        context.log(' Event Time:', event.eventTime);
        context.log(' Event ID:', event.id);
        context.log(' Event Data:', JSON.stringify(event.data, null, 2));
        
        // Handle different event types
        switch(event.eventType) {
            case 'Microsoft.Storage.BlobCreated':
                context.log(' A new blob was created!');
                context.log(' Blob URL:', event.data.url);
                context.log(' Blob Size:', event.data.contentLength, 'bytes');
                break;
                
            case 'Microsoft.Storage.BlobDeleted':
                context.log(' A blob was deleted!');
                context.log(' Blob URL:', event.data.url);
                break;
                
            case 'Microsoft.EventGrid.SubscriptionValidationEvent':
                context.log(' Event Grid subscription validation');
                break;
                
            default:
                context.log(' Unknown event type:', event.eventType);
        }
        
    
        context.log(' Event Grid processing completed');
    }
});
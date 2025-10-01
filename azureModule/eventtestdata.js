const axios = require('axios');

async function sendEventGridEvent() {
    // Your local Event Grid function endpoint
    const endpoint = 'http://localhost:7071/runtime/webhooks/eventgrid?functionName=EventGridFunc';
    
    // Sample Event Grid event
    const event = {
        id: `event-${Date.now()}`,
        eventType: 'Microsoft.Storage.BlobCreated',
        subject: '/blobServices/default/containers/test-container/blobs/sample.txt',
        eventTime: new Date().toISOString(),
        data: {
            api: 'PutBlob',
            clientRequestId: 'client-request-id',
            requestId: 'request-id',
            eTag: '0x8D4BCC2E4835CD0',
            contentType: 'text/plain',
            contentLength: 524288,
            blobType: 'BlockBlob',
            url: 'https://mystorageaccount.blob.core.windows.net/test-container/sample.txt',
            sequencer: '00000000000004420000000000028963',
            storageDiagnostics: {
                batchId: 'batch-id'
            }
        },
        dataVersion: '1.0',
        metadataVersion: '1'
    };
    
    console.log(' Sending Event Grid event...');
    console.log(' Event Type:', event.eventType);
    console.log(' Subject:', event.subject);
    
    try {
        // Send as an array (Event Grid sends events in arrays)
        const response = await axios.post(endpoint, [event], {
            headers: {
                'Content-Type': 'application/json',
                'aeg-event-type': 'Notification'
            }
        });
        
        console.log(' Event sent successfully!');
        console.log(' Response status:', response.status);
    } catch (error) {
        console.error(' Error sending event:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
    }
}

// Run the function
sendEventGridEvent()
    .then(() => console.log('\n Done!'))
    .catch(error => console.error('Error:', error.message));
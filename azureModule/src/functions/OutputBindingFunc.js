const { app, output } = require('@azure/functions');

// Define output bindings
const blobOutput = output.storageBlob({
    path: 'output-container/{name}.json',
    connection: 'AzureWebJobsStorage'
});

const queueOutput = output.storageQueue({
    queueName: 'output-queue',
    connection: 'AzureWebJobsStorage'
});

app.http('OutputBindingFunc', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'savedata',
    extraOutputs: [blobOutput, queueOutput],
    handler: async (request, context) => {
        context.log(' Received request');
        
        // Get data from request body
        const bodyData = await request.json();
        const name = bodyData.name || 'default';
        const data = bodyData.data || {};
        
        context.log(' Processing data for:', name);
        
        // Prepare data to save
        const blobData = {
            name: name,
            data: data,
            timestamp: new Date().toISOString(),
            processedBy: 'OutputBindingFunc'
        };
        
        // Prepare queue message
        const queueMessage = {
            action: 'data-saved',
            name: name,
            timestamp: new Date().toISOString()
        };
        
        // Set output bindings
        context.extraOutputs.set(blobOutput, JSON.stringify(blobData, null, 2));
        context.extraOutputs.set(queueOutput, JSON.stringify(queueMessage));
        
        context.log(' Data will be saved to blob:', `output-container/${name}.json`);
        context.log(' Message will be sent to queue: output-queue');
        
        return {
            status: 200,
            jsonBody: {
                message: 'Data saved successfully!',
                blobPath: `output-container/${name}.json`,
                queueName: 'output-queue'
            }
        };
    }
});
const { app, input } = require('@azure/functions');

// Define input binding
const blobInput = input.storageBlob({
    path: 'output-container/{name}.json',
    connection: 'AzureWebJobsStorage'
});

app.http('InputBindingFunc', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'getdata/{name}',
    extraInputs: [blobInput],
    handler: async (request, context) => {
        try {
            context.log(' Received GET request');
            
            // Get the name from route parameter
            const name = request.params.name;
            context.log(' Looking for customer:', name);
            
            // Get data from input binding (automatically read from blob)
            const blobData = context.extraInputs.get(blobInput);
            
            if (!blobData) {
                context.log(' Customer not found:', name);
                return {
                    status: 404,
                    jsonBody: {
                        error: 'Customer not found',
                        name: name
                    }
                };
            }
            
            // Parse the blob data
            const customerData = typeof blobData === 'string' 
                ? JSON.parse(blobData) 
                : blobData;
            
            context.log(' Customer data retrieved:', name);
            
            return {
                status: 200,
                jsonBody: {
                    message: 'Customer data retrieved successfully',
                    customer: customerData
                }
            };
            
        } catch (error) {
            context.error(' Error:', error);
            return {
                status: 500,
                jsonBody: {
                    error: error.message
                }
            };
        }
    }
});
const { app } = require('@azure/functions');

// Simple in-memory storage for testing
const todos = [];

// CREATE TODO - POST /api/todos
app.http('CreateTodo', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'todos',
    handler: async (request, context) => {
        context.log(' CreateTodo function called');
        
        try {
            const body = await request.json();
            context.log('Received body:', body);
            
            const todo = {
                id: `todo-${Date.now()}`,
                title: body.title || 'Untitled',
                completed: false,
                createdAt: new Date().toISOString()
            };
            
            // Store in memory
            todos.push(todo);
            
            context.log(' Todo created:', todo.id);
            
            return {
                status: 201,
                jsonBody: todo
            };
            
        } catch (error) {
            context.error(' Error:', error);
            return {
                status: 500,
                jsonBody: { error: error.message }
            };
        }
    }
});

// GET TODO - GET /api/todos/{id}
app.http('GetTodo', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'todos/{id}',
    handler: async (request, context) => {
        const id = request.params.id;
        context.log(' Looking for:', id);
        
        const todo = todos.find(t => t.id === id);
        
        if (!todo) {
            return {
                status: 404,
                jsonBody: { error: 'Todo not found' }
            };
        }
        
        return {
            status: 200,
            jsonBody: todo
        };
    }
});

// GET ALL TODOS - GET /api/todos/all
app.http('GetAllTodos', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'todos/all',
    handler: async (request, context) => {
        context.log(' Getting all todos, count:', todos.length);
        
        return {
            status: 200,
            jsonBody: {
                todos: todos,
                count: todos.length
            }
        };
    }
});


// const { app, output, input } = require('@azure/functions');


// //  CREATE TODO - POST /api/todos

// const blobOutput = output.storageBlob({
//     path: 'todos/{id}.json',
//     connection: 'AzureWebJobsStorage'
// });

// app.http('CreateTodo', {
//     methods: ['POST'],
//     authLevel: 'anonymous',
//     route: 'todos',
//     extraOutputs: [blobOutput],
//     handler: async (request, context) => {
//         try {
//             context.log(' Creating todo...');
            
//             const body = await request.json();
            
//             if (!body.title) {
//                 return {
//                     status: 400,
//                     jsonBody: { error: 'Title is required' }
//                 };
//             }
            
//             // Create todo
//             const todo = {
//                 id: `todo-${Date.now()}`,
//                 title: body.title,
//                 completed: false,
//                 createdAt: new Date().toISOString()
//             };
            
//             // Save to blob
//             context.extraOutputs.set(blobOutput, JSON.stringify(todo, null, 2));
            
//             context.log(' Todo created:', todo.id);
            
//             return {
//                 status: 201,
//                 jsonBody: todo
//             };
            
//         } catch (error) {
//             context.error(' Error:', error);
//             return {
//                 status: 500,
//                 jsonBody: { error: error.message }
//             };
//         }
//     }
// });


// //  GET TODO - GET /api/todos/{id}

// const blobInput = input.storageBlob({
//     path: 'todos/{id}.json',
//     connection: 'AzureWebJobsStorage'
// });

// app.http('GetTodo', {
//     methods: ['GET'],
//     authLevel: 'anonymous',
//     route: 'todos/{id}',
//     extraInputs: [blobInput],
//     handler: async (request, context) => {
//         try {
//             const id = request.params.id;
//             context.log(' Getting todo:', id);
            
//             const blobData = context.extraInputs.get(blobInput);
            
//             if (!blobData) {
//                 return {
//                     status: 404,
//                     jsonBody: { error: 'Todo not found', id: id }
//                 };
//             }
            
//             const todo = typeof blobData === 'string' ? JSON.parse(blobData) : blobData;
//             context.log(' Todo found:', id);
            
//             return {
//                 status: 200,
//                 jsonBody: todo
//             };
            
//         } catch (error) {
//             context.error('Error:', error);
//             return {
//                 status: 500,
//                 jsonBody: { error: error.message }
//             };
//         }
//     }
// });


// //  GET ALL TODOS - GET /api/todos/all

// app.http('GetAllTodos', {
//     methods: ['GET'],
//     authLevel: 'anonymous',
//     route: 'todos/all',  
//     handler: async (request, context) => {
//         try {
//             context.log(' Getting all todos...');
            
//             const { BlobServiceClient } = require("@azure/storage-blob");
            
//             const connectionString = "UseDevelopmentStorage=true";
//             const containerName = "todos";
            
//             const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
//             const containerClient = blobServiceClient.getContainerClient(containerName);
            
//             const todos = [];
            
//             // Check if container exists
//             const exists = await containerClient.exists();
//             if (!exists) {
//                 context.log(' Container does not exist yet');
//                 return {
//                     status: 200,
//                     jsonBody: { todos: [], count: 0 }
//                 };
//             }
            
//             // List all blobs
//             for await (const blob of containerClient.listBlobsFlat()) {
//                 const blobClient = containerClient.getBlobClient(blob.name);
//                 const downloadResponse = await blobClient.download();
//                 const downloaded = await streamToString(downloadResponse.readableStreamBody);
//                 todos.push(JSON.parse(downloaded));
//             }
            
//             context.log(' Found', todos.length, 'todos');
            
//             return {
//                 status: 200,
//                 jsonBody: {
//                     todos: todos,
//                     count: todos.length
//                 }
//             };
            
//         } catch (error) {
//             context.error(' Error:', error);
//             return {
//                 status: 500,
//                 jsonBody: { error: error.message }
//             };
//         }
//     }
// });

// // Helper function
// async function streamToString(readableStream) {
//     return new Promise((resolve, reject) => {
//         const chunks = [];
//         readableStream.on("data", (data) => {
//             chunks.push(data.toString());
//         });
//         readableStream.on("end", () => {
//             resolve(chunks.join(""));
//         });
//         readableStream.on("error", reject);
//     });
// }
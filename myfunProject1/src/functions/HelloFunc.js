// src/functions/HelloFunc.js
const { app } = require('@azure/functions');
const { BlobServiceClient } = require('@azure/storage-blob');

app.http('HelloFunc', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: async (req, context) => {
    const data = await req.text() || "No data";
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      process.env.AzureWebJobsStorage
    );
    const containerClient = blobServiceClient.getContainerClient("demo-container");
    await containerClient.createIfNotExists();
    const blockBlobClient = containerClient.getBlockBlobClient(`message-${Date.now()}.txt`);
    await blockBlobClient.upload(data, data.length);
    context.log("Blob created:", `message-${Date.now()}.txt`);
    return { body: `Stored data: ${data}` };
  }
});

module.exports = app;

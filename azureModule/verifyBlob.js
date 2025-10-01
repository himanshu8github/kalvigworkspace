const { BlobServiceClient } = require("@azure/storage-blob");

async function verifyBlobSaved() {
    const connectionString = "UseDevelopmentStorage=true";
    const containerName = "output-container";
    const blobName = "customer-123.json";
    
    console.log(' Checking if blob exists...');
    console.log('Container:', containerName);
    console.log('Blob:', blobName);
    console.log('');
    
    try {
        const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blobClient = containerClient.getBlobClient(blobName);
        
        const exists = await blobClient.exists();
        
        if (exists) {
            console.log(' Blob found!');
            
            // Download and display content
            const downloadResponse = await blobClient.download();
            const downloaded = await streamToString(downloadResponse.readableStreamBody);
            
            console.log('\n Blob content:');
            console.log(downloaded);
            
        } else {
            console.log('  Blob not found!');
            console.log(' Run "node testOutputBinding.js" first to create it.');
        }
        
    } catch (error) {
        console.error(' Error:', error.message);
        console.log('\n Make sure:');
        console.log('   1. Azurite is running');
        console.log('   2. You ran "node testOutputBinding.js" first');
    }
}

async function streamToString(readableStream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        readableStream.on("data", (data) => {
            chunks.push(data.toString());
        });
        readableStream.on("end", () => {
            resolve(chunks.join(""));
        });
        readableStream.on("error", reject);
    });
}

verifyBlobSaved()
    .then(() => console.log('\n✨ Verification completed!'))
    .catch(console.error);
const { QueueServiceClient } = require("@azure/storage-queue");

async function sendMessageToQueue() {
    // Connection string for local Azurite
    const connectionString = "UseDevelopmentStorage=true";
    const queueName = "js-queue-items";
    
    // Create queue client
    const queueServiceClient = QueueServiceClient.fromConnectionString(connectionString);
    const queueClient = queueServiceClient.getQueueClient(queueName);
    
    // Create queue if it doesn't exist
    console.log(' Creating queue if not exists...');
    await queueClient.createIfNotExists();
    
    // Prepare message
    const message = {
        orderId: `ORD-${Date.now()}`,
        customerName: "John Doe",
        amount: 299.99,
        timestamp: new Date().toISOString()
    };
    
    // Send message to queue
    console.log(' Sending message to queue...');
    await queueClient.sendMessage(JSON.stringify(message));
    
    console.log(' Message sent successfully!');
    console.log(' Message content:', message);
}

// Run the function
sendMessageToQueue()
    .then(() => console.log('\n Done!'))
    .catch(error => console.error(' Error:', error.message));
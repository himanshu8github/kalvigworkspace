const { QueueServiceClient } = require("@azure/storage-queue");

// Connection string for local Azurite
const connectionString = "DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNoGF/G3Yt+==;QueueEndpoint=http://127.0.0.1:10001/devstoreaccount1;";

async function main() {
    // Connect to queue service
    const queueServiceClient = QueueServiceClient.fromConnectionString(connectionString);

    // Get the queue client
    const queueClient = queueServiceClient.getQueueClient("myqueue");

    // Create the queue if it doesn't exist
    await queueClient.createIfNotExists();
    console.log("Queue is ready");

    // Send a test message
    await queueClient.sendMessage("Hello from Queue!");
    console.log("Message sent!");
}

main().catch((err) => console.error("Error:", err));

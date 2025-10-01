const { QueueServiceClient } = require("@azure/storage-queue");

async function verifyQueueMessage() {
    const connectionString = "UseDevelopmentStorage=true";
    const queueName = "output-queue";
    
    console.log('🔍 Checking queue for messages...');
    
    try {
        const queueServiceClient = QueueServiceClient.fromConnectionString(connectionString);
        const queueClient = queueServiceClient.getQueueClient(queueName);
        
        const exists = await queueClient.exists();
        
        if (!exists) {
            console.log('  Queue does not exist yet!');
            return;
        }
        
        const properties = await queueClient.getProperties();
        console.log(` Queue has ${properties.approximateMessagesCount} message(s)\n`);
        
        const peekedMessages = await queueClient.peekMessages({ numberOfMessages: 10 });
        
        if (peekedMessages.peekedMessageItems.length > 0) {
            console.log(` Found ${peekedMessages.peekedMessageItems.length} message(s):\n`);
            
            peekedMessages.peekedMessageItems.forEach((message, index) => {
                console.log(` Message ${index + 1}:`);
                
                // Decode Base64 message
                const decoded = Buffer.from(message.messageText, 'base64').toString('utf-8');
                console.log(decoded);
                console.log('---');
            });
        } else {
            console.log(' Queue exists but has no messages');
        }
        
    } catch (error) {
        console.error(' Error:', error.message);
    }
}

verifyQueueMessage()
    .then(() => console.log('\n Verification completed!'))
    .catch(console.error);
const axios = require('axios');

async function testOutputBinding() {
    const url = 'http://localhost:7071/api/savedata';
    
    const testData = {
        name: 'customer-123',
        data: {
            customerId: 123,
            customerName: 'John Doe',
            email: 'john@example.com',
            orderAmount: 499.99,
            items: ['Laptop', 'Mouse', 'Keyboard']
        }
    };
    
    console.log(' Sending data to function...');
    console.log(' Data:', JSON.stringify(testData, null, 2));
    console.log(' URL:', url);
    console.log('');
    
    try {
        const response = await axios.post(url, testData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log(' Response received:');
        console.log('Status:', response.status);
        console.log('Body:', JSON.stringify(response.data, null, 2));
        
    } catch (error) {
        console.error(' Error:', error.message);
        if (error.response) {
            console.error('Response Status:', error.response.status);
            console.error('Response Data:', error.response.data);
        }
    }
}

testOutputBinding()
    .then(() => console.log('\n✨ Test completed!'))
    .catch(console.error);
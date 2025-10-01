const axios = require('axios');

async function testInputBinding() {
    const customerName = 'customer-123';
    const url = `http://localhost:7071/api/getdata/${customerName}`;
    
    console.log(' Fetching customer data...');
    console.log('URL:', url);
    console.log('');
    
    try {
        const response = await axios.get(url);
        
        console.log(' Response received:');
        console.log('Status:', response.status);
        console.log('Data:', JSON.stringify(response.data, null, 2));
        
    } catch (error) {
        if (error.response) {
            console.error(' Error Status:', error.response.status);
            console.error('Error Data:', error.response.data);
        } else {
            console.error(' Error:', error.message);
        }
    }
}

testInputBinding()
    .then(() => console.log('\n✨ Test completed!'))
    .catch(console.error);
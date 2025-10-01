const axios = require('axios');

async function simpleTest() {
    console.log('🧪 Simple Todo Test\n');
    
    const url = 'http://localhost:7071/api/todos';
    const data = { title: 'Test Todo' };
    
    console.log('Sending POST to:', url);
    console.log('Data:', data);
    console.log('');
    
    try {
        const response = await axios.post(url, data, {
            headers: { 'Content-Type': 'application/json' },
            timeout: 5000
        });
        
        console.log('✅ Success!');
        console.log('Status:', response.status);
        console.log('Response:', JSON.stringify(response.data, null, 2));
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        
        if (error.code === 'ECONNREFUSED') {
            console.error('⚠️  Cannot connect to function. Is func start running?');
        } else if (error.code === 'ETIMEDOUT') {
            console.error('⚠️  Request timed out. Function might be stuck.');
        } else if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        }
    }
}

simpleTest();
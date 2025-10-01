const axios = require('axios');

const BASE_URL = 'http://localhost:7071/api';

async function testTodoAPI() {
    console.log(' Testing Todo API\n');
    
    try {
        // Test 1: Create Todo
        console.log(' Test 1: Creating first todo...');
        const todo1 = await axios.post(`${BASE_URL}/todos`, {
            title: 'Buy groceries'
        });
        console.log(' Created:', todo1.data.title);
        console.log('   ID:', todo1.data.id);
        const todoId = todo1.data.id;
        
        // Test 2: Create Another Todo
        console.log('\n Test 2: Creating second todo...');
        const todo2 = await axios.post(`${BASE_URL}/todos`, {
            title: 'Write code'
        });
        console.log(' Created:', todo2.data.title);
        console.log('   ID:', todo2.data.id);
        
        // Test 3: Create Third Todo
        console.log('\n Test 3: Creating third todo...');
        const todo3 = await axios.post(`${BASE_URL}/todos`, {
            title: 'Deploy to Azure'
        });
        console.log(' Created:', todo3.data.title);
        console.log('   ID:', todo3.data.id);
        
        // Wait for blobs to be saved
        console.log('\n Waiting for blobs to be saved...');
        await sleep(2000);
        
        // Test 4: Get Specific Todo
        console.log('\n Test 4: Getting specific todo...');
        const getTodo = await axios.get(`${BASE_URL}/todos/${todoId}`);
        console.log(' Found:', getTodo.data.title);
        console.log('   ID:', getTodo.data.id);
        console.log('   Completed:', getTodo.data.completed);
        console.log('   Created:', getTodo.data.createdAt);
        
        // Test 5: Get All Todos
        console.log('\n Test 5: Getting all todos...');
        const allTodos = await axios.get(`${BASE_URL}/todos/all`);
        console.log(' Total todos:', allTodos.data.count);
        console.log('\nTodo List:');
        allTodos.data.todos.forEach((todo, index) => {
            console.log(`   ${index + 1}. ${todo.title}`);
            console.log(`      ID: ${todo.id}`);
            console.log(`      Completed: ${todo.completed}`);
        });
        
        console.log('\n' + '═'.repeat(50));
        console.log(' All tests passed successfully!');
        console.log('═'.repeat(50));
        
    } catch (error) {
        console.error('\n Test failed:', error.message);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

testTodoAPI();
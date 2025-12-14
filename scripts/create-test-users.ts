import request from 'superagent';

const API_URL = 'http://localhost:3000';

const testUsers = [
  { email: 'alice@example.com', name: 'Alice Johnson', password: 'password123' },
  { email: 'bob@example.com', name: 'Bob Smith', password: 'password123' },
  { email: 'charlie@example.com', name: 'Charlie Brown', password: 'password123' },
  { email: 'diana@example.com', name: 'Diana Prince', password: 'password123' },
  { email: 'eve@example.com', name: 'Eve Wilson', password: 'password123' },
];

async function createTestUsers() {
  console.log(`Creating test users on ${API_URL}...\n`);

  for (const user of testUsers) {
    try {
      const res = await request
        .post(`${API_URL}/users`)
        .send(user)
        .set('content-type', 'application/json');

      if (res.status === 200) {
        console.log(`✓ Created user: ${user.name} (${user.email}) - ID: ${res.body.id}`);
      } else {
        console.log(`✗ Failed to create user: ${user.name} - Status: ${res.status}`);
      }
    } catch (error: any) {
      if (error.response) {
        console.log(`✗ Failed to create user: ${user.name} - Status: ${error.response.status}`);
        if (error.response.body?.errors) {
          console.log(`  Errors: ${JSON.stringify(error.response.body.errors, null, 2)}`);
        }
      } else {
        console.log(`✗ Error creating user: ${user.name} - ${error.message}`);
      }
    }
  }

  console.log('\nDone!');
}

createTestUsers().catch(console.error);


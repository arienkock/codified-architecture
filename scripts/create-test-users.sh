#!/bin/bash

# Script to create test users on the API running on port 3000

BASE_URL="http://localhost:3000"

echo "Creating test users..."

# Test User 1
echo "Creating testuser1@example.com..."
curl -X POST "${BASE_URL}/users" \
  -H "Content-Type: application/json" \
  -d '{"email":"testuser1@example.com","name":"Test User 1","password":"testpass123"}'
echo -e "\n"

# Test User 2
echo "Creating testuser2@example.com..."
curl -X POST "${BASE_URL}/users" \
  -H "Content-Type: application/json" \
  -d '{"email":"testuser2@example.com","name":"Test User 2","password":"testpass123"}'
echo -e "\n"

# Test User 3
echo "Creating testuser3@example.com..."
curl -X POST "${BASE_URL}/users" \
  -H "Content-Type: application/json" \
  -d '{"email":"testuser3@example.com","name":"Test User 3","password":"testpass123"}'
echo -e "\n"

# Alice
echo "Creating alice@example.com..."
curl -X POST "${BASE_URL}/users" \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","name":"Alice Smith","password":"securepass456"}'
echo -e "\n"

# Bob
echo "Creating bob@example.com..."
curl -X POST "${BASE_URL}/users" \
  -H "Content-Type: application/json" \
  -d '{"email":"bob@example.com","name":"Bob Johnson","password":"securepass456"}'
echo -e "\n"

echo "Done creating test users!"


#!/bin/bash
# Wait for MongoDB to be ready
sleep 5

# Install dependencies
npm install mongoose bcryptjs dotenv > /dev/null 2>&1

# Run seed script
node seed-data.js

#!/bin/bash

# MERN Fitness Tracker Setup Script
echo "Initializing MERN Fitness Tracker Microservices Structure..."

SERVICES=("auth-service" "user-service" "workout-service" "nutrition-service" "analytics-service" "notification-service")

# Initialize services
for service in "${SERVICES[@]}"; do
    echo "Setting up $service..."
    mkdir -p "services/$service/src"
    if [ ! -f "services/$service/package.json" ]; then
        cat <<EOF > "services/$service/package.json"
{
  "name": "$service",
  "version": "1.0.0",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0",
    "dotenv": "^16.0.3",
    "cors": "^2.8.5"
  }
}
EOF
    fi
    touch "services/$service/src/index.js"
done

# Initialize API Gateway
echo "Setting up api-gateway..."
mkdir -p "api-gateway/src"
touch "api-gateway/src/index.js"

# Initialize Shared Library
echo "Setting up shared library..."
mkdir -p "shared/middleware" "shared/errors" "shared/events"
touch "shared/index.js"

echo "Setup complete! Please run 'npm install' in each service directory or use a workspace runner."

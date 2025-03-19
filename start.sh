#!/bin/bash

# Check if Node.js is installed
if ! command -v node >/dev/null 2>&1; then
    echo "❌ Node.js is not installed. Please install Node.js to continue."
    exit 1
fi

# Print Node.js and npm version
echo "🔍 Using Node.js $(node -v) and npm $(npm -v)"

echo "📦 Installing dependencies..."
npm install

echo "🧹 Clearing port 3000..."
# Try to find and kill process on port 3000
if lsof -ti:3000 >/dev/null; then
    lsof -ti:3000 | xargs kill -9
    echo "   Port 3000 cleared! ✨"
else
    echo "   Port 3000 is already free! ✨"
fi

# Check if there are uncommitted changes
if git status --porcelain | grep -q .; then
    echo "⚠️  You have uncommitted changes in your repository."
    echo "   Consider committing them before proceeding."
fi

echo "🏗️  Building the application..."
npm run build

echo "🚀 Starting the application in development mode..."
npm run dev 
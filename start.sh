#!/bin/bash

# Parse command line arguments
CHECK_ONLY=false
for arg in "$@"; do
  if [ "$arg" = "--check" ]; then
    CHECK_ONLY=true
  fi
done

# Check if Node.js is installed
if ! command -v node >/dev/null 2>&1; then
    echo "❌ Node.js is not installed. Please install Node.js to continue."
    exit 1
fi

# Print Node.js and npm version
echo "🔍 Using Node.js $(node -v) and npm $(npm -v)"

echo "📦 Installing dependencies..."
npm install

# Add ESLint if not already installed
if ! npm list eslint --json | grep -q "eslint"; then
    echo "🔧 Installing ESLint..."
    npm install --save-dev eslint
fi

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

# Function for linting animation
lint_spinner() {
  local pid=$1
  local delay=0.1
  local chars=('⣾' '⣽' '⣻' '⢿' '⡿' '⣟' '⣯' '⣷')
  while [ "$(ps a | awk '{print $1}' | grep $pid)" ]; do
    for char in "${chars[@]}"; do
      printf "\r%s Linting... %s" "🔄" "$char"
      sleep $delay
    done
  done
  printf "\r\033[K"  # Clear the line
}

# Only run the linting check if --check flag is provided
if [ "$CHECK_ONLY" = true ]; then
    echo "🔍 Running ESLint to check for unreachable code..."
    
    # Create basic ESLint config if it doesn't exist
    if [ ! -f ".eslintrc.json" ]; then
        echo "📝 Creating ESLint configuration..."
        cat > .eslintrc.json << 'EOF'
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "rules": {
    "no-unreachable": "error"
  }
}
EOF
    fi

    # Run ESLint
    (npx eslint . --ext .js,.jsx,.ts,.tsx) & LINT_PID=$!
    lint_spinner $LINT_PID

    # Capture the exit code
    if ! wait $LINT_PID; then
        echo "❌ ESLint found issues including potential unreachable code."
        echo "   Please fix the issues before continuing."
        echo "   To see detailed errors, run: npx eslint . --ext .js,.jsx,.ts,.tsx"
        exit 1
    else
        echo "✅ ESLint check passed! No unreachable code detected."
    fi
    
    # Exit after check is completed if --check flag was provided
    echo "✅ Linting check completed successfully."
    exit 0
fi

echo "🏗️  Building the application..."
TIMEFORMAT='%3R seconds'

# Function for loading animation
spinner() {
  local pid=$1
  local delay=0.1
  local chars=('⣾' '⣽' '⣻' '⢿' '⡿' '⣟' '⣯' '⣷')
  while [ "$(ps a | awk '{print $1}' | grep $pid)" ]; do
    for char in "${chars[@]}"; do
      printf "\r%s Loading... %s" "🔄" "$char"
      sleep $delay
    done
  done
  printf "\r\033[K"  # Clear the line
}

# Function to rebuild the project
rebuild_project() {
    echo -e "\n🔍 Running ESLint..."
    if ! npx eslint . --ext .js,.jsx,.ts,.tsx; then
        echo "❌ ESLint found issues. Please fix them before rebuilding."
        return 1
    fi
    
    echo -e "\n🏗️  Rebuilding the application..."
    (npm run build) & spinner $!
    echo
    time (npm run build) 2>&1
}

# Function to handle keyboard input
handle_input() {
    while true; do
        read -rsn1 input
        if [ "$input" = "r" ]; then
            rebuild_project
        fi
    done
}

echo "🏗️  Building the application..."
TIMEFORMAT='%3R seconds'

# Run build
(npm run build) & spinner $! 
echo
time (npm run build) 2>&1

echo "🚀 Starting the application in development mode..."
# Start the dev server in the background
(npm run dev) & DEV_PID=$!

# Start listening for keyboard input in the background
handle_input &

# Wait for the dev server process
wait $DEV_PID 
#!/bin/bash

# Parse command line arguments
CHECK_ONLY=false
for arg in "$@"; do
  if [ "$arg" = "--check" ]; then
    CHECK_ONLY=true
  fi
done

# Load secrets from the secrets directory
load_secrets() {
  echo "🔒 Loading secrets from secrets directory..."
  
  # Check if secrets directory exists
  if [ ! -d "secrets" ]; then
    echo "⚠️  Secrets directory not found. Creating it..."
    mkdir -p secrets
  fi
  
  # Check if required secret files exist and create them if needed
  local secret_files=("ghl.env" "mongodb.env" "jwt.env" "email.env")
  for file in "${secret_files[@]}"; do
    if [ ! -f "secrets/$file" ]; then
      echo "⚠️  Secret file secrets/$file not found. Creating an empty template..."
      touch "secrets/$file"
    fi
  done
  
  # Add a signal file to help browser extensions know when server is shutting down
  touch .server_running
  
  # Load environment variables from secret files
  if [ -f "secrets/ghl.env" ]; then
    export $(grep -v '^#' secrets/ghl.env | xargs)
  fi
  
  if [ -f "secrets/mongodb.env" ]; then
    export $(grep -v '^#' secrets/mongodb.env | xargs)
  fi
  
  if [ -f "secrets/jwt.env" ]; then
    export $(grep -v '^#' secrets/jwt.env | xargs)
  fi
  
  if [ -f "secrets/email.env" ]; then
    export $(grep -v '^#' secrets/email.env | xargs)
  fi
  
  echo "✅ Secrets loaded successfully!"
}

# Trap cleanup function to ensure all background processes are terminated
cleanup() {
  echo -e "\n🧹 Cleaning up processes..."
  
  # Remove the server running signal file
  rm -f .server_running
  
  # Create a gentle shutdown page
  if [ -d "public" ]; then
    mkdir -p public/shutdown
    cat > public/shutdown/index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
  <title>Server Stopped</title>
  <style>
    body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
    .message { margin: 30px 0; }
  </style>
  <script>
    // Close only this tab after 2 seconds
    setTimeout(function() {
      window.close();
      // If tab doesn't close (some browsers prevent this), show message
      setTimeout(function() {
        document.getElementById('manual-close').style.display = 'block';
      }, 500);
    }, 2000);
  </script>
</head>
<body>
  <h2>Development Server Stopped</h2>
  <div class="message">The local development server has been shut down.</div>
  <div id="manual-close" style="display:none">
    <p>Please close this tab manually.</p>
  </div>
</body>
</html>
EOF

    # If a browser is connected, try to redirect to shutdown page before killing server
    if command -v curl >/dev/null 2>&1; then
      curl -s "http://localhost:3000/shutdown/" >/dev/null 2>&1 || true
      sleep 1
    fi
  fi
  
  # Kill any background processes we started
  if [[ ! -z "$DEV_PID" ]]; then
    kill $DEV_PID 2>/dev/null || true
  fi
  if [[ ! -z "$INPUT_PID" ]]; then
    kill $INPUT_PID 2>/dev/null || true
  fi
  
  # Kill any processes on port 3000 more gently
  if lsof -ti:3000 >/dev/null; then
    echo "📲 Gracefully shutting down server..."
    # Try SIGTERM first (more gentle)
    lsof -ti:3000 | xargs kill 2>/dev/null || true
    sleep 1
    # Then force kill if still running
    if lsof -ti:3000 >/dev/null; then
      lsof -ti:3000 | xargs kill -9 2>/dev/null || true
    fi
  fi
  
  echo "👋 Goodbye!"
  exit 0
}

# Set up traps for proper cleanup
trap cleanup SIGINT SIGTERM EXIT

# Check if Node.js is installed
if ! command -v node >/dev/null 2>&1; then
    echo "❌ Node.js is not installed. Please install Node.js to continue."
    exit 1
fi

# Check Node.js version - require 20.0.0 or higher
NODE_VERSION=$(node -v | sed 's/v//')
NODE_MAJOR_VERSION=$(echo $NODE_VERSION | cut -d. -f1)
if [ "$NODE_MAJOR_VERSION" -lt 20 ]; then
    echo "❌ Node.js version $NODE_VERSION is not supported."
    echo "Please upgrade to Node.js 20.0.0 or higher to continue."
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
  while [ "$(ps a | awk '{print $1}' | grep $pid 2>/dev/null)" ]; do
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

echo "🏗️  Building the application and generating sitemap..."
TIMEFORMAT='%3R seconds'

# Function for loading animation
spinner() {
  local pid=$1
  local delay=0.1
  local chars=('⣾' '⣽' '⣻' '⢿' '⡿' '⣟' '⣯' '⣷')
  # Add timeout to prevent infinite spinning
  local timeout=300  # 5 minutes timeout
  local count=0
  
  while [ "$(ps a | awk '{print $1}' | grep $pid 2>/dev/null)" ]; do
    for char in "${chars[@]}"; do
      printf "\r%s Loading... %s" "🔄" "$char"
      sleep $delay
      
      # Increment counter and check for timeout
      count=$((count + 1))
      if [ $count -ge $timeout ]; then
        printf "\r\033[K"  # Clear the line
        echo "⚠️  Process is taking too long, may be stuck."
        return 1
      fi
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
    (npm run build) & BUILD_PID=$!
    spinner $BUILD_PID
    echo
    time (npm run build) 2>&1
}

# Function to run tests
run_tests() {
    local test_type=$1
    
    case $test_type in
        "unit")
            echo -e "\n🧪 Running unit tests..."
            npm test
            ;;
        "e2e")
            echo -e "\n🧪 Running end-to-end tests..."
            npm run test:e2e
            ;;
        "coverage")
            echo -e "\n🧪 Running test coverage..."
            npm run test:coverage
            ;;
        *)
            echo -e "\n🧪 Running all tests..."
            npm test && npm run test:e2e
            ;;
    esac
}

# Function to handle keyboard input - with timeout and better resource management
handle_input() {
    local timeout=1  # 1 second timeout for read
    while true; do
        # Use timeout to avoid high CPU usage when idle
        if read -t $timeout -rsn1 input; then
            if [ "$input" = "r" ]; then
                rebuild_project
            elif [ "$input" = "q" ]; then
                echo "User requested exit"
                cleanup
            elif [ "$input" = "t" ]; then
                run_tests "unit"
            elif [ "$input" = "e" ]; then
                run_tests "e2e"
            elif [ "$input" = "c" ]; then
                run_tests "coverage"
            fi
        fi
        # Small sleep to prevent tight loop
        sleep 0.1
    done
}

# Run build with timeout protection
echo "🏗️  Building the application and generating sitemap..."
TIMEFORMAT='%3R seconds'
(npm run build) & BUILD_PID=$!
spinner $BUILD_PID
echo
time (npm run build) 2>&1

echo "🚀 Starting the application in development mode..."
# Load secrets before starting the application
load_secrets

echo -e "\n📋 Available commands:"
echo "  • Press 'r' to rebuild the project"
echo "  • Press 't' to run unit tests"
echo "  • Press 'e' to run end-to-end tests"
echo "  • Press 'c' to run test coverage"
echo "  • Press 'q' to quit"
echo -e "\n"

# Start the dev server in the background
(npm run dev) & DEV_PID=$!

# Start listening for keyboard input in the background with proper process management
handle_input & INPUT_PID=$!

# Wait for the dev server process
wait $DEV_PID 
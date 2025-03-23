#!/bin/bash
# Test deployment script for Renovation Bridge
# This script helps test the deployment process locally and deploy to Vercel

# Colors for better readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== Renovation Bridge Deployment Tool ===${NC}"

# Check if we're in the root directory
if [ ! -f "package.json" ]; then
  echo -e "${RED}Error: package.json not found. Please run this script from the project root.${NC}"
  exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
  echo -e "${YELLOW}Vercel CLI not found. Would you like to install it? (y/n)${NC}"
  read -r install_vercel
  if [[ $install_vercel == "y" || $install_vercel == "Y" ]]; then
    echo -e "${BLUE}Installing Vercel CLI...${NC}"
    npm install -g vercel
  else
    echo -e "${YELLOW}Skipping Vercel CLI installation. Will continue with local build only.${NC}"
  fi
fi

# Options menu
echo -e "\n${YELLOW}Select deployment option:${NC}"
echo "1) Test build locally"
echo "2) Deploy to Vercel (development)"
echo "3) Deploy to Vercel (production)"
echo "4) Configure Vercel environment variables"
read -r option

case $option in
  1)
    # Build Next.js
    echo -e "\n${YELLOW}Building Next.js application locally${NC}"
    npm run build || { echo -e "${RED}Build failed!${NC}"; exit 1; }
    
    # Validate the build
    if [ ! -d "./.next" ]; then
      echo -e "${RED}Error: ./.next directory not found. Build may have failed.${NC}"
      exit 1
    fi
    
    echo -e "\n${GREEN}Build test completed successfully!${NC}"
    echo -e "The Next.js build is ready in the ${YELLOW}./.next${NC} directory"
    echo -e "To test locally, you can run: ${GREEN}npm run start${NC}"
    ;;
    
  2)
    # Deploy to Vercel (development)
    echo -e "\n${YELLOW}Deploying to Vercel (development environment)${NC}"
    if command -v vercel &> /dev/null; then
      vercel
    else
      echo -e "${RED}Vercel CLI not installed. Please install it first with 'npm install -g vercel'.${NC}"
      exit 1
    fi
    ;;
    
  3)
    # Deploy to Vercel (production)
    echo -e "\n${YELLOW}Deploying to Vercel (production environment)${NC}"
    if command -v vercel &> /dev/null; then
      vercel --prod
    else
      echo -e "${RED}Vercel CLI not installed. Please install it first with 'npm install -g vercel'.${NC}"
      exit 1
    fi
    ;;
    
  4)
    # Configure Vercel environment variables
    echo -e "\n${YELLOW}Configuring Vercel environment variables${NC}"
    if command -v vercel &> /dev/null; then
      echo -e "${BLUE}Setting up environment variables from .env.production.local${NC}"
      if [ -f ".env.production.local" ]; then
        # Read each line from .env file and add to Vercel
        while IFS= read -r line || [ -n "$line" ]; do
          # Skip comments and empty lines
          [[ $line =~ ^#.*$ || -z $line ]] && continue
          
          # Extract key and value
          key=$(echo "$line" | cut -d= -f1)
          value=$(echo "$line" | cut -d= -f2-)
          
          echo -e "Adding environment variable: ${BLUE}$key${NC}"
          vercel env add "$key" production
        done < .env.production.local
        
        echo -e "${GREEN}Environment variables configured!${NC}"
      else
        echo -e "${RED}Error: .env.production.local not found.${NC}"
        exit 1
      fi
    else
      echo -e "${RED}Vercel CLI not installed. Please install it first with 'npm install -g vercel'.${NC}"
      exit 1
    fi
    ;;
    
  *)
    echo -e "${RED}Invalid option selected.${NC}"
    exit 1
    ;;
esac

echo -e "\n${GREEN}Deployment process completed!${NC}"
echo -e "When you push to main/master, Vercel will automatically deploy your application"
echo -e "Make sure you have connected this repository to your Vercel project at https://vercel.com/dashboard" 
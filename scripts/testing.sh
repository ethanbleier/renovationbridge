#!/bin/bash

# Colors for better readability
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}====================================${NC}"
echo -e "${BLUE}🏠 Renovation Bridge Testing Script ${NC}"
echo -e "${BLUE}====================================${NC}"

# Check if .env.local exists
if [ ! -f .env.local ]; then
  echo -e "${YELLOW}Warning: .env.local file not found.${NC}"
  echo -e "Creating .env.local from example..."
  cp .env.example .env.local
  echo -e "${GREEN}Created .env.local - please check and update values if needed.${NC}"
fi

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Check if npm is installed
if ! command_exists npm; then
  echo -e "${RED}Error: npm is not installed. Please install Node.js and npm first.${NC}"
  exit 1
fi

# Menu for testing options
echo -e "\nSelect a testing option:"
echo -e "${YELLOW}1)${NC} Start development server"
echo -e "${YELLOW}2)${NC} Run linting"
echo -e "${YELLOW}3)${NC} Run unit tests"
echo -e "${YELLOW}4)${NC} Run end-to-end tests"
echo -e "${YELLOW}5)${NC} Run all tests"
echo -e "${YELLOW}q)${NC} Quit"

read -p "Enter your choice: " choice

case $choice in
  1)
    echo -e "\n${GREEN}Starting development server...${NC}"
    npm run dev
    ;;
  2)
    echo -e "\n${GREEN}Running linting...${NC}"
    npm run lint
    ;;
  3)
    echo -e "\n${GREEN}Running unit tests...${NC}"
    npm test
    ;;
  4)
    echo -e "\n${GREEN}Running end-to-end tests...${NC}"
    npm run test:e2e
    ;;
  5)
    echo -e "\n${GREEN}Running all tests...${NC}"
    echo -e "\n${YELLOW}Running linting...${NC}"
    npm run lint
    
    echo -e "\n${YELLOW}Running unit tests...${NC}"
    npm test
    
    echo -e "\n${YELLOW}Running end-to-end tests...${NC}"
    npm run test:e2e
    ;;
  q)
    echo -e "\n${GREEN}Exiting...${NC}"
    exit 0
    ;;
  *)
    echo -e "\n${RED}Invalid option${NC}"
    exit 1
    ;;
esac 
#!/bin/bash

# Blockchain Wallet Verification - Setup Script
# This script helps you set up the project quickly

echo "🚀 Setting up Blockchain Wallet Verification System..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
echo -e "${BLUE}Checking Node.js installation...${NC}"
if ! command -v node &> /dev/null
then
    echo -e "${YELLOW}❌ Node.js is not installed. Please install Node.js v16 or higher.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js $(node -v) found${NC}"
echo ""

# Install root dependencies
echo -e "${BLUE}📦 Installing backend dependencies...${NC}"
npm install
echo -e "${GREEN}✅ Backend dependencies installed${NC}"
echo ""

# Install frontend dependencies
echo -e "${BLUE}📦 Installing frontend dependencies...${NC}"
cd frontend
npm install
cd ..
echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
echo ""

# Install contract dependencies
echo -e "${BLUE}📦 Installing smart contract dependencies...${NC}"
cd contracts
npm install
cd ..
echo -e "${GREEN}✅ Smart contract dependencies installed${NC}"
echo ""

# Check for .env file
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  .env file not found${NC}"
    echo -e "${BLUE}Creating .env from template...${NC}"
    cp env.template .env
    echo -e "${GREEN}✅ .env file created${NC}"
    echo -e "${YELLOW}⚠️  Please edit .env and add your configuration${NC}"
else
    echo -e "${GREEN}✅ .env file exists${NC}"
fi
echo ""

# Check for frontend .env
if [ ! -f frontend/.env ]; then
    echo -e "${YELLOW}⚠️  frontend/.env file not found${NC}"
    echo -e "${BLUE}Creating frontend/.env from template...${NC}"
    cp frontend/env.example frontend/.env 2>/dev/null || echo "REACT_APP_CONTRACT_ADDRESS=0x..." > frontend/.env
    echo -e "${GREEN}✅ frontend/.env file created${NC}"
    echo -e "${YELLOW}⚠️  Please edit frontend/.env and add CONTRACT_ADDRESS after deployment${NC}"
else
    echo -e "${GREEN}✅ frontend/.env file exists${NC}"
fi
echo ""

# Final instructions
echo -e "${GREEN}🎉 Setup complete!${NC}"
echo ""
echo -e "${BLUE}📝 Next steps:${NC}"
echo "1. Edit .env file with your MongoDB URI and other configs"
echo "2. Get test MATIC from https://faucet.polygon.technology/"
echo "3. Deploy smart contract:"
echo -e "   ${YELLOW}cd contracts && npx hardhat compile && npx hardhat run scripts/deploy.js --network polygonAmoy${NC}"
echo "4. Update CONTRACT_ADDRESS in .env and frontend/.env"
echo "5. Start backend: ${YELLOW}npm run dev${NC}"
echo "6. Start frontend: ${YELLOW}cd frontend && npm start${NC}"
echo ""
echo -e "${BLUE}📚 For detailed instructions, see:${NC}"
echo "   - QUICKSTART.md for quick setup"
echo "   - README.md for full documentation"
echo "   - DEPLOYMENT_GUIDE.md for deployment"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"








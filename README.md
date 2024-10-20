# Button Up Your Donations: The Game of Giving!

An interactive app that transforms voting and funding into a game using IoT and blockchain technology.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Demo](#demo)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Smart Contract](#smart-contract)
- [Future Development](#future-development)
- [Problem We're Solving](#problem-were-solving)
- [Contributing](#contributing)
- [Contact](#contact)

## About

Button Up Your Donations is a revolutionary approach to fundraising and project voting. By gamifying the donation process, we aim to increase participation and make funding more enjoyable for everyone involved. Our platform transforms the often tedious process of fundraising into an exciting, interactive experience.

## Features

- **Interactive Big Button Interface**: Users press a real (virtual for now) big button to donate.
- **Blockchain-Based Voting**: Secure and transparent voting system.
- **Quadratic Voting**: Ensures fair allocation of funds to projects.
- **Visual Feedback**: The button lights up and changes color with each press.
- **Donation Amount**: 0.1 ETH per press.
- **Hands-On Experience**: Makes funding projects fun and encourages more participation.
- **Quadratic Funding**: Even a small voice can make a big impact!

## Demo

Experience the game of giving: [https://based-hackathon.vercel.app/](https://based-hackathon.vercel.app/)

## Technology Stack

- **Frontend**:
  - React
  - useDAPP (for Ethereum interactions)
  - TailwindCSS (for styling)
- **Smart Contracts**:
  - Solidity
- **Development Environment**:
  - Hardhat
- **Blockchain**:
  - Base (Sepolia testnet)

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn
- MetaMask or another Web3 wallet

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/your-username/button-up-donations.git
   ```

2. Navigate to the project directory:

   ```
   cd button-up-donations
   ```

3. Install dependencies:

   ```
   npm install
   ```

   or

   ```
   yarn install
   ```

4. Create a `.env` file in the root directory and add your environment variables:

   ```
   REACT_APP_RPC_URL=your_rpc_url
   REACT_APP_CONTRACT_ADDRESS=your_contract_address
   ```

5. Start the development server:
   ```
   npm start
   ```
   or
   ```
   yarn start
   ```

## Usage

1. Connect your Web3 wallet to the app.
2. Press the big button to make a donation (0.0001 ETH per press).
3. Watch the button change colors as you donate more!
4. Your donations will be used to vote on and fund projects using quadratic voting.

## Smart Contract

Our smart contract is deployed and verified on the Base Sepolia testnet:

[0x6081251E41fC8E0153B9125Bd9d7761542d11799](https://sepolia.basescan.org/address/0x6081251E41fC8E0153B9125Bd9d7761542d11799#code)

## Future Development

- Integration with physical IoT buttons for a truly hands-on experience.
- Expansion to multiple blockchain networks.
- Mobile app development for on-the-go donations.

## Problem We're Solving

1. **Trust Issues in Startup Funding**: By leveraging blockchain technology, we provide a transparent and secure platform for fundraising, addressing the skepticism caused by online frauds.

2. **Identifying Preferences for Public Goods**: Our quadratic voting system ensures that funds are allocated fairly, reflecting the true preferences of the community.

3. **Boring Fundraising Process**: By gamifying donations and utilizing IoT concepts, we're making fundraising fun and engaging, playing with investors' emotions in a positive way.

## Contributing

We welcome contributions to improve and expand this project! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please make sure to update tests as appropriate and adhere to the [Contributor Covenant](https://www.contributor-covenant.org/) code of conduct.

## Contact

Project Link: (https://github.com/goodbyeO0/based-hackathon)

Developer: [Muhammad Izhan Zikry Mohd Hamdani] - Kuala Lumpur, Malaysia

Feel free to reach out if you have any questions or suggestions!

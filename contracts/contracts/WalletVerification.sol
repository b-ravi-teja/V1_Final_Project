// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title WalletVerification
 * @dev Smart contract for storing wallet address to IPFS hash mappings
 * Deploy on Polygon Amoy testnet
 */
contract WalletVerification {
    
    // Mapping from wallet address to IPFS hash
    mapping(address => string) private walletToHash;
    
    // Event emitted when a new hash is stored
    event HashStored(address indexed walletAddress, string ipfsHash, uint256 timestamp);
    
    // Event emitted when a hash is updated
    event HashUpdated(address indexed walletAddress, string oldHash, string newHash, uint256 timestamp);
    
    // Owner of the contract
    address public owner;
    
    // Constructor sets the contract deployer as owner
    constructor() {
        owner = msg.sender;
    }
    
    // Modifier to check if caller is owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    /**
     * @dev Store or update IPFS hash for a wallet address
     * @param walletAddress The Ethereum wallet address
     * @param ipfsHash The IPFS hash containing user details
     */
    function setHash(address walletAddress, string memory ipfsHash) public {
        require(walletAddress != address(0), "Invalid wallet address");
        require(bytes(ipfsHash).length > 0, "IPFS hash cannot be empty");
        
        string memory oldHash = walletToHash[walletAddress];
        
        // Store the hash
        walletToHash[walletAddress] = ipfsHash;
        
        // Emit appropriate event
        if (bytes(oldHash).length == 0) {
            emit HashStored(walletAddress, ipfsHash, block.timestamp);
        } else {
            emit HashUpdated(walletAddress, oldHash, ipfsHash, block.timestamp);
        }
    }
    
    /**
     * @dev Retrieve IPFS hash for a wallet address
     * @param walletAddress The Ethereum wallet address to query
     * @return The IPFS hash associated with the wallet address
     */
    function getHash(address walletAddress) public view returns (string memory) {
        return walletToHash[walletAddress];
    }
    
    /**
     * @dev Check if a wallet address has a hash stored
     * @param walletAddress The Ethereum wallet address to check
     * @return Boolean indicating if hash exists
     */
    function hasHash(address walletAddress) public view returns (bool) {
        return bytes(walletToHash[walletAddress]).length > 0;
    }
    
    /**
     * @dev Transfer ownership of the contract
     * @param newOwner Address of the new owner
     */
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Invalid new owner address");
        owner = newOwner;
    }
}



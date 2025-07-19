import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import useCharacterStore from '../store/characterStore';

const { FiLink, FiDollarSign, FiShield, FiTrendingUp, FiUsers, FiZap, FiAward, FiGlobe } = FiIcons;

const Blockchain = () => {
  const { savedCharacters } = useCharacterStore();
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = () => {
    // Simulate wallet connection
    setIsConnected(true);
    alert('Wallet connected successfully!');
  };

  const mintCharacter = (character) => {
    if (!isConnected) {
      alert('Please connect your wallet first!');
      return;
    }
    // Simulate minting process
    alert(`Minting ${character.name} as NFT...`);
  };

  const blockchainFeatures = [
    {
      icon: FiShield,
      title: 'True Ownership',
      description: 'Your characters are truly yours, secured on the blockchain'
    },
    {
      icon: FiTrendingUp,
      title: 'Value Growth',
      description: 'Rare characters can increase in value over time'
    },
    {
      icon: FiUsers,
      title: 'Cross-Game Compatible',
      description: 'Use your characters across multiple games in our ecosystem'
    },
    {
      icon: FiZap,
      title: 'Fast Transactions',
      description: 'Lightning-fast minting and trading on optimized networks'
    }
  ];

  const marketplaceStats = [
    { label: 'Total Volume', value: '1,234.5 ETH', icon: FiDollarSign, color: 'text-neon-green' },
    { label: 'Characters Minted', value: '12,847', icon: FiAward, color: 'text-neon-blue' },
    { label: 'Active Traders', value: '3,421', icon: FiUsers, color: 'text-neon-purple' },
    { label: 'Floor Price', value: '0.05 ETH', icon: FiTrendingUp, color: 'text-neon-pink' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative z-10 min-h-screen py-8"
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-cyber font-bold text-white mb-4 neon-text">
            Blockchain Integration
          </h1>
          <p className="text-xl text-gray-300 font-gaming">
            Mint, trade, and own your characters as NFTs
          </p>
        </motion.div>

        {/* Wallet Connection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-xl p-6 mb-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-gaming font-bold text-white mb-2">
                Wallet Status
              </h2>
              <p className="text-gray-300">
                {isConnected 
                  ? 'Connected to 0x1234...5678' 
                  : 'Connect your wallet to start minting NFTs'
                }
              </p>
            </div>
            
            <button
              onClick={connectWallet}
              disabled={isConnected}
              className={`px-8 py-3 rounded-lg font-gaming font-semibold transition-all duration-300 ${
                isConnected
                  ? 'bg-neon-green/20 text-neon-green border-2 border-neon-green cursor-not-allowed'
                  : 'bg-gradient-to-r from-neon-blue to-neon-purple text-white hover:scale-105'
              }`}
            >
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiLink} className="w-5 h-5" />
                <span>{isConnected ? 'Connected' : 'Connect Wallet'}</span>
              </div>
            </button>
          </div>
        </motion.div>

        {/* Marketplace Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {marketplaceStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="glass-effect rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300"
            >
              <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-current to-current/50 rounded-lg flex items-center justify-center ${stat.color}`}>
                <SafeIcon icon={stat.icon} className="w-6 h-6" />
              </div>
              <div className={`text-2xl font-bold mb-1 ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-gray-300 text-sm font-gaming">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Character Minting */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-cyber font-bold text-white mb-6">
              Mint Your Characters
            </h2>
            
            {savedCharacters.length === 0 ? (
              <div className="glass-effect rounded-xl p-8 text-center">
                <SafeIcon icon={FiUsers} className="w-16 h-16 text-neon-blue mx-auto mb-4" />
                <p className="text-gray-300 mb-4">No characters to mint yet.</p>
                <a
                  href="#/create"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg text-white font-gaming font-semibold hover:scale-105 transition-all duration-300"
                >
                  <SafeIcon icon={FiZap} className="w-5 h-5" />
                  <span>Create Character</span>
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {savedCharacters.map((character, index) => (
                  <motion.div
                    key={character.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="glass-effect rounded-lg p-4 hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-lg flex items-center justify-center border border-neon-blue/30">
                          <span className="text-lg">
                            {character.race === 'elf' ? '🧝' : 
                             character.race === 'dwarf' ? '🧔' : 
                             character.race === 'orc' ? '👹' : '👤'}
                          </span>
                        </div>
                        
                        <div>
                          <h3 className="text-white font-gaming font-semibold">
                            {character.name || 'Unnamed Hero'}
                          </h3>
                          <p className="text-gray-400 text-sm capitalize">
                            {character.race} {character.class}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <div className="text-neon-blue font-bold">0.05 ETH</div>
                          <div className="text-gray-400 text-xs">Mint Price</div>
                        </div>
                        
                        <button
                          onClick={() => mintCharacter(character)}
                          className="px-6 py-2 bg-gradient-to-r from-neon-green to-neon-blue rounded-lg text-white font-gaming font-semibold hover:scale-105 transition-all duration-300"
                        >
                          Mint NFT
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Blockchain Features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-2xl font-cyber font-bold text-white mb-6">
              Why Blockchain Gaming?
            </h2>
            
            <div className="space-y-6">
              {blockchainFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="glass-effect rounded-lg p-6 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg flex items-center justify-center flex-shrink-0">
                      <SafeIcon icon={feature.icon} className="w-6 h-6 text-white" />
                    </div>
                    
                    <div>
                      <h3 className="text-white font-gaming font-semibold text-lg mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Marketplace Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="mt-8 glass-effect rounded-xl p-6 text-center border border-neon-blue/30"
            >
              <SafeIcon icon={FiGlobe} className="w-12 h-12 text-neon-blue mx-auto mb-4" />
              <h3 className="text-xl font-gaming font-bold text-white mb-2">
                Visit Our Marketplace
              </h3>
              <p className="text-gray-300 mb-4">
                Trade characters with other players worldwide
              </p>
              <button className="px-8 py-3 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg text-white font-gaming font-semibold hover:scale-105 transition-all duration-300">
                Open Marketplace
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Blockchain;
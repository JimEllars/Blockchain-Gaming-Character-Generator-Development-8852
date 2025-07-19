import React from 'react';
import { motion } from 'framer-motion';
import useCharacterStore from '../../store/characterStore';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiUser, FiShirt } = FiIcons;

const BasicInfo = () => {
  const { currentCharacter, updateCharacter } = useCharacterStore();

  const characterTypes = [
    { id: 'human', name: 'Human', description: 'A regular human chibi character' },
    { id: 'animal', name: 'Animal', description: 'A cute animal-inspired chibi' },
    { id: 'fantasy', name: 'Fantasy', description: 'A whimsical fantasy-inspired chibi' },
    { id: 'robot', name: 'Robot', description: 'A cute mechanical chibi character' }
  ];
  
  const outfitTypes = [
    { id: 'casual', name: 'Casual', description: 'Everyday comfortable clothing' },
    { id: 'fancy', name: 'Fancy', description: 'Elegant and dressed up outfit' },
    { id: 'sporty', name: 'Sporty', description: 'Athletic and active wear' },
    { id: 'pajamas', name: 'Pajamas', description: 'Cozy sleepwear outfit' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h3 className="text-2xl font-cute font-bold text-lavender-dark mb-6">Basic Information</h3>
        
        {/* Character Name */}
        <div className="mb-6">
          <label className="block text-lavender-dark font-cute font-semibold mb-2 flex items-center">
            <SafeIcon icon={FiUser} className="mr-2 w-5 h-5" />
            Character Name
          </label>
          <input
            type="text"
            value={currentCharacter.name}
            onChange={(e) => updateCharacter({ name: e.target.value })}
            placeholder="Enter character name..."
            className="w-full px-4 py-3 bg-white border-2 border-pastel-pink/50 rounded-xl text-lavender-dark placeholder-gray-400 focus:border-lavender focus:outline-none transition-all duration-300"
          />
        </div>

        {/* Character Type Selection */}
        <div className="mb-6">
          <label className="block text-lavender-dark font-cute font-semibold mb-4 flex items-center">
            <SafeIcon icon={FiUser} className="mr-2 w-5 h-5" />
            Choose Character Type
          </label>
          <div className="grid sm:grid-cols-2 gap-4">
            {characterTypes.map((type) => (
              <motion.button
                key={type.id}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => updateCharacter({ type: type.id })}
                className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                  currentCharacter.type === type.id
                    ? 'border-lavender bg-lavender/10 text-lavender-dark shadow-md'
                    : 'border-gray-200 bg-white text-gray-500 hover:border-lavender/50'
                }`}
              >
                <h4 className="font-cute font-semibold text-lg mb-1">{type.name}</h4>
                <p className="text-sm opacity-80">{type.description}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Outfit Selection */}
        <div>
          <label className="block text-lavender-dark font-cute font-semibold mb-4 flex items-center">
            <SafeIcon icon={FiShirt} className="mr-2 w-5 h-5" />
            Choose Outfit Style
          </label>
          <div className="grid sm:grid-cols-2 gap-4">
            {outfitTypes.map((outfit) => (
              <motion.button
                key={outfit.id}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => updateCharacter({ outfit: outfit.id })}
                className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                  currentCharacter.outfit === outfit.id
                    ? 'border-pastel-pink bg-pastel-pink/10 text-lavender-dark shadow-md'
                    : 'border-gray-200 bg-white text-gray-500 hover:border-pastel-pink/50'
                }`}
              >
                <h4 className="font-cute font-semibold text-lg mb-1">{outfit.name}</h4>
                <p className="text-sm opacity-80">{outfit.description}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Preview of choices */}
      <div className="p-4 bg-pastel-yellow/20 rounded-xl border-2 border-pastel-yellow mt-6">
        <h4 className="text-mint-dark font-cute font-semibold mb-2">Current Selection</h4>
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Character Type:</span>
            <span className="text-lavender-dark font-medium capitalize">{currentCharacter.type}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Outfit Style:</span>
            <span className="text-lavender-dark font-medium capitalize">{currentCharacter.outfit}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BasicInfo;
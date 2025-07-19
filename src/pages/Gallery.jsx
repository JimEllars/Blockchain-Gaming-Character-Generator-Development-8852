import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import useCharacterStore from '../store/characterStore';
import { Link } from 'react-router-dom';

const { FiUser, FiEdit3, FiTrash2, FiDownload, FiImage, FiHeart } = FiIcons;

const Gallery = () => {
  const { savedCharacters, loadCharacter } = useCharacterStore();

  const handleLoadCharacter = (character) => {
    loadCharacter(character);
    alert('Character loaded! Go to Create tab to edit.');
  };

  const CharacterCard = ({ character, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-3xl p-5 border-4 border-pastel-blue/30 shadow-md hover:shadow-xl transition-all duration-300 group"
    >
      {/* Character Avatar */}
      <div className="w-32 h-32 mx-auto mb-4 bg-pastel-pink/10 rounded-full flex items-center justify-center border-4 border-pastel-pink relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-5xl">
            {character.type === 'animal' ? '🐱' : 
             character.type === 'fantasy' ? '✨' : 
             character.type === 'robot' ? '🤖' : '👧'}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-pastel-blue/20 to-transparent"></div>
      </div>

      {/* Character Info */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-cute font-bold text-lavender-dark mb-1">
          {character.name || 'Unnamed Friend'}
        </h3>
        <p className="text-mint-dark capitalize font-cute text-sm">
          {character.type} in {character.outfit} outfit
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
        <div className="bg-pastel-yellow/20 rounded-lg p-2 text-center">
          <div className="text-lavender-dark capitalize">{character.appearance.hairColor}</div>
          <div className="text-gray-400">Hair</div>
        </div>
        <div className="bg-pastel-pink/20 rounded-lg p-2 text-center">
          <div className="text-lavender-dark capitalize">{character.appearance.eyeColor}</div>
          <div className="text-gray-400">Eyes</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => handleLoadCharacter(character)}
          className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-gradient-to-r from-lavender to-pastel-blue rounded-lg text-white font-cute text-sm hover:shadow-md transition-all duration-300"
        >
          <SafeIcon icon={FiEdit3} className="w-4 h-4" />
          <span>Edit</span>
        </button>
        <button
          className="px-3 py-2 border border-pastel-pink/50 rounded-lg text-pastel-pink hover:bg-pastel-pink/10 transition-all duration-300"
        >
          <SafeIcon icon={FiHeart} className="w-4 h-4" />
        </button>
        <button
          className="px-3 py-2 border border-gray-300 rounded-lg text-gray-400 hover:border-red-300 hover:text-red-400 transition-all duration-300"
        >
          <SafeIcon icon={FiTrash2} className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );

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
          <h1 className="text-4xl md:text-5xl font-cute font-bold text-lavender-dark mb-4">
            Character Gallery
          </h1>
          <p className="text-xl text-mint-dark font-cute">
            Your collection of cute friends!
          </p>
        </motion.div>

        {savedCharacters.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-32 h-32 mx-auto mb-8 bg-pastel-pink/20 rounded-full flex items-center justify-center border-4 border-pastel-pink/50">
              <SafeIcon icon={FiImage} className="w-16 h-16 text-pastel-pink" />
            </div>
            <h2 className="text-2xl font-cute font-bold text-lavender-dark mb-4">
              No Characters Yet
            </h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Start creating your first character and build your adorable collection!
            </p>
            <Link
              to="/create"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-lavender to-pastel-pink rounded-xl font-cute font-semibold text-white hover:shadow-lg transition-all duration-300"
            >
              <SafeIcon icon={FiUser} className="w-5 h-5" />
              <span>Create Character</span>
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Stats Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            >
              <div className="bg-white rounded-2xl p-6 text-center border-4 border-pastel-blue/30 shadow-md">
                <div className="text-3xl font-bold text-lavender mb-2">{savedCharacters.length}</div>
                <div className="text-mint-dark font-cute">Total Characters</div>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center border-4 border-pastel-pink/30 shadow-md">
                <div className="text-3xl font-bold text-pastel-pink mb-2">
                  {savedCharacters.reduce((sum, c) => sum + c.customizations.drawings.length, 0)}
                </div>
                <div className="text-mint-dark font-cute">Drawings Added</div>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center border-4 border-pastel-yellow/30 shadow-md">
                <div className="text-3xl font-bold text-pastel-yellow mb-2">
                  {savedCharacters.reduce((sum, c) => sum + c.customizations.stickers.length, 0)}
                </div>
                <div className="text-mint-dark font-cute">Stickers Used</div>
              </div>
            </motion.div>

            {/* Character Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {savedCharacters.map((character, index) => (
                <CharacterCard key={character.id || index} character={character} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Gallery;
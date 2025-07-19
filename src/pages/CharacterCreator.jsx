import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CharacterPreview from '../components/CharacterPreview';
import BasicInfo from '../components/creator/BasicInfo';
import Appearance from '../components/creator/Appearance';
import Features from '../components/creator/Features';
import Colors from '../components/creator/Colors';
import Drawing from '../components/creator/Drawing';
import CreatorTabs from '../components/creator/CreatorTabs';
import useCharacterStore from '../store/characterStore';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiSave, FiRefreshCw } = FiIcons;

const CharacterCreator = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const { currentCharacter, saveCharacter, resetCharacter } = useCharacterStore();

  const handleSave = () => {
    if (currentCharacter.name.trim()) {
      saveCharacter();
      alert('Character saved successfully!');
    } else {
      alert('Please enter a character name first.');
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset your character?')) {
      resetCharacter();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative z-10 min-h-screen py-8"
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-cute font-bold text-lavender-dark text-center mb-8"
        >
          Character Creator
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Character Preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <CharacterPreview character={currentCharacter} />
          </motion.div>

          {/* Creator Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 space-y-6"
          >
            <CreatorTabs activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="bg-white rounded-3xl p-6 min-h-[500px] border-4 border-pastel-pink/50 shadow-lg">
              <AnimatePresence mode="wait">
                {activeTab === 'basic' && (
                  <motion.div
                    key="basic"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <BasicInfo />
                  </motion.div>
                )}
                {activeTab === 'appearance' && (
                  <motion.div
                    key="appearance"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Appearance />
                  </motion.div>
                )}
                {activeTab === 'features' && (
                  <motion.div
                    key="features"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Features />
                  </motion.div>
                )}
                {activeTab === 'colors' && (
                  <motion.div
                    key="colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Colors />
                  </motion.div>
                )}
                {activeTab === 'drawing' && (
                  <motion.div
                    key="drawing"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Drawing />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className="px-8 py-3 bg-gradient-to-r from-lavender to-pastel-pink rounded-xl font-cute font-semibold text-white hover:shadow-lg hover:shadow-lavender/25 transition-all duration-300 flex items-center"
              >
                <SafeIcon icon={FiSave} className="mr-2 w-5 h-5" />
                <span>Save Character</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="px-8 py-3 border-2 border-gray-300 rounded-xl font-cute font-semibold text-gray-500 hover:border-red-300 hover:text-red-500 transition-all duration-300 flex items-center"
              >
                <SafeIcon icon={FiRefreshCw} className="mr-2 w-5 h-5" />
                <span>Reset</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CharacterCreator;
import React from 'react';
import { motion } from 'framer-motion';
import useCharacterStore from '../../store/characterStore';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiSmile, FiHeart, FiEye, FiMeh } = FiIcons;

const Features = () => {
  const { currentCharacter, updateFeatures } = useCharacterStore();

  const featureOptions = {
    smile: [
      { id: 'happy', name: 'Happy Smile' },
      { id: 'cat', name: 'Cat Smile' },
      { id: 'surprised', name: 'Surprised' },
      { id: 'shy', name: 'Shy' },
      { id: 'smirk', name: 'Smirk' }
    ],
    blush: [
      { id: 'none', name: 'None' },
      { id: 'light', name: 'Light Blush' },
      { id: 'medium', name: 'Medium Blush' },
      { id: 'heavy', name: 'Heavy Blush' }
    ],
    eyes: [
      { id: 'round', name: 'Round Eyes' },
      { id: 'sleepy', name: 'Sleepy Eyes' },
      { id: 'star', name: 'Star Eyes' },
      { id: 'heart', name: 'Heart Eyes' },
      { id: 'wink', name: 'Winking' }
    ],
    expression: [
      { id: 'cheerful', name: 'Cheerful' },
      { id: 'calm', name: 'Calm' },
      { id: 'excited', name: 'Excited' },
      { id: 'shy', name: 'Shy' },
      { id: 'mischievous', name: 'Mischievous' }
    ]
  };

  const FeatureSelector = ({ label, value, options, onChange, icon }) => (
    <div className="mb-6">
      <label className="block text-lavender-dark font-cute font-semibold mb-3 capitalize flex items-center">
        <SafeIcon icon={icon} className="mr-2 w-5 h-5" />
        {label}
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {options.map((option) => (
          <motion.button
            key={option.id}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(option.id)}
            className={`p-3 rounded-xl border-2 transition-all duration-300 ${
              value === option.id
                ? 'border-pastel-pink bg-pastel-pink/10 text-lavender-dark shadow-md'
                : 'border-gray-200 bg-white text-gray-500 hover:border-pastel-pink/50'
            }`}
          >
            <span className="capitalize font-cute text-sm">{option.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
  
  // Emojis for the preview section
  const getExpressionEmoji = (expression) => {
    switch(expression) {
      case 'cheerful': return '😊';
      case 'calm': return '😌';
      case 'excited': return '😃';
      case 'shy': return '😳';
      case 'mischievous': return '😏';
      default: return '😊';
    }
  };
  
  const getSmileEmoji = (smile) => {
    switch(smile) {
      case 'happy': return '😄';
      case 'cat': return '😸';
      case 'surprised': return '😮';
      case 'shy': return '🙂';
      case 'smirk': return '😏';
      default: return '😄';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h3 className="text-2xl font-cute font-bold text-lavender-dark mb-6">
        Facial Features
      </h3>

      <FeatureSelector
        label="Smile Style"
        value={currentCharacter.features.smile}
        options={featureOptions.smile}
        onChange={(smile) => updateFeatures({ smile })}
        icon={FiSmile}
      />

      <FeatureSelector
        label="Blush"
        value={currentCharacter.features.blush}
        options={featureOptions.blush}
        onChange={(blush) => updateFeatures({ blush })}
        icon={FiHeart}
      />

      <FeatureSelector
        label="Eye Style"
        value={currentCharacter.features.eyes}
        options={featureOptions.eyes}
        onChange={(eyes) => updateFeatures({ eyes })}
        icon={FiEye}
      />

      <FeatureSelector
        label="Expression"
        value={currentCharacter.features.expression}
        options={featureOptions.expression}
        onChange={(expression) => updateFeatures({ expression })}
        icon={FiMeh}
      />

      {/* Preview Section */}
      <div className="mt-8 p-6 bg-pastel-blue/10 rounded-xl">
        <h4 className="text-lavender-dark font-cute font-semibold mb-4">Expression Preview</h4>
        
        <div className="flex justify-center mb-6">
          <div className="text-5xl">
            {getExpressionEmoji(currentCharacter.features.expression)}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Smile:</span>
            <div className="flex items-center">
              <span className="text-lavender-dark capitalize mr-2">{currentCharacter.features.smile}</span>
              <span className="text-xl">{getSmileEmoji(currentCharacter.features.smile)}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Blush:</span>
            <span className="text-lavender-dark capitalize">{currentCharacter.features.blush}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Eyes:</span>
            <span className="text-lavender-dark capitalize">{currentCharacter.features.eyes}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Expression:</span>
            <span className="text-lavender-dark capitalize">{currentCharacter.features.expression}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Features;
import React from 'react';
import { motion } from 'framer-motion';
import useCharacterStore from '../../store/characterStore';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiEye, FiDroplet, FiSmile, FiScissors } = FiIcons;

const Appearance = () => {
  const { currentCharacter, updateAppearance } = useCharacterStore();

  const appearanceOptions = {
    skinTone: [
      { id: 'fair', name: 'Fair', color: '#FFE5D9' },
      { id: 'tan', name: 'Tan', color: '#F5D0A9' },
      { id: 'brown', name: 'Brown', color: '#D4A76A' },
      { id: 'dark', name: 'Dark', color: '#8D6E63' },
      { id: 'olive', name: 'Olive', color: '#CCC9A1' },
      { id: 'pink', name: 'Pink', color: '#FFCFD2' },
    ],
    hairColor: [
      { id: 'brown', name: 'Brown', color: '#8B4513' },
      { id: 'black', name: 'Black', color: '#36454F' },
      { id: 'blonde', name: 'Blonde', color: '#FFF8DC' },
      { id: 'red', name: 'Red', color: '#FF6B6B' },
      { id: 'pink', name: 'Pink', color: '#FFBAD2' },
      { id: 'blue', name: 'Blue', color: '#A8D8F0' },
      { id: 'purple', name: 'Purple', color: '#D8BFD8' },
      { id: 'green', name: 'Green', color: '#98FB98' },
      { id: 'white', name: 'White', color: '#F5F5F5' },
      { id: 'orange', name: 'Orange', color: '#FFBB77' },
    ],
    hairStyle: [
      { id: 'bob', name: 'Bob Cut' },
      { id: 'ponytail', name: 'Ponytail' },
      { id: 'pigtails', name: 'Pigtails' },
      { id: 'curly', name: 'Curly' },
      { id: 'long', name: 'Long' },
      { id: 'short', name: 'Short' },
    ],
    eyeColor: [
      { id: 'blue', name: 'Blue', color: '#87CEEB' },
      { id: 'brown', name: 'Brown', color: '#8B4513' },
      { id: 'green', name: 'Green', color: '#98FB98' },
      { id: 'purple', name: 'Purple', color: '#D8BFD8' },
      { id: 'pink', name: 'Pink', color: '#FFBAD2' },
      { id: 'amber', name: 'Amber', color: '#FFBF00' },
      { id: 'gray', name: 'Gray', color: '#D3D3D3' },
      { id: 'black', name: 'Black', color: '#36454F' },
    ],
    accessory: [
      { id: 'none', name: 'None' },
      { id: 'hat', name: 'Cute Hat' },
      { id: 'bow', name: 'Hair Bow' },
      { id: 'glasses', name: 'Glasses' },
      { id: 'flower', name: 'Flower' },
    ],
  };

  const ColorSelector = ({ label, value, options, onChange, icon }) => (
    <div className="mb-6">
      <label className="block text-lavender-dark font-cute font-semibold mb-3 capitalize flex items-center">
        <SafeIcon icon={icon} className="mr-2 w-5 h-5" />
        {label}
      </label>
      <div className="grid grid-cols-5 gap-3">
        {options.map((option) => (
          <motion.button
            key={option.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(option.id)}
            className={`p-2 rounded-full border-2 transition-all duration-300 ${
              value === option.id
                ? 'border-lavender shadow-md'
                : 'border-gray-200 hover:border-lavender/50'
            }`}
            style={{ backgroundColor: option.color }}
            aria-label={option.name}
            title={option.name}
          >
            {value === option.id && (
              <div className="flex justify-center">
                <span className="text-white text-xs bg-lavender/70 px-2 py-0.5 rounded-full shadow-sm">
                  {option.name}
                </span>
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );

  const OptionSelector = ({ label, value, options, onChange, icon }) => (
    <div className="mb-6">
      <label className="block text-lavender-dark font-cute font-semibold mb-3 capitalize flex items-center">
        <SafeIcon icon={icon} className="mr-2 w-5 h-5" />
        {label}
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {options.map((option) => (
          <motion.button
            key={option.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(option.id)}
            className={`p-3 rounded-xl border-2 transition-all duration-300 ${
              value === option.id
                ? 'border-lavender bg-lavender/10 text-lavender-dark shadow-md'
                : 'border-gray-200 bg-white text-gray-500 hover:border-lavender/50'
            }`}
          >
            <div className="flex items-center space-x-2">
              {option.color && (
                <div
                  className="w-4 h-4 rounded-full border border-white/30"
                  style={{ backgroundColor: option.color }}
                />
              )}
              <span className="capitalize font-cute text-sm">{option.name}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h3 className="text-2xl font-cute font-bold text-lavender-dark mb-6">
        Appearance Customization
      </h3>

      <ColorSelector
        label="Skin Tone"
        value={currentCharacter.appearance.skinTone}
        options={appearanceOptions.skinTone}
        onChange={(skinTone) => updateAppearance({ skinTone })}
        icon={FiDroplet}
      />

      <ColorSelector
        label="Hair Color"
        value={currentCharacter.appearance.hairColor}
        options={appearanceOptions.hairColor}
        onChange={(hairColor) => updateAppearance({ hairColor })}
        icon={FiDroplet}
      />

      <OptionSelector
        label="Hair Style"
        value={currentCharacter.appearance.hairStyle}
        options={appearanceOptions.hairStyle}
        onChange={(hairStyle) => updateAppearance({ hairStyle })}
        icon={FiScissors}
      />

      <ColorSelector
        label="Eye Color"
        value={currentCharacter.appearance.eyeColor}
        options={appearanceOptions.eyeColor}
        onChange={(eyeColor) => updateAppearance({ eyeColor })}
        icon={FiEye}
      />

      <OptionSelector
        label="Accessory"
        value={currentCharacter.appearance.accessory}
        options={appearanceOptions.accessory}
        onChange={(accessory) => updateAppearance({ accessory })}
        icon={FiSmile}
      />

      {/* Preview Section */}
      <div className="mt-8 p-6 bg-lavender/10 rounded-xl">
        <h4 className="text-lavender-dark font-cute font-semibold mb-4">Current Appearance</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Skin:</span>
            <span className="text-lavender-dark capitalize">{currentCharacter.appearance.skinTone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Hair:</span>
            <span className="text-lavender-dark capitalize">{currentCharacter.appearance.hairColor}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Style:</span>
            <span className="text-lavender-dark capitalize">{currentCharacter.appearance.hairStyle}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Eyes:</span>
            <span className="text-lavender-dark capitalize">{currentCharacter.appearance.eyeColor}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Accessory:</span>
            <span className="text-lavender-dark capitalize">{currentCharacter.appearance.accessory}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Appearance;
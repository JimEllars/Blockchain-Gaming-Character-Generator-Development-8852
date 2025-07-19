import React from 'react';
import { motion } from 'framer-motion';
import useCharacterStore from '../../store/characterStore';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiDroplet, FiStar, FiCircle } = FiIcons;

const Colors = () => {
  const { currentCharacter, updateColors } = useCharacterStore();
  
  const colorPalettes = [
    {
      name: 'Pastel Dream',
      primary: '#FFFFFF',
      secondary: '#E6E6FA',
      accent: '#98FB98',
      outline: '#9370DB'
    },
    {
      name: 'Strawberry Ice',
      primary: '#FFF0F5',
      secondary: '#FFB6C1',
      accent: '#FF69B4',
      outline: '#DB7093'
    },
    {
      name: 'Ocean Breeze',
      primary: '#F0FFFF',
      secondary: '#B0E0E6',
      accent: '#87CEEB',
      outline: '#4682B4'
    },
    {
      name: 'Mint Chocolate',
      primary: '#F5FFFA',
      secondary: '#98FB98',
      accent: '#3CB371',
      outline: '#2F4F4F'
    },
    {
      name: 'Peach Parfait',
      primary: '#FFEFD5',
      secondary: '#FFDAB9',
      accent: '#FFA07A',
      outline: '#E9967A'
    },
    {
      name: 'Lemon Sorbet',
      primary: '#FFFACD',
      secondary: '#FFFFE0',
      accent: '#F0E68C',
      outline: '#BDB76B'
    },
  ];
  
  // Individual color presets for custom combinations
  const colorOptions = {
    primary: [
      '#FFFFFF', // White
      '#F0FFFF', // Azure
      '#FFF0F5', // Lavender Blush
      '#FFFACD', // Lemon Chiffon
      '#FFEFD5', // Papaya Whip
      '#F5FFFA', // Mint Cream
    ],
    secondary: [
      '#E6E6FA', // Lavender
      '#B0E0E6', // Powder Blue
      '#FFB6C1', // Light Pink
      '#FFFFE0', // Light Yellow
      '#FFDAB9', // Peach Puff
      '#98FB98', // Pale Green
    ],
    accent: [
      '#98FB98', // Pale Green
      '#87CEEB', // Sky Blue
      '#FF69B4', // Hot Pink
      '#F0E68C', // Khaki
      '#FFA07A', // Light Salmon
      '#3CB371', // Medium Sea Green
    ],
    outline: [
      '#9370DB', // Medium Purple
      '#4682B4', // Steel Blue
      '#DB7093', // Pale Violet Red
      '#BDB76B', // Dark Khaki
      '#E9967A', // Dark Salmon
      '#2F4F4F', // Dark Slate Gray
    ]
  };

  const applyColorPalette = (palette) => {
    updateColors({
      primary: palette.primary,
      secondary: palette.secondary,
      accent: palette.accent,
      outline: palette.outline
    });
  };
  
  const ColorPicker = ({ label, value, options, onChange, icon }) => (
    <div className="mb-6">
      <label className="block text-lavender-dark font-cute font-semibold mb-3 capitalize flex items-center">
        <SafeIcon icon={icon} className="mr-2 w-5 h-5" />
        {label} Color
      </label>
      <div className="flex flex-wrap gap-3">
        {options.map((color, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(color)}
            className={`w-10 h-10 rounded-full transition-all duration-300 ${
              value === color
                ? 'ring-4 ring-lavender shadow-md'
                : 'ring-1 ring-gray-200 hover:ring-lavender/50'
            }`}
            style={{ backgroundColor: color }}
            aria-label={`${label} color ${index + 1}`}
          />
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
        Color Customization
      </h3>
      
      {/* Color Palette Presets */}
      <div className="mb-8">
        <h4 className="text-lavender-dark font-cute font-semibold mb-3 flex items-center">
          <SafeIcon icon={FiStar} className="mr-2 w-5 h-5" />
          Color Palettes
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {colorPalettes.map((palette, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => applyColorPalette(palette)}
              className="p-3 rounded-xl border-2 border-gray-200 bg-white hover:border-lavender/50 transition-all duration-300"
            >
              <p className="text-lavender-dark font-cute mb-2 text-center">{palette.name}</p>
              <div className="flex justify-center space-x-2">
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: palette.primary }}></div>
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: palette.secondary }}></div>
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: palette.accent }}></div>
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: palette.outline }}></div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
      
      {/* Individual Color Pickers */}
      <div className="p-5 bg-white rounded-xl border-2 border-pastel-pink/30 shadow-sm">
        <h4 className="text-lavender-dark font-cute font-semibold mb-4 flex items-center">
          <SafeIcon icon={FiDroplet} className="mr-2 w-5 h-5" />
          Custom Colors
        </h4>
        
        <ColorPicker
          label="Primary"
          value={currentCharacter.colors.primary}
          options={colorOptions.primary}
          onChange={(primary) => updateColors({ primary })}
          icon={FiCircle}
        />
        
        <ColorPicker
          label="Secondary"
          value={currentCharacter.colors.secondary}
          options={colorOptions.secondary}
          onChange={(secondary) => updateColors({ secondary })}
          icon={FiCircle}
        />
        
        <ColorPicker
          label="Accent"
          value={currentCharacter.colors.accent}
          options={colorOptions.accent}
          onChange={(accent) => updateColors({ accent })}
          icon={FiCircle}
        />
        
        <ColorPicker
          label="Outline"
          value={currentCharacter.colors.outline}
          options={colorOptions.outline}
          onChange={(outline) => updateColors({ outline })}
          icon={FiCircle}
        />
      </div>

      {/* Preview Section */}
      <div className="mt-8 p-6 bg-pastel-blue/10 rounded-xl">
        <h4 className="text-lavender-dark font-cute font-semibold mb-4">Color Preview</h4>
        
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 rounded-xl border-4 relative overflow-hidden"
               style={{ borderColor: currentCharacter.colors.outline }}>
            <div className="absolute inset-0" style={{ backgroundColor: currentCharacter.colors.primary }}></div>
            <div className="absolute bottom-0 left-0 right-0 h-1/3" style={{ backgroundColor: currentCharacter.colors.secondary }}></div>
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full" style={{ backgroundColor: currentCharacter.colors.accent }}></div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Primary:</span>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: currentCharacter.colors.primary }}></div>
              <span className="text-lavender-dark">{currentCharacter.colors.primary}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Secondary:</span>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: currentCharacter.colors.secondary }}></div>
              <span className="text-lavender-dark">{currentCharacter.colors.secondary}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Accent:</span>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: currentCharacter.colors.accent }}></div>
              <span className="text-lavender-dark">{currentCharacter.colors.accent}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Outline:</span>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: currentCharacter.colors.outline }}></div>
              <span className="text-lavender-dark">{currentCharacter.colors.outline}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Colors;
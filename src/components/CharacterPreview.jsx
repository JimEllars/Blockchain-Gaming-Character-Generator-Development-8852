import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiBrush, FiSmile } = FiIcons;

const CharacterPreview = ({ character }) => {
  // Define our chibi style elements based on character options
  const skinTones = {
    fair: '#FFE5D9',
    tan: '#F5D0A9',
    brown: '#D4A76A',
    dark: '#8D6E63',
    olive: '#CCC9A1',
    pink: '#FFCFD2'
  };

  const hairColors = {
    brown: '#8B4513',
    black: '#36454F',
    blonde: '#FFF8DC',
    red: '#FF6B6B',
    pink: '#FFBAD2',
    blue: '#A8D8F0',
    purple: '#D8BFD8',
    green: '#98FB98',
    white: '#F5F5F5',
    orange: '#FFBB77'
  };

  const eyeColors = {
    blue: '#87CEEB',
    brown: '#8B4513',
    green: '#98FB98',
    purple: '#D8BFD8',
    pink: '#FFBAD2',
    amber: '#FFBF00',
    gray: '#D3D3D3',
    black: '#36454F'
  };

  return (
    <div className="preview-container bg-white rounded-3xl p-6 h-fit sticky top-24 border-4 border-lavender shadow-lg">
      <h2 className="text-2xl font-cute font-bold text-lavender-dark mb-6 text-center">
        Character Preview
      </h2>

      {/* Character Canvas */}
      <motion.div 
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-64 h-64 mx-auto mb-6 bg-pastel-blue/10 rounded-full flex items-center justify-center border-4 border-pastel-pink"
      >
        {/* Base Character Shape - Chibi Style */}
        <div className="chibi-character relative">
          {/* Head - Large in proportion to body for chibi style */}
          <div 
            className="chibi-head w-40 h-40 rounded-full relative z-10"
            style={{ backgroundColor: skinTones[character.appearance.skinTone] || skinTones.fair }}
          >
            {/* Hair */}
            <div 
              className="chibi-hair absolute"
              style={{
                top: '-10px',
                left: '-10px',
                right: '-10px',
                height: '35px',
                borderTopLeftRadius: '50px',
                borderTopRightRadius: '50px',
                backgroundColor: hairColors[character.appearance.hairColor] || hairColors.brown,
                zIndex: 5
              }}
            ></div>
            
            {/* Eyes */}
            <div className="flex justify-center items-center h-full">
              <div className="flex space-x-12 mt-5">
                <div className="chibi-eye w-6 h-8 rounded-full bg-white flex justify-center items-center">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: eyeColors[character.appearance.eyeColor] || eyeColors.blue }}></div>
                </div>
                <div className="chibi-eye w-6 h-8 rounded-full bg-white flex justify-center items-center">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: eyeColors[character.appearance.eyeColor] || eyeColors.blue }}></div>
                </div>
              </div>
            </div>
            
            {/* Blush */}
            {character.features.blush !== 'none' && (
              <div className="flex justify-center space-x-24 absolute" style={{top: '55%', left: '0', right: '0'}}>
                <div className="w-6 h-3 rounded-full bg-pastel-pink opacity-60"></div>
                <div className="w-6 h-3 rounded-full bg-pastel-pink opacity-60"></div>
              </div>
            )}
            
            {/* Smile */}
            <div className="absolute" style={{top: '65%', left: '0', right: '0'}}>
              {character.features.smile === 'happy' && (
                <div className="mx-auto w-16 h-5 border-b-4 border-black rounded-full"></div>
              )}
              {character.features.smile === 'cat' && (
                <div className="mx-auto w-8 h-8 flex justify-center items-center">
                  <div className="text-xl">ω</div>
                </div>
              )}
              {character.features.smile === 'surprised' && (
                <div className="mx-auto w-8 h-8 rounded-full border-2 border-black"></div>
              )}
            </div>
          </div>
          
          {/* Tiny Body */}
          <div 
            className="chibi-body w-20 h-24 mx-auto -mt-10 rounded-t-3xl z-0"
            style={{ backgroundColor: character.colors.primary }}
          >
            {/* Outfit accent */}
            <div className="w-full h-8 absolute bottom-0" style={{ backgroundColor: character.colors.accent }}></div>
          </div>
        </div>

        {/* Accessory */}
        {character.appearance.accessory === 'hat' && (
          <div 
            className="absolute -top-5 w-32 h-12 rounded-full"
            style={{ backgroundColor: character.colors.secondary }}
          ></div>
        )}
        {character.appearance.accessory === 'bow' && (
          <div className="absolute -top-2 right-20 w-16 h-10 flex">
            <div className="w-7 h-10 rounded-full transform -rotate-30" style={{ backgroundColor: character.colors.accent }}></div>
            <div className="w-7 h-10 rounded-full transform rotate-30 -ml-3" style={{ backgroundColor: character.colors.accent }}></div>
            <div className="w-3 h-3 rounded-full bg-white absolute left-6 top-4"></div>
          </div>
        )}
      </motion.div>

      {/* Character Info */}
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-xl font-cute font-bold text-mint-dark mb-1">
            {character.name || 'Unnamed Friend'}
          </h3>
          <p className="text-lavender-dark capitalize font-cute">
            {character.type} in {character.outfit} outfit
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-pastel-yellow/30 rounded-xl p-3">
            <div className="text-mint-dark text-sm capitalize font-cute">Hair</div>
            <div className="text-lavender-dark font-bold text-lg capitalize">{character.appearance.hairColor}</div>
          </div>
          <div className="bg-pastel-pink/30 rounded-xl p-3">
            <div className="text-mint-dark text-sm capitalize font-cute">Eyes</div>
            <div className="text-lavender-dark font-bold text-lg capitalize">{character.appearance.eyeColor}</div>
          </div>
          <div className="bg-pastel-blue/30 rounded-xl p-3">
            <div className="text-mint-dark text-sm capitalize font-cute">Expression</div>
            <div className="text-lavender-dark font-bold text-lg capitalize">{character.features.expression}</div>
          </div>
          <div className="bg-mint/30 rounded-xl p-3">
            <div className="text-mint-dark text-sm capitalize font-cute">Style</div>
            <div className="text-lavender-dark font-bold text-lg capitalize">{character.outfit}</div>
          </div>
        </div>

        {/* Drawing & Customization */}
        <div className="bg-lavender/10 rounded-xl p-4">
          <h4 className="text-lavender-dark font-cute font-semibold mb-3">Customizations</h4>
          <div className="flex justify-around">
            <div className="text-center">
              <div className="w-10 h-10 mx-auto bg-pastel-pink rounded-full flex items-center justify-center mb-1">
                <SafeIcon icon={FiBrush} className="w-5 h-5 text-lavender-dark" />
              </div>
              <span className="text-xs text-lavender-dark">{character.customizations.drawings.length} Drawings</span>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 mx-auto bg-pastel-yellow rounded-full flex items-center justify-center mb-1">
                <SafeIcon icon={FiSmile} className="w-5 h-5 text-lavender-dark" />
              </div>
              <span className="text-xs text-lavender-dark">{character.customizations.stickers.length} Stickers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterPreview;
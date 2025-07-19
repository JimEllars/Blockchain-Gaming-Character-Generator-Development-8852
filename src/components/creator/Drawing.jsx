import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useCharacterStore from '../../store/characterStore';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiBrush, FiTrash2, FiSave, FiHeart, FiStar, FiCloud, FiSmile } = FiIcons;

const Drawing = () => {
  const { currentCharacter, addDrawing, addSticker } = useCharacterStore();
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#FF6B6B');
  const [brushSize, setBrushSize] = useState(5);
  const [drawingMode, setDrawingMode] = useState('brush'); // 'brush' or 'sticker'
  const [selectedSticker, setSelectedSticker] = useState(null);
  
  // Sticker options
  const stickers = [
    { id: 'heart', emoji: '❤️', label: 'Heart' },
    { id: 'star', emoji: '⭐', label: 'Star' },
    { id: 'flower', emoji: '🌸', label: 'Flower' },
    { id: 'rainbow', emoji: '🌈', label: 'Rainbow' },
    { id: 'butterfly', emoji: '🦋', label: 'Butterfly' },
    { id: 'unicorn', emoji: '🦄', label: 'Unicorn' },
    { id: 'crown', emoji: '👑', label: 'Crown' },
    { id: 'sparkles', emoji: '✨', label: 'Sparkles' }
  ];
  
  const colors = [
    '#FF6B6B', // Red
    '#FF85A1', // Pink
    '#FF9E7A', // Coral
    '#FFD166', // Yellow
    '#A0E7E5', // Turquoise
    '#B4F8C8', // Mint
    '#A9DEF9', // Light Blue
    '#D4A5FF', // Lavender
    '#000000', // Black
    '#FFFFFF', // White
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Clear canvas initially
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e) => {
    if (drawingMode === 'brush') {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize;
      ctx.beginPath();
      ctx.moveTo(x, y);
      
      setIsDrawing(true);
    } else if (drawingMode === 'sticker' && selectedSticker) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Add sticker to the canvas
      const ctx = canvas.getContext('2d');
      ctx.font = '30px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(selectedSticker.emoji, x, y);
      
      // Add sticker to character customizations
      addSticker({
        type: selectedSticker.id,
        emoji: selectedSticker.emoji,
        x: x / canvas.width,
        y: y / canvas.height,
        size: 30
      });
    }
  };

  const draw = (e) => {
    if (!isDrawing || drawingMode !== 'brush') return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing && drawingMode === 'brush') {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.closePath();
      
      // Save drawing to character
      const drawingData = canvas.toDataURL('image/png');
      addDrawing({
        data: drawingData,
        date: new Date().toISOString()
      });
    }
    
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h3 className="text-2xl font-cute font-bold text-lavender-dark mb-6">
        Customize Your Character
      </h3>
      
      {/* Drawing Tools */}
      <div className="flex justify-center flex-wrap gap-3 mb-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setDrawingMode('brush')}
          className={`px-4 py-2 rounded-full flex items-center ${
            drawingMode === 'brush' 
              ? 'bg-pastel-pink text-white font-bold shadow-md' 
              : 'bg-white border-2 border-pastel-pink text-lavender-dark'
          }`}
        >
          <SafeIcon icon={FiBrush} className="mr-2 w-4 h-4" />
          <span>Draw</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setDrawingMode('sticker')}
          className={`px-4 py-2 rounded-full flex items-center ${
            drawingMode === 'sticker' 
              ? 'bg-pastel-blue text-white font-bold shadow-md' 
              : 'bg-white border-2 border-pastel-blue text-lavender-dark'
          }`}
        >
          <SafeIcon icon={FiHeart} className="mr-2 w-4 h-4" />
          <span>Stickers</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={clearCanvas}
          className="px-4 py-2 rounded-full flex items-center bg-white border-2 border-gray-300 text-gray-600 hover:border-red-300 hover:text-red-500"
        >
          <SafeIcon icon={FiTrash2} className="mr-2 w-4 h-4" />
          <span>Clear</span>
        </motion.button>
      </div>
      
      {/* Color Picker (for brush mode) */}
      {drawingMode === 'brush' && (
        <div className="mb-4">
          <p className="text-lavender-dark font-cute mb-2">Brush Color:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {colors.map((color) => (
              <motion.button
                key={color}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setBrushColor(color)}
                className={`w-8 h-8 rounded-full ${brushColor === color ? 'ring-4 ring-lavender' : 'ring-1 ring-gray-200'}`}
                style={{ backgroundColor: color }}
                aria-label={`Select ${color} color`}
              />
            ))}
          </div>
          
          <div className="mt-4">
            <p className="text-lavender-dark font-cute mb-2">Brush Size: {brushSize}px</p>
            <input
              type="range"
              min="1"
              max="20"
              value={brushSize}
              onChange={(e) => setBrushSize(parseInt(e.target.value))}
              className="w-full accent-lavender"
            />
          </div>
        </div>
      )}
      
      {/* Sticker Picker (for sticker mode) */}
      {drawingMode === 'sticker' && (
        <div className="mb-4">
          <p className="text-lavender-dark font-cute mb-2">Choose a Sticker:</p>
          <div className="grid grid-cols-4 gap-2">
            {stickers.map((sticker) => (
              <motion.button
                key={sticker.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedSticker(sticker)}
                className={`p-3 rounded-xl flex flex-col items-center ${
                  selectedSticker?.id === sticker.id 
                    ? 'bg-pastel-blue/20 ring-2 ring-pastel-blue' 
                    : 'bg-white border border-gray-200'
                }`}
              >
                <span className="text-2xl mb-1">{sticker.emoji}</span>
                <span className="text-xs text-lavender-dark">{sticker.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      )}
      
      {/* Drawing Canvas */}
      <div className="relative border-4 border-pastel-pink rounded-xl overflow-hidden">
        <canvas
          ref={canvasRef}
          width={400}
          height={300}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="w-full bg-white/50 cursor-crosshair"
        />
        
        {drawingMode === 'sticker' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-lavender-dark/50">
            {selectedSticker ? (
              <div className="text-center">
                <div className="text-4xl mb-2">{selectedSticker.emoji}</div>
                <p>Click anywhere to place the sticker</p>
              </div>
            ) : (
              <p>Select a sticker first</p>
            )}
          </div>
        )}
        
        {drawingMode === 'brush' && !isDrawing && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-lavender-dark/50">
            <p>Click and drag to draw</p>
          </div>
        )}
      </div>
      
      {/* Customization Stats */}
      <div className="bg-pastel-yellow/20 rounded-xl p-4 mt-6">
        <h4 className="text-mint-dark font-cute font-semibold mb-3">Your Customizations</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <SafeIcon icon={FiBrush} className="mr-2 w-5 h-5 text-pastel-pink" />
            <div>
              <div className="text-lavender-dark font-medium">{currentCharacter.customizations.drawings.length}</div>
              <div className="text-gray-500 text-sm">Drawings</div>
            </div>
          </div>
          <div className="flex items-center">
            <SafeIcon icon={FiSmile} className="mr-2 w-5 h-5 text-pastel-blue" />
            <div>
              <div className="text-lavender-dark font-medium">{currentCharacter.customizations.stickers.length}</div>
              <div className="text-gray-500 text-sm">Stickers</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Drawing;
import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiUser, FiEye, FiSmile, FiDroplet, FiBrush } = FiIcons;

const CreatorTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'basic', label: 'Basic', icon: FiUser },
    { id: 'appearance', label: 'Look', icon: FiEye },
    { id: 'features', label: 'Face', icon: FiSmile },
    { id: 'colors', label: 'Colors', icon: FiDroplet },
    { id: 'drawing', label: 'Draw', icon: FiBrush }
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-cute font-semibold transition-all duration-300 ${
            activeTab === tab.id
              ? 'bg-gradient-to-r from-pastel-pink to-lavender text-white shadow-md'
              : 'bg-white text-lavender-dark border-2 border-gray-200 hover:border-lavender/50'
          }`}
        >
          <SafeIcon icon={tab.icon} className="w-5 h-5" />
          <span>{tab.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default CreatorTabs;
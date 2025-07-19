import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHome, FiUser, FiImage, FiMenu, FiX } = FiIcons;

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: FiHome },
    { path: '/create', label: 'Create', icon: FiUser },
    { path: '/gallery', label: 'Gallery', icon: FiImage }
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b-4 border-lavender/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-lavender rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-lavender-dark font-cute text-xl font-bold">Lavender World</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'text-lavender bg-lavender/10 border-2 border-lavender/30'
                      : 'text-gray-500 hover:text-lavender hover:bg-lavender/5'
                  }`}
                >
                  <SafeIcon icon={item.icon} className="w-5 h-5" />
                  <span className="font-cute">{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-lavender-dark hover:text-lavender transition-colors"
            >
              <SafeIcon icon={isOpen ? FiX : FiMenu} className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
          className="md:hidden border-t border-lavender/20 bg-white"
        >
          <div className="px-4 py-2 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'text-lavender bg-lavender/10 border-2 border-lavender/30'
                    : 'text-gray-500 hover:text-lavender hover:bg-lavender/5'
                }`}
              >
                <SafeIcon icon={item.icon} className="w-5 h-5" />
                <span className="font-cute">{item.label}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-16"></div>
    </>
  );
};

export default Navigation;
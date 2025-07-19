import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiPlay, FiUsers, FiHeart, FiSmile, FiStar, FiImage } = FiIcons;

const Home = () => {
  const features = [
    {
      icon: FiSmile,
      title: 'Adorable Chibis',
      description: 'Create the cutest chibi characters with endless customization options'
    },
    {
      icon: FiHeart,
      title: 'Kid Friendly',
      description: 'Simple and fun interface designed for all ages from 5-65'
    },
    {
      icon: FiImage,
      title: 'Draw & Customize',
      description: 'Add your own drawings and stickers to make each character unique'
    },
    {
      icon: FiStar,
      title: 'Pastel Paradise',
      description: 'Beautiful pastel colors and cute designs for the perfect look'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative z-10"
    >
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-cute font-bold text-lavender-dark mb-6"
          >
            Lavender World
            <span className="block text-3xl md:text-4xl text-pastel-pink mt-2">
              Character Generator
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-mint-dark mb-8 font-cute"
          >
            Create adorable chibi characters with our easy-to-use character designer!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/create"
              className="group relative px-8 py-4 bg-gradient-to-r from-lavender to-pastel-pink rounded-xl font-cute font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-lavender/25"
            >
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiPlay} className="w-5 h-5" />
                <span>Start Creating</span>
              </div>
              <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            <Link
              to="/gallery"
              className="px-8 py-4 border-2 border-pastel-pink/50 rounded-xl font-cute font-semibold text-pastel-pink hover:bg-pastel-pink/10 transition-all duration-300"
            >
              View Gallery
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-pastel-blue/5">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-cute font-bold text-lavender-dark text-center mb-16"
          >
            Why Choose Lavender World?
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-3xl border-4 border-pastel-pink/20 hover:border-lavender/30 transition-all duration-300 group shadow-sm hover:shadow-md"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-pastel-pink to-lavender rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <SafeIcon icon={feature.icon} className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-cute font-semibold text-lavender-dark mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-cute font-bold text-lavender-dark text-center mb-8"
          >
            Adorable Character Examples
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-mint-dark mb-12 font-cute max-w-3xl mx-auto"
          >
            Here are some cute chibi characters you can create with our easy-to-use generator!
          </motion.p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {/* Example character previews */}
            {[
              { name: "Miki", type: "human", hair: "pink", emoji: "👧" },
              { name: "Koko", type: "animal", hair: "brown", emoji: "🐱" },
              { name: "Lumi", type: "fantasy", hair: "blue", emoji: "✨" },
              { name: "Bobo", type: "robot", hair: "green", emoji: "🤖" }
            ].map((char, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="bg-white p-4 rounded-2xl border-4 border-pastel-blue/20 shadow-sm"
              >
                <div className="w-full aspect-square bg-pastel-pink/10 rounded-xl flex items-center justify-center mb-3 overflow-hidden">
                  <div className="text-5xl">{char.emoji}</div>
                </div>
                <h3 className="text-lg font-cute font-bold text-lavender-dark">{char.name}</h3>
                <p className="text-sm text-mint-dark capitalize">{char.type} with {char.hair} hair</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-pastel-yellow/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white p-12 rounded-3xl border-4 border-lavender/30 shadow-lg"
          >
            <h2 className="text-3xl md:text-4xl font-cute font-bold text-lavender-dark mb-6">
              Ready to Create Your Chibi?
            </h2>
            <p className="text-xl text-mint-dark mb-8 font-cute">
              Start designing your own adorable character today!
            </p>
            <Link
              to="/create"
              className="inline-flex items-center space-x-2 px-10 py-4 bg-gradient-to-r from-pastel-pink to-lavender rounded-xl font-cute font-semibold text-white hover:shadow-lg hover:shadow-lavender/25 transition-all duration-300"
            >
              <SafeIcon icon={FiHeart} className="w-5 h-5" />
              <span>Create Your Chibi</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
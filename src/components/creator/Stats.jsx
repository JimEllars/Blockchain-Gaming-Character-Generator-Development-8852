import React from 'react';
import { motion } from 'framer-motion';
import useCharacterStore from '../../store/characterStore';

const Stats = () => {
  const { currentCharacter, updateStats } = useCharacterStore();
  
  const totalPoints = Object.values(currentCharacter.stats).reduce((sum, value) => sum + value, 0);
  const maxPoints = 75;
  const remainingPoints = maxPoints - totalPoints;

  const statDescriptions = {
    strength: 'Physical power and melee damage',
    agility: 'Speed, dodge chance, and dexterity',
    intelligence: 'Magical power and mana capacity',
    vitality: 'Health points and resistance',
    luck: 'Critical hits and rare item drops'
  };

  const adjustStat = (stat, change) => {
    const currentValue = currentCharacter.stats[stat];
    const newValue = currentValue + change;
    
    if (newValue >= 5 && newValue <= 20 && (change < 0 || remainingPoints > 0)) {
      updateStats({ [stat]: newValue });
    }
  };

  const randomizeStats = () => {
    const stats = { strength: 5, agility: 5, intelligence: 5, vitality: 5, luck: 5 };
    let pointsToDistribute = maxPoints - 25; // 25 is minimum (5 per stat)
    
    const statKeys = Object.keys(stats);
    
    while (pointsToDistribute > 0) {
      const randomStat = statKeys[Math.floor(Math.random() * statKeys.length)];
      if (stats[randomStat] < 20) {
        stats[randomStat]++;
        pointsToDistribute--;
      }
    }
    
    updateStats(stats);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-cyber font-bold text-white">Character Stats</h3>
        <button
          onClick={randomizeStats}
          className="px-4 py-2 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg text-white font-gaming font-semibold hover:scale-105 transition-all duration-300"
        >
          Randomize
        </button>
      </div>

      {/* Points Counter */}
      <div className="bg-black/30 rounded-lg p-4 text-center">
        <div className="text-neon-blue text-2xl font-bold font-cyber">{remainingPoints}</div>
        <div className="text-gray-300 text-sm font-gaming">Points Remaining</div>
        <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
          <div
            className="bg-gradient-to-r from-neon-green to-neon-blue h-2 rounded-full transition-all duration-500"
            style={{ width: `${((maxPoints - remainingPoints) / maxPoints) * 100}%` }}
          />
        </div>
      </div>

      {/* Stat Controls */}
      <div className="space-y-4">
        {Object.entries(currentCharacter.stats).map(([stat, value]) => (
          <motion.div
            key={stat}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: Object.keys(currentCharacter.stats).indexOf(stat) * 0.1 }}
            className="bg-black/30 rounded-lg p-4"
          >
            <div className="flex justify-between items-center mb-2">
              <div>
                <h4 className="text-white font-gaming font-semibold capitalize text-lg">{stat}</h4>
                <p className="text-gray-400 text-sm">{statDescriptions[stat]}</p>
              </div>
              <div className="text-neon-blue text-2xl font-bold font-cyber">{value}</div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => adjustStat(stat, -1)}
                disabled={value <= 5}
                className="w-10 h-10 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 hover:bg-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                -
              </button>
              
              <div className="flex-1">
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-neon-blue to-neon-green h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(value / 20) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>5</span>
                  <span>20</span>
                </div>
              </div>
              
              <button
                onClick={() => adjustStat(stat, 1)}
                disabled={value >= 20 || remainingPoints <= 0}
                className="w-10 h-10 bg-neon-green/20 border border-neon-green/50 rounded-lg text-neon-green hover:bg-neon-green/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                +
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="bg-black/30 rounded-lg p-4">
        <h4 className="text-white font-gaming font-semibold mb-3">Combat Power Estimate</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-300">Melee Power:</span>
            <span className="text-neon-blue font-bold">
              {Math.round((currentCharacter.stats.strength * 1.5) + (currentCharacter.stats.vitality * 0.5))}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Magic Power:</span>
            <span className="text-neon-blue font-bold">
              {Math.round((currentCharacter.stats.intelligence * 1.5) + (currentCharacter.stats.luck * 0.3))}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Survivability:</span>
            <span className="text-neon-blue font-bold">
              {Math.round((currentCharacter.stats.vitality * 1.8) + (currentCharacter.stats.agility * 0.7))}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Total Power:</span>
            <span className="text-neon-green font-bold">
              {Math.round(totalPoints * 2.5)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Stats;
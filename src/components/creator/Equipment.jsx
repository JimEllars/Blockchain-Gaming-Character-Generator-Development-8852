import React from 'react';
import { motion } from 'framer-motion';
import useCharacterStore from '../../store/characterStore';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiSword, FiShield, FiZap } = FiIcons;

const Equipment = () => {
  const { currentCharacter, updateEquipment } = useCharacterStore();

  const equipmentOptions = {
    weapon: [
      { id: 'sword', name: 'Longsword', description: 'Balanced damage and speed', icon: FiSword },
      { id: 'axe', name: 'Battle Axe', description: 'High damage, slower attacks', icon: FiSword },
      { id: 'staff', name: 'Magic Staff', description: 'Enhances magical abilities', icon: FiZap },
      { id: 'bow', name: 'Elven Bow', description: 'Ranged attacks with precision', icon: FiSword },
      { id: 'dagger', name: 'Shadow Dagger', description: 'Fast, stealthy strikes', icon: FiSword }
    ],
    armor: [
      { id: 'leather', name: 'Leather Armor', description: 'Light protection, high mobility' },
      { id: 'chainmail', name: 'Chainmail', description: 'Balanced protection and mobility' },
      { id: 'plate', name: 'Plate Armor', description: 'Heavy protection, reduced mobility' },
      { id: 'robes', name: 'Mage Robes', description: 'Enhances magical resistance' },
      { id: 'stealth', name: 'Stealth Suit', description: 'Perfect for sneaking and agility' }
    ],
    accessory: [
      { id: 'ring', name: 'Power Ring', description: 'Boosts overall abilities' },
      { id: 'amulet', name: 'Protection Amulet', description: 'Increases magical defense' },
      { id: 'cloak', name: 'Shadow Cloak', description: 'Enhances stealth capabilities' },
      { id: 'gauntlets', name: 'Strength Gauntlets', description: 'Increases physical power' },
      { id: 'boots', name: 'Swift Boots', description: 'Improves movement speed' }
    ]
  };

  const EquipmentSlot = ({ slot, options, current }) => (
    <div className="mb-8">
      <h4 className="text-xl font-gaming font-semibold text-neon-blue mb-4 capitalize flex items-center space-x-2">
        <SafeIcon icon={slot === 'weapon' ? FiSword : FiShield} className="w-5 h-5" />
        <span>{slot}</span>
      </h4>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
        {options.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => updateEquipment({ [slot]: item.id })}
            className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
              current === item.id
                ? 'border-neon-green bg-neon-green/10 text-white'
                : 'border-gray-600 bg-black/20 text-gray-300 hover:border-neon-green/50'
            }`}
          >
            <div className="flex items-start space-x-3">
              {item.icon && (
                <div className="w-10 h-10 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg flex items-center justify-center mt-1">
                  <SafeIcon icon={item.icon} className="w-5 h-5 text-white" />
                </div>
              )}
              <div className="flex-1">
                <h5 className="font-gaming font-semibold text-lg mb-1">{item.name}</h5>
                <p className="text-sm opacity-80">{item.description}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );

  const getEquipmentStats = () => {
    const weapon = equipmentOptions.weapon.find(w => w.id === currentCharacter.equipment.weapon);
    const armor = equipmentOptions.armor.find(a => a.id === currentCharacter.equipment.armor);
    const accessory = equipmentOptions.accessory.find(acc => acc.id === currentCharacter.equipment.accessory);

    // Simple stat calculations based on equipment
    let damage = 10;
    let defense = 5;
    let speed = 10;

    if (weapon?.id === 'axe') damage += 5;
    if (weapon?.id === 'staff') damage += 3;
    if (weapon?.id === 'bow') damage += 4;
    if (weapon?.id === 'dagger') { damage += 2; speed += 3; }

    if (armor?.id === 'chainmail') defense += 3;
    if (armor?.id === 'plate') { defense += 6; speed -= 2; }
    if (armor?.id === 'leather') speed += 2;
    if (armor?.id === 'stealth') speed += 4;

    if (accessory?.id === 'gauntlets') damage += 2;
    if (accessory?.id === 'boots') speed += 3;
    if (accessory?.id === 'amulet') defense += 2;

    return { damage, defense, speed };
  };

  const stats = getEquipmentStats();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h3 className="text-2xl font-cyber font-bold text-white mb-6">Equipment Selection</h3>

      {/* Equipment Stats Preview */}
      <div className="bg-black/30 rounded-lg p-6 mb-8">
        <h4 className="text-white font-gaming font-semibold mb-4">Equipment Stats</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-neon-blue">{stats.damage}</div>
            <div className="text-sm text-gray-300">Attack Power</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-neon-green">{stats.defense}</div>
            <div className="text-sm text-gray-300">Defense</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-neon-purple">{stats.speed}</div>
            <div className="text-sm text-gray-300">Speed</div>
          </div>
        </div>
      </div>

      {/* Equipment Slots */}
      <div className="space-y-8">
        <EquipmentSlot
          slot="weapon"
          options={equipmentOptions.weapon}
          current={currentCharacter.equipment.weapon}
        />
        
        <EquipmentSlot
          slot="armor"
          options={equipmentOptions.armor}
          current={currentCharacter.equipment.armor}
        />
        
        <EquipmentSlot
          slot="accessory"
          options={equipmentOptions.accessory}
          current={currentCharacter.equipment.accessory}
        />
      </div>

      {/* Current Loadout Summary */}
      <div className="bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 rounded-lg p-6 border border-neon-blue/30">
        <h4 className="text-white font-gaming font-semibold mb-4">Current Loadout</h4>
        <div className="space-y-3">
          {Object.entries(currentCharacter.equipment).map(([slot, itemId]) => {
            const item = equipmentOptions[slot]?.find(i => i.id === itemId);
            return (
              <div key={slot} className="flex justify-between items-center">
                <span className="text-gray-300 capitalize font-gaming">{slot}:</span>
                <span className="text-neon-blue font-semibold">{item?.name || 'None'}</span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Equipment;
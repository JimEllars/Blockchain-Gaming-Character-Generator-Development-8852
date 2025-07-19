import { create } from 'zustand';

const useCharacterStore = create((set, get) => ({
  currentCharacter: {
    name: '',
    type: 'human',
    outfit: 'casual',
    appearance: {
      skinTone: 'fair',
      hairColor: 'brown',
      hairStyle: 'bob',
      eyeColor: 'blue',
      accessory: 'none'
    },
    features: {
      smile: 'happy',
      blush: 'light',
      eyes: 'round',
      expression: 'cheerful'
    },
    colors: {
      primary: '#FFFFFF',
      secondary: '#E6E6FA',
      accent: '#98FB98',
      outline: '#9370DB'
    },
    customizations: {
      stickers: [],
      drawings: []
    }
  },
  savedCharacters: [],
  
  updateCharacter: (updates) => set((state) => ({
    currentCharacter: { ...state.currentCharacter, ...updates }
  })),
  
  updateAppearance: (appearance) => set((state) => ({
    currentCharacter: { 
      ...state.currentCharacter, 
      appearance: { ...state.currentCharacter.appearance, ...appearance }
    }
  })),
  
  updateFeatures: (features) => set((state) => ({
    currentCharacter: { 
      ...state.currentCharacter, 
      features: { ...state.currentCharacter.features, ...features }
    }
  })),
  
  updateColors: (colors) => set((state) => ({
    currentCharacter: { 
      ...state.currentCharacter, 
      colors: { ...state.currentCharacter.colors, ...colors }
    }
  })),
  
  addSticker: (sticker) => set((state) => {
    const stickers = [...state.currentCharacter.customizations.stickers, sticker];
    return {
      currentCharacter: {
        ...state.currentCharacter,
        customizations: {
          ...state.currentCharacter.customizations,
          stickers
        }
      }
    };
  }),
  
  addDrawing: (drawing) => set((state) => {
    const drawings = [...state.currentCharacter.customizations.drawings, drawing];
    return {
      currentCharacter: {
        ...state.currentCharacter,
        customizations: {
          ...state.currentCharacter.customizations,
          drawings
        }
      }
    };
  }),
  
  saveCharacter: () => set((state) => {
    const character = {
      ...state.currentCharacter,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    return { savedCharacters: [...state.savedCharacters, character] };
  }),
  
  loadCharacter: (character) => set({
    currentCharacter: character
  }),
  
  resetCharacter: () => set({
    currentCharacter: {
      name: '',
      type: 'human',
      outfit: 'casual',
      appearance: {
        skinTone: 'fair',
        hairColor: 'brown',
        hairStyle: 'bob',
        eyeColor: 'blue',
        accessory: 'none'
      },
      features: {
        smile: 'happy',
        blush: 'light',
        eyes: 'round',
        expression: 'cheerful'
      },
      colors: {
        primary: '#FFFFFF',
        secondary: '#E6E6FA',
        accent: '#98FB98',
        outline: '#9370DB'
      },
      customizations: {
        stickers: [],
        drawings: []
      }
    }
  })
}));

export default useCharacterStore;
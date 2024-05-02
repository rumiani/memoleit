export const reviewSounds = () => {
  return {
    right: [
      { name: 1, sound: new Audio("/sounds/right/1.mp3") },
      { name: 2, sound: new Audio("/sounds/right/2.mp3") },
      { name: 3, sound: new Audio("/sounds/right/3.mp3") },
      { name: 4, sound: new Audio("/sounds/right/4.mp3") },
    ],
    wrong: [
      { name: 1, sound: new Audio("/sounds/wrong/1.mp3") },
      { name: 2, sound: new Audio("/sounds/wrong/2.mp3") },
      { name: 3, sound: new Audio("/sounds/wrong/3.mp3") },
      { name: 4, sound: new Audio("/sounds/wrong/4.mp3") },
      { name: 5, sound: new Audio("/sounds/wrong/5.mp3") },
    ],
  };
};

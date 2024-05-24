// components/JoyrideComponent.js
import React, { useEffect, useState } from 'react';
import Joyride from 'react-joyride';

const JoyrideComponent = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const steps = [
    {
      target: '.first-element',
      content: 'Choose which categories to be in review list.',
    },
    {
        target: '.second-element',
        content: 'This is the second element',
      },
    // Add more steps as needed
  ];

  return (
    isClient && <Joyride steps={steps} />
  );
};

export default JoyrideComponent;

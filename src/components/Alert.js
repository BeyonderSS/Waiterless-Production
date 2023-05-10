import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useState } from 'react';

const Alert = ({ subMessage, message }) => {
  const [isLoading, setIsLoading] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (isLoading) {
      controls.start('loading');
      setTimeout(() => setIsLoading(false), 4000);
    } else {
      controls.start('visible');
    }
  }, [isLoading, controls]);

  return (
    <motion.div
      className="bg-gray-100 border-l-4 border-blue-500 text-gray-700 p-4 fixed top-24 right-0 w-auto rounded-lg"
      role="alert"
      initial={{ x: '100%' }}
      animate={controls}
      variants={{
        visible: { x: 0, opacity: 1 },
        loading: { x: '-50%', opacity: 0 },
      }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {isLoading ? (
        <div className="relative w-full h-1 bg-blue-500 rounded-full overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-blue-500 animate-pulse"></div>
        </div>
      ) : (
        <>
          <p className="font-bold text-blue-600">{subMessage}</p>
          <p className="text-gray-700">{message}</p>
        </>
      )}
    </motion.div>
  );
};

export default Alert;

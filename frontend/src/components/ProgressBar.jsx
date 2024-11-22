import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    setScrollProgress(0);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = `${(totalScroll / windowHeight) * 100}%`;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='absolute top-full left-0 w-full'> 
      <div className='w-full h-[2px]'>
        <div className="h-[2px] bg-[#F5F5FA]" style={{ width: scrollProgress }}></div>
      </div>
    </div>
  );
};

export { ProgressBar };
import React from 'react';

const Modal = ({ onClose, children }) => {
  const handleModalClick = (e) => {
    // модальное окно не закрывается, пока мы кликаем внутри него
    e.stopPropagation();
  };
  
  return (
    <div className="fixed inset-0 bg-[#0F0C0C]/70 flex justify-center items-center backdrop-blur-md" onClick={onClose}>
      <div onClick={handleModalClick}>
				{children}
      </div>
    </div>
  );
};

export {Modal};
import React from 'react';
import './MessageBox.css';

const MessageBox = ({ isOpen, onClose, type, title, message }) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
      default:
        return 'ℹ️';
    }
  };

  return (
    <div className="message-box-overlay" onClick={onClose}>
      <div className="message-box" onClick={(e) => e.stopPropagation()}>
        <div className="message-box-header">
          <span className="message-box-icon">{getIcon()}</span>
          <h3 className="message-box-title">{title}</h3>
          <button className="message-box-close" onClick={onClose}>×</button>
        </div>
        <div className="message-box-body">
          <p>{message}</p>
        </div>
        <div className="message-box-footer">
          <button className="message-box-btn" onClick={onClose}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;

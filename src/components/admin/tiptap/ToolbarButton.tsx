import React from "react";

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  title: string;
  disabled?: boolean;
  text?: string;
  children?: React.ReactNode;
}

export const ToolbarButton = ({ 
  onClick, 
  isActive = false, 
  title, 
  disabled = false, 
  text, 
  children 
}: ToolbarButtonProps) => (
  <button
    className={`toolbar-btn ${isActive ? "active" : ""} ${
      disabled ? "disabled" : ""
    }`}
    onClick={onClick}
    title={title}
    disabled={disabled}
  >
    {text && <span className="btn-text">{text}</span>}
    {children}
  </button>
);
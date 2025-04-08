
import React from "react";

const EmpathyLogo: React.FC = () => {
  return (
    <div className="flex items-center space-x-3">
      <div className="w-12 h-12 relative overflow-hidden">
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
          <polygon points="50,10 90,90 10,90" fill="#4A2C6D" />
          <polygon points="50,20 80,80 20,80" fill="white" fillOpacity="0.2" />
          <polygon points="50,30 70,70 30,70" fill="white" fillOpacity="0.3" />
        </svg>
      </div>
      <div className="text-left">
        <h1 className="text-3xl font-bold text-empathy-purple">Empathy</h1>
        <p className="text-xs tracking-widest text-empathy-purple">TECHNOLOGIES</p>
      </div>
    </div>
  );
};

export default EmpathyLogo;

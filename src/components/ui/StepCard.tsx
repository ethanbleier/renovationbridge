import React from 'react';

interface StepCardProps {
  stepNumber: number;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ stepNumber, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center mb-4">
        <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3">
          {stepNumber}
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default StepCard; 
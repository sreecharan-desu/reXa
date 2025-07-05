import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RewardBanner: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleCTAClick = () => {
    navigate(isAuthenticated ? '/rewards/create' : '/signin');
  };

  return (
    <div className="relative bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg shadow-md overflow-hidden mb-6">
      <svg
        className="absolute top-0 left-0 w-full h-full opacity-10"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 0L100 0L100 80C80 95 50 100 20 95C10 90 0 85 0 80V0Z"
          fill="white"
        />
        <path
          d="M0 20L20 40L40 20L60 40L80 20L100 40V100H0V20Z"
          fill="white"
          opacity="0.2"
        />
      </svg>
      <div className="relative z-10 p-8 flex flex-col md:flex-row items-center justify-between">
        <div className="max-w-lg">
          <h2 className="text-2xl font-bold text-white mb-2">Unlock Exclusive Rewards</h2>
          <p className="text-sm text-white/90">
            Discover discounts and offers on shopping, entertainment, and more. Start redeeming or create your own rewards today!
          </p>
        </div>
        <button
          onClick={handleCTAClick}
          className="mt-4 md:mt-0 bg-white text-cyan-600 hover:text-cyan-700 px-6 py-2.5 rounded-lg font-medium shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center gap-2"
        >
          {isAuthenticated ? 'Create a Reward' : 'Sign In to Start'}
          <FiArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default RewardBanner;
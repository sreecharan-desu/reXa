import React from 'react';
import { motion } from 'framer-motion';

const Documentation = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
          How reX Works
        </h1>

        {/* Introduction */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Welcome to reX! 👋</h2>
          <p className="text-gray-600 dark:text-gray-300">
            reX is a fun and easy way to exchange rewards with other people. Think of it like a friendly 
            marketplace where you can share and get cool rewards!
          </p>
        </section>

        {/* How It Works */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">How It Works 🎮</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <span className="bg-cyan-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">1</span>
              <div>
                <h3 className="font-medium">Sign Up and Get Points</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  When you join, you get 100 points to start! You can use these points to get rewards.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <span className="bg-cyan-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">2</span>
              <div>
                <h3 className="font-medium">Share Your Rewards</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Got a reward code you don't need? Share it! When someone gets your reward, you get points!
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <span className="bg-cyan-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">3</span>
              <div>
                <h3 className="font-medium">Get Cool Rewards</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  See a reward you like? Use your points to get it! The points go to the person who shared it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Cool Features ✨</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-medium mb-2">🎁 Share Rewards</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Share your unused reward codes and earn points when others redeem them
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-medium mb-2">💰 Point System</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Earn and spend points to exchange rewards with others
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-medium mb-2">🔍 Browse Categories</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Find rewards by categories like games, music, movies, and more
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-medium mb-2">📱 Easy to Use</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Simple interface that works on your phone or computer
              </p>
            </div>
          </div>
        </section>

        {/* API Documentation */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">For Developers 👩‍💻</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium mb-2">Authentication</h3>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="font-mono text-sm mb-2">POST /api/auth/register</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Create a new account</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-2">Rewards</h3>
              <div className="space-y-2">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="font-mono text-sm mb-2">GET /api/rewards</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Get all available rewards</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="font-mono text-sm mb-2">POST /api/rewards</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Create a new reward</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default Documentation;

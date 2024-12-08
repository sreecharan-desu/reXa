import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiGift, FiInfo } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { RedeemDialog } from './RedeemDialog';
import { useAuth } from '../context/AuthContext';
import { transactionApi } from '../services/api';

interface RewardCardProps {
    reward: {
        _id: string;
        title: string;
        description: string;
        points: number;
        code?: string;
        owner: {
            _id: string;
            name: string;
        };
        category?: {
            name: string;
        };
        status: 'available' | 'redeemed' | 'exchanged';
        isActive: boolean;
    };
    onUpdate?: () => void;
}

interface User {
    _id: string;
    name: string;
    email: string;
    points: number;
    redeemedRewards: number;
}

export const RewardCard = ({ reward, onUpdate }: RewardCardProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isRedeeming, setIsRedeeming] = useState(false);
    const navigate = useNavigate();
    const { user, isAuthenticated, updatePoints } = useAuth();

    const canRedeem = reward.status === 'available' && 
                     isAuthenticated && reward.isActive !== false &&
                     user?._id !== reward.owner._id &&
                     user?.points !== undefined &&
                     user?.points >= reward.points;

    const handleRedeem = () => {
        if (!isAuthenticated) {
            toast.error('Please login to redeem rewards');
            navigate('/signin', { state: { from: location.pathname } });
            return;
        }

        if (!user?.points) {
            toast.error(`Please complete your profile to start earning and redeeming points`);
            navigate('/profile');
            return;
        }

        if (user._id === reward.owner._id) {
            toast.error('You cannot redeem your own reward');
            return;
        }

        setIsDialogOpen(true);
    };

    const handleConfirmRedeem = async () => {
        if (!reward) return false;
        
        console.log('Starting redemption for reward:', reward._id);
        try {
            setIsRedeeming(true);
            console.log('Making API call to redeem...');
            const response = await transactionApi.redeemReward(reward._id);
            console.log('Redemption response:', response.data);
            
            if (response.data.userPoints !== undefined) {
                updatePoints(response.data.userPoints);
                toast.success('Reward redeemed successfully!');
                if (onUpdate) {
                    console.log('Updating rewards list...');
                    onUpdate();
                }
                setIsDialogOpen(false);
                return true;
            }
            console.log('Invalid response format:', response.data);
            toast.error('Invalid response from server');
            return false;
        } catch (error: any) {
            console.error('Redemption error:', error);
            console.error('Response:', error.response?.data);
            const errorMessage = error.response?.data?.message || 'Failed to redeem reward';
            toast.error(errorMessage);
            return false;
        } finally {
            setIsRedeeming(false);
        }
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        onUpdate?.();
    };

    return (
        <>
            <div className="group bg-gradient-to-br from-white/80 to-white/50 dark:from-slate-800/80 dark:to-slate-800/50 
                backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl relative
                dark:shadow-cyan-500/10 dark:hover:shadow-cyan-500/20
                transform hover:scale-[1.02] transition-all duration-300 ease-out
                border border-white/20 dark:border-slate-700/20
                min-h-[280px] flex flex-col justify-between
                hover:border-cyan-500/20 dark:hover:border-cyan-500/20">
                
                {/* Status Badge */}
                {(reward.status !== 'available' || !reward.isActive) && (
                    <div className="absolute -top-2 right-4 px-3 py-1 rounded-full text-xs
                        font-medium bg-gradient-to-r from-amber-100 to-amber-200 
                        text-amber-800 dark:from-amber-900 dark:to-amber-800 
                        dark:text-amber-100 shadow-lg shadow-amber-500/10
                        border border-amber-200/50 dark:border-amber-700/50">
                        {!reward.isActive ? 'Inactive' : reward.status.charAt(0).toUpperCase() + reward.status.slice(1)}
                    </div>
                )}

                <div className="space-y-4">
                    <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0 pr-4">
                            <h3 className="text-xl font-bold text-slate-800 dark:text-white 
                                truncate mb-1 bg-gradient-to-r from-slate-800 to-slate-600
                                dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                                {reward.title}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                                by {reward.owner.name}
                            </p>
                        </div>
                        <div className="flex-shrink-0 flex items-center gap-1.5 px-4 py-1.5
                            bg-gradient-to-r from-cyan-100 to-blue-100 
                            dark:from-cyan-900 dark:to-blue-900
                            text-cyan-700 dark:text-cyan-300 
                            rounded-full text-sm font-semibold shadow-inner">
                            <FiGift className="w-4 h-4" />
                            <span>{reward.points} pts</span>
                        </div>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 line-clamp-2 min-h-[3em]
                        leading-relaxed">
                        {reward.description}
                    </p>

                    {reward.category && (
                        <span className="inline-block px-3 py-1 
                            bg-gradient-to-r from-slate-100 to-slate-50
                            dark:from-slate-700 dark:to-slate-800
                            text-slate-600 dark:text-slate-300 
                            text-xs font-medium rounded-full
                            shadow-inner border border-slate-200/50 dark:border-slate-600/50">
                            {reward.category.name}
                        </span>
                    )}
                </div>

                <div className="flex justify-between items-center mt-6 pt-4 
                    border-t border-slate-200/50 dark:border-slate-700/50">
                    <button
                        onClick={() => navigate(`/rewards/${reward._id}`)}
                        className="text-sm text-cyan-600 hover:text-cyan-700 
                            dark:text-cyan-400 dark:hover:text-cyan-300 
                            flex items-center gap-1.5 font-medium
                            hover:translate-x-0.5 transition-transform">
                        <FiInfo className="w-4 h-4" />
                        Details
                    </button>
                    
                    <button
                        onClick={handleRedeem}
                        disabled={!canRedeem || isRedeeming}
                        className={`px-5 py-2 rounded-lg text-sm font-medium
                            transition-all duration-300 shadow-lg
                            ${canRedeem 
                                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 shadow-cyan-500/25' 
                                : 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-400 dark:from-gray-800 dark:to-gray-700 dark:text-gray-500 cursor-not-allowed'
                            }`}>
                        {isRedeeming ? 'Redeeming...' : 'Redeem'}
                    </button>
                </div>

                {!isAuthenticated && (
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/10 to-slate-900/30 
                        dark:from-slate-900/40 dark:to-slate-900/60
                        backdrop-blur-[3px] rounded-2xl flex items-center justify-center 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                            onClick={() => navigate('/signin')}
                            className="px-6 py-3 bg-white dark:bg-slate-800 
                                text-slate-800 dark:text-white rounded-xl shadow-2xl 
                                hover:scale-105 transition-transform duration-300
                                font-medium">
                            Login to Redeem
                        </button>
                    </div>
                )}
            </div>

            <RedeemDialog 
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
                onConfirm={handleConfirmRedeem}
                points={reward.points}
                isLoading={isRedeeming}
            />
        </>
    );
};                          
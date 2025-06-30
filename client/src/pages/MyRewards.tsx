import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { rewardApi } from '../services/api';
import { FiEdit2, FiPlusCircle, FiTrash2 } from 'react-icons/fi';
import { PageLayout } from '../components/PageLayout';
import { SkeletonLoader } from '../components/SkeletonLoader';
import { EmptyState } from '../components/EmptyState';
import { toast } from 'react-hot-toast';
import { FloatingActionButton } from '../components/FloatingActionButton';

interface Reward {
    _id: string;
    title: string;
    description: string;
    points: number;
    status: string;
}

export const MyRewards = () => {
    const [rewards, setRewards] = useState<Reward[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchMyRewards = async () => {
        try {
            const response = await rewardApi.getMyRewards();
            const rewardsData = Array.isArray(response.data) ? response.data : response.data?.data || [];
            setRewards(rewardsData);
        } catch (error) {
            console.error('Error fetching rewards:', error);
            toast.error('Failed to load your rewards');
            setRewards([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (rewardId: string) => {
        try {
            await rewardApi.delete(rewardId);
            toast.success('Reward deleted successfully');
            fetchMyRewards();
        } catch (error) {
            console.error('Error deleting reward:', error);
            toast.error('Failed to delete reward');
        }
    };

    useEffect(() => {
        fetchMyRewards();
    }, []);

    if (loading) {
        return (
            <PageLayout title="My Rewards">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array(3).fill(0).map((_, i) => (
                        <SkeletonLoader key={i} />
                    ))}
                </div>
            </PageLayout>
        );
    }

    if (rewards.length === 0) {
        return (
            <PageLayout title="My Rewards">
                <div className="col-span-full flex justify-center items-center min-h-[50vh]">
                    <EmptyState />
                </div>
            </PageLayout>
        );
    }

    return (
        <PageLayout title="My Rewards">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rewards && rewards.length > 0 ? (
                    rewards.map((reward) => (
                        <div key={reward._id} 
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {reward.title}
                                </h3>
                                <div className="flex gap-2">
                            
                                    <button
                                        onClick={() => handleDelete(reward._id)}
                                        className="p-2 text-gray-600 hover:text-red-500 
                                                dark:text-gray-400 dark:hover:text-red-400"
                                    >
                                        <FiTrash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                {reward.description}
                            </p>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-cyan-600 dark:text-cyan-400 font-medium">
                                    {reward.points} points
                                </span>
                                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 
                                    rounded-full text-gray-600 dark:text-gray-400">
                                    {reward.status}
                                </span>
                            </div>
                                            <FloatingActionButton
                                                onClick={() => navigate('/rewards/create')}
                                                Icon={FiPlusCircle}
                                                label="Create Reward"
                                            />  
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500">
                        No rewards found
                    </div>
                )}
            </div>
        </PageLayout>
    );
};


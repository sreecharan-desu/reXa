import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { rewardApi, transactionApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FiEdit2, FiTrash2, FiAlertCircle } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { LoadingSpinner } from '../components/LoadingSpinner';

interface Reward {
    _id: string;
    title: string;
    description: string;
    points: number;
    code: string;
    expiryDate: string;
    category?: {
        _id: string;
        name: string;
    };
    owner: {
        _id: string;
        name: string;
    };
    status: 'available' | 'redeemed' | 'exchanged';
}

export const RewardDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, updatePoints } = useAuth();
    const [reward, setReward] = useState<Reward | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchReward();
    }, [id]);

    const fetchReward = async () => {
        try {
            const response = await rewardApi.getById(id!);
            setReward(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to load reward');
            toast.error('Failed to load reward');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this reward?')) return;
        
        try {
            await rewardApi.delete(id!);
            toast.success('Reward deleted successfully');
            navigate('/');
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Failed to delete reward');
        }
    };

    const handleRedeem = async () => {
        try {
            setLoading(true);
            const response = await transactionApi.redeemReward(reward._id);
            
            if (updatePoints) {
                updatePoints(response.data.userPoints);
            }
            
            toast.success('Reward redeemed successfully!');
            navigate('/my-rewards');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to redeem reward');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-red-500 text-center">{error}</div>;
    if (!reward) return null;

    const isOwner = user?._id === reward.owner._id;

    return (
        <div className="min-h-[80vh] py-8 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {reward.title}
                        </h1>
                        {isOwner && (
                            <div className="flex gap-3">
                                <button
                                    onClick={() => navigate(`/rewards/${id}/edit`)}
                                    className="p-2 text-gray-600 hover:text-cyan-500 
                                             dark:text-gray-400 dark:hover:text-cyan-400 
                                             transition-colors"
                                >
                                    <FiEdit2 className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="p-2 text-gray-600 hover:text-red-500 
                                             dark:text-gray-400 dark:hover:text-red-400 
                                             transition-colors"
                                >
                                    <FiTrash2 className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                Description
                            </h3>
                            <p className="text-gray-900 dark:text-white">
                                {reward.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                    Points Required
                                </h3>
                                <p className="text-gray-900 dark:text-white font-medium">
                                    {reward.points} points
                                </p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                    Expiry Date
                                </h3>
                                <p className="text-gray-900 dark:text-white">
                                    {new Date(reward.expiryDate).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        {isOwner && (
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                    Reward Code
                                </h3>
                                <p className="font-mono text-gray-900 dark:text-white bg-gray-50 
                                          dark:bg-gray-700 p-3 rounded-lg">
                                    {reward.code}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}; 
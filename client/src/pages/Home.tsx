import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { rewardApi } from '../services/api';
import { RewardCard } from '../components/RewardCard';
import { useAuth } from '../context/AuthContext';
import { FiPlusCircle } from 'react-icons/fi';
import { PageLayout } from '../components/PageLayout';
import { SkeletonLoader } from '../components/SkeletonLoader';
import { FloatingActionButton } from '../components/FloatingActionButton';
import { EmptyState } from '../components/EmptyState';

interface Reward {
    _id: string;
    title: string;
    description: string;
    points: number;
    owner: {
        _id: string;
        name: string;
        email: string;
    };
    category?: {
        _id: string;
        name: string;
        slug: string;
    };
    status: 'available' | 'redeemed' | 'exchanged';
    expiryDate?: string;
    createdAt: string;
    isActive?: boolean;
}

export const Home = () => {
    const [rewards, setRewards] = useState<Reward[]>([]);
    const [loading, setLoading] = useState(true);
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const fetchRewards = async () => {
        try {
            const response = await rewardApi.getAll();
            const filteredRewards = response.data.filter((reward: Reward) => {
                // Filter out rewards that are:
                // 1. Not owned by current user
                // 2. Available (not redeemed or exchanged)
                // 3. Not expired
                // 4. Active
                const isNotOwner = reward.owner._id !== user?._id;
                const isAvailable = reward.status === 'available';
                const isNotExpired = !reward.expiryDate || new Date(reward.expiryDate) > new Date();
                const isActive = reward.isActive !== false; // handles both undefined and true cases
                
                return isNotOwner && isAvailable && isNotExpired && isActive;
            });
            
            setRewards(filteredRewards);
        } catch (error) {
            console.log(error)
            // toast.error('Failed to load rewards');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRewards();
    }, [user?._id]);

    return (
        <PageLayout title="Available Rewards" grid={true}>
            {loading ? (
                Array(6).fill(0).map((_, i) => (
                    <SkeletonLoader key={i} />
                ))
            ) : rewards.length === 0 ? (
                <div className="col-span-full flex justify-center items-center min-h-[50vh]">
                    <EmptyState />
                </div>
            ) : (
                rewards.map((reward) => (
                    <RewardCard 
                        key={reward._id} 
                        reward={reward}
                        onUpdate={fetchRewards}
                    />
                ))
            )}
            
            {isAuthenticated && (
                <FloatingActionButton
                    onClick={() => navigate('/rewards/create')}
                    Icon={FiPlusCircle}
                    label="Create Reward"
                />  
            )}
        </PageLayout>
    );
}; 
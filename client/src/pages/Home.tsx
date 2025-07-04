import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { rewardApi } from '../services/api';
import { FiPlusCircle, FiCalendar, FiShoppingBag } from 'react-icons/fi';
import { PageLayout } from '../components/PageLayout';
import { SkeletonLoader } from '../components/SkeletonLoader';
import { EmptyState } from '../components/EmptyState';
import { toast } from 'react-hot-toast';
import { FloatingActionButton } from '../components/FloatingActionButton';
import { useAuth } from '../context/AuthContext';
import { rewardsState, rewardsLoadingState } from '../store/atoms';

export const Home = () => {
  const [rewards, setRewards] = useRecoilState(rewardsState);
  const [loading, setLoading] = useRecoilState(rewardsLoadingState);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const fetchRewards = async () => {
    setLoading(true);

    let attempts = 0;
    const maxRetries = 3;

    while (attempts < maxRetries) {
      try {
        const response = isAuthenticated
          ? await rewardApi.getAuthenticatedAvaialbleRewards()
          : await rewardApi.getAll();

        const data = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];

        const filtered = data.filter(r => {
          const notOwner = r.owner._id !== user?._id;
          const available = r.status === 'available';
          const notExpired = !r.expiryDate || new Date(r.expiryDate) > new Date();
          const active = r.isActive !== false;
          return notOwner && available && notExpired && active;
        });

        setRewards(filtered);
        break;
      } catch (err) {
        attempts++;
        if (attempts >= maxRetries) {
          console.error('API failed:', err);
          toast.error('Failed to load rewards after multiple attempts. Please refresh the page.');
          setRewards([]);
        } else {
          await new Promise(res => setTimeout(res, 500 * attempts));
        }
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    // ✅ Only fetch if: 
    // 1. Page was refreshed OR
    // 2. Recoil atom is empty
    if (!rewards || rewards.length === 0) {
      fetchRewards();
    } else {
      setLoading(false);
    }
  }, []); 

  return (
    <PageLayout title="Available Rewards">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array(6).fill(null).map((_, i) => <SkeletonLoader key={i} />)
        ) : rewards.length === 0 ? (
          <div className="col-span-full flex justify-center items-center min-h-[50vh]">
            <EmptyState />
          </div>
        ) : (
          rewards.map(reward => (
            <div key={reward._id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="relative h-[200px] overflow-hidden">
                <img
                  src={reward.image_url}
                  alt={reward.title}
                  className="w-full h-[250px] object-cover object-top scale-125 translate-y-[-50px]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
              </div>
              <div className="p-4 space-y-3">
                <h3 className="font-semibold text-gray-800 dark:text-white line-clamp-2">{reward.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{reward.description}</p>

                <div className="flex items-center gap-2 text-sm">
                  <FiShoppingBag className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="font-medium text-gray-800 dark:text-white">{reward.points} pts</span>
                </div>

                {reward.expiryDate && (
                  <div className="flex items-center gap-2 text-sm">
                    <FiCalendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">Expires: {new Date(reward.expiryDate).toLocaleDateString()}</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => !isAuthenticated ? navigate(`/signin`) : navigate(`/rewards/${reward._id}`)}
                    className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

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

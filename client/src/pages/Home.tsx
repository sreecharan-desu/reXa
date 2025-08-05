import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { rewardApi } from '../services/api';
import { FiPlusCircle, FiCalendar, FiShoppingBag, FiSearch, FiFilter, FiX } from 'react-icons/fi';
import { PageLayout } from '../components/PageLayout';
import { SkeletonLoader } from '../components/SkeletonLoader';
import { EmptyState } from '../components/EmptyState';
import { toast } from 'react-hot-toast';
import { FloatingActionButton } from '../components/FloatingActionButton';
import { useAuth } from '../context/AuthContext';
import { rewardsState, rewardsLoadingState } from '../store/atoms';
import RewardBanner from '../components/RewardBanner';

interface Category {
  _id: string;
  name: string;
  icon: string;
}

const categoriesList: Category[] = [
  { _id: '507f1f77bcf86cd799439011', name: 'Gaming', icon: '🎮' },
  { _id: '507f1f77bcf86cd799439012', name: 'Shopping', icon: '🛍️' },
  { _id: '507f1f77bcf86cd799439013', name: 'Entertainment', icon: '🎬' },
  { _id: '507f1f77bcf86cd799439014', name: 'Food & Drinks', icon: '🍽️' },
  { _id: '507f1f77bcf86cd799439015', name: 'Travel', icon: '✈️' },
];

export const Home = () => {
  const [rewards, setRewards] = useRecoilState(rewardsState);
  const [loading, setLoading] = useRecoilState(rewardsLoadingState);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredRewards, setFilteredRewards] = useState(rewards);

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
        setFilteredRewards(filtered);
        break;
      } catch (err) {
        attempts++;
        if (attempts >= maxRetries) {
          console.error('API failed:', err);
          toast.error('Failed to load rewards after multiple attempts. Please refresh the page.');
          setRewards([]);
          setFilteredRewards([]);
        } else {
          await new Promise(res => setTimeout(res, 500 * attempts));
        }
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!rewards || rewards.length === 0) {
      fetchRewards();
    } else {
      setLoading(false);
      setFilteredRewards(rewards);
    }
  }, []);

  useEffect(() => {
    const filtered = rewards.filter(reward => {
      const matchesSearch =
        reward.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reward.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || reward.category._id === selectedCategory;
      const matchesPrice = reward.points >= priceRange[0] && reward.points <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });
    setFilteredRewards(filtered);
  }, [searchQuery, selectedCategory, priceRange, rewards]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setPriceRange([0, 100]);
    setShowFilters(false);
  };

  return (
    <PageLayout title="Available Rewards">
      <div className="space-y-6">
        {/* Search Bar and Filters */}
        <div className="bg-white dark:bg-gray-800 shadow-sm p-4 rounded-lg sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search rewards by title or description..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">All Categories</option>
              {categoriesList.map(category => (
                <option key={category._id} value={category._id}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 transition-shadow duration-200"
            >
              <FiFilter className="w-5 h-5" />
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-gray-800 dark:text-white">Filters</h4>
                <button
                  onClick={handleClearFilters}
                  className="text-sm text-cyan-600 hover:text-cyan-700 flex items-center gap-1"
                >
                  <FiX className="w-4 h-4" /> Clear Filters
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Points Range
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                      placeholder="Min"
                      className="w-1/2 p-2 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-cyan-500"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                      placeholder="Max"
                      className="w-1/2 p-2 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SVG Banner */}
        <RewardBanner />

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array(6).fill(null).map((_, i) => <SkeletonLoader key={i} />)
          ) : filteredRewards.length === 0 ? (
            <div className="col-span-full flex justify-center items-center min-h-[50vh]">
              <EmptyState />
            </div>
          ) : (
            filteredRewards.map(reward => (
              <div key={reward._id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="relative h-48 w-full bg-gray-100 overflow-hidden rounded-t-2xl">
                  <img
                    src={reward.image_url}
                    alt={reward.title}
                    className="w-full h-full object-cover"
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
                      className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg font-medium transition-shadow duration-200 shadow-sm hover:shadow-md"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
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
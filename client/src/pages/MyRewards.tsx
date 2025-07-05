import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { rewardApi } from '../services/api';
import { FiTrash2, FiCalendar, FiShoppingBag, FiPlusCircle, FiSearch, FiFilter, FiX } from 'react-icons/fi';
import { PageLayout } from '../components/PageLayout';
import { SkeletonLoader } from '../components/SkeletonLoader';
import { EmptyState } from '../components/EmptyState';
import { toast } from 'react-hot-toast';
import { FloatingActionButton } from '../components/FloatingActionButton';
import { myRewardsState, myRewardsLoadingState } from '../store/atoms';
import RewardBanner from '../components/RewardBanner';

interface Category {
  _id: string;
  name: string;
  icon: string;
}

interface Reward {
  _id: string;
  title: string;
  description: string;
  image_url: string;
  points: number;
  owner: { _id: string; name: string; email: string };
  status: string;
  category: { _id: string; name: string; slug: string; icon: string };
  expiryDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const categoriesList: Category[] = [
  { _id: '507f1f77bcf86cd799439011', name: 'Gaming', icon: '🎮' },
  { _id: '507f1f77bcf86cd799439012', name: 'Shopping', icon: '🛍️' },
  { _id: '507f1f77bcf86cd799439013', name: 'Entertainment', icon: '🎬' },
  { _id: '507f1f77bcf86cd799439014', name: 'Food & Drinks', icon: '🍽️' },
  { _id: '507f1f77bcf86cd799439015', name: 'Travel', icon: '✈️' },
];

export const MyRewards = () => {
  const [rewards, setRewards] = useRecoilState(myRewardsState);
  const [loading, setLoading] = useRecoilState(myRewardsLoadingState);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredRewards, setFilteredRewards] = useState<Reward[]>(rewards);

  const fetchMyRewards = async () => {
    setLoading(true);
    try {
      const response = await rewardApi.getMyRewards();
      const rewardsData = Array.isArray(response.data.data) ? response.data.data : [];
      setRewards(rewardsData);
      setFilteredRewards(rewardsData);
    } catch (err) {
      console.error('Error fetching rewards:', err);
      toast.error('Failed to load your rewards');
      setRewards([]);
      setFilteredRewards([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!rewards || rewards.length === 0) {
      fetchMyRewards();
    } else {
      setLoading(false);
      setFilteredRewards(rewards);
    }
  }, [rewards]);

  useEffect(() => {
    const filtered = rewards.filter(reward => {
      const matchesSearch =
        reward.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reward.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || reward.category._id === selectedCategory;
      const matchesPrice = reward.points >= priceRange[0] && reward.points <= priceRange[1];
      const matchesStatus = !statusFilter || reward.status === statusFilter;
      const isExpired = reward.expiryDate && new Date(reward.expiryDate) < new Date();
      const matchesExpiry = statusFilter !== 'expired' || isExpired;
      return matchesSearch && matchesCategory && matchesPrice && matchesStatus && matchesExpiry;
    });
    setFilteredRewards(filtered);
  }, [searchQuery, selectedCategory, priceRange, statusFilter, rewards]);

  const handleDelete = async (rewardId: string) => {
    try {
      await rewardApi.delete(rewardId);
      toast.success('Reward deleted successfully');
      fetchMyRewards();
    } catch (err) {
      console.error('Error deleting reward:', err);
      toast.error('Failed to delete reward');
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setPriceRange([0, 100]);
    setStatusFilter('');
    setShowFilters(false);
  };

  return (
    <PageLayout title="My Rewards">
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
                placeholder="Search your rewards by title or description..."
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="">All Statuses</option>
                    <option value="available">Available</option>
                    <option value="expired">Expired</option>
                  </select>
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
            filteredRewards.map((reward) => (
              <div
                key={reward._id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col h-full"
              >
                <div className="relative w-full h-48 bg-gray-100 overflow-hidden rounded-t-2xl">
                  <img
                    src={reward.image_url}
                    alt={reward.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                </div>
                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-800 dark:text-white line-clamp-2 text-base">
                      {reward.title || 'Untitled Reward'}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                      {reward.description || 'No description provided.'}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <FiShoppingBag className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <span className="font-medium text-gray-800 dark:text-white">{reward.points} Points</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <FiCalendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <span>Expires: {new Date(reward.expiryDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${
                        reward.status === 'available' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                        reward.status === 'expired' ? 'bg-red-100 text-red-700 border-red-200' :
                        'bg-gray-100 text-gray-700 border-gray-200'
                      }`}>
                        {reward.status.charAt(0).toUpperCase() + reward.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <button
                      onClick={() => navigate(`/rewards/${reward._id}`)}
                      className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg font-medium transition-shadow duration-200 shadow-sm hover:shadow-md"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(reward._id)}
                      className="p-2 text-red-500 hover:bg-red-100 rounded-lg ml-2 transition-colors"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <FloatingActionButton
        onClick={() => navigate('/rewards/create')}
        Icon={FiPlusCircle}
        label="Create Reward"
      />
    </PageLayout>
  );
};
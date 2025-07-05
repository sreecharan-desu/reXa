import { useState, useEffect } from 'react';
import { authApi } from '../services/api';
import { toast } from 'react-hot-toast';
import { FiEdit2, FiPlusCircle, FiSave, FiX, FiUser, FiMail, FiAward, FiGift, FiCheckCircle, FiCalendar, FiTrendingUp, FiBell } from 'react-icons/fi';
import { FloatingActionButton } from '../components/FloatingActionButton';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { profileErrorState, profileLoadingState, profileState } from '../store/atoms';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { format, subMonths } from 'date-fns';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Title, Tooltip, Legend);

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  points: number;
  redeemedRewards: number;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const Profile = () => {
  const [profile, setProfile] = useRecoilState(profileState);
  const [loading, setLoading] = useRecoilState(profileLoadingState);
  const [error, setError] = useRecoilState(profileErrorState);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(profile);
  const [notificationPreferences, setNotificationPreferences] = useState({
    emailNotifications: true,
    rewardUpdates: true,
  });
  const navigate = useNavigate();

  // Mock data for charts (since no transaction data is provided)
  const getPointsOverTimeData = () => {
    const labels = Array.from({ length: 6 }, (_, i) => format(subMonths(new Date(), 5 - i), 'MMM yyyy'));
    const points = profile?.points || 0;
    const dataPoints = [0, points * 0.2, points * 0.4, points * 0.6, points * 0.8, points];
    return {
      labels,
      datasets: [
        {
          label: 'Points Accumulated',
          data: dataPoints,
          borderColor: '#0891b2',
          backgroundColor: 'rgba(8, 145, 178, 0.2)',
          fill: true,
          tension: 0.4,
        },
      ],
    };
  };

  const getRewardDistributionData = () => {
    const categories = ['Gaming', 'Shopping', 'Entertainment', 'Food & Drinks', 'Travel'];
    const data = profile?.redeemedRewards
      ? [Math.floor(profile.redeemedRewards / 5), Math.floor(profile.redeemedRewards / 2), profile.redeemedRewards, Math.floor(profile.redeemedRewards / 3), Math.floor(profile.redeemedRewards / 4)]
      : [1, 1, 1, 1, 1];
    return {
      labels: categories,
      datasets: [
        {
          label: 'Rewards by Category',
          data,
          backgroundColor: ['#0891b2', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
          hoverOffset: 20,
        },
      ],
    };
  };

  const getActivityData = () => {
    const labels = ['Account Created', 'Email Verified', 'Points Earned'];
    const data = [
      1, // Account created
      profile?.isVerified ? 1 : 0, // Email verified
      profile?.points > 0 ? Math.min(profile.points / 10, 5) : 0, // Scaled points activity
    ];
    return {
      labels,
      datasets: [
        {
          label: 'Activity Count',
          data,
          backgroundColor: '#0891b2',
          borderColor: '#0891b2',
          borderWidth: 1,
        },
      ],
    };
  };

  const fetchProfile = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await authApi.getProfile();
      setProfile(response.data);
      setEditedProfile(response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to load profile';
      console.error(errorMessage);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isPageRefreshed = performance.getEntriesByType('navigation')[0]?.type === 'reload';
    if (!profile || !profile._id) fetchProfile();
    else setLoading(false);
  }, []);

  const handleUpdate = async () => {
    if (!editedProfile) return;
    try {
      setLoading(true);
      const response = await authApi.updateProfile({
        name: editedProfile.name,
        email: editedProfile.email,
      });
      setProfile(response.data);
      setEditedProfile(response.data);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update profile';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedProfile({ ...editedProfile!, name: e.target.value });
  };

  const handleNotificationToggle = (key: keyof typeof notificationPreferences) => {
    setNotificationPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    toast.success(`${key === 'emailNotifications' ? 'Email Notifications' : 'Reward Updates'} ${notificationPreferences[key] ? 'disabled' : 'enabled'}`);
  };

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const getAccountAge = () => {
    if (!profile?.createdAt) return '';
    const days = Math.ceil((new Date() - new Date(profile.createdAt)) / (1000 * 60 * 60 * 24));
    if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (days < 365) return `${Math.floor(days / 30)} month${Math.floor(days / 30) > 1 ? 's' : ''} ago`;
    return `${Math.floor(days / 365)} year${Math.floor(days / 365) > 1 ? 's' : ''} ago`;
  };

  const getProfileCompletion = () => {
    let completion = 0;
    if (profile?.name) completion += 50;
    if (profile?.isVerified) completion += 50;
    return completion;
  };

  if (loading) return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent"></div>
    </div>
  );

  if (error || !profile) return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-red-500">{error || 'Profile not found'}</div>
    </div>
  );

  return (
    <div className="min-h-[80vh] p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-6xl mx-auto space-y-6">
     

        {/* Header Card */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl shadow-lg overflow-hidden text-white relative">
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
          </svg>
          <div className="relative p-6">
            <div className="flex justify-end mb-4">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-shadow duration-200"
                >
                  <FiEdit2 className="w-5 h-5" />
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleUpdate}
                    disabled={loading}
                    className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full disabled:opacity-50 transition-shadow duration-200"
                  >
                    <FiSave className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => { setIsEditing(false); setEditedProfile(profile); }}
                    className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-shadow duration-200"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-white rounded-full p-1 shadow-lg">
                  <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {profile?.name?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                </div>
                {profile?.isVerified && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <div className="text-center sm:text-left flex-1">
                {isEditing ? (
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">Name</label>
                      <input
                        type="text"
                        value={editedProfile?.name || ''}
                        onChange={handleNameChange}
                        className="w-full p-2 border rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">Email</label>
                      <input
                        type="email"
                        disabled
                        value={editedProfile?.email || ''}
                        className="w-full p-2 border rounded-md bg-gray-300 text-gray-800 cursor-not-allowed"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-center sm:justify-start space-x-2 mb-2">
                      <h1 className="text-2xl sm:text-3xl font-bold">{profile?.name}</h1>
                      {profile?.isVerified && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <FiCheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-center sm:justify-start space-x-2 text-white opacity-90">
                      <FiMail className="w-4 h-4" />
                      <span>{profile?.email}</span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start space-x-2 text-sm text-white opacity-75 mt-1">
                      <FiUser className="w-4 h-4" />
                      <span>Member since {getAccountAge()}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* Profile Completion Progress */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-white">Profile Completion</span>
                <span className="text-sm text-white opacity-75">{getProfileCompletion()}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-white h-2 rounded-full transition-all duration-200"
                  style={{ width: `${getProfileCompletion()}%` }}
                ></div>
              </div>
              <p className="text-xs text-white opacity-75 mt-2">
                {getProfileCompletion() < 100
                  ? 'Complete your profile by verifying your email and adding your name.'
                  : 'Your profile is complete!'}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900 rounded-lg flex items-center justify-center">
                  <FiAward className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Points</h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{profile?.points}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500 dark:text-gray-400">Available</div>
                <div className="text-sm font-medium text-cyan-600 dark:text-cyan-400">Ready to use</div>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-cyan-600 h-2 rounded-full transition-all duration-200"
                style={{ width: `${Math.min((profile?.points / 500) * 100, 100)}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Next milestone: {Math.max(500 - (profile?.points || 0), 0)} points
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <FiGift className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Rewards Redeemed</h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{profile?.redeemedRewards}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500 dark:text-gray-400">Lifetime</div>
                <div className="text-sm font-medium text-green-600 dark:text-green-400">
                  {profile?.redeemedRewards === 0 ? 'Get started' : 'Great job!'}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <FiTrendingUp className="w-4 h-4" />
              <span>Track your redemption history</span>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <FiCalendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Status</h3>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">Active</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500 dark:text-gray-400">Since</div>
                <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {formatDate(profile?.createdAt)}
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <div className="flex justify-between items-center">
                <span>Last updated:</span>
                <span>{formatDate(profile?.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Dashboard */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Analytics Dashboard</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Points Over Time Line Chart */}
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Points Over Time</h4>
              <div className="h-64">
                <Line
                  data={getPointsOverTimeData()}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: true, position: 'top' },
                      tooltip: { enabled: true },
                    },
                    scales: {
                      x: { title: { display: true, text: 'Month' } },
                      y: { title: { display: true, text: 'Points' }, beginAtZero: true },
                    },
                  }}
                />
              </div>
            </div>
            {/* Reward Redemption Pie Chart */}
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Reward Redemption by Category</h4>
              <div className="h-64">
                <Pie
                  data={getRewardDistributionData()}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: true, position: 'right' },
                      tooltip: { enabled: true },
                    },
                  }}
                />
              </div>
            </div>
            {/* Profile Activity Bar Chart */}
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg md:col-span-2">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Profile Activity</h4>
              <div className="h-64">
                <Bar
                  data={getActivityData()}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                      tooltip: { enabled: true },
                    },
                    scales: {
                      x: { title: { display: true, text: 'Activity' } },
                      y: { title: { display: true, text: 'Count' }, beginAtZero: true },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <FiCheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Account Created</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{formatDate(profile?.createdAt)}</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Welcome to our platform!</div>
              </div>
            </div>
            {profile?.isVerified && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <FiCheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Email Verified</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Verified</span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Account security enhanced</div>
                </div>
              </div>
            )}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900 rounded-full flex items-center justify-center">
                <FiAward className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Current Points</span>
                  <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">{profile?.points} pts</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Keep earning more points!</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FloatingActionButton
        onClick={() => navigate('/rewards/create')}
        Icon={FiPlusCircle}
        label="Create Reward"
      />
    </div>
  );
};
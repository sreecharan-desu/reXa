import { useState, useEffect } from 'react';
import { authApi } from '../services/api';
import { toast } from 'react-hot-toast';
import { FiEdit2, FiPlusCircle, FiSave, FiX, FiUser, FiMail, FiAward, FiGift, FiCheckCircle, FiCalendar, FiTrendingUp } from 'react-icons/fi';
import { FloatingActionButton } from '../components/FloatingActionButton';
import { useNavigate } from 'react-router-dom';

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
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const cachedProfile = localStorage.getItem('cachedUserProfile');
    if (cachedProfile) {
      const parsedProfile = JSON.parse(cachedProfile);
      setProfile(parsedProfile);
      setEditedProfile(parsedProfile);
      setLoading(false);
      return;
    }

    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await authApi.getProfile();
      if (response.data) {
        setProfile(response.data);
        setEditedProfile(response.data);
        localStorage.setItem('cachedUserProfile', JSON.stringify(response.data));
        setError('');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to load profile';
      console.log(errorMessage);
      if (localStorage.getItem('token')) {
        console.error('Profile fetch error:', err);
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!editedProfile) return;

    try {
      setUpdateLoading(true);
      setError('');

      const response = await authApi.updateProfile({
        name: editedProfile.name,
        email: editedProfile.email
      });

      if (response.data) {
        setProfile(response.data);
        setEditedProfile(response.data);
        setIsEditing(false);
        toast.success('Profile updated successfully');
        localStorage.removeItem('cachedUserProfile');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to update profile';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedProfile) {
      setEditedProfile({
        ...editedProfile,
        name: e.target.value
      });
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedProfile) {
      setEditedProfile({
        ...editedProfile,
        email: e.target.value
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAccountAge = () => {
    if (!profile?.createdAt) return '';
    const createdDate = new Date(profile.createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - createdDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-red-500">{error || 'Profile not found'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-6xl mx-auto space-y-6">
        {/* Header Card */}
        <div className="w-full max-w-6xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl shadow-lg overflow-hidden text-white">
          <div className="h-40 relative flex items-start justify-end p-4 overflow-hidden rounded-2xl">
            <div className="absolute inset-0 backdrop-blur-sm rounded-2xl pointer-events-none"></div>

            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="relative z-10 p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full">
                <FiEdit2 className="w-5 h-5" />
              </button>
            ) : (
              <div className="relative z-10 flex space-x-2">
                <button onClick={handleUpdate} disabled={updateLoading} className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full disabled:opacity-50">
                  <FiSave className="w-5 h-5" />
                </button>
                <button onClick={() => { setIsEditing(false); setEditedProfile(profile); }} className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full">
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          <div className="relative px-6 pb-8 -mt-16">
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
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">Name</label>
                      <input type="text" value={editedProfile?.name || ''} onChange={handleNameChange} className="w-full p-2 border rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-cyan-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">Email</label>
                      <input type="email" disabled value={editedProfile?.email || ''} onChange={handleEmailChange} className="w-full p-2 border rounded-md bg-gray-300 text-gray-800 focus:ring-2 focus:ring-cyan-500" />
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
                className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full transition-all duration-500"
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
  </div>);
};
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { rewardApi, transactionApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FiEdit2, FiTrash2, FiLoader, FiCheck, FiAlertCircle, FiCalendar, FiTag, FiShoppingBag } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { LoadingSpinner } from '../components/LoadingSpinner';

interface Reward {
  _id: string;
  title: string;
  description: string;
  points: number;
  code: string;
  expiryDate: string;
  category?: string;
  owner: { _id: string; name: string; };
  image_url: string;
  status: 'available' | 'redeemed' | 'exchanged';
}

export const RewardDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, updatePoints } = useAuth();
  const [reward, setReward] = useState<Reward | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { fetchReward(); }, [id]);

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
    if (!reward) return;
    try {
      setLoading(true);
      const response = await transactionApi.redeemReward(reward._id);
      updatePoints?.(response.data.userPoints);
      toast.success('Reward redeemed successfully!');
      navigate('/my-rewards');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to redeem reward');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!reward) return null;

  const isOwner = user?._id === reward.owner._id;

  const getStatusColor = () => {
    switch (reward.status) {
      case 'available': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'redeemed': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'exchanged': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = () => {
    switch (reward.status) {
      case 'available': return <FiCheck className="w-4 h-4" />;
      case 'redeemed': return <FiShoppingBag className="w-4 h-4" />;
      case 'exchanged': return <FiTag className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-[80vh] py-8 px-4 bg-gradient-to-br from-slate-50 to-blue-50 flex justify-center">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">

        {/* Image Header */}
        <div className="relative h-[200px] overflow-hidden">
          <img
            src={reward.image_url}
            alt={reward.title}
            className="w-full h-auto object-cover object-top translate-y-[-120px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
        </div>

        {/* Status & Actions */}
        <div className="p-4 flex justify-between items-center">
          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor()}`}> 
            {getStatusIcon()} 
            {reward.status.charAt(0).toUpperCase() + reward.status.slice(1)}
          </span>
          {isOwner && (
            <div className="flex items-center gap-3">
              <button onClick={() => navigate(`/rewards/${id}/edit`)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <FiEdit2 className="w-5 h-5 text-gray-600" />
              </button>
              <button onClick={handleDelete} className="p-2 hover:bg-red-100 rounded-lg transition-colors">
                <FiTrash2 className="w-5 h-5 text-red-500" />
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <h1 className="text-2xl font-semibold text-gray-800">{reward.title}</h1>
          <p className="text-gray-600">{reward.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <FiShoppingBag className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Points Required</p>
                <p className="font-medium text-gray-800">{reward.points}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FiCalendar className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Expiry Date</p>
                <p className="font-medium text-gray-800">{new Date(reward.expiryDate).toLocaleDateString()}</p>
              </div>
            </div>
            {isOwner && (
              <div className="flex items-center gap-2">
                <FiTag className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Reward Code</p>
                  <code className="font-mono bg-gray-50 p-2 rounded-lg block text-gray-800">{reward.code}</code>
                </div>
              </div>
            )}
          </div>

          {!isOwner && (
            <button
              onClick={handleRedeem}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
              disabled={reward.status !== 'available'}
            >
              {loading ? <FiLoader className="w-5 h-5 animate-spin" /> : <FiCheck className="w-5 h-5" />} 
              {reward.status === 'available' ? 'Redeem Reward' : 'Unavailable'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

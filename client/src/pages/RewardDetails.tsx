import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { rewardApi, transactionApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  FiEdit2, FiTrash2, FiLoader, FiCheck, FiShoppingBag, FiCalendar, FiTag
} from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const RewardDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, updatePoints } = useAuth();

  const [reward, setReward] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { fetchReward(); }, [id]);

  const fetchReward = async () => {
    try {
      const response = await rewardApi.getById(id);
      setReward(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load reward');
      toast.error('Failed to load reward');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this reward?')) return;
    try {
      await rewardApi.delete(id);
      toast.success('Reward deleted successfully');
      navigate('/');
    } catch (err) {
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
      navigate('/transactions');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to redeem reward');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;
  if (!reward) return null;

  const isOwner = user?._id === reward.owner._id;

  const statusClasses = {
    available: 'bg-blue-100 text-blue-700 border-blue-200',
    redeemed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    exchanged: 'bg-gray-100 text-gray-700 border-gray-200',
  };

  const statusIcons = {
    available: <FiCheck className="w-4 h-4" />,
    redeemed: <FiShoppingBag className="w-4 h-4" />,
    exchanged: <FiTag className="w-4 h-4" />,
  };

  return (
    <div className="min-h-[80vh] py-10 px-4 bg-gradient-to-br from-slate-50 to-blue-50 flex justify-center">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">

        {/* Image */}
        <div className="relative w-full h-[250px] bg-gray-100 overflow-hidden">
  <img
    src={reward.image_url}
    alt={reward.title}
    className="w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
</div>


        {/* Status & Actions */}
        <div className="p-5 flex justify-between items-center">
          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${statusClasses[reward.status]}`}>
            {statusIcons[reward.status]}
            {reward.status.charAt(0).toUpperCase() + reward.status.slice(1)}
          </span>

          {isOwner && (
            <div className="flex items-center gap-3">
   
              <button onClick={handleDelete} className="p-2 hover:bg-red-100 rounded-lg">
                <FiTrash2 className="w-5 h-5 text-red-500" />
              </button>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="p-5 space-y-5">
          <h1 className="text-2xl font-semibold text-gray-800">{reward.title}</h1>
          <p className="text-gray-600">{reward.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DetailItem icon={<FiShoppingBag />} label="Points Required" value={reward.points} />
            <DetailItem icon={<FiCalendar />} label="Expiry Date" value={new Date(reward.expiryDate).toLocaleDateString()} />
            {!isOwner && (
  <div className="mt-4">
    <button
      onClick={handleRedeem}
      disabled={reward.status !== 'available'}
      className={`w-full py-2 rounded-lg font-medium flex items-center justify-center gap-2 ${
        reward.status !== 'available'
          ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
          : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700'
      }`}
    >
      {reward.status === 'available' ? 'Redeem Now' : 'Unavailable'}
    </button>
  </div>
)}

          </div>

          {!isOwner && (
            <button
              onClick={handleRedeem}
              disabled={reward.status !== 'available'}
              className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 ${
                reward.status !== 'available'
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700'
              }`}
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

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-2">
    <div className="mt-1 text-gray-500">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  </div>
);

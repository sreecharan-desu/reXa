import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { rewardApi } from '../services/api';
import { toast } from 'react-hot-toast';
import { 
  FiUpload, 
  FiX, 
  FiEdit3, 
  FiRefreshCw, 
  FiCheck, 
  FiAlertCircle,
  FiLoader,
  FiPlus,
  FiImage
} from 'react-icons/fi';

const categoriesList = [
  { _id: '507f1f77bcf86cd799439011', name: 'Gaming', icon: '🎮' },
  { _id: '507f1f77bcf86cd799439012', name: 'Shopping', icon: '🛍️' },
  { _id: '507f1f77bcf86cd799439013', name: 'Entertainment', icon: '🎬' },
  { _id: '507f1f77bcf86cd799439014', name: 'Food & Drinks', icon: '🍽️' },
  { _id: '507f1f77bcf86cd799439015', name: 'Travel', icon: '✈️' },
];

const ShimmerLoader = () => (
  <div className="animate-pulse">
    <div className="bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] h-48 rounded-t-xl"></div>
    <div className="p-4 space-y-3">
      <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-3/4"></div>
      <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-full"></div>
      <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-2/3"></div>
    </div>
  </div>
);

const StatusBadge = ({ status, className = "" }) => {
  const statusConfig = {
    parsing: { icon: FiLoader, text: 'Parsing...', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
    parsed: { icon: FiCheck, text: 'Parsed', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
    failed: { icon: FiAlertCircle, text: 'Failed', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
    creating: { icon: FiLoader, text: 'Creating...', bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' },
    created: { icon: FiCheck, text: 'Created', bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' }
  };
  
  const config = statusConfig[status] || statusConfig.parsed;
  const Icon = config.icon;
  
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${config.bg} ${config.text} ${config.border} ${className}`}>
      <Icon className={`w-3 h-3 ${status === 'parsing' || status === 'creating' ? 'animate-spin' : ''}`} />
      {config.text}
    </div>
  );
};

const CouponCard = ({ item, onRetry, onRemove, onEdit, onCreateSingle, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(item);

  const handleSave = () => {
    onEdit(index, editData);
    setIsEditing(false);
  };

  if (item.status === 'parsing') {
    return (
      <div 
        className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <ShimmerLoader />
      </div>
    );
  }

  if (item.status === 'failed') {
    return (
      <div 
        className="bg-white rounded-xl border border-red-200 overflow-hidden transition-all duration-200 hover:shadow-md group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="h-48 bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
          <div className="text-center">
            <FiAlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <p className="text-sm text-red-600">Failed to parse</p>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <StatusBadge status="failed" />
            <div className={`flex gap-2 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              <button
                onClick={() => onRetry(index)}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-cyan-600 transition-colors"
                title="Retry parsing"
              >
                <FiRefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => onRemove(index)}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-red-600 transition-colors"
                title="Remove"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-cyan-200 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img 
          src={item.image} 
          alt="Coupon" 
          className="w-full h-48 object-cover"
        />
        <div className={`absolute top-3 right-3 flex gap-2 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={() => setIsEditing(true)}
            className="p-1.5 rounded-lg bg-white/90 hover:bg-white text-gray-600 hover:text-cyan-600 transition-colors shadow-sm"
            title="Edit details"
          >
            <FiEdit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onRemove(index)}
            className="p-1.5 rounded-lg bg-white/90 hover:bg-white text-gray-600 hover:text-red-600 transition-colors shadow-sm"
            title="Remove"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute top-3 left-3">
          <StatusBadge status={item.status || 'parsed'} />
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        {isEditing ? (
          <div className="space-y-3">
            <input
              value={editData.name || ''}
              onChange={(e) => setEditData({...editData, name: e.target.value})}
              className="w-full text-lg font-semibold bg-transparent border-b border-gray-200 focus:border-cyan-500 outline-none pb-1"
              placeholder="Coupon name"
            />
            <textarea
              value={editData.description || ''}
              onChange={(e) => setEditData({...editData, description: e.target.value})}
              className="w-full text-sm text-gray-600 bg-transparent border-b border-gray-200 focus:border-cyan-500 outline-none pb-1 resize-none"
              placeholder="Description"
              rows={2}
            />
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="px-3 py-1.5 text-sm bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{item.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Code:</span>
                <code className="font-mono text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded text-xs">
                  {item['cupon-code'] || item.code}
                </code>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Expires:</span>
                <span className="text-gray-700">{new Date(item.expiry_date).toLocaleDateString()}</span>
              </div>
            </div>
            
            <button
              onClick={() => onCreateSingle(item, index)}
              disabled={item.status === 'creating' || item.status === 'created'}
              className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all transform hover:scale-[1.02] ${
                item.status === 'created' 
                  ? 'bg-green-50 text-green-700 border border-green-200 cursor-not-allowed' 
                  : item.status === 'creating'
                  ? 'bg-cyan-50 text-cyan-700 border border-cyan-200 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700 shadow-sm hover:shadow-md'
              }`}
            >
              {item.status === 'creating' && <FiLoader className="inline w-4 h-4 mr-2 animate-spin" />}
              {item.status === 'created' && <FiCheck className="inline w-4 h-4 mr-2" />}
              {item.status === 'creating' ? 'Creating...' : item.status === 'created' ? 'Created' : 'Create Reward'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export const CreateReward = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [parsedResults, setParsedResults] = useState([]);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    // Add new files with parsing status
    const newItems = files.map(file => ({ 
      file, 
      status: 'parsing',
      id: Date.now() + Math.random()
    }));
    
    setParsedResults(prev => [...prev, ...newItems]);

    // Process each file
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const itemId = newItems[i].id;
      
      try {
        const reader = new FileReader();
        reader.onloadend = async () => {
          try {
            const base64 = reader.result;
            const payload = { image_data: base64 };
            const res = await fetch('https://dark-lord-chamber-production.up.railway.app/api/process-image', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            });
            const data = await res.json();
            
            if (data.success) {
              const parsedJson = JSON.parse(data.ai_response.match(/```json\n([\s\S]*?)\n```/)[1]);
              setParsedResults(prev =>
                prev.map(item =>
                  item.id === itemId 
                    ? { ...parsedJson, image: data.image_url, status: 'parsed', id: itemId, file }
                    : item
                )
              );
            } else {
              setParsedResults(prev =>
                prev.map(item =>
                  item.id === itemId ? { ...item, status: 'failed' } : item
                )
              );
              toast.error(data.error || 'Failed to parse image');
            }
          } catch (err) {
            setParsedResults(prev =>
              prev.map(item =>
                item.id === itemId ? { ...item, status: 'failed' } : item
              )
            );
            toast.error('Parsing error');
          }
        };
        reader.readAsDataURL(file);
      } catch (err) {
        setParsedResults(prev =>
          prev.map(item =>
            item.id === itemId ? { ...item, status: 'failed' } : item
          )
        );
        toast.error('File reading error');
      }
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRetry = async (index) => {
    const item = parsedResults[index];
    setParsedResults(prev => 
      prev.map((p, i) => i === index ? { ...p, status: 'parsing' } : p)
    );
    
    // Simulate re-parsing
    setTimeout(() => {
      // This would normally re-trigger the parsing logic
      // For now, just simulate success
      setParsedResults(prev => 
        prev.map((p, i) => i === index ? { ...p, status: 'parsed' } : p)
      );
    }, 2000);
  };

  const handleRemove = (index) => {
    setParsedResults(prev => prev.filter((_, i) => i !== index));
  };

  const handleEdit = (index, newData) => {
    setParsedResults(prev => 
      prev.map((item, i) => i === index ? { ...item, ...newData } : item)
    );
  };

  const createSingleReward = async (data, index) => {
    try {
      setParsedResults(prev => 
        prev.map((item, i) => i === index ? { ...item, status: 'creating' } : item)
      );

      const payload = {
        title: data.name,
        description: data.description,
        points: data.points || 10,
        code: data['cupon-code'] || data.code,
        expiryDate: new Date(data.expiry_date).toISOString(),
        category: categoriesList.find(cat =>
          data.category?.toLowerCase().includes(cat.name.toLowerCase())
        )?._id,
        imageUrls: [data.image],
      };
      
      const response = await rewardApi.create(payload);
      
      setParsedResults(prev => 
        prev.map((item, i) => i === index ? { ...item, status: 'created' } : item)
      );
      
      toast.success(`${payload.title} created successfully!`);
      
      // Optional: Navigate to the created reward
      navigate(`/rewards/${response.data._id}`);
    } catch (err) {
      setParsedResults(prev => 
        prev.map((item, i) => i === index ? { ...item, status: 'parsed' } : item)
      );
      toast.error('Failed to create reward');
    }
  };

  const handleCreateAll = async () => {
    setLoading(true);
    const parsedItems = parsedResults.filter(item => item.status === 'parsed');
    
    for (let i = 0; i < parsedResults.length; i++) {
      const item = parsedResults[i];
      if (item.status === 'parsed') {
        await createSingleReward(item, i);
        // Small delay between creations
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    setLoading(false);
  };

  const parsedCount = parsedResults.filter(item => item.status === 'parsed').length;
  const createdCount = parsedResults.filter(item => item.status === 'created').length;

  return (
    <div className="h-screen bg-gray-50 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Coupon Manager</h1>
            <p className="text-sm text-gray-600 mt-1">Upload and manage your coupon images with AI-powered parsing</p>
          </div>
          
          <div className="flex items-center gap-4">
            {parsedResults.length > 0 && (
              <div className="text-sm text-gray-600">
                {createdCount}/{parsedResults.length} created
              </div>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all shadow-sm hover:shadow-md transform hover:scale-[1.02]"
            >
              <FiPlus className="w-4 h-4" />
              Upload Images
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-7xl mx-auto px-6 py-6">
          {parsedResults.length === 0 ? (
            // Empty State
            <div className="h-full flex items-center justify-center">
              <div className="text-center max-w-md">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FiImage className="w-8 h-8 text-cyan-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No coupons uploaded yet</h3>
                <p className="text-gray-600 mb-6">Upload coupon images to start parsing them with AI and create rewards automatically.</p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all shadow-sm hover:shadow-md transform hover:scale-[1.02]"
                >
                  <FiUpload className="w-5 h-5" />
                  Upload Your First Coupon
                </button>
              </div>
            </div>
          ) : (
            // Content Area
            <div className="h-full flex flex-col">
              {/* Actions Bar */}
              {parsedCount > 0 && (
                <div className="flex items-center justify-between mb-6 p-4 bg-white rounded-xl border border-gray-200">
                  <div className="text-sm text-gray-600">
                    {parsedCount} coupon{parsedCount !== 1 ? 's' : ''} ready to create
                  </div>
                  <button
                    onClick={handleCreateAll}
                    disabled={loading || parsedCount === 0}
                    className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${
                      loading || parsedCount === 0
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:from-emerald-700 hover:to-green-700 shadow-sm hover:shadow-md transform hover:scale-[1.02]'
                    }`}
                  >
                    {loading && <FiLoader className="w-4 h-4 animate-spin" />}
                    Create All Rewards
                  </button>
                </div>
              )}

              {/* Cards Grid */}
              <div className="flex-1 overflow-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-6">
                  {parsedResults.map((item, index) => (
                    <CouponCard
                      key={item.id || index}
                      item={item}
                      index={index}
                      onRetry={handleRetry}
                      onRemove={handleRemove}
                      onEdit={handleEdit}
                      onCreateSingle={createSingleReward}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateReward;
// File: CreateReward.tsx
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { rewardApi } from '../services/api';
import { toast } from 'react-hot-toast';
import {
  FiX, FiEdit3, FiRefreshCw, FiCheck, FiAlertCircle,
  FiLoader, FiPlus, FiImage, FiCalendar, FiTag, FiCopy, FiShoppingBag
} from 'react-icons/fi';

// Types
interface ParsedCoupon {
  id: string | number;
  file?: File;
  image?: string;
  name?: string;
  description?: string;
  code?: string;
  ['cupon-code']?: string;
  expiry_date?: string;
  category?: string;
  image_url?: string;
  points?: number;
  status: 'parsing' | 'parsed' | 'failed' | 'creating' | 'created';
  ocr_text?: string;
}

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

const parseJSON = (text: string) => {
  try {
    return JSON.parse(text);
  } catch {
    // Try extracting from markdown-like ```json block
    const match = text.match(/```json\n([\s\S]*?)\n```/);
    if (match) {
      return JSON.parse(match[1]);
    }
    throw new Error('Invalid JSON');
  }
};

const CreateReward = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [parsedResults, setParsedResults] = useState<ParsedCoupon[]>([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newItems: ParsedCoupon[] = files.map(file => ({
      file,
      id: Date.now() + Math.random(),
      status: 'parsing'
    }));

    setParsedResults(prev => [...prev, ...newItems]);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const itemId = newItems[i].id;

      try {
        const reader = new FileReader();
        reader.onloadend = async () => {
          try {
            const base64 = reader.result;
            const res = await fetch('https://dark-lord-chamber-production.up.railway.app/api/process-image', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ image_data: base64 }),
            });
            const data = await res.json();

            if (data.success) {
              const parsedJson = parseJSON(data.ai_response);
              setParsedResults(prev =>
                prev.map(item =>
                  item.id === itemId
                    ? { 
                        ...parsedJson, 
                        id: itemId, 
                        image: data.image_url,
                        image_url: data.image_url,
                        ocr_text: data.ocr_text,
                        status: 'parsed' 
                      }
                    : item
                )
              );
            } else {
              throw new Error(data.error || 'Parsing failed');
            }
          } catch {
            setParsedResults(prev =>
              prev.map(item =>
                item.id === itemId ? { ...item, status: 'failed' } : item
              )
            );
            toast.error('Parsing error');
          }
        };
        reader.readAsDataURL(file);
      } catch {
        toast.error('File reading error');
        setParsedResults(prev =>
          prev.map(item =>
            item.id === itemId ? { ...item, status: 'failed' } : item
          )
        );
      }
    }

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const createSingleReward = async (data: ParsedCoupon, index: number) => {
    try {
      setParsedResults(prev =>
        prev.map((item, i) => i === index ? { ...item, status: 'creating' } : item)
      );

      const categoryMatch = categoriesList.find(cat =>
        data.category?.toLowerCase().includes(cat.name.toLowerCase())
      );

      const payload = {
        title: data.name,
        description: data.description,
        points: data.points || 10,
        code: data['cupon-code'] || data.code,
        expiryDate: data.expiry_date ? new Date(data.expiry_date).toISOString() : new Date().toISOString(),
        category: categoryMatch?._id || categoriesList[1]._id, // Default to Shopping
        imageUrls: [data.image_url || data.image],
        ocrText: data.ocr_text,
      };

      const res = await rewardApi.create(payload);
      toast.success(`${payload.title} created successfully!`);

      setParsedResults(prev =>
        prev.map((item, i) => i === index ? { ...item, status: 'created' } : item)
      );

      // navigate(`/rewards/${res.data._id}`);
    } catch (error) {
      console.error('Error creating reward:', error);
      toast.error('Failed to create reward');
      setParsedResults(prev =>
        prev.map((item, i) => i === index ? { ...item, status: 'parsed' } : item)
      );
    }
  };

  const handleRetry = async (index: number) => {
    const item = parsedResults[index];
    if (!item.file) return;

    setParsedResults(prev =>
      prev.map((item, i) => i === index ? { ...item, status: 'parsing' } : item)
    );

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64 = reader.result;
          const res = await fetch('https://dark-lord-chamber-production.up.railway.app/api/process-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image_data: base64 }),
          });
          const data = await res.json();

          if (data.success) {
            const parsedJson = parseJSON(data.ai_response);
            setParsedResults(prev =>
              prev.map((item, i) =>
                i === index
                  ? { 
                      ...parsedJson, 
                      id: item.id, 
                      image: data.image_url,
                      image_url: data.image_url,
                      ocr_text: data.ocr_text,
                      status: 'parsed' 
                    }
                  : item
              )
            );
          } else {
            throw new Error(data.error || 'Parsing failed');
          }
        } catch {
          setParsedResults(prev =>
            prev.map((item, i) => i === index ? { ...item, status: 'failed' } : item)
          );
          toast.error('Retry parsing failed');
        }
      };
      reader.readAsDataURL(item.file);
    } catch {
      toast.error('File reading error during retry');
      setParsedResults(prev =>
        prev.map((item, i) => i === index ? { ...item, status: 'failed' } : item)
      );
    }
  };

  const handleRemove = (index: number) => {
    setParsedResults(prev => prev.filter((_, i) => i !== index));
  };

  const handleEdit = (index: number, field: string, value: string) => {
    setParsedResults(prev =>
      prev.map((item, i) => i === index ? { ...item, [field]: value } : item)
    );
  };

  const handleCreateAll = async () => {
    setLoading(true);
    const toCreate = parsedResults.filter(item => item.status === 'parsed');
    
    for (const [i, item] of parsedResults.entries()) {
      if (item.status === 'parsed') {
        await createSingleReward(item, i);
        await new Promise(res => setTimeout(res, 500));
      }
    }
    setLoading(false);
    navigate('/my-rewards');
    toast.success('All rewards created successfully!');
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Code copied to clipboard!');
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden flex flex-col">
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Coupon Manager
          </h1>
          <p className="text-gray-600 text-sm">Upload coupons and create rewards automatically</p>
        </div>
        <div className="flex items-center gap-4">
          {parsedResults.length > 0 && (
            <div className="flex items-center gap-2 bg-emerald-100 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-emerald-700 font-medium">
                {parsedResults.filter(p => p.status === 'created').length}/{parsedResults.length} created
              </span>
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
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            <FiPlus className="w-4 h-4" />
            Upload Images
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {parsedResults.length === 0 ? (
          <div className="h-full flex flex-col justify-center items-center text-center">
            <div className="bg-gradient-to-br from-cyan-100 to-blue-100 p-8 rounded-2xl mb-6">
              <FiImage className="w-16 h-16 text-cyan-600 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No coupons uploaded yet</h3>
            <p className="text-gray-500 max-w-md">
              Upload coupon images to automatically extract details and create rewards
            </p>
          </div>
        ) : (
          <>
            {parsedResults.some(p => p.status === 'parsed') && (
              <div className="flex justify-end mb-6">
                <button
                  disabled={loading}
                  onClick={handleCreateAll}
                  className={`px-6 py-3 rounded-xl text-white font-medium transition-all duration-200 flex items-center gap-2 ${
                    loading
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                  }`}
                >
                  {loading ? (
                    <>
                      <FiLoader className="w-4 h-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <FiCheck className="w-4 h-4" />
                      Create All Rewards
                    </>
                  )}
                </button>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {parsedResults.map((item, index) => (
                <CouponCard
                  key={item.id}
                  item={item}
                  index={index}
                  onEdit={handleEdit}
                  onRemove={handleRemove}
                  onRetry={handleRetry}
                  onCreate={createSingleReward}
                  onCopyCode={copyCode}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

interface ParsedCoupon {
  id: string | number;
  file?: File;
  image?: string;
  name?: string;
  description?: string;
  code?: string;
  ['cupon-code']?: string;
  expiry_date?: string;
  category?: string;
  image_url?: string;
  points?: number;
  status: 'parsing' | 'parsed' | 'failed' | 'creating' | 'created';
  ocr_text?: string;
}


interface ParsedCoupon {
  id: string | number;
  file?: File;
  image?: string;
  name?: string;
  description?: string;
  code?: string;
  ['cupon-code']?: string;
  expiry_date?: string;
  category?: string;
  image_url?: string;
  points?: number;
  status: 'parsing' | 'parsed' | 'failed' | 'creating' | 'created';
  ocr_text?: string;
}

const CouponCard = ({
  item,
  index,
  onEdit,
  onRemove,
  onRetry,
  onCreate,
  onCopyCode
}: {
  item: ParsedCoupon;
  index: number;
  onEdit: (index: number, field: string, value: string) => void;
  onRemove: (index: number) => void;
  onRetry: (index: number) => void;
  onCreate: (item: ParsedCoupon, index: number) => void;
  onCopyCode: (code: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: item.name || '',
    description: item.description || '',
    code: item['cupon-code'] || item.code || '',
    expiry_date: item.expiry_date || '',
    points: item.points || 10
  });

  const handleSaveEdit = () => {
    onEdit(index, 'points', editData.points.toString());
    setIsEditing(false);
  };

  const getStatusColor = (status: ParsedCoupon['status']) => {
    switch (status) {
      case 'parsing': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'parsed': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'failed': return 'bg-red-100 text-red-700 border-red-200';
      case 'creating': return 'bg-cyan-100 text-cyan-700 border-cyan-200';
      case 'created': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: ParsedCoupon['status']) => {
    switch (status) {
      case 'parsing': return <FiLoader className="w-3 h-3 animate-spin" />;
      case 'parsed': return <FiCheck className="w-3 h-3" />;
      case 'failed': return <FiAlertCircle className="w-3 h-3" />;
      case 'creating': return <FiLoader className="w-3 h-3 animate-spin" />;
      case 'created': return <FiCheck className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {(item.image_url || item.image) && (
        <div className="relative h-[100px] overflow-hidden">
          <img
            src={item.image_url || item.image}
            alt="Coupon"
            className="w-full h-auto object-cover object-top translate-y-[-70px]"
          />
        </div>
      )}

      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
            {getStatusIcon(item.status)}
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </span>
          <div className="flex items-center gap-1">
            {item.status === 'parsed' && (
              <button onClick={() => setIsEditing(!isEditing)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                <FiEdit3 className="w-3 h-3 text-gray-500" />
              </button>
            )}
            {item.status === 'failed' && (
              <button onClick={() => onRetry(index)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                <FiRefreshCw className="w-3 h-3 text-gray-500" />
              </button>
            )}
            <button onClick={() => onRemove(index)} className="p-1 hover:bg-red-100 rounded-lg transition-colors">
              <FiX className="w-3 h-3 text-red-500" />
            </button>
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-3">
            <input
              type="number"
              value={editData.points}
              onChange={(e) => setEditData({...editData, points: parseInt(e.target.value) || 10})}
              placeholder="Points"
              className="w-full p-2 border border-gray-200 rounded-lg text-sm"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSaveEdit}
                className="flex-1 bg-emerald-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-800 line-clamp-2">{item.name || 'Unnamed Coupon'}</h3>
            {item.description && <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>}
            {(item['cupon-code'] || item.code) && (
              <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
                <FiTag className="w-4 h-4 text-gray-500" />
                <code className="text-sm font-mono text-gray-800 flex-1">{item['cupon-code'] || item.code}</code>
                <button onClick={() => onCopyCode(item['cupon-code'] || item.code || '')} className="p-1 hover:bg-gray-200 rounded transition-colors">
                  <FiCopy className="w-3 h-3 text-gray-500" />
                </button>
              </div>
            )}
            {item.expiry_date && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FiCalendar className="w-4 h-4" />
                <span>Expires: {item.expiry_date}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FiShoppingBag className="w-4 h-4" />
              <span>Points: {item.points || 10}</span>
            </div>
            {item.status === 'parsed' && (
              <button
                onClick={() => onCreate(item, index)}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white py-2.5 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
              >
                Create Reward
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};


export default CreateReward;
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



const CreateReward = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [parsedResults, setParsedResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newItems = files.map(file => ({
      file,
      id: Date.now() + Math.random(),
      name: '',
      description: '',
      expiry_date: '',
      category: '',
      status: 'parsing'
    }));

    setParsedResults(prev => [...prev, ...newItems]);

    files.forEach((file, i) => {
      const reader = new FileReader();
      const itemId = newItems[i].id;

      reader.onloadend = async () => {
        try {
          const base64 = reader.result;
          const res = await fetch('https://dark-lord-chamber-production.up.railway.app/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image_data: base64 ,message : "Hi",timestamp : Date.now()}),
          });
          const data = await res.json();

          const mappedData = {
            id: itemId,
            file,
            name: data.name || '',
            description: data.description || '',
            category: data.category || '',
            ['cupon-code']: data['cupon-code'] || '',
            expiry_date: data.expiry_date || '',
            image_url: data.image_url || '',
            image: data.image_url || '',
            points: 10,
            status: 'parsed',
            ocr_text: data.ocr_text || '',
          };

          setParsedResults(prev => prev.map(item => item.id === itemId ? mappedData : item));
        } catch {
          setParsedResults(prev => prev.map(item => item.id === itemId ? { ...item, status: 'failed' } : item));
          toast.error('Parsing error');
        }
      };

      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

const createSingleReward = async (data, index) => {
  try {
    setParsedResults(prev =>
      prev.map((item, i) => i === index ? { ...item, status: 'creating' } : item)
    );

    const title = data.name?.trim();
    const description = data.description?.trim();
    const code = data['cupon-code']?.trim() || data.code?.trim();
    const expiry = data.expiry_date?.trim();
    const categoryText = data.category?.trim();

    const errors = [];
    if (!title) errors.push('Title is missing');
    if (!description) errors.push('Description is missing');
    if (!code) errors.push('Coupon code is missing');
    if (!expiry) errors.push('Expiry date is missing');
    if (!categoryText) errors.push('Category is missing');

    if (errors.length) {
      toast.error(`Cannot create reward: ${errors.join(', ')}`);
      setParsedResults(prev =>
        prev.map((item, i) => i === index ? { ...item, status: 'parsed' } : item)
      );
      return;
    }

    const categoryMatch = categoriesList.find(cat =>
      categoryText.toLowerCase().includes(cat.name.toLowerCase())
    );
    const categoryId = categoryMatch?._id || categoriesList[1]._id;

    const points = typeof data.points === 'number' && !isNaN(data.points) ? data.points : 10;

    const payload = {
      title,
      description,
      points,
      code,
      expiryDate: expiry,
      category: categoryId,
      imageUrls: data.image_url ? [data.image_url] : [],
      ocrText: data.ocr_text || '',
    };

    const res = await rewardApi.create(payload);

    // If no error is thrown, mark as created
    setParsedResults(prev =>
      prev.map((item, i) => i === index ? { ...item, status: 'created' } : item)
    );
    toast.success(`${payload.title} created successfully!`);

  } catch (error) {
    const apiError = error?.response?.data;

    if (apiError?.errors && typeof apiError.errors === 'object') {
      Object.entries(apiError.errors).forEach(([field, message]) => {
        toast.error(`Error in ${field}: ${message}`);
      });
    } else if (apiError?.message) {
      toast.error(`Failed to create reward: ${apiError.message}`);
    } else {
      toast.error(`Failed to create reward: ${error.message || 'Unknown error'}`);
    }

    setParsedResults(prev =>
      prev.map((item, i) => i === index ? { ...item, status: 'parsed' } : item)
    );
  }
};

  

  const handleRetry = (index) => {
    const item = parsedResults[index];
    if (item?.file) {
      handleRemove(index)
      handleImageUpload({ target: { files: [item.file] } });
    }
  };

  const handleRemove = (index) => {
    setParsedResults(prev => prev.filter((_, i) => i !== index));
  };

  const handleEdit = (index, field, value) => {
    setParsedResults(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
  };

  const handleCreateAll = async () => {
    setLoading(true);
    for (let i = 0; i < parsedResults.length; i++) {
      if (parsedResults[i].status === 'parsed') {
        await createSingleReward(parsedResults[i], i);
        await new Promise(res => setTimeout(res, 500));
      }
    }
    setLoading(false);
    toast.success('All rewards created successfully!');
  };
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Code copied to clipboard!');
  };
  return (
<div className="h-screen bg-slate-50 overflow-hidden flex flex-col">

{/* Header */}
<div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-8 py-5">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
    
    {/* Left: Title & Subtitle */}
    <div>
      <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
        Coupon Manager
      </h1>
      <p className="text-gray-600 text-sm mt-1">
        Upload coupons and create rewards automatically.
      </p>
    </div>

    {/* Right: Actions */}
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
      
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Upload Button */}
      <button
        onClick={() => fileInputRef.current?.click()}
        className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-2.5 rounded-lg flex items-center justify-center gap-2 font-medium border border-transparent w-full sm:w-auto"
      >
        <FiPlus className="w-4 h-4" />
        Upload Images
      </button>

      {/* Create All Button */}
      {parsedResults.some(p => p.status === 'parsed') && (
        <button
          disabled={loading}
          onClick={handleCreateAll}
          className={`px-6 py-2.5 rounded-lg text-white font-medium flex items-center justify-center gap-2 w-full sm:w-auto ${
            loading
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-gradient-to-r from-emerald-600 to-green-600 border border-transparent'
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
      )}
    </div>
  </div>
</div>


{/* Main Content */}
<div className="flex-1 overflow-auto px-6 py-8">
  <div className="max-w-7xl mx-auto">
    {
    parsedResults.length === 0 ? (
      <div className="h-full flex flex-col justify-center items-center text-center">
        <div className="bg-gradient-to-br from-cyan-100 to-blue-100 p-8 rounded-2xl mb-6 border border-gray-200">
          <FiImage className="w-16 h-16 text-cyan-600 mx-auto mb-4" />
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No coupons uploaded yet</h3>
        <p className="text-gray-500 max-w-md">
          Upload coupon images to automatically extract details and create rewards.
        </p>
      </div>
    ) : (
      <>
 

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
<div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
  
  {/* Image */}
  {(item.image_url || item.image) && (
    <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
      <img
        src={item.image_url || item.image}
        alt="Coupon"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
    </div>
  )}

  {/* Content */}
  <div className="p-4 flex flex-col flex-1 justify-between">

    {/* Status & Actions */}
    <div className="flex justify-between items-start mb-3">
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
        {getStatusIcon(item.status)}
        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
      </span>
      <div className="flex items-center gap-1">
        {item.status === 'parsed' && (
          <button onClick={() => setIsEditing(!isEditing)} className="p-1 hover:bg-gray-100 rounded-lg">
            <FiEdit3 className="w-3 h-3 text-gray-500" />
          </button>
        )}
        {item.status === 'failed' && (
          <button onClick={() => onRetry(index)} className="p-1 hover:bg-gray-100 rounded-lg">
            <FiRefreshCw className="w-3 h-3 text-gray-500" />
          </button>
        )}
        <button onClick={() => onRemove(index)} className="p-1 hover:bg-red-100 rounded-lg">
          <FiX className="w-3 h-3 text-red-500" />
        </button>
      </div>
    </div>

    {/* Editable / Non-Editable Section */}
    {isEditing ? (
      <div className="space-y-3">
        <input
          type="number"
          value={editData.points}
          onChange={(e) => setEditData({ ...editData, points: parseInt(e.target.value) || 10 })}
          placeholder="Points"
          className="w-full p-2 border border-gray-200 rounded-lg text-sm"
        />
        <div className="flex gap-2">
          <button
            onClick={handleSaveEdit}
            className="flex-1 bg-emerald-600 text-white py-2 rounded-lg text-sm hover:bg-emerald-700"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    ) : (
      <div className="space-y-3 flex flex-col flex-1 justify-between">

        <div className="space-y-2">
          <h3 className="font-semibold text-gray-800 text-base line-clamp-2">{item.name || 'Unnamed Coupon'}</h3>
          {item.description && (
            <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
          )}

          {(item['cupon-code'] || item.code) && (
            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
              <FiTag className="w-4 h-4 text-gray-500" />
              <code className="text-sm font-mono text-gray-800 flex-1">{item['cupon-code'] || item.code}</code>
              <button onClick={() => onCopyCode(item['cupon-code'] || item.code || '')} className="p-1 hover:bg-gray-200 rounded">
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
        </div>

        {item.status === 'parsed' && (
          <button
            onClick={() => onCreate(item, index)}
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white py-2.5 rounded-lg font-medium transition-transform transform hover:scale-105"
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
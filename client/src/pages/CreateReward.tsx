import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { rewardApi } from '../services/api';
import { FiCalendar, FiGift, FiHash, FiTag, FiAlertCircle } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

interface Category {
    _id: string;
    name: string;
    icon: string;
}

export const CreateReward = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState({
        title: '',
        description: '',
        points: '',
        code: '',
        expiryDate: '',
        category: ''
    });

    const [categories] = useState<Category[]>([
        { _id: '507f1f77bcf86cd799439011', name: 'Gaming', icon: '🎮' },
        { _id: '507f1f77bcf86cd799439012', name: 'Shopping', icon: '🛍️' },
        { _id: '507f1f77bcf86cd799439013', name: 'Entertainment', icon: '🎬' },
        { _id: '507f1f77bcf86cd799439014', name: 'Food & Drinks', icon: '🍽️' },
        { _id: '507f1f77bcf86cd799439015', name: 'Travel', icon: '✈️' },
    ]);

    const validateForm = () => {
        if (!form.title.trim()) return 'Title is required';
        if (!form.description.trim()) return 'Description is required';
        if (!form.points) return 'Points are required';
        if (Number(form.points) <= 0) return 'Points must be greater than 0';
        if (!form.code.trim()) return 'Code is required';
        if (!form.expiryDate) return 'Expiry date is required';
        if (new Date(form.expiryDate) < new Date()) return 'Expiry date must be in the future';
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            setLoading(true);
            setError('');
            
            const response = await rewardApi.create({
                title: form.title.trim(),
                description: form.description.trim(),
                points: Number(form.points),
                code: form.code.trim().toUpperCase(),
                expiryDate: form.expiryDate,
                category: form.category || undefined
            });

            toast.success('Reward created successfully!');
            navigate(`/rewards/${response.data._id}`);
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to create reward';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] py-8 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Create New Reward
                    </h2>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 rounded-lg 
                                      flex items-center gap-3 text-red-600 dark:text-red-400">
                            <FiAlertCircle className="w-5 h-5" />
                            <p>{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Title
                            </label>
                            <div className="relative">
                                <FiGift className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={form.title}
                                    onChange={e => setForm({ ...form, title: e.target.value })}
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                                             dark:bg-gray-800 focus:ring-2 focus:ring-cyan-500 focus:border-transparent
                                             text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                                    placeholder="Enter reward title"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Description
                            </label>
                            <textarea
                                value={form.description}
                                onChange={e => setForm({ ...form, description: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                                         dark:bg-gray-800 focus:ring-2 focus:ring-cyan-500 focus:border-transparent
                                         text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                                rows={4}
                                placeholder="Describe your reward"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Points Required
                                </label>
                                <div className="relative">
                                    <FiHash className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="number"
                                        value={form.points}
                                        onChange={e => setForm({ ...form, points: e.target.value })}
                                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                                                 dark:bg-gray-800 focus:ring-2 focus:ring-cyan-500 focus:border-transparent
                                                 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                                        placeholder="Enter points"
                                        min="0"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Expiry Date
                                </label>
                                <div className="relative">
                                    <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="date"
                                        value={form.expiryDate}
                                        onChange={e => setForm({ ...form, expiryDate: e.target.value })}
                                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                                                 dark:bg-gray-800 focus:ring-2 focus:ring-cyan-500 focus:border-transparent
                                                 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Category
                            </label>
                            <div className="relative">
                                <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <select
                                    value={form.category}
                                    onChange={e => setForm({ ...form, category: e.target.value })}
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                                             dark:bg-gray-800 focus:ring-2 focus:ring-cyan-500 focus:border-transparent
                                             text-gray-900 dark:text-white"
                                >
                                    <option value="" className="dark:bg-gray-800">Select a category</option>
                                    {categories.map(category => (
                                        <option key={category._id} value={category._id} className="dark:bg-gray-800">
                                            {category.icon} {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Reward Code
                            </label>
                            <input
                                type="text"
                                value={form.code}
                                onChange={e => setForm({ ...form, code: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                                         dark:bg-gray-800 focus:ring-2 focus:ring-cyan-500 focus:border-transparent
                                         font-mono
                                         text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                                placeholder="Enter reward code"
                            />
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                className="px-6 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700
                                         text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700
                                         transition-colors duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500
                                         text-white font-medium hover:from-blue-500 hover:to-cyan-500
                                         transition-all duration-200 disabled:opacity-50"
                            >
                                {loading ? 'Creating...' : 'Create Reward'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}; 
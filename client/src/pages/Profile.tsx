import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../services/api';  // Changed this line
import { toast } from 'react-hot-toast';
import { PageLayout } from '../components/PageLayout';
import { useNavigate } from 'react-router-dom';
import { FiEdit2, FiSave, FiX } from 'react-icons/fi';

// ... rest of the file remains the same

interface UserProfile {
    name: string;
    email: string;
    points: number;
    redeemedRewards: number;
}

export const Profile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);
    const [updateLoading, setUpdateLoading] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await authApi.getProfile();
            if (response.data) {
                setProfile(response.data);
                setEditedProfile(response.data);
                setError('');
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to load profile';
            console.log(errorMessage);
            // Only show error if user is authenticated (has token)
            if (localStorage.getItem('token')) {
                console.error('Profile fetch error:', err);
            }
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
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to update profile';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setUpdateLoading(false);
        }
    };

    // Add input handlers
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
        <div className="min-h-[80vh] p-8 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="relative p-8">
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-cyan-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <FiEdit2 className="w-5 h-5" />
                        </button>
                    ) : (
                        <div className="absolute top-4 right-4 flex space-x-2">
                            
                            <button
                            
                                onClick={handleUpdate}
                                disabled={updateLoading}
                                className="p-2 text-green-500 hover:bg-green-50 dark:hover:bg-gray-700 rounded-full"
                            >
                                <FiSave className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => {
                                    setIsEditing(false);
                                    setEditedProfile(profile);
                                }}
                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-gray-700 rounded-full"
                            >
                                <FiX className="w-5 h-5" />
                            </button>
                        </div>
                    )}

                    <div className="text-center mb-8">
                        <div className="w-24 h-24 bg-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                            {profile?.name?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {isEditing ? editedProfile?.name : profile?.name}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            {isEditing ? editedProfile?.email : profile?.email}
                        </p>
                    </div>

                    {isEditing ? (
                        <div className="mt-8 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={editedProfile?.name || ''}
                                    onChange={handleNameChange}
                                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-cyan-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={editedProfile?.email || ''}
                                    onChange={handleEmailChange}
                                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-cyan-500"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold mb-2 text-cyan-500">Points Balance</h3>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">{profile?.points}</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold mb-2 text-cyan-500">Rewards Redeemed</h3>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">{profile?.redeemedRewards}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}; 
import { useAuth } from '../context/AuthContext';
import { FiUser, FiLogOut, FiClock, FiGift} from 'react-icons/fi';
import { Menu } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { authApi } from '../services/api';
import toast from 'react-hot-toast';

interface UserProfile {
    name: string;
    email: string;
    points: number;
    redeemedRewards: number;
}

export const UserMenu = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);
    const [error, setError] = useState('');

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
            setError(errorMessage);
            toast.error(errorMessage);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <Menu as="div" className="relative">
            <Menu.Button className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                <span className="text-slate-700 dark:text-slate-200">{user?.name}</span>
                <div className="flex items-center gap-1 text-sm text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/50 px-3 py-1.5 rounded-full">
                    <span>{user?.points || profile?.points || 0} pts</span>
                </div>
            </Menu.Button>

            <Menu.Items className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg py-1 z-50">
                <Menu.Item>
                    {({ active }) => (
                        <Link
                            to="/profile"
                            className={`${
                                active ? 'bg-slate-50 dark:bg-slate-700' : ''
                            } flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200`}
                        >
                            <FiUser className="w-4 h-4" />
                            Profile
                        </Link>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({ active }) => (
                        <Link
                            to="/transactions"
                            className={`${
                                active ? 'bg-slate-50 dark:bg-slate-700' : ''
                            } flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200`}
                        >
                            <FiClock className="w-4 h-4" />
                            Transaction History
                        </Link>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({ active }) => (
                        <Link
                            to="/my-rewards"
                            className={`${
                                active ? 'bg-slate-50 dark:bg-slate-700' : ''
                            } flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200`}
                        >
                            <FiGift className="w-4 h-4" />
                            My Rewards
                        </Link>
                    )}
                </Menu.Item>
            </Menu.Items>
        </Menu>
    );
}; 
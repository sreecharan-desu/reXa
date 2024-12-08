import { useState, useEffect } from 'react';
import { PageLayout } from '../components/PageLayout';
import { transactionApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';

interface Transaction {
    _id: string;
    reward: {
        _id: string;
        title: string;
        points: number;
    };
    fromUser: {
        _id: string;
        name: string;
    };
    toUser: {
        _id: string;
        name: string;
    };
    points: number;
    type: 'redemption';
    createdAt: string;
}

export const TransactionHistory = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await transactionApi.getMyTransactions();
                setTransactions(response.data);
            } catch (error) {
                toast.error('Failed to load transaction history');
                console.error('Error fetching transactions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <PageLayout
            title="Transaction History"
            description="View your points transaction history"
        >
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
                </div>
            ) : transactions.length === 0 ? (
                <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No transactions yet</h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Start redeeming rewards to see your transaction history
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {transactions.map((transaction) => (
                        <motion.div
                            key={transaction._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-lg">
                                        {transaction.reward.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {format(new Date(transaction.createdAt), 'PPp')}
                                    </p>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-sm font-medium
                                    ${transaction.fromUser._id === user?._id 
                                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
                                        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                    }`}
                                >
                                    {transaction.fromUser._id === user?._id ? '-' : '+'}
                                    {transaction.points} points
                                </div>
                            </div>
                            <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                                {transaction.fromUser._id === user?._id ? (
                                    <p>Redeemed by: {transaction.toUser.name}</p>
                                ) : (
                                    <p>Received from: {transaction.fromUser.name}</p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </PageLayout>
    );
}; 
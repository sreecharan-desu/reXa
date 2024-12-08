import { useState, useEffect } from 'react';
import { transactionApi } from '../services/api';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { format } from 'date-fns';
import { FiGift, FiClock, FiUser, FiHash } from 'react-icons/fi';

interface Transaction {
    _id: string;
    fromUser: { _id: string; name: string };
    toUser: { _id: string; name: string };
    reward: { 
        _id: string; 
        title: string; 
        points: number;
        description: string;
        code: string;
    };
    type: 'redemption';
    createdAt: string;
}

export const TransactionHistory = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await transactionApi.getHistory();
                setTransactions(response.data || []);
            } catch (err) {
                console.error('Failed to fetch transactions:', err);
                setError('Failed to load transactions');
            } finally {
                setIsLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Transaction History
            </h2>
            
            <div className="space-y-6">
                {transactions.length > 0 ? (
                    transactions.map((transaction) => (
                        <div 
                            key={transaction._id}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                        >
                            {/* Transaction Header */}
                            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center space-x-2">
                                        <FiClock className="text-gray-400" />
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            {format(new Date(transaction.createdAt), 'MMM d, yyyy')}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-cyan-600 dark:text-cyan-400">
                                            {transaction.reward.points} points
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Reward Card */}
                            <div className="p-4">
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                                        <FiGift className="w-6 h-6 text-cyan-500" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {transaction.reward.title}
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                            {transaction.reward.description}
                                        </p>
                                        
                                        {/* Code Section */}
                                        <div className="mt-3 flex items-center space-x-2">
                                            <FiHash className="text-cyan-500" />
                                            <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">
                                                {transaction.reward.code}
                                            </code>
                                        </div>

                                        {/* Users Info */}
                                        <div className="mt-3 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                                            <FiUser className="text-gray-400" />
                                            <span>
                                                From <span className="font-medium">{transaction.fromUser.name}</span> to{' '}
                                                <span className="font-medium">{transaction.toUser.name}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400">
                            No transactions found
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}; 
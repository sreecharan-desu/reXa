import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { transactionApi } from '../services/api';
import { Transaction } from '../types/transaction';
import { LoadingSpinner } from './LoadingSpinner';

export const TransactionHistory = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await transactionApi.getHistory();
                setTransactions(response.data);
            } catch (err) {
                console.error('Failed to fetch transactions:', err);
                setError('Failed to load transaction history');
            } finally {
                setIsLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Transaction History</h2>
            {transactions.length === 0 ? (
                <p className="text-gray-500">No transactions yet</p>
            ) : (
                <div className="space-y-3">
                    {transactions.map((transaction) => (
                        <div 
                            key={transaction._id}
                            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-medium">
                                        {transaction.reward.title}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        From {transaction.fromUser.name} to {transaction.toUser.name}
                                    </p>
                                    <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Reward Code:</p>
                                        <code className="text-sm font-mono bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">
                                            {transaction.reward.code}
                                        </code>
                                    </div>
                                    {transaction.reward.description && (
                                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                            {transaction.reward.description}
                                        </p>
                                    )}
                                </div>
                                <div className="text-right">
                                    <p className="font-medium text-cyan-600">
                                        {transaction.reward.points} points
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {format(new Date(transaction.createdAt), 'MMM d, yyyy')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}; 
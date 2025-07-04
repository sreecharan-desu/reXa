import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { transactionApi } from '../services/api';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { format } from 'date-fns';
import { FiGift, FiClock, FiUser, FiHash } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { transactionsState, transactionsLoadingState, transactionsErrorState } from '../store/atoms';

export const TransactionHistory = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useRecoilState(transactionsState);
  const [isLoading, setIsLoading] = useRecoilState(transactionsLoadingState);
  const [error, setError] = useRecoilState(transactionsErrorState);

  const fetchTransactions = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await transactionApi.getHistory();
      const data = Array.isArray(response.data) ? response.data : [];
      setTransactions(data);
    } catch (err) {
      console.error('Failed to fetch transactions:', err);
      setError('Failed to load transactions');
      setTransactions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {

    if (!transactions || transactions.length === 0) {
      fetchTransactions();
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

  return (
    <div className="space-y-6 min-h-screen px-4 sm:px-6 lg:px-12 py-6 sm:py-8 max-w-5xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
        Transaction History
      </h2>

      <div className="space-y-6">
      {transactions.length > 0 ? (
  transactions.map((transaction) => (
    <div key={transaction._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      
      <div className="p-4 sm:p-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
          <div className="flex items-center space-x-2">
            <FiClock className="text-gray-400" />
            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {format(new Date(transaction.createdAt), 'MMM d, yyyy')}
            </span>
          </div>
          <div className="text-right">
            <p className="font-medium text-cyan-600 dark:text-cyan-400 text-sm sm:text-base">
              {(transaction.reward?.points ?? transaction.points ?? 0)} points
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
            <FiGift className="w-6 h-6 text-cyan-500" />
          </div>
          <div className="flex-1">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
  {transaction.reward?.title ?? 'Deleted Reward'}
  
  <span className={`px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-md border border-white/20 shadow-sm
  ${transaction.reward ? '' : 'bg-red-500/10 text-red-500'}`}>
  {transaction.reward ? '' : 'Deleted'}
</span>

</h3>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {transaction.reward?.description ?? ''}
            </p>

            {transaction.reward?.code && (
              <div className="mt-3 flex flex-wrap items-center space-x-2 text-sm">
                <FiHash className="text-cyan-500" />
                <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded font-mono break-words">
                  {transaction.reward.code}
                </code>
              </div>
            )}

            <div className="mt-3 flex flex-wrap items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <FiUser className="text-gray-400" />
              <span>
                From <span className="font-medium">
                  {transaction.fromUser?._id === user?._id ? 'You' : transaction.fromUser?.name ?? 'Unknown'}
                </span> to <span className="font-medium">
                  {transaction.toUser?._id === user?._id ? 'You' : transaction.toUser?.name ?? 'Unknown'}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))
) : (
  <div className="text-center py-8">
    <p className="text-gray-500 dark:text-gray-400">No transactions found</p>
  </div>
)}

      </div>
    </div>
  );
};

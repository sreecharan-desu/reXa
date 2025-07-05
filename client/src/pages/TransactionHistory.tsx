import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { transactionApi } from '../services/api';
import { FiGift, FiClock, FiUser, FiHash, FiSearch, FiFilter, FiX } from 'react-icons/fi';
import { format, isWithinInterval } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import { transactionsState, transactionsLoadingState, transactionsErrorState } from '../store/atoms';
import { LoadingSpinner } from '../components/LoadingSpinner';

interface Transaction {
  _id: string;
  fromUser: { _id: string; name: string };
  toUser: { _id: string; name: string };
  points: number;
  reward: { _id: string; title: string; description: string; points: number; code?: string } | null;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export const TransactionHistory = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useRecoilState(transactionsState);
  const [isLoading, setIsLoading] = useRecoilState(transactionsLoadingState);
  const [error, setError] = useRecoilState(transactionsErrorState);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<[string, string]>(['', '']);
  const [pointsRange, setPointsRange] = useState<[number, number]>([0, 100]);
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(transactions);

  const fetchTransactions = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await transactionApi.getHistory();
      const data = Array.isArray(response.data) ? response.data : [];
      setTransactions(data);
      setFilteredTransactions(data);
    } catch (err) {
      console.error('Failed to fetch transactions:', err);
      setError('Failed to load transactions');
      setTransactions([]);
      setFilteredTransactions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!transactions || transactions.length === 0) {
      fetchTransactions();
    } else {
      setIsLoading(false);
      setFilteredTransactions(transactions);
    }
  }, [transactions]);

  useEffect(() => {
    const filtered = transactions.filter(transaction => {
      const matchesSearch =
        (transaction.reward?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
         transaction.reward?.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
         transaction.fromUser.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         transaction.toUser.name.toLowerCase().includes(searchQuery.toLowerCase())) ??
        true;
      const matchesPoints = transaction.points >= pointsRange[0] && transaction.points <= pointsRange[1];
      const matchesType = !typeFilter || transaction.type === typeFilter;
      const transactionDate = new Date(transaction.createdAt);
      const matchesDate =
        !dateRange[0] || !dateRange[1] ||
        isWithinInterval(transactionDate, {
          start: new Date(dateRange[0]),
          end: new Date(dateRange[1]),
        });
      return matchesSearch && matchesPoints && matchesType && matchesDate;
    });
    setFilteredTransactions(filtered);
  }, [searchQuery, pointsRange, typeFilter, dateRange, transactions]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setDateRange(['', '']);
    setPointsRange([0, 100]);
    setTypeFilter('');
    setShowFilters(false);
  };

  return (
    <div className="space-y-6 min-h-screen px-4 sm:px-6 lg:px-12 py-6 sm:py-8 max-w-5xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
        Transaction History
      </h2>

      {/* Search Bar and Filters */}
      <div className="bg-white dark:bg-gray-800 shadow-sm p-4 rounded-lg sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search transactions by reward title, description, or user..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 transition-shadow duration-200"
          >
            <FiFilter className="w-5 h-5" />
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold text-gray-800 dark:text-white">Filters</h4>
              <button
                onClick={handleClearFilters}
                className="text-sm text-cyan-600 hover:text-cyan-700 flex items-center gap-1"
              >
                <FiX className="w-4 h-4" /> Clear Filters
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Points Range
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    value={pointsRange[0]}
                    onChange={(e) => setPointsRange([+e.target.value, pointsRange[1]])}
                    placeholder="Min"
                    className="w-1/2 p-2 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-cyan-500"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    value={pointsRange[1]}
                    onChange={(e) => setPointsRange([pointsRange[0], +e.target.value])}
                    placeholder="Max"
                    className="w-1/2 p-2 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Transaction Type
                </label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="">All Types</option>
                  <option value="redemption">Redemption</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date Range
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="date"
                    value={dateRange[0]}
                    onChange={(e) => setDateRange([e.target.value, dateRange[1]])}
                    className="w-1/2 p-2 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-cyan-500"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="date"
                    value={dateRange[1]}
                    onChange={(e) => setDateRange([dateRange[0], e.target.value])}
                    className="w-1/2 p-2 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

  
      {/* Transaction List */}
      <div className="space-y-6">
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-red-500 text-center py-4">{error}</div>
        ) : filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <div
              key={transaction._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
            >
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
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full border border-white/20 shadow-sm ${
                          transaction.reward ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-red-100 text-red-500 border-red-200'
                        }`}
                      >
                        {transaction.reward ? 'Active' : 'Deleted'}
                      </span>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {transaction.reward?.description ?? 'No description available.'}
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
                        From{' '}
                        <span className="font-medium">
                          {transaction.fromUser?._id === user?._id ? 'You' : transaction.fromUser?.name ?? 'Unknown'}
                        </span>{' '}
                        to{' '}
                        <span className="font-medium">
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
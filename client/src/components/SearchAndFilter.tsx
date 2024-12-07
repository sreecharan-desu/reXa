import { useState } from 'react';

interface SearchAndFilterProps {
    onSearch: (query: string) => void;
    onSort: (sortBy: string) => void;
}

export const SearchAndFilter = ({ onSearch, onSort }: SearchAndFilterProps) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch(query);
    };

    return (
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search rewards..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full md:w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg
                    className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>
            <select
                onChange={(e) => onSort(e.target.value)}
                className="w-full md:w-auto px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="points-high">Highest Points</option>
                <option value="points-low">Lowest Points</option>
            </select>
        </div>
    );
}; 
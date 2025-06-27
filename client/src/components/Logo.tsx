import { Link } from 'react-router-dom';

export const Logo = () => {
    return (
        <Link to="/" className="flex items-center gap-2">
            <svg 
                className="w-8 h-8" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path 
                    d="M12 2L2 7L12 12L22 7L12 2Z" 
                    className="fill-cyan-500"
                />
                <path 
                    d="M2 17L12 22L22 17M2 12L12 17L22 12" 
                    className="stroke-blue-500" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                />
            </svg>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                reXa
            </span>
        </Link>
    );
};
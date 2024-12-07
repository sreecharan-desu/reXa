import { Link } from 'react-router-dom';

interface ProfileIconProps {
    name: string;
    points?: number;
}

export const ProfileIcon: React.FC<ProfileIconProps> = ({ name, points }) => {
    const initials = name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <Link to="/profile" className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 
                          flex items-center justify-center text-white font-semibold text-sm
                          shadow-md hover:shadow-lg transition-shadow">
                {initials}
            </div>
        </Link>
    );
}; 
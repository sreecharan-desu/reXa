import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

interface FloatingActionButtonProps {
    onClick: () => void;
    Icon: IconType;
    label: string;
}

export const FloatingActionButton = ({ onClick, Icon, label }: FloatingActionButtonProps) => {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-8 right-8 flex items-center gap-2 px-6 py-3
                bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full
                shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{label}</span>
        </motion.button>
    );
}; 
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageLayoutProps {
    children: ReactNode;
    title?: string;
    grid?: boolean;
}

export const PageLayout = ({ children, title, grid = false }: PageLayoutProps) => {
    const Content = () => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className={grid ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : ""}
        >
            {children}
        </motion.div>
    );

    return (
        <div className="min-h-screen pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {title && (
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-bold mb-8 text-transparent bg-clip-text 
                            bg-gradient-to-r from-primary-600 to-primary-400 
                            dark:from-primary-400 dark:to-primary-200"
                    >
                        {title}
                    </motion.h1>
                )}
                <Content />
            </div>
        </div>
    );
}; 
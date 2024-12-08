import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

interface PageLayoutProps {
    title: string;
    description?: string;
    children: ReactNode;
    grid?: boolean;
}

export const PageLayout = ({ title, description, children, grid }: PageLayoutProps) => {
    return (
        <div className="flex gap-6">
            <Sidebar />
            <div className="flex-1">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
                    {description && (
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
                    )}
                </div>
                <div className={grid ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : ""}>
                    {children}
                </div>
            </div>
        </div>
    );
}; 
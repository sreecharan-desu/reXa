import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

interface PageLayoutProps {
    children: React.ReactNode;
    title?: string;
    action?: React.ReactNode;
}

export const PageLayout = ({ children, title, action }: PageLayoutProps) => {
    return (
        <div className="min-h-screen pl-16">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {(title || action) && (
                    <div className="flex justify-between items-center mb-6">
                        {title && (
                            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                {title}
                            </h1>
                        )}
                        {action && (
                            <div className="flex-shrink-0">
                                {action}
                            </div>
                        )}
                    </div>
                )}
                {children}
            </main>
        </div>
    );
}; 
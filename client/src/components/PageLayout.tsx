

interface PageLayoutProps {
    children: React.ReactNode;
    title?: string;
    action?: React.ReactNode;
}

export const PageLayout = ({ children, title, action }: PageLayoutProps) => {
    return (
        <div className="min-h-screen">
            <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
                {(title || action) && (
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-4 sm:mb-6">
                        {(title  ) && (
                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white">
                                {title}
                            </h1>
                        )}
                        {action && (
                            <div className="flex-shrink-0 w-full sm:w-auto">
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
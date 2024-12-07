export const SkeletonLoader = () => {
    return (
        <div className="animate-pulse space-y-4">
            <div className="h-48 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
            <div className="space-y-3">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
            </div>
        </div>
    );
}; 
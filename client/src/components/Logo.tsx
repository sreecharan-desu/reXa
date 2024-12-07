export const Logo = () => {
    return (
        <svg 
            width="40" height="40" 
            viewBox="0 0 40 40" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="group"
        >
            <g className="transform-gpu">
                {/* Stacked Platforms with Subtle Vertical Hover Animations */}
                {/* Top Platform */}
                <path 
                    d="M8 14L20 7L32 14L20 21L8 14Z" 
                    className="fill-[url(#top-gradient)]
                        transform transition-all duration-300 ease-in-out
                        group-hover:-translate-y-2"
                />
                
                {/* Middle Platform */}
                <path 
                    d="M8 21L20 14L32 21L20 28L8 21Z" 
                    className="fill-[url(#middle-gradient)] opacity-90
                        transform transition-all duration-300 ease-in-out
                        group-hover:translate-y-1"
                />
                
                {/* Bottom Platform */}
                <path 
                    d="M8 28L20 21L32 28L20 35L8 28Z" 
                    className="fill-[url(#bottom-gradient)] opacity-80
                        transform transition-all duration-300 ease-in-out
                        group-hover:translate-y-3"
                />

                {/* Gradients */}
                <defs>
                    <linearGradient 
                        id="top-gradient" 
                        x1="8" 
                        y1="7" 
                        x2="32" 
                        y2="21" 
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#4F46E5" />
                        <stop offset="1" stopColor="#6366F1" />
                    </linearGradient>

                    <linearGradient 
                        id="middle-gradient" 
                        x1="8" 
                        y1="14" 
                        x2="32" 
                        y2="28" 
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#6366F1" />
                        <stop offset="1" stopColor="#7C3AED" />
                    </linearGradient>

                    <linearGradient 
                        id="bottom-gradient" 
                        x1="8" 
                        y1="21" 
                        x2="32" 
                        y2="35" 
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#818CF8" />
                        <stop offset="1" stopColor="#8B5CF6" />
                    </linearGradient>
                </defs>
            </g>
        </svg>
    );
};
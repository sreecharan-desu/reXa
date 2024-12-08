import React from 'react';
import { motion } from 'framer-motion';
import { 
    FiGift, FiUser, FiLock, FiCode, FiDatabase, FiShield, 
    FiServer, FiLayout, FiPackage, FiTool, FiRefreshCw,
    FiTerminal, FiCpu, FiHardDrive, FiSettings, FiCloud
} from 'react-icons/fi';

const CodeBlock = ({ code }: { code: string }) => (
    <pre className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-sm overflow-x-auto">
        <code>{code}</code>
    </pre>
);

const Section = ({ icon: Icon, title, children }: { 
    icon: any, 
    title: string, 
    children: React.ReactNode 
}) => (
    <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
            <Icon className="w-6 h-6 text-cyan-500" />
            <h2 className="text-2xl font-semibold">{title}</h2>
        </div>
        {children}
    </section>
);

const Documentation = () => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
            >
                <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                    reX Platform Documentation
                </h1>

                {/* Table of Contents */}
                <Section icon={FiGift} title="Table of Contents 📚">
                    <nav className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-medium text-lg mb-2">Platform Basics</h3>
                            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                <li>• Introduction</li>
                                <li>• Quick Start Guide</li>
                                <li>• Core Concepts</li>
                                <li>• Architecture Overview</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-medium text-lg mb-2">Technical Details</h3>
                            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                <li>• Frontend Architecture</li>
                                <li>• Backend Services</li>
                                <li>• Data Models</li>
                                <li>• API Reference</li>
                            </ul>
                        </div>
                    </nav>
                </Section>

                {/* Introduction */}
                <Section icon={FiGift} title="Introduction to reX 👋">
                    <div className="space-y-4 text-gray-600 dark:text-gray-300">
                        <p>
                            reX is a modern reward exchange platform that enables users to share and trade digital rewards
                            in a secure and efficient manner. Built with scalability and user experience in mind, reX
                            leverages cutting-edge web technologies to provide a seamless reward management system.
                        </p>
                        
                        <div className="bg-cyan-50 dark:bg-cyan-900/30 p-4 rounded-lg">
                            <h3 className="font-medium text-lg mb-2">Key Platform Features</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Secure user authentication and authorization</li>
                                <li>Real-time reward tracking and management</li>
                                <li>Point-based economy system</li>
                                <li>Transaction history and analytics</li>
                                <li>Category-based reward organization</li>
                                <li>Dark mode support</li>
                                <li>Responsive design for all devices</li>
                            </ul>
                        </div>

                        <div className="mt-6">
                            <h3 className="font-medium text-lg mb-2">Technology Stack</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <h4 className="font-medium mb-2">Frontend</h4>
                                    <ul className="space-y-1 text-sm">
                                        <li>• React 18</li>
                                        <li>• TypeScript</li>
                                        <li>• TailwindCSS</li>
                                        <li>• Framer Motion</li>
                                        <li>• React Router 6</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <h4 className="font-medium mb-2">Backend</h4>
                                    <ul className="space-y-1 text-sm">
                                        <li>• Node.js</li>
                                        <li>• Express.js</li>
                                        <li>• MongoDB</li>
                                        <li>• JWT Auth</li>
                                        <li>• WebSocket</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <h4 className="font-medium mb-2">DevOps</h4>
                                    <ul className="space-y-1 text-sm">
                                        <li>• Docker</li>
                                        <li>• GitHub Actions</li>
                                        <li>• Vercel</li>
                                        <li>• MongoDB Atlas</li>
                                        <li>• Jest & Testing Library</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Quick Start Guide */}
                <Section icon={FiTerminal} title="Quick Start Guide 🚀">
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-xl font-medium">Prerequisites</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                                <li>Node.js 16 or higher</li>
                                <li>MongoDB 4.4 or higher</li>
                                <li>npm or yarn package manager</li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-medium">Installation Steps</h3>
                            <div className="space-y-4">
                                <CodeBlock code={`# Clone the repository
git clone https://github.com/your-username/rex-platform.git

# Install dependencies
cd rex-platform
npm install

# Set up environment variables
cp .env.example .env

# Start development server
npm run dev`} />
                            </div>
                        </div>

                        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Environment Variables</h4>
                            <CodeBlock code={`MONGODB_URI=mongodb://localhost:27017/rex
JWT_SECRET=your-secret-key
API_URL=http://localhost:3000
NODE_ENV=development`} />
                        </div>
                    </div>
                </Section>

                {/* Core Concepts */}
                <Section icon={FiCpu} title="Core Concepts 💡">
                    <div className="space-y-6 text-gray-600 dark:text-gray-300">
                        <div>
                            <h3 className="text-xl font-medium mb-3">Point System</h3>
                            <p className="mb-4">
                                The reX platform uses a point-based system to facilitate reward exchanges. Points are earned and spent
                                through various activities:
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <h4 className="font-medium mb-2">Earning Points</h4>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>Creating new rewards</li>
                                        <li>Sharing rewards</li>
                                        <li>Active participation</li>
                                        <li>Referral bonuses</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <h4 className="font-medium mb-2">Spending Points</h4>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>Redeeming rewards</li>
                                        <li>Premium features</li>
                                        <li>Special offers</li>
                                        <li>Upgrades</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-medium mb-3">Reward Lifecycle</h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <h4 className="font-medium mb-2">1. Creation</h4>
                                    <p className="text-sm">User creates a new reward with details and point value</p>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <h4 className="font-medium mb-2">2. Available</h4>
                                    <p className="text-sm">Reward is listed and available for redemption</p>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <h4 className="font-medium mb-2">3. Redemption</h4>
                                    <p className="text-sm">Another user redeems the reward using points</p>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <h4 className="font-medium mb-2">4. Completed</h4>
                                    <p className="text-sm">Transaction is recorded and points are transferred</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Architecture Deep Dive */}
                <Section icon={FiServer} title="Architecture Deep Dive 🏗️">
                    <div className="space-y-6 text-gray-600 dark:text-gray-300">
                        <div>
                            <h3 className="text-xl font-medium mb-3">System Architecture</h3>
                            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                                <CodeBlock code={`
Frontend (React + TypeScript)
    ├── Components/
    │   ├── Shared UI Components
    │   └── Feature-specific Components
    ├── Pages/
    │   └── Route Components
    ├── Context/
    │   └── Global State Management
    ├── Services/
    │   └── API Integration
    └── Utils/
        └── Helper Functions

Backend (Node.js + Express)
    ├── Controllers/
    │   └── Business Logic
    ├── Models/
    │   └── Data Schemas
    ├── Routes/
    │   └── API Endpoints
    ├── Middleware/
    │   └── Request Processing
    └── Utils/
        └── Helper Functions`} />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-medium mb-3">State Management</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <h4 className="font-medium mb-2">Client State</h4>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>React Context API</li>
                                        <li>Local Component State</li>
                                        <li>Form State Management</li>
                                        <li>UI State Persistence</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <h4 className="font-medium mb-2">Server State</h4>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>MongoDB Collections</li>
                                        <li>Session Management</li>
                                        <li>Cache Strategies</li>
                                        <li>Real-time Updates</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Security Implementation */}
                <Section icon={FiShield} title="Security Implementation 🔒">
                    <div className="space-y-6 text-gray-600 dark:text-gray-300">
                        <div>
                            <h3 className="text-xl font-medium mb-3">Authentication Flow</h3>
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-4">
                                <CodeBlock code={`
1. User submits credentials
2. Server validates credentials
3. JWT token generated
4. Token stored in HTTP-only cookie
5. Client includes cookie in requests
6. Server validates token on protected routes`} />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-medium mb-3">Security Measures</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <h4 className="font-medium mb-2">API Security</h4>
                                    <ul className="space-y-1 text-sm">
                                        <li>• Rate Limiting</li>
                                        <li>• CORS Configuration</li>
                                        <li>• Input Validation</li>
                                        <li>• Request Sanitization</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <h4 className="font-medium mb-2">Data Security</h4>
                                    <ul className="space-y-1 text-sm">
                                        <li>• Password Hashing</li>
                                        <li>• Data Encryption</li>
                                        <li>• Secure Headers</li>
                                        <li>• XSS Prevention</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <h4 className="font-medium mb-2">Infrastructure</h4>
                                    <ul className="space-y-1 text-sm">
                                        <li>• SSL/TLS</li>
                                        <li>• DDoS Protection</li>
                                        <li>• Regular Backups</li>
                                        <li>• Monitoring</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Performance Optimization */}
                <Section icon={FiRefreshCw} title="Performance Optimization ⚡">
                    <div className="space-y-6 text-gray-600 dark:text-gray-300">
                        <div>
                            <h3 className="text-xl font-medium mb-3">Frontend Optimization</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <h4 className="font-medium mb-2">Code Optimization</h4>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>Code splitting</li>
                                        <li>Lazy loading</li>
                                        <li>Tree shaking</li>
                                        <li>Bundle optimization</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <h4 className="font-medium mb-2">Runtime Optimization</h4>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>Memoization</li>
                                        <li>Virtual scrolling</li>
                                        <li>Image optimization</li>
                                        <li>Debouncing/Throttling</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-medium mb-3">Backend Optimization</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <h4 className="font-medium mb-2">Database</h4>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>Indexing strategies</li>
                                        <li>Query optimization</li>
                                        <li>Connection pooling</li>
                                        <li>Caching layer</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <h4 className="font-medium mb-2">API</h4>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>Response compression</li>
                                        <li>Pagination</li>
                                        <li>Batch operations</li>
                                        <li>Cache headers</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Testing Strategy */}
                <Section icon={FiTool} title="Testing Strategy 🧪">
                    <div className="space-y-6 text-gray-600 dark:text-gray-300">
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                <h4 className="font-medium mb-2">Unit Tests</h4>
                                <ul className="space-y-1 text-sm">
                                    <li>• Jest</li>
                                    <li>• React Testing Library</li>
                                    <li>• Component Testing</li>
                                    <li>• Utility Functions</li>
                                </ul>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                <h4 className="font-medium mb-2">Integration Tests</h4>
                                <ul className="space-y-1 text-sm">
                                    <li>• API Testing</li>
                                    <li>• Database Operations</li>
                                    <li>• Authentication Flow</li>
                                    <li>• Business Logic</li>
                                </ul>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                <h4 className="font-medium mb-2">E2E Tests</h4>
                                <ul className="space-y-1 text-sm">
                                    <li>• Cypress</li>
                                    <li>• User Flows</li>
                                    <li>• Critical Paths</li>
                                    <li>• Cross-browser Testing</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Section>
            </motion.div>
        </div>
    );
};

export default Documentation;

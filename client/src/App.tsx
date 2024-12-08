import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import { CreateReward } from './pages/CreateReward';
import { MyRewards } from './pages/MyRewards';
import { RewardDetails } from './pages/RewardDetails';
import { EditReward } from './pages/EditReward';
import { Documentation } from './pages/Documentation';
import { TransactionHistory } from './pages/TransactionHistory';
import { NotFound } from './pages/NotFound';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/documentation" element={<Documentation />} />
                <Route path="/rewards/:id" element={<RewardDetails />} />
                
                {/* Protected Routes */}
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                } />
                <Route path="/rewards/create" element={
                    <ProtectedRoute>
                        <CreateReward />
                    </ProtectedRoute>
                } />
                <Route path="/rewards/:id/edit" element={
                    <ProtectedRoute>
                        <EditReward />
                    </ProtectedRoute>
                } />
                <Route path="/my-rewards" element={
                    <ProtectedRoute>
                        <MyRewards />
                    </ProtectedRoute>
                } />
                <Route path="/transactions" element={
                    <ProtectedRoute>
                        <TransactionHistory />
                    </ProtectedRoute>
                } />
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;

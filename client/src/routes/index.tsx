import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../pages/Home';
import { SignIn } from '../pages/SignIn';
import { Register } from '../pages/Register';
import { Profile } from '../pages/Profile';
import  CreateReward  from '../pages/CreateReward';
import { RewardDetails } from '../pages/RewardDetails';
import { MyRewards } from '../pages/MyRewards';
import { EditReward } from '../pages/EditReward';
import { useAuth } from '../context/AuthContext';
import Documentation from '../pages/Documentation';
import { TransactionHistory } from '../pages/TransactionHistory';
import { ProtectedRoute } from '../components/ProtectedRoute';

export const AppRoutes = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/documentation" element={<Documentation />} />
            {/* Protected Routes */}
            <Route 
                path="/profile" 
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/rewards/create" 
                element={
                    <ProtectedRoute>
                        <CreateReward />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/rewards/:id" 
                element={
                    <ProtectedRoute>
                        <RewardDetails />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/rewards/:id/edit" 
                element={
                    <ProtectedRoute>
                        <EditReward />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/my-rewards" 
                element={
                    <ProtectedRoute>
                        <MyRewards />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/transactions" 
                element={
                    <ProtectedRoute>
                        <TransactionHistory />
                    </ProtectedRoute>
                } 
            />
            
            {/* 404 Route */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}; 
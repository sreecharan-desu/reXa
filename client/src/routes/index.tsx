import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../pages/Home';
import { SignIn } from '../pages/SignIn';
import { Register } from '../pages/Register';
import { Profile } from '../pages/Profile';
import { CreateReward } from '../pages/CreateReward';
import { RewardDetails } from '../pages/RewardDetails';
import { MyRewards } from '../pages/MyRewards';
import { EditReward } from '../pages/EditReward';
import { useAuth } from '../context/AuthContext';
import Documentation from '../pages/Documentation';

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
                element={isAuthenticated ? <Profile /> : <Navigate to="/signin" />} 
            />
            <Route 
                path="/rewards/create" 
                element={isAuthenticated ? <CreateReward /> : <Navigate to="/signin" />} 
            />
            <Route 
                path="/rewards/:id" 
                element={isAuthenticated ? <RewardDetails /> : <Navigate to="/signin" />} 
            />
            <Route 
                path="/rewards/:id/edit" 
                element={isAuthenticated ? <EditReward /> : <Navigate to="/signin" />} 
            />
            <Route 
                path="/my-rewards" 
                element={isAuthenticated ? <MyRewards /> : <Navigate to="/signin" />} 
            />
            
            {/* 404 Route */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}; 
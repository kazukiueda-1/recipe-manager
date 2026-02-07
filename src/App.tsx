import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext.tsx';
import { SettingsProvider } from './contexts/SettingsContext.tsx';
import Header from './components/common/Header.tsx';
import HomePage from './pages/HomePage.tsx';
import RecipeListPage from './pages/RecipeListPage.tsx';
import RecipeDetailPage from './pages/RecipeDetailPage.tsx';
import RecipeEditPage from './pages/RecipeEditPage.tsx';
import RecipeNewPage from './pages/RecipeNewPage.tsx';
import UrlImportPage from './pages/UrlImportPage.tsx';
import VoiceImportPage from './pages/VoiceImportPage.tsx';
import ImageImportPage from './pages/ImageImportPage.tsx';
import SettingsPage from './pages/SettingsPage.tsx';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/recipe-manager/" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/recipe-manager/" element={<HomePage />} />
      <Route path="/recipe-manager/recipes" element={<ProtectedRoute><RecipeListPage /></ProtectedRoute>} />
      <Route path="/recipe-manager/recipes/new" element={<ProtectedRoute><RecipeNewPage /></ProtectedRoute>} />
      <Route path="/recipe-manager/recipes/new/url" element={<ProtectedRoute><UrlImportPage /></ProtectedRoute>} />
      <Route path="/recipe-manager/recipes/new/voice" element={<ProtectedRoute><VoiceImportPage /></ProtectedRoute>} />
      <Route path="/recipe-manager/recipes/new/image" element={<ProtectedRoute><ImageImportPage /></ProtectedRoute>} />
      <Route path="/recipe-manager/recipes/:id" element={<ProtectedRoute><RecipeDetailPage /></ProtectedRoute>} />
      <Route path="/recipe-manager/recipes/:id/edit" element={<ProtectedRoute><RecipeEditPage /></ProtectedRoute>} />
      <Route path="/recipe-manager/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/recipe-manager/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SettingsProvider>
          <Header />
          <AppRoutes />
        </SettingsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

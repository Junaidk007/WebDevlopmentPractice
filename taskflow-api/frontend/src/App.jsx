import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MyContextProvider } from './Context/MyContext';
import { useMyContext } from './Context/context';
import Auth from './Pages/Auth/Auth';
import Dashboard from './Pages/Dashboard/Dashboard';

// Protects private pages (dashboard/tasks).
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useMyContext();

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  return children;
}

// Prevents showing login/register after user is already logged in.
function PublicAuthRoute({ children }) {
  const { isAuthenticated } = useMyContext();

  if (isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path='/auth'
        element={
          <PublicAuthRoute>
            <Auth />
          </PublicAuthRoute>
        }
      />
      <Route
        path='/'
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <MyContextProvider>
      <BrowserRouter>
        <main>
          <AppRoutes />
        </main>
      </BrowserRouter>
    </MyContextProvider>
  );
}

export default App;

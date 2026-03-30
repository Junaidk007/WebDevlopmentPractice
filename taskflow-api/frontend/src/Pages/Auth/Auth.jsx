import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../../Services/api';
import { useMyContext } from '../../Context/context';
import './auth.css';
import LoginForm from '../../Components/auth/LoginForm';
import SignupForm from '../../Components/auth/SignupForm';
import ThemeToggle from '../../Components/layout/ThemeToggle';

function Auth() {
    const navigate = useNavigate();
    const { login } = useMyContext();

    const [isLogin, setIsLogin] = useState(true);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        fullName: '',
        confirmPassword: ''
    }); 

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (error) {
            setError('');
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError('');
        setFormData({
            fullName: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
        setShowPassword(false);
        setShowConfirmPassword(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            if (isLogin) {
                const response = await loginUser({
                    email: formData.email,
                    password: formData.password
                });

                login(response.token);
                navigate('/');
            } else {
                if (formData.password !== formData.confirmPassword) {
                    setError('Passwords do not match.');
                    setIsSubmitting(false);
                    return;
                }

                await registerUser({
                    name: formData.fullName,
                    email: formData.email,
                    password: formData.password,
                    role: 'user'
                });

                // Switch back to login after successful registration
                setIsLogin(true);
                setFormData({
                    fullName: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
                setError('');
            }
        } catch (apiError) { 
            setError(apiError.message || (isLogin ? 'Unable to login. Please try again.' : 'Unable to register. Please try again.'));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="login-page">
            <div className="auth-theme-toggle">
                <ThemeToggle />
            </div>
            <div className={`login-container`}>
                
                {/* Form Side */}
                <div className="form-container">
                    <div className="form-content">
                        <h1 className="login-title">{isLogin ? 'Sign in' : 'Create Account'}</h1>
                        <p className="login-subtitle">
                    {isLogin ? 'Welcome back. Continue to your workspace.' : 'Set up your workspace in a few seconds.'}
                        </p>

                        {isLogin ? (
                            <LoginForm
                                formData={formData}
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                                showPassword={showPassword}
                                setShowPassword={setShowPassword}
                                error={error}
                                isSubmitting={isSubmitting}
                            />
                        ) : (
                            <SignupForm
                                formData={formData}
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                                showPassword={showPassword}
                                setShowPassword={setShowPassword}
                                showConfirmPassword={showConfirmPassword}
                                setShowConfirmPassword={setShowConfirmPassword}
                                error={error}
                                isSubmitting={isSubmitting}
                            />
                        )}

                        {isLogin && <p className="forgot-password">Forgot your password?</p>}
                    </div>
                </div>

                {/* Banner Side */}
                <div className="toggle-container">
                    <h1 style={{ whiteSpace: 'pre-line' }}>{isLogin ? 'Create,\nAccount!' : 'Welcome\nBack!'}</h1>
                    <p>
                        {isLogin 
                            ? "Sign up if you still don't have an account ..." 
                            : "To keep connected with us please login with your personal info"}
                    </p>
                    <button 
                        type="button" 
                        className="ghost-btn" 
                        onClick={toggleMode}
                    >
                        {isLogin ? 'Create account' : 'Sign in'}
                    </button>
                </div>

            </div>
        </section>
    );
}

export default Auth;

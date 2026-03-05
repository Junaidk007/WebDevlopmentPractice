import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../Services/api';
import { useMyContext } from '../../Context/context';
import './auth.css';

function Login() {
    const navigate = useNavigate();
    const { login } = useMyContext();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (error) {
            setError('');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await loginUser({
                email: formData.email,
                password: formData.password
            });

            login(response.token);
            navigate('/');
        } catch (apiError) {
            setError(apiError.message || 'Unable to login. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="login-page">
            <div className="login-card">
                <p className="login-kicker">TaskFlow</p>
                <h1 className="login-title">Sign in</h1>
                <p className="login-subtitle">Welcome back. Continue to your workspace.</p>

                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="email" className="login-label">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        className="login-input"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="password" className="login-label">Password</label>
                    <div className="password-field">
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            className="login-input"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                        </button>
                    </div>

                    {error && <p className="login-subtitle" style={{ color: '#dc2626', marginBottom: 0 }}>{error}</p>}

                    <button type="submit" className="login-button" disabled={isSubmitting}>
                        {isSubmitting ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>

                <p className="login-footer">
                    New here? <Link to="/register">Create account</Link>
                </p>
            </div>
        </section>
    );
}

export default Login;

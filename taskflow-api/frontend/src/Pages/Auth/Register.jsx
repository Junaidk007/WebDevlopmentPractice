import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../Services/api';
import './auth.css';

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setIsSubmitting(true);

        try {
            // Backend validation requires role as well, so default to user.
            await registerUser({
                name: formData.fullName,
                email: formData.email,
                password: formData.password,
                role: 'user'
            });

            navigate('/login');
        } catch (apiError) {
            setError(apiError.message || 'Unable to register. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="login-page">
            <div className="login-card">
                <p className="login-kicker">TaskFlow</p>
                <h1 className="login-title">Create account</h1>
                <p className="login-subtitle">Set up your workspace in a few seconds.</p>

                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="fullName" className="login-label">Full Name</label>
                    <input
                        id="fullName"
                        type="text"
                        name="fullName"
                        className="login-input"
                        placeholder="Junaid Khan"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />

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
                            placeholder="Create password"
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

                    <label htmlFor="confirmPassword" className="login-label">Confirm Password</label>
                    <div className="password-field">
                        <input
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            className="login-input"
                            placeholder="Confirm password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                        >
                            <i className={`fa-solid ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                        </button>
                    </div>

                    {error && <p className="login-subtitle" style={{ color: '#dc2626', marginBottom: 0 }}>{error}</p>}

                    <button type="submit" className="login-button" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating account...' : 'Create account'}
                    </button>
                </form>

                <p className="login-footer">
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </div>
        </section>
    );
}

export default Register;

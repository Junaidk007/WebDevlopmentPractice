import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../Services/api';
import './auth.css';
import SignupForm from '../../Components/auth/SignupForm';

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

                <p className="login-footer">
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </div>
        </section>
    );
}

export default Register;

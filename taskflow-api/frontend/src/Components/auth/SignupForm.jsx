function SignupForm({formData, handleChange, handleSubmit, showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword, error, isSubmitting}) {
    return (
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
    )
}

export default SignupForm;
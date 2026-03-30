function LoginForm({formData, handleChange, handleSubmit, showPassword, setShowPassword, error, isSubmitting}) {
    return (
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

    )
}    

export default LoginForm;
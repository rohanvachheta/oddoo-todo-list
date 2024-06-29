import React, { useState } from 'react';

const LoginPage = ({ handleSignUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        const loginData = {
            email,
            password,
        };

        try {
            const response = await fetch('https://todobackend-2ax2.onrender.com/users/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                throw new Error('Failed to log in');
            }

            const data = await response.json();
            console.log('Login successful:', data);
            window.sessionStorage.setItem('token', data.user.token);
            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
            setError('Login failed. Please try again.');
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                <a href="javascript:;" onClick={handleSignUp} className="sign-up-link">
                    Don't have an account? Sign up.
                </a>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default LoginPage;

import React, { useState } from 'react';

const RegisterPage = ({ handleSignUp }) => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const userData = {
            email,
            firstName,
            lastName,
            password,
            role:'User'
        };

        try {
            const response = await fetch('https://todobackend-2ax2.onrender.com/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Failed to register');
            }

            const data = await response.json();
            
            const loginData = {
                email,
                password,
            };

            const loginResponse = await fetch('https://todobackend-2ax2.onrender.com/users/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });


            if (!loginResponse.ok) {
                throw new Error('Failed to register');
            }

            setSuccess('Registration successful! Please log in ');
            window.sessionStorage.setItem('token', data.token);
            window.location.reload();

        } catch (error) {
            console.error('Error:', error.message);
            setError(error.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>First Name:</label>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <label>Last Name:</label>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
                <a href='javascript:;' onClick={handleSignUp} className='sign-up-link'>Already signed up? Log in.</a>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default RegisterPage;

import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import './Auth.css';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, signup, loginWithGoogle } = useAuth();

    const handleGoogleSignIn = async () => {
        setError('');
        setLoading(true);
        try {
            await loginWithGoogle();
        } catch (err) {
            setError(err.message.replace('Firebase: ', ''));
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await signup(email, password);
                // On signup, you might want to create a user profile in Firestore
                // but the AuthContext only handles the Firebase Auth account.
            }
        } catch (err) {
            setError(err.message.replace('Firebase: ', ''));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-overlay">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-logo">
                        <div className="logo-hex"></div>
                    </div>
                    <h1>AGENT NEXUS</h1>
                    <p>{isLogin ? 'Authentication Required' : 'Initialize New Access'}</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>ACCESS IDENTIFIER (EMAIL)</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="user@nexus.io"
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>SECURITY KEY (PASSWORD)</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="••••••••"
                            required 
                        />
                    </div>

                    {error && <div className="auth-error">{error}</div>}

                    <button 
                        type="submit" 
                        className="auth-submit" 
                        disabled={loading}
                    >
                        {loading ? 'PROCESSING...' : (isLogin ? 'EXECUTE LOGIN' : 'INITIALIZE ACCOUNT')}
                    </button>

                    <div className="auth-divider">
                        <span>OR</span>
                    </div>

                    <button 
                        type="button" 
                        className="auth-google" 
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                    >
                        <svg className="google-icon" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.01.67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.67-.35-1.39-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        SIGN IN WITH GOOGLE
                    </button>
                </form>

                <div className="auth-footer">
                    <button 
                        className="auth-toggle" 
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? "DON'T HAVE AN ACCESS KEY? INITIALIZE HERE" : "ALREADY HAVE ACCESS? LOG IN"}
                    </button>
                </div>
            </div>
            
            <div className="auth-background">
                <div className="grid-overlay"></div>
                <div className="glow-effect"></div>
            </div>
        </div>
    );
};

export default Auth;

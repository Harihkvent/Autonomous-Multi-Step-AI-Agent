import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import './Auth.css';
import { JarvisIcon } from './Icons';

const Auth = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { loginWithGoogle, loginAsGuest } = useAuth();

    const handleGoogleSignIn = async () => {
        setError('');
        setLoading(true);
        try {
            await loginWithGoogle();
        } catch (err) {
            console.error('Sign-in error:', err);
            const msg = err.message || '';
            if (msg.includes('internal-error') || msg.includes('configuration-not-found') || msg.includes('ERR_NAME_NOT_RESOLVED')) {
                setError('Google Provider is not enabled in Firebase Console, or apis.google.com is blocked by DNS/adblocker. Enable Google in Firebase Console -> Auth -> Sign-in Method, or click "Launch in Guest Mode" below.');
            } else if (msg.includes('popup-closed-by-user')) {
                setError('Sign-in popup was closed before completing.');
            } else {
                setError(msg.replace('Firebase: ', ''));
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGuestSignIn = () => {
        setError('');
        loginAsGuest();
    };

    return (
        <div className="app-viewport">
            <div className="auth-overlay">
                <div className="auth-card">
                    <div className="auth-header">
                        <div className="auth-logo">
                            <JarvisIcon size={36} color="#06b6d4" />
                        </div>
                        <h1>Autonomous Taskforce</h1>
                        <p>Sign in to access your multi-agent constellation and autonomous workflows</p>
                    </div>

                    <div className="auth-body">
                        {error && (
                            <div className="auth-error">
                                <span className="auth-error-icon">⚠️</span>
                                <span>{error}</span>
                            </div>
                        )}

                        <button 
                            type="button" 
                            className="auth-google-primary" 
                            onClick={handleGoogleSignIn}
                            disabled={loading}
                        >
                            <svg className="google-icon" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.01.67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.67-.35-1.39-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                            <span>{loading ? 'Connecting to Google...' : 'Sign in with Google'}</span>
                        </button>

                        <div className="auth-divider">
                            <span>or</span>
                        </div>

                        <button 
                            type="button" 
                            className="auth-guest-btn"
                            onClick={handleGuestSignIn}
                        >
                            ⚡ Launch in Guest Mode (Local Dev)
                        </button>
                    </div>

                    <div className="auth-footer">
                        <div className="auth-security-badge">
                            <span className="security-dot"></span>
                            <span>Secured with Firebase Authentication</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;

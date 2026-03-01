import { useState } from 'react';
import { Sparkles, ArrowRight, Github, Mail } from 'lucide-react';

interface AuthPageProps {
    onLogin: () => void;
}

export function AuthPage({ onLogin }: AuthPageProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 100
        }} className="fade-in">

            {/* Animated BG already in App, but let's add a subtle overlay */}
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(15, 17, 26, 0.4)', backdropFilter: 'blur(20px)' }}></div>

            <div
                className="glass-panel slide-up"
                style={{
                    position: 'relative',
                    padding: '48px',
                    width: '100%',
                    maxWidth: '440px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '32px',
                    boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 0 40px var(--accent-glow)'
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '20px',
                        background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0 8px 32px var(--accent-glow)'
                    }}>
                        <Sparkles size={32} color="#fff" />
                    </div>
                    <h2 style={{ fontSize: '28px', margin: 0 }}>DevBook</h2>
                    <p style={{ color: 'var(--text-secondary)', textAlign: 'center', margin: 0 }}>
                        The interactive workspace to understand, visualize, and map complex code logic.
                    </p>
                </div>

                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <button
                        className="glass-panel"
                        style={{
                            width: '100%',
                            padding: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            fontSize: '16px',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'all var(--transition-normal)',
                            backgroundColor: 'rgba(255,255,255,0.05)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                            e.currentTarget.style.transform = 'none';
                        }}
                        onClick={onLogin}
                    >
                        <Github size={20} /> Continue with GitHub
                    </button>

                    <button
                        style={{
                            width: '100%',
                            padding: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            fontSize: '16px',
                            fontWeight: 500,
                            cursor: 'pointer',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                            color: '#fff',
                            transition: 'all var(--transition-normal)',
                            boxShadow: isHovered ? '0 8px 24px var(--accent-glow)' : '0 4px 12px rgba(0,0,0,0.2)',
                            transform: isHovered ? 'translateY(-2px)' : 'none'
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={onLogin}
                    >
                        <Mail size={20} /> Continue with Email <ArrowRight size={18} style={{ transform: isHovered ? 'translateX(4px)' : 'none', transition: 'transform 0.2s' }} />
                    </button>
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                    By continuing, you verify that you are a 10x developer (or aspiring to be).
                </p>
            </div>
        </div>
    );
}

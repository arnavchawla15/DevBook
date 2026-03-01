import React from 'react';

interface FlowchartNodeProps {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    isActive?: boolean;
    delay?: number;
    onClick?: () => void;
    hasArrow?: boolean;
}

export function FlowchartNode({
    title,
    description,
    icon,
    isActive = false,
    delay = 0,
    onClick,
    hasArrow = true
}: FlowchartNodeProps) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', animationDelay: `${delay}s` }} className="slide-up">
            <div
                className={`glass-panel glow-hover ${isActive ? 'active-node' : ''}`}
                style={{
                    padding: '16px 24px',
                    cursor: 'pointer',
                    width: '100%',
                    maxWidth: '400px',
                    borderColor: isActive ? 'var(--accent-primary)' : 'var(--border-light)',
                    boxShadow: isActive ? 'var(--shadow-glow)' : 'var(--shadow-panel)',
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'center',
                    transition: 'all var(--transition-normal)'
                }}
                onClick={onClick}
            >
                <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: isActive ? 'var(--accent-primary)' : 'var(--bg-glass-hover)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: isActive ? '#fff' : 'var(--text-secondary)',
                    flexShrink: 0
                }}>
                    {icon}
                </div>
                <div>
                    <h4 style={{ color: isActive ? '#fff' : 'var(--text-primary)', margin: '0 0 4px 0', fontSize: '15px' }}>{title}</h4>
                    <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '13px' }}>{description}</p>
                </div>
            </div>

            {hasArrow && (
                <div style={{
                    width: '2px',
                    height: '30px',
                    backgroundColor: isActive ? 'var(--accent-primary)' : 'var(--border-light)',
                    margin: '4px 0',
                    position: 'relative'
                }}>
                    {/* Arrow head */}
                    <div style={{
                        position: 'absolute',
                        bottom: '-2px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '0',
                        height: '0',
                        borderLeft: '4px solid transparent',
                        borderRight: '4px solid transparent',
                        borderTop: `6px solid ${isActive ? 'var(--accent-primary)' : 'var(--border-light)'}`
                    }} />
                </div>
            )}
        </div>
    );
}

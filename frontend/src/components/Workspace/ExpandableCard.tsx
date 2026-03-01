import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ExpandableCardProps {
    icon: React.ReactNode;
    title: string;
    defaultExpanded?: boolean;
    children: React.ReactNode;
    delay?: number;
}

export function ExpandableCard({
    icon,
    title,
    defaultExpanded = false,
    children,
    delay = 0
}: ExpandableCardProps) {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    return (
        <div
            className="glass-panel glow-hover slide-up"
            style={{
                cursor: 'pointer',
                animationDelay: `${delay}s`,
                borderColor: isExpanded ? 'var(--border-focus)' : 'var(--border-light)'
            }}
            onClick={() => setIsExpanded(!isExpanded)}
        >
            <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ color: isExpanded ? '#60a5fa' : 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                    {icon} <span>{title}</span>
                </h4>
                <div style={{ color: 'var(--text-muted)' }}>
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
            </div>

            <div
                style={{
                    maxHeight: isExpanded ? '500px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height var(--transition-normal)',
                    opacity: isExpanded ? 1 : 0,
                }}
            >
                <div style={{ padding: '0 16px 16px 16px', borderTop: '1px solid var(--border-light)', marginTop: '8px', paddingTop: '16px' }}>
                    {children}
                </div>
            </div>
        </div>
    );
}

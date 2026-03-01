import { X, Clock, Search, ChevronRight } from 'lucide-react';

interface HistoryPanelProps {
    onClose: () => void;
}

export function HistoryPanel({ onClose }: HistoryPanelProps) {
    const historyItems = [
        { id: 1, title: 'analyzeCode - main.ts', time: '10 mins ago', mode: 'Architect' },
        { id: 2, title: 'useAuth hook - auth.tsx', time: '2 hours ago', mode: 'Deep Dive' },
        { id: 3, title: 'Database connection string', time: 'Yesterday', mode: 'Quick Insight' },
        { id: 4, title: 'Redux store configuration', time: 'Yesterday', mode: 'Architect' },
        { id: 5, title: 'Sorting algorithm logic', time: '3 days ago', mode: 'Deep Dive' },
    ];

    return (
        <div style={{
            position: 'absolute',
            right: '24px',
            top: '80px',
            width: '400px',
            maxHeight: 'calc(100vh - 104px)',
            zIndex: 50,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 12px 48px rgba(0,0,0,0.6)'
        }} className="glass-panel slide-up">

            {/* Header */}
            <div style={{
                padding: '20px 24px',
                borderBottom: '1px solid var(--border-light)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h3 style={{ margin: 0, fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={20} color="var(--accent-primary)" /> History
                </h3>
                <button
                    onClick={onClose}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                    <X size={20} />
                </button>
            </div>

            {/* Search Bar */}
            <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-light)' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '8px 12px',
                    border: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <Search size={16} color="var(--text-muted)" style={{ marginRight: '8px' }} />
                    <input
                        type="text"
                        placeholder="Search past explanations..."
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-primary)',
                            width: '100%',
                            outline: 'none',
                            fontSize: '14px'
                        }}
                    />
                </div>
            </div>

            {/* History List */}
            <div style={{ padding: '12px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {historyItems.map((item, index) => (
                    <div
                        key={item.id}
                        className="glow-hover"
                        style={{
                            padding: '16px',
                            borderRadius: 'var(--radius-md)',
                            background: 'rgba(255,255,255,0.02)',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            border: '1px solid transparent',
                            transition: 'all 0.2s',
                            animationDelay: `${index * 0.05}s`
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                            e.currentTarget.style.borderColor = 'var(--border-light)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                            e.currentTarget.style.borderColor = 'transparent';
                        }}
                    >
                        <div>
                            <h4 style={{ margin: '0 0 6px 0', fontSize: '14px', color: 'var(--text-primary)' }}>{item.title}</h4>
                            <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: 'var(--text-muted)' }}>
                                <span>{item.time}</span>
                                <span style={{
                                    color: item.mode === 'Architect' ? '#8b5cf6' : item.mode === 'Deep Dive' ? '#60a5fa' : '#f59e0b',
                                    backgroundColor: 'rgba(255,255,255,0.05)',
                                    padding: '2px 8px',
                                    borderRadius: '12px'
                                }}>
                                    {item.mode}
                                </span>
                            </div>
                        </div>
                        <ChevronRight size={18} color="var(--text-muted)" />
                    </div>
                ))}
            </div>

        </div>
    );
}

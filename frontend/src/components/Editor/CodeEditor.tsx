import Editor from '@monaco-editor/react';
import { Play } from 'lucide-react';

interface CodeEditorProps {
    code: string;
    onChange: (value: string | undefined) => void;
    onRun?: () => void;
}

export function CodeEditor({ code, onChange, onRun }: CodeEditorProps) {
    return (
        <section className="editor-pane glass-panel slide-up" style={{ animationDelay: '0.1s', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#eab308' }}></div>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>main.ts</h3>

                    <button
                        onClick={onRun}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: 'var(--accent-primary)',
                            color: '#fff',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '13px',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'all var(--transition-fast)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.transform = 'none';
                        }}
                    >
                        <Play size={14} fill="currentColor" /> Run Code
                    </button>
                </div>
            </div>

            {/* Monaco Editor Wrapper */}
            <div style={{ flex: 1, position: 'relative' }}>
                <Editor
                    height="100%"
                    defaultLanguage="typescript"
                    theme="vs-dark"
                    value={code}
                    onChange={onChange}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        fontFamily: 'var(--font-mono)',
                        padding: { top: 16, bottom: 16 },
                        scrollBeyondLastLine: false,
                        lineHeight: 1.8,
                        smoothScrolling: true,
                        cursorBlinking: 'smooth',
                        cursorSmoothCaretAnimation: 'on',
                        formatOnPaste: true,
                    }}
                />
            </div>
        </section>
    );
}

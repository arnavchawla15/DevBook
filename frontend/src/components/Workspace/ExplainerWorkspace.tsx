import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import { Lightbulb, Activity, Network } from 'lucide-react';

interface ExplainerWorkspaceProps {
    mode: 'line' | 'block' | 'flowchart';
    insight?: string;
    isLoading?: boolean;
}

// --- TRUE HORIZONTAL MIND MAP NODE ---
const MindMapNode = ({ node }: { node: any }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const hasChildren = node.children && node.children.length > 0;

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
            <div style={{ position: 'relative' }}>
                <div style={{
                    background: '#474b57',
                    color: '#f3f4f6',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    lineHeight: '1.4',
                    maxWidth: '300px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    zIndex: 2,
                    position: 'relative',
                    border: '1px solid #52596d'
                }}>
                    {node.name}
                </div>

                {hasChildren && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        style={{
                            position: 'absolute', right: '-14px', top: '50%', transform: 'translateY(-50%)',
                            width: '28px', height: '28px', background: '#3a3e47', borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                            zIndex: 3, border: '1px solid #52596d', color: 'white', fontSize: '14px', fontWeight: 'bold'
                        }}
                    >
                        {isExpanded ? '<' : '>'}
                    </button>
                )}
            </div>

            {hasChildren && isExpanded && (
                <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                    {node.children.map((child: any, index: number) => {
                        const isFirst = index === 0;
                        const isLast = index === node.children.length - 1;
                        const onlyChild = node.children.length === 1;

                        return (
                            <div key={index} style={{ position: 'relative', display: 'flex', alignItems: 'center', padding: '10px 0' }}>
                                <div style={{ position: 'absolute', left: '-30px', top: '50%', width: '30px', height: '2px', background: '#98a8f8' }} />
                                {!onlyChild && (
                                    <div style={{
                                        position: 'absolute', left: '-30px', width: '2px', background: '#98a8f8',
                                        top: isFirst ? '50%' : '0', bottom: isLast ? '50%' : '0'
                                    }} />
                                )}
                                <MindMapNode node={child} />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export function ExplainerWorkspace({ mode, insight, isLoading }: ExplainerWorkspaceProps) {
    const [isPlaying, setIsPlaying] = useState(false);

    const handleSpeech = () => {
        if (!insight) return;
        if (isPlaying) {
            window.speechSynthesis.cancel();
            setIsPlaying(false);
        } else {
            const cleanText = insight.replace(/[#*`]/g, '');
            const utterance = new SpeechSynthesisUtterance(cleanText);
            utterance.onend = () => setIsPlaying(false);
            window.speechSynthesis.speak(utterance);
            setIsPlaying(true);
        }
    };

    // --- BULLETPROOF JSON PARSER ---
    let mainText = insight || '';
    let treeData = null;

    if (insight) {
        if (mode === 'flowchart') {
            // For flowchart mode, the entire insight is expected to be JSON. Let's try to extract it aggressively.
            const jsonMatch = insight.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                try {
                    treeData = JSON.parse(jsonMatch[0]);
                    mainText = ""; // Clear text if we successfully extracted the tree
                } catch (e) {
                    console.error("Failed to parse AI JSON hierarchy in flowchart mode", e);
                }
            }
        } else if (/MINDMAP_JSON/i.test(insight)) {
            // Legacy/fallback parsing for other modes if they somehow return MINDMAP_JSON
            // 1. Split the text at the heading
            const parts = insight.split(/MINDMAP_JSON\**:?/i);
            mainText = parts[0].trim();

            // 2. Aggressively extract only the JSON from the second half
            const rawJsonSection = parts[1] || '';
            const jsonMatch = rawJsonSection.match(/\{[\s\S]*\}/);

            if (jsonMatch) {
                try {
                    treeData = JSON.parse(jsonMatch[0]);
                } catch (e) {
                    console.error("Failed to parse AI JSON hierarchy", e);
                }
            }
        }
    }

    const renderAIResponse = () => {
        if (isLoading) {
            return (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '40px 0' }}>
                    <div style={{ width: '24px', height: '24px', border: '3px solid rgba(96, 165, 250, 0.2)', borderTop: '3px solid var(--accent-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                    <span style={{ color: 'var(--accent-primary)', fontWeight: 700, fontSize: '10px', letterSpacing: '1px' }}>SYNTHESIZING LOGIC...</span>
                </div>
            );
        }

        if (!insight) {
            return <div style={{ padding: '20px 0', color: 'var(--text-muted)', fontSize: '12px' }}>Awaiting input... Select a mode and hit Run Code.</div>;
        }

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="markdown-content" style={{ color: 'var(--text-secondary)', lineHeight: '1.5', fontSize: '13px' }}>
                    <ReactMarkdown>{mainText}</ReactMarkdown>
                </div>

                {treeData && (
                    <div className="fade-in" style={{ marginTop: '10px', paddingTop: '20px', borderTop: '1px solid var(--border-light)', overflowX: 'auto', paddingBottom: '30px' }}>
                        <h4 style={{ color: 'var(--text-muted)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Network size={14} color="var(--accent-primary)" /> Interactive Logic Tree
                        </h4>

                        <div style={{ display: 'flex', minWidth: 'max-content', padding: '10px 20px' }}>
                            <MindMapNode node={treeData} />
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <section className="explanation-pane glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
            <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Activity size={12} color="var(--accent-primary)" />
                    <h3 style={{ fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>{mode} Analysis</h3>
                </div>
                <button onClick={handleSpeech} style={{ background: isPlaying ? '#ef4444' : 'transparent', border: '1px solid var(--accent-primary)', color: isPlaying ? 'white' : 'var(--accent-primary)', padding: '2px 8px', borderRadius: '4px', fontSize: '9px', fontWeight: 700, cursor: 'pointer' }}>
                    {isPlaying ? 'STOP' : 'AUDIO BRIEF'}
                </button>
            </div>

            <div style={{ flex: 1, padding: '16px', overflowY: 'auto', paddingBottom: '60px' }}>
                <div className="glass-panel" style={{ padding: '20px', marginBottom: '15px' }}>
                    <h4 style={{ color: 'var(--accent-primary)', marginBottom: '16px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase', fontWeight: 700 }}>
                        <Lightbulb size={14} /> Intelligence Report
                    </h4>
                    {renderAIResponse()}
                </div>
            </div>
        </section>
    );
}
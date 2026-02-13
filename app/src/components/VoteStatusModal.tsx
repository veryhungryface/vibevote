import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BarChart3, Trophy } from 'lucide-react';
import { projects } from '../data/projects';

interface VoteStatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    voteCounts: Record<string, number>;
}

export const VoteStatusModal: React.FC<VoteStatusModalProps> = ({ isOpen, onClose, voteCounts }) => {
    if (!isOpen) return null;

    // Aggregate votes by author
    const authorVotes: Record<string, { totalVotes: number; projectNames: string[] }> = {};
    projects.forEach(p => {
        if (!authorVotes[p.author]) {
            authorVotes[p.author] = { totalVotes: 0, projectNames: [] };
        }
        authorVotes[p.author].totalVotes += (voteCounts[p.id] || 0);
        authorVotes[p.author].projectNames.push(p.name);
    });

    const sorted = Object.entries(authorVotes)
        .map(([author, data]) => ({ author, ...data }))
        .sort((a, b) => b.totalVotes - a.totalVotes);

    const maxVotes = sorted.length > 0 ? sorted[0].totalVotes : 1;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.8)',
                    backdropFilter: 'blur(12px)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1500
                }}
                onClick={onClose}
            >
                <motion.div
                    className="glass-panel"
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    style={{
                        padding: '2rem',
                        maxWidth: '500px',
                        width: '90%',
                        maxHeight: '75vh',
                        display: 'flex',
                        flexDirection: 'column',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <BarChart3 size={20} color="var(--primary)" />
                            <h2 className="title-gradient" style={{ fontSize: '1.3rem', margin: 0 }}>투표 현황</h2>
                        </div>
                        <button
                            onClick={onClose}
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: 'white',
                                width: '32px', height: '32px',
                                borderRadius: '8px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer'
                            }}
                        >
                            <X size={16} />
                        </button>
                    </div>

                    <div style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)',
                        marginBottom: '1rem',
                        padding: '8px 12px',
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: '8px'
                    }}>
                        제작자별 득표수 (작품 합산)
                    </div>

                    <div style={{
                        overflowY: 'auto',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                    }}>
                        {sorted.map((item, i) => (
                            <motion.div
                                key={item.author}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.03 }}
                                style={{
                                    padding: '12px 14px',
                                    background: 'rgba(255,255,255,0.03)',
                                    borderRadius: '10px',
                                    border: '1px solid rgba(255,255,255,0.05)'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        {i === 0 && item.totalVotes > 0 && <Trophy size={14} color="#fbbf24" />}
                                        <span style={{
                                            fontWeight: '700',
                                            fontSize: '0.95rem',
                                            color: i === 0 && item.totalVotes > 0 ? '#fbbf24' : 'white'
                                        }}>
                                            {item.author}
                                        </span>
                                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                                            ({item.projectNames.length}작품)
                                        </span>
                                    </div>
                                    <span style={{
                                        fontWeight: '800',
                                        fontSize: '1.1rem',
                                        color: item.totalVotes > 0 ? 'var(--primary)' : 'var(--text-muted)'
                                    }}>
                                        {item.totalVotes}표
                                    </span>
                                </div>
                                {/* Progress bar */}
                                <div style={{
                                    width: '100%',
                                    height: '4px',
                                    background: 'rgba(255,255,255,0.05)',
                                    borderRadius: '4px',
                                    overflow: 'hidden'
                                }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: maxVotes > 0 ? `${(item.totalVotes / maxVotes) * 100}%` : '0%' }}
                                        transition={{ delay: i * 0.05, duration: 0.5 }}
                                        style={{
                                            height: '100%',
                                            background: i === 0 && item.totalVotes > 0
                                                ? 'linear-gradient(90deg, #fbbf24, #f59e0b)'
                                                : 'linear-gradient(90deg, var(--primary), #db2777)',
                                            borderRadius: '4px'
                                        }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

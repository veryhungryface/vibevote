import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users } from 'lucide-react';
import { getAllVoters } from '../services/voteService';

interface VoterListModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const VoterListModal: React.FC<VoterListModalProps> = ({ isOpen, onClose }) => {
    const [voters, setVoters] = useState<{ name: string; count: number }[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            getAllVoters().then(data => {
                setVoters(data);
                setLoading(false);
            });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
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
                        maxWidth: '420px',
                        width: '90%',
                        maxHeight: '70vh',
                        display: 'flex',
                        flexDirection: 'column',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <Users size={20} color="var(--primary)" />
                            <h2 className="title-gradient" style={{ fontSize: '1.3rem', margin: 0 }}>투표자 리스트</h2>
                        </div>
                        <button
                            onClick={onClose}
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: 'white',
                                width: '32px',
                                height: '32px',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
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
                        총 <span style={{ color: 'white', fontWeight: '700' }}>{voters.length}명</span> 참여
                    </div>

                    <div style={{
                        overflowY: 'auto',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px'
                    }}>
                        {loading ? (
                            <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                                로딩 중...
                            </div>
                        ) : voters.length === 0 ? (
                            <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                                아직 투표한 참여자가 없습니다.
                            </div>
                        ) : (
                            voters.map((voter, i) => (
                                <motion.div
                                    key={voter.name}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.03 }}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '10px 14px',
                                        background: 'rgba(255,255,255,0.03)',
                                        borderRadius: '10px',
                                        border: '1px solid rgba(255,255,255,0.05)'
                                    }}
                                >
                                    <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>{voter.name}</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <span style={{ color: '#ff4d94', fontSize: '0.85rem' }}>
                                            {'❤️'.repeat(voter.count)}
                                        </span>
                                        <span style={{
                                            background: 'rgba(255,255,255,0.08)',
                                            padding: '3px 10px',
                                            borderRadius: '8px',
                                            fontSize: '0.8rem',
                                            fontWeight: '700',
                                            color: voter.count >= 5 ? '#10b981' : 'var(--text-secondary)'
                                        }}>
                                            {voter.count}/5
                                        </span>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

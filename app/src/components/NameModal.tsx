
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCircle2 } from 'lucide-react';

interface NameModalProps {
    isOpen: boolean;
    onSubmit: (name: string) => void;
}

export const NameModal: React.FC<NameModalProps> = ({ isOpen, onSubmit }) => {
    const [name, setName] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim().length >= 2) {
            onSubmit(name.trim());
        } else {
            alert('성함을 두 글자 이상 입력해주세요.');
        }
    };

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
                    background: 'rgba(0,0,0,0.9)',
                    backdropFilter: 'blur(20px)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 2000
                }}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    className="glass-panel"
                    style={{
                        padding: '3rem 2rem',
                        maxWidth: '400px',
                        width: '90%',
                        textAlign: 'center',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}
                >
                    <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                        <div style={{
                            background: 'rgba(var(--primary-rgb), 0.1)',
                            padding: '1rem',
                            borderRadius: '50%',
                            color: 'var(--primary)'
                        }}>
                            <UserCircle2 size={48} />
                        </div>
                    </div>

                    <h2 className="title-gradient" style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>AI전략사업본부</h2>
                    <h2 className="title-gradient" style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>제1회 바이브코딩대회</h2>

                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        투표를 위해 성함 세 글자를 입력해주세요.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="홍길동"
                            required
                            autoFocus
                            style={{
                                width: '100%',
                                padding: '16px',
                                borderRadius: '12px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid var(--glass-border)',
                                color: 'white',
                                fontSize: '1.2rem',
                                textAlign: 'center',
                                marginBottom: '1.5rem',
                                outline: 'none'
                            }}
                        />
                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%', padding: '16px', fontSize: '1.1rem', fontWeight: '700' }}
                        >
                            입장하기
                        </button>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};


import React from 'react';
import type { Project } from '../data/projects';
import { ExternalLink, Vote } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectCardProps {
    project: Project;
    onVote: (project: Project) => void;
    isVoted: boolean;
    voteCount: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onVote, isVoted, voteCount }) => {
    const isDownload = project.link.endsWith('.zip');

    return (
        <motion.div
            className="glass-card flex flex-col h-full"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
            }}
        >
            {voteCount > 0 && (
                <motion.div
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    style={{
                        position: 'absolute',
                        top: '-10px',
                        right: '-10px',
                        background: 'linear-gradient(135deg, #ff4d94 0%, #db2777 100%)',
                        padding: '6px 14px',
                        borderRadius: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.95rem',
                        fontWeight: '800',
                        color: 'white',
                        boxShadow: '0 8px 16px rgba(219, 39, 119, 0.4)',
                        zIndex: 10,
                        border: '2px solid rgba(255, 255, 255, 0.2)'
                    }}
                >
                    ❤️ <span style={{ opacity: 0.9 }}>{voteCount}</span>
                </motion.div>
            )}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                    <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                        <span className="tag">{project.author}</span>
                        {isVoted && (
                            <span style={{
                                background: 'rgba(219, 39, 119, 0.15)',
                                color: '#ff4d94',
                                border: '1px solid rgba(219, 39, 119, 0.2)',
                                fontSize: '0.7rem',
                                padding: '2px 8px',
                                borderRadius: '10px',
                                fontWeight: 'bold',
                                letterSpacing: '0.02em'
                            }}>
                                MY PICK
                            </span>
                        )}
                    </div>
                </div>

                <h3 className="text-gradient" style={{ fontSize: '1.5rem', margin: '0.5rem 0', fontWeight: '700' }}>
                    {project.name}
                </h3>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                    Tool: {project.tool || 'Unknown'}
                </p>

                <p style={{ color: 'var(--text-primary)', lineHeight: '1.6', marginBottom: '1.5rem', flexGrow: 1 }}>
                    {project.description}
                </p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                <a
                    href={project.link}
                    target={isDownload ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                    style={{ flex: 1, textDecoration: 'none', whiteSpace: 'nowrap' }}
                    download={isDownload}
                >
                    <ExternalLink size={16} />
                    {isDownload ? 'Download' : 'View'}
                </a>
                <button
                    onClick={() => onVote(project)}
                    className={isVoted ? "btn btn-secondary" : "btn btn-primary"}
                    style={{ flex: 1, whiteSpace: 'nowrap' }}
                >
                    <Vote size={18} style={{ color: isVoted ? '#ff4d94' : 'inherit' }} />
                    {isVoted ? '취소' : '투표!'}
                </button>
            </div>
        </motion.div>
    );
};

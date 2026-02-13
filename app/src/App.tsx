
import { useState, useEffect } from 'react';
import { projects, type Project } from './data/projects';
import { ProjectCard } from './components/ProjectCard';
import { NameModal } from './components/NameModal';
import { VoterListModal } from './components/VoterListModal';
import { VoteStatusModal } from './components/VoteStatusModal';
import { submitVote, getVoteCounts, getUserVotes, cancelVote } from './services/voteService';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, User, CheckCircle2, Users, ArrowUpDown, BarChart3, Menu, X } from 'lucide-react';
import './App.css';

function App() {
  const [voterName, setVoterName] = useState(() => localStorage.getItem('voterName') || '');
  const [isNameModalOpen, setIsNameModalOpen] = useState(!localStorage.getItem('voterName'));
  const [votedProjectIds, setVotedProjectIds] = useState<number[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [voteCounts, setVoteCounts] = useState<Record<string, number>>({});
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isVoterListOpen, setIsVoterListOpen] = useState(false);
  const [isVoteStatusOpen, setIsVoteStatusOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'author' | 'votes'>('author');

  const sortedProjects = [...projects].sort((a, b) => {
    if (sortBy === 'votes') {
      return (voteCounts[b.id] || 0) - (voteCounts[a.id] || 0);
    }
    return a.author.localeCompare(b.author, 'ko');
  });

  const fetchGlobalCounts = async () => {
    const counts = await getVoteCounts();
    setVoteCounts(counts);
  };

  const fetchMyVotes = async (name: string) => {
    if (!name.trim()) {
      setVotedProjectIds([]);
      return;
    }
    const votes = await getUserVotes(name);
    setVotedProjectIds(votes);
  };

  useEffect(() => {
    fetchGlobalCounts();
    if (voterName) fetchMyVotes(voterName);

    const interval = setInterval(fetchGlobalCounts, 10000);
    return () => clearInterval(interval);
  }, [voterName]);

  const handleNameSubmit = (name: string) => {
    setVoterName(name);
    localStorage.setItem('voterName', name);
    setIsNameModalOpen(false);
    fetchMyVotes(name);
  };

  const handleNameChangeInHeader = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setVoterName(newName);
    localStorage.setItem('voterName', newName);
    fetchMyVotes(newName);
  };

  const handleVoteAction = async (project: Project) => {
    if (!voterName.trim()) {
      setErrorMsg("투표를 위해 상단에 이름을 먼저 입력해주세요!");
      setTimeout(() => setErrorMsg(null), 3000);
      return;
    }

    if (votedProjectIds.includes(project.id)) {
      // Cancellation logic
      try {
        await cancelVote(project.id, voterName);
        const updatedVotes = votedProjectIds.filter(id => id !== project.id);
        setVotedProjectIds(updatedVotes);
        setSuccessMsg("투표가 취소되었습니다.");
        setShowSuccess(true);
        fetchGlobalCounts();
        setTimeout(() => setShowSuccess(false), 3000);
      } catch (e) {
        alert("취성 중 오류가 발생했습니다.");
      }
      return;
    }

    if (votedProjectIds.length >= 3) {
      alert("최대 3표까지만 투표할 수 있습니다.");
      return;
    }

    try {
      await submitVote({
        projectId: project.id,
        voterName: voterName
      });

      const updatedVotes = [...votedProjectIds, project.id];
      setVotedProjectIds(updatedVotes);
      setSuccessMsg("투표가 반영되었습니다!");
      setShowSuccess(true);
      fetchGlobalCounts();
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (e) {
      const msg = (e as Error).message;
      if (msg === 'VOTE_LIMIT_REACHED') {
        alert("이미 3표를 모두 행사하셨습니다.");
      } else if (msg === 'ALREADY_VOTED_FOR_PROJECT') {
        alert("이미 투표한 작품입니다.");
      } else {
        alert("오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <div className="container" style={{ paddingTop: '10rem', paddingBottom: '4rem' }}>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: 'rgba(5, 5, 5, 0.85)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--glass-border)',
          padding: '1rem'
        }}
      >
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h1 className="text-gradient" style={{ fontSize: '1.4rem', margin: 0, fontWeight: '900', letterSpacing: '-0.02em' }}>
                Vibe Coding Contest
              </h1>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                동료들의 작품에 하트를 눌러주세요!
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              background: 'rgba(255,255,255,0.05)',
              padding: '6px 12px',
              borderRadius: '12px',
              border: '1px solid var(--glass-border)'
            }}>
              <User size={16} color="var(--primary)" />
              <input
                type="text"
                value={voterName}
                onChange={handleNameChangeInHeader}
                placeholder="이름을 입력하세요"
                disabled={votedProjectIds.length > 0}
                readOnly={votedProjectIds.length > 0}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: votedProjectIds.length > 0 ? 'var(--text-muted)' : 'white',
                  fontSize: '0.9rem',
                  outline: 'none',
                  width: '120px',
                  cursor: votedProjectIds.length > 0 ? 'not-allowed' : 'text'
                }}
              />
              {votedProjectIds.length > 0 && (
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>🔒</span>
              )}
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.85rem',
            background: 'rgba(255,255,255,0.02)',
            padding: '8px 16px',
            borderRadius: '10px'
          }}>
            <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-secondary)' }}>
              <span className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={14} color="#10b981" />
                1인당 총 3표
              </span>
              <span className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={14} color="#10b981" />
                중복 투표 불가(카드당 1회)
              </span>
              <span className="mobile-only" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}>
                <CheckCircle2 size={14} color="#10b981" />
                1인 3표 / 중복 불가
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                onClick={() => setIsVoteStatusOpen(true)}
                className="header-btn"
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                  color: 'var(--text-secondary)', padding: '4px 12px', borderRadius: '8px',
                  cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600', whiteSpace: 'nowrap', transition: 'all 0.2s'
                }}
              >
                <BarChart3 size={14} />
                현황
              </button>
              <button
                onClick={() => setIsVoterListOpen(true)}
                className="header-btn"
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                  color: 'var(--text-secondary)', padding: '4px 12px', borderRadius: '8px',
                  cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600', whiteSpace: 'nowrap', transition: 'all 0.2s'
                }}
              >
                <Users size={14} />
                리스트
              </button>
              <button
                onClick={() => setSortBy(prev => prev === 'author' ? 'votes' : 'author')}
                className="header-btn"
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                  color: 'var(--text-secondary)', padding: '4px 12px', borderRadius: '8px',
                  cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600', whiteSpace: 'nowrap', transition: 'all 0.2s'
                }}
              >
                <ArrowUpDown size={14} />
                {sortBy === 'author' ? '이름순' : '득표순'}
              </button>
              <div style={{ fontWeight: '700', color: 'var(--primary)', whiteSpace: 'nowrap', marginLeft: '0.5rem' }}>
                <span style={{ color: 'white' }}>{votedProjectIds.length}/3</span>
              </div>
            </div>

            {/* Mobile Menu Toggle & Count */}
            <div className="mobile-only" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ fontWeight: '700', color: 'white', whiteSpace: 'nowrap' }}>
                {votedProjectIds.length}/3
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                  background: 'transparent', border: 'none', color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mobile-only glass-panel"
                style={{
                  position: 'absolute', top: '100%', right: '1rem',
                  marginTop: '0.5rem', padding: '1rem',
                  display: 'flex', flexDirection: 'column', gap: '0.8rem',
                  border: '1px solid rgba(255,255,255,0.1)', zIndex: 1000,
                  width: '200px'
                }}
              >
                <button
                  onClick={() => { setIsVoteStatusOpen(true); setIsMobileMenuOpen(false); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    background: 'transparent', border: 'none', color: 'white',
                    fontSize: '1rem', textAlign: 'left', width: '100%'
                  }}
                >
                  <BarChart3 size={18} /> 투표 현황
                </button>
                <button
                  onClick={() => { setIsVoterListOpen(true); setIsMobileMenuOpen(false); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    background: 'transparent', border: 'none', color: 'white',
                    fontSize: '1rem', textAlign: 'left', width: '100%'
                  }}
                >
                  <Users size={18} /> 투표자 리스트
                </button>
                <button
                  onClick={() => { setSortBy(prev => prev === 'author' ? 'votes' : 'author'); setIsMobileMenuOpen(false); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    background: 'transparent', border: 'none', color: 'white',
                    fontSize: '1rem', textAlign: 'left', width: '100%'
                  }}
                >
                  <ArrowUpDown size={18} /> {sortBy === 'author' ? '이름순 정렬' : '득표순 정렬'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <main className="project-grid">
        {sortedProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <ProjectCard
              project={project}
              onVote={() => handleVoteAction(project)}
              isVoted={votedProjectIds.includes(project.id)}
              voteCount={voteCounts[project.id] || 0}
            />
          </motion.div>
        ))}
      </main>

      <footer style={{ marginTop: '6rem', textAlign: 'center', color: 'var(--text-muted)', borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }}>
        <p>© 2026 AI Strategy Division. All rights reserved.</p>
      </footer>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            style={{
              position: 'fixed', bottom: '2rem', right: '2rem',
              background: 'linear-gradient(135deg, var(--primary) 0%, #db2777 100%)',
              color: 'white', padding: '1rem 2rem',
              borderRadius: '9999px', boxShadow: '0 8px 24px rgba(219, 39, 119, 0.4)',
              zIndex: 2000, display: 'flex', alignItems: 'center', gap: '0.8rem',
              fontWeight: '700'
            }}
          >
            <Trophy size={22} />
            {successMsg}
          </motion.div>
        )}

        {errorMsg && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            style={{
              position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
              background: '#ef4444', color: 'white', padding: '1rem 2rem',
              borderRadius: '12px', boxShadow: '0 8px 24px rgba(239, 68, 68, 0.4)',
              zIndex: 2000, fontWeight: '700'
            }}
          >
            {errorMsg}
          </motion.div>
        )}
      </AnimatePresence>
      <NameModal
        isOpen={isNameModalOpen}
        onSubmit={handleNameSubmit}
      />
      <VoterListModal
        isOpen={isVoterListOpen}
        onClose={() => setIsVoterListOpen(false)}
      />
      <VoteStatusModal
        isOpen={isVoteStatusOpen}
        onClose={() => setIsVoteStatusOpen(false)}
        voteCounts={voteCounts}
      />
    </div >
  );
}

export default App;

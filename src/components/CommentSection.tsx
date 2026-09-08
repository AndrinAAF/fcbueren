"use client";

import React, { useState, useEffect, useRef } from 'react';
import { addComment, getComments, likeComment, unlikeComment } from '@/app/actions/news';

interface Comment {
  id: string;
  authorName: string;
  authorEmail: string | null;
  content: string;
  createdAt: string;
  likes: number;
  parentId: string | null;
}

const HeartIcon = ({ isLiked }: { isLiked?: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={isLiked ? "var(--clr-primary)" : "none"} stroke={isLiked ? "var(--clr-primary)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'fill 0.2s, stroke 0.2s' }}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const ReplyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 14 20 9 15 4"></polyline>
    <path d="M4 20v-7a4 4 0 0 1 4-4h12"></path>
  </svg>
);

export default function CommentSection({ newsId }: { newsId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // Local storage for liked comments (IDs)
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>({});
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  
  // Reply state
  const [replyToId, setReplyToId] = useState<string | null>(null);
  
  // Form reference to scroll into view when replying
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    async function loadComments() {
      const fetchedComments = await getComments(newsId);
      setComments(fetchedComments);
      setIsLoading(false);
      
      // Load liked state from localStorage
      const likedState: Record<string, boolean> = {};
      fetchedComments.forEach((c: Comment) => {
        if (localStorage.getItem(`liked_comment_${c.id}`)) {
          likedState[c.id] = true;
        }
      });
      setLikedComments(likedState);
    }
    loadComments();
  }, [newsId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) {
      setError('Bitte fülle mindestens deinen Namen und einen Kommentar aus.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    const res = await addComment(newsId, name.trim(), email.trim() || null, content.trim(), replyToId);
    
    if (res.success && res.comment) {
      // Optimistic update
      setComments(prev => [...prev, res.comment as Comment]);
      
      // Reset form
      setContent('');
      setReplyToId(null);
    } else {
      setError(res.error || 'Fehler beim Speichern des Kommentars.');
    }
    
    setIsSubmitting(false);
  };
  
  const handleLike = async (commentId: string) => {
    if (likedComments[commentId]) {
      // Optimistic update for unlike
      setComments(prev => prev.map(c => 
        c.id === commentId ? { ...c, likes: c.likes > 0 ? c.likes - 1 : 0 } : c
      ));
      setLikedComments(prev => ({ ...prev, [commentId]: false }));
      localStorage.removeItem(`liked_comment_${commentId}`);
      
      // Background request
      await unlikeComment(commentId);
    } else {
      // Optimistic update for like
      setComments(prev => prev.map(c => 
        c.id === commentId ? { ...c, likes: (c.likes || 0) + 1 } : c
      ));
      setLikedComments(prev => ({ ...prev, [commentId]: true }));
      localStorage.setItem(`liked_comment_${commentId}`, 'true');
      
      // Background request
      await likeComment(commentId);
    }
  };
  
  const handleReplyClick = (commentId: string) => {
    setReplyToId(commentId);
    // Focus the form
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      formRef.current?.querySelector('textarea')?.focus();
    }, 100);
  };

  // Group comments
  const topLevelComments = comments.filter(c => !c.parentId);
  
  const getReplies = (parentId: string) => {
    return comments.filter(c => c.parentId === parentId);
  };

  // Recursive component to render threaded comments
  const CommentNode = ({ comment, depth = 0 }: { comment: Comment, depth?: number }) => {
    const replies = getReplies(comment.id);
    const isLiked = likedComments[comment.id];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: depth > 0 ? '0.75rem' : '0' }}>
        <div style={{ 
          backgroundColor: depth === 0 ? 'var(--clr-bg-alt)' : 'var(--clr-background)', 
          padding: depth === 0 ? '1.25rem' : '1rem', 
          borderRadius: '8px',
          border: replyToId === comment.id ? '2px solid var(--clr-primary)' : '1px solid transparent'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <strong style={{ color: 'var(--clr-text)' }}>{comment.authorName}</strong>
            <span style={{ fontSize: '0.85rem', color: 'var(--clr-text-muted)' }}>
              {new Date(comment.createdAt).toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute:'2-digit' })}
            </span>
          </div>
          <p style={{ margin: '0 0 1rem 0', color: 'var(--clr-text)', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
            {comment.content}
          </p>
          
          {/* Actions */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button 
              onClick={() => handleLike(comment.id)}
              className="btn-icon"
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'none', border: 'none', color: isLiked ? 'var(--clr-primary)' : 'var(--clr-text-muted)', cursor: 'pointer', padding: 0, fontWeight: 600, fontSize: '0.9rem' }}
            >
              <HeartIcon isLiked={isLiked} /> {comment.likes || 0}
            </button>
            
            <button 
              onClick={() => handleReplyClick(comment.id)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'none', border: 'none', color: 'var(--clr-text-muted)', cursor: 'pointer', padding: 0, fontWeight: 600, fontSize: '0.9rem' }}
            >
              <ReplyIcon /> Antworten
            </button>
          </div>
        </div>
        
        {/* Render nested replies recursively */}
        {replies.length > 0 && (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            paddingLeft: '1.5rem', 
            borderLeft: '2px solid var(--clr-border)', 
            marginLeft: depth === 0 ? '1rem' : '0.5rem' 
          }}>
            {replies.map(reply => (
              <CommentNode key={reply.id} comment={reply} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--clr-border)' }}>
      {/* SOLID BACKGROUND CARD FOR WHOLE COMMENT SECTION */}
      <div style={{ 
        backgroundColor: 'var(--clr-surface)', 
        padding: '2.5rem', 
        borderRadius: '12px', 
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--clr-text)' }}>
          Kommentare ({comments.length})
        </h3>
        
        {/* Comments List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
          {isLoading ? (
            <div style={{ color: 'var(--clr-text-muted)' }}>Lade Kommentare...</div>
          ) : topLevelComments.length === 0 ? (
            <div style={{ color: 'var(--clr-text-muted)', fontStyle: 'italic' }}>
              Noch keine Kommentare. Schreibe den ersten!
            </div>
          ) : (
            topLevelComments.map((comment) => (
              <CommentNode key={comment.id} comment={comment} depth={0} />
            ))
          )}
        </div>
        
        {/* Add Comment Form */}
        <div style={{ backgroundColor: 'var(--clr-background)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--clr-border)' }}>
          <h4 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--clr-text)' }}>
            {replyToId ? 'Antwort verfassen' : 'Kommentar schreiben'}
          </h4>
          
          {replyToId && (
            <div style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: 'var(--clr-bg-alt)', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--clr-text-muted)' }}>
                Du antwortest auf einen Kommentar.
              </span>
              <button 
                onClick={() => setReplyToId(null)}
                style={{ background: 'none', border: 'none', color: 'var(--clr-primary)', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}
              >
                Abbrechen
              </button>
            </div>
          )}
          
          {error && (
            <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
              {error}
            </div>
          )}
          
          <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="name" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--clr-text)' }}>Name *</label>
                <input 
                  id="name"
                  type="text" 
                  value={name} 
                  onChange={e => setName(e.target.value)}
                  placeholder="Dein Name"
                  required
                  style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--clr-border)', backgroundColor: 'var(--clr-surface)', color: 'var(--clr-text)' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="email" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--clr-text)' }}>E-Mail (optional)</label>
                <input 
                  id="email"
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Deine E-Mail"
                  style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--clr-border)', backgroundColor: 'var(--clr-surface)', color: 'var(--clr-text)' }}
                />
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="content" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--clr-text)' }}>Nachricht *</label>
              <textarea 
                id="content"
                value={content} 
                onChange={e => setContent(e.target.value)}
                placeholder={replyToId ? "Deine Antwort..." : "Dein Kommentar..."}
                required
                rows={4}
                style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--clr-border)', backgroundColor: 'var(--clr-surface)', color: 'var(--clr-text)', resize: 'vertical' }}
              />
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn btn-primary"
              style={{ alignSelf: 'flex-start', marginTop: '0.5rem', opacity: isSubmitting ? 0.7 : 1 }}
            >
              {isSubmitting ? 'Wird gespeichert...' : (replyToId ? 'Antwort senden' : 'Kommentar senden')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

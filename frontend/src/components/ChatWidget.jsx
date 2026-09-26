import { useEffect, useRef, useState } from 'react';
import api from '../api/api.js';

// Generates (or reuses) a random visitor ID stored in the browser so this
// person's chat thread stays the same across page loads/navigation, without
// needing a login. This ID is also what keeps every visitor's chat private —
// only someone who knows this exact ID can read or post to the thread.
function getVisitorId() {
  let id = localStorage.getItem('igcse_visitor_id');
  if (!id) {
    id = crypto.randomUUID ? crypto.randomUUID() : `visitor-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem('igcse_visitor_id', id);
  }
  return id;
}

const POLL_INTERVAL_MS = 5000;

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [hasUnread, setHasUnread] = useState(false);
  const [sending, setSending] = useState(false);
  const visitorIdRef = useRef(getVisitorId());
  const scrollRef = useRef(null);
  const startedRef = useRef(false);

  // Start (or fetch) the conversation once, then poll for new messages.
  useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      api
        .post('/chat/visitor/start', {
          visitorId: visitorIdRef.current,
          visitorPage: window.location.pathname,
        })
        .then((res) => setMessages(res.data.data.messages))
        .catch(() => {});
    }

    const poll = setInterval(() => {
      api
        .get(`/chat/visitor/${visitorIdRef.current}`)
        .then((res) => {
          const conv = res.data.data;
          setMessages(conv.messages);
          if (!open && conv.messages.some((m) => m.sender === 'agent')) {
            setHasUnread(true);
          }
        })
        .catch(() => {});
    }, POLL_INTERVAL_MS);

    return () => clearInterval(poll);
  }, [open]);

  useEffect(() => {
    if (open) {
      setHasUnread(false);
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [open, messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim() || sending) return;
    setSending(true);
    const messageText = text.trim();
    setText('');
    try {
      const res = await api.post(`/chat/visitor/${visitorIdRef.current}/message`, { text: messageText });
      setMessages(res.data.data.messages);
    } catch {
      setText(messageText); // restore on failure so the visitor doesn't lose their message
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Floating round button, bottom-right, every page */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat with support"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-navy text-paper shadow-xl transition hover:bg-navy-400 sm:h-16 sm:w-16"
        style={{ animation: open ? 'none' : 'chatBounce 2.4s ease-in-out infinite' }}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.4 8.4 0 0 1-8.9 8.4 8.6 8.6 0 0 1-3.3-.7L3 21l1.8-5.4A8.4 8.4 0 1 1 21 11.5Z" />
            <circle cx="8.5" cy="11.5" r="1" fill="currentColor" stroke="none" />
            <circle cx="12" cy="11.5" r="1" fill="currentColor" stroke="none" />
            <circle cx="15.5" cy="11.5" r="1" fill="currentColor" stroke="none" />
          </svg>
        )}
        {hasUnread && !open && (
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-amber border-2 border-paper" />
        )}
      </button>
      <style>{`
        @keyframes chatBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-5 z-40 flex h-[24rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-amber-400/50 bg-paper shadow-2xl sm:w-84">
          <div className="flex items-center gap-2.5 bg-navy px-4 py-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 text-sm font-bold text-navy-900">S</span>
            <div>
              <p className="text-sm font-semibold text-paper">IGCSE Smart School Support</p>
              <p className="text-[11px] text-paper/70">We usually reply within a few minutes</p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {messages.length === 0 && (
              <p className="mt-6 text-center text-sm text-navy-700/60">
                👋 Hi! Ask us anything about admissions, programs, or fees.
              </p>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === 'visitor' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                    m.sender === 'visitor' ? 'bg-navy text-paper' : 'bg-white text-navy-800 border border-navy-100'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-navy-100 p-3">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your message…"
              className="input flex-1 text-sm"
            />
            <button type="submit" className="btn-primary !px-4" disabled={sending}>
              →
            </button>
          </form>
        </div>
      )}
    </>
  );
}
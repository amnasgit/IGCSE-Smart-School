import { useEffect, useRef, useState } from 'react';
import api from '../../api/api.js';

const POLL_INTERVAL_MS = 5000;

export default function AdminChat() {
  const [conversations, setConversations] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [thread, setThread] = useState(null);
  const [reply, setReply] = useState('');
  const [sending, setSending] = useState(false);
  const scrollRef = useRef(null);

  // Poll the conversation list
  useEffect(() => {
    const load = () => api.get('/chat/admin').then((res) => setConversations(res.data.data)).catch(() => {});
    load();
    const poll = setInterval(load, POLL_INTERVAL_MS);
    return () => clearInterval(poll);
  }, []);

  // Poll the open thread
  useEffect(() => {
    if (!selectedId) return;
    const load = () =>
      api.get(`/chat/admin/${selectedId}`).then((res) => setThread(res.data.data)).catch(() => {});
    load();
    const poll = setInterval(load, POLL_INTERVAL_MS);
    return () => clearInterval(poll);
  }, [selectedId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [thread]);

  const handleReply = async (e) => {
    e.preventDefault();
    if (!reply.trim() || !selectedId) return;
    setSending(true);
    try {
      const res = await api.post(`/chat/admin/${selectedId}/reply`, { text: reply.trim() });
      setThread(res.data.data);
      setReply('');
    } finally {
      setSending(false);
    }
  };

  const closeConversation = async () => {
    if (!selectedId) return;
    const res = await api.patch(`/chat/admin/${selectedId}/status`, { status: 'closed' });
    setThread(res.data.data);
  };

  return (
    <div>
      <h1 className="mb-5 text-2xl font-semibold text-navy">Live Chat Support</h1>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Conversation list */}
        <div className="rounded-2xl border border-navy-100 bg-white shadow-sm lg:col-span-1">
          <div className="border-b border-navy-100 p-4">
            <p className="text-sm font-semibold text-navy">Conversations ({conversations.length})</p>
          </div>
          <div className="max-h-[32rem] divide-y divide-navy-100 overflow-y-auto">
            {conversations.length === 0 && (
              <p className="p-4 text-sm text-navy-700/60">No conversations yet.</p>
            )}
            {conversations.map((c) => (
              <button
                key={c.visitorId}
                onClick={() => setSelectedId(c.visitorId)}
                className={`block w-full px-4 py-3 text-left transition hover:bg-navy-50/60 ${
                  selectedId === c.visitorId ? 'bg-navy-50' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-navy">{c.visitorName || 'Website Visitor'}</p>
                  {c.hasUnreadForAdmin && <span className="h-2 w-2 rounded-full bg-amber-600" />}
                </div>
                <p className="mt-0.5 truncate text-xs text-navy-700/60">{c.lastMessage}</p>
                <p className="mt-0.5 text-[11px] text-navy-700/40">
                  {new Date(c.lastMessageAt).toLocaleString()} · {c.status}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Thread */}
        <div className="flex h-[36rem] flex-col rounded-2xl border border-navy-100 bg-white shadow-sm lg:col-span-2">
          {!selectedId || !thread ? (
            <div className="flex flex-1 items-center justify-center text-sm text-navy-700/60">
              Select a conversation to view messages
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between border-b border-navy-100 p-4">
                <div>
                  <p className="text-sm font-semibold text-navy">{thread.visitorName || 'Website Visitor'}</p>
                  <p className="text-xs text-navy-700/60">Visitor ID: {thread.visitorId}</p>
                </div>
                {thread.status === 'open' ? (
                  <button onClick={closeConversation} className="btn-ghost border border-navy-100 text-xs">
                    Mark Closed
                  </button>
                ) : (
                  <span className="rounded-full bg-navy-50 px-2.5 py-1 text-xs font-semibold text-navy-700">Closed</span>
                )}
              </div>

              <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
                {thread.messages.map((m, i) => (
                  <div key={i} className={`flex ${m.sender === 'agent' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${
                        m.sender === 'agent' ? 'bg-navy text-paper' : 'bg-navy-50 text-navy-800'
                      }`}
                    >
                      {m.text}
                      {m.sender === 'agent' && m.agentName && (
                        <p className="mt-1 text-[10px] text-paper/60">— {m.agentName}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleReply} className="flex items-center gap-2 border-t border-navy-100 p-3">
                <input
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Type a reply…"
                  className="input flex-1 text-sm"
                />
                <button type="submit" className="btn-primary text-sm" disabled={sending}>
                  {sending ? 'Sending…' : 'Send'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
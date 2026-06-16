import { create } from 'zustand';

export interface Conversation {
  id: string;
  title: string;
  mode: 'chat' | 'pro' | 'task';
  preview: string;
  createdAt: string;
  updatedAt: string;
  group: '今天' | '昨天' | '更早';
}

interface ConversationStore {
  conversations: Conversation[];
  activeId: string | null;
  create: (mode: 'chat' | 'pro' | 'task') => string;
  activate: (id: string) => void;
  remove: (id: string) => void;
  updatePreview: (id: string, preview: string) => void;
  updateTitle: (id: string, title: string) => void;
}

function getGroup(dateStr: string): '今天' | '昨天' | '更早' {
  const now = new Date();
  const date = new Date(dateStr);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 86400000);
  if (date >= today) return '今天';
  if (date >= yesterday) return '昨天';
  return '更早';
}

export const useConversationStore = create<ConversationStore>((set, get) => ({
  conversations: [],
  activeId: null,

  create: (mode) => {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const group = getGroup(now);
    set({
      conversations: [
        { id, title: '新会话', mode, preview: '', createdAt: now, updatedAt: now, group },
        ...get().conversations,
      ],
      activeId: id,
    });
    return id;
  },

  activate: (id) => set({ activeId: id }),

  remove: (id) =>
    set((s) => {
      const filtered = s.conversations.filter((c) => c.id !== id);
      return {
        conversations: filtered,
        activeId: s.activeId === id ? null : s.activeId,
      };
    }),

  updatePreview: (id, preview) =>
    set((s) => ({
      conversations: s.conversations.map((c) =>
        c.id === id ? { ...c, preview, updatedAt: new Date().toISOString() } : c
      ),
    })),

  updateTitle: (id, title) =>
    set((s) => ({
      conversations: s.conversations.map((c) =>
        c.id === id ? { ...c, title } : c
      ),
    })),
}));
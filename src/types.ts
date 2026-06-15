export interface ChatItem {
  id: number;
  title: string;
  date: string;
  group: string;
}

/** TDesign Chat 兼容的消息数据结构 */
export interface TdChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content?: string;
  status?: 'pending' | 'streaming' | 'complete' | 'error';
  reasoning?: string;
  /** 附件列表 */
  attachments?: Array<{ name: string; url?: string; size?: number }>;
}

export interface AgentCard {
  id: string;
  type: 'thinking' | 'tool' | 'result';
  label: string;
  time: string;
  body: string;
}

export interface ProcessStep {
  stepNumber: number;
  type: 'thinking' | 'tool' | 'observation' | 'answer';
  label: string;
  badge: string;
  expanded: boolean;
  detail?: {
    type: 'text' | 'code';
    label?: string;
    content: string;
    codeHead?: string;
  };
  loading?: boolean;
}

export type AppMode = 'chat' | 'pro' | 'task';
export type ThemeMode = 'light' | 'dark' | 'system';

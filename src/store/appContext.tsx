import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { AppMode, ChatItem, ProcessStep } from '../types';

interface AppContextValue {
  mode: AppMode;
  setMode: (m: AppMode) => void;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  chats: ChatItem[];
  activeChatId: number | null;
  setActiveChatId: (id: number) => void;
  newChat: () => void;
  deleteChat: (id: number) => void;
  processes: ProcessStep[];
  toggleProcessStep: (index: number) => void;
  toggleAllProcessSteps: () => void;
}

const initialChats: ChatItem[] = [
  { id: 1, title: '帮我分析销售团队流失原因', date: '今天', group: '今天' },
  { id: 2, title: 'Q2渠道复盘方案', date: '今天', group: '今天' },
  { id: 3, title: '供应商合同风险评估', date: '昨天', group: '昨天' },
  { id: 4, title: '新业务线可行性与资源规划', date: '昨天', group: '昨天' },
  { id: 5, title: '客户分级管理策略', date: '更早', group: '更早' },
];

const initialProcesses: ProcessStep[] = [
  {
    stepNumber: 1,
    type: 'thinking',
    label: '思考：分解评估需求',
    badge: 'Thought',
    expanded: true,
    detail: {
      type: 'text',
      label: '推理内容',
      content: '用户提出供应商更换风险评估需求。需要从四个维度分析：合同条款风险、交付连续性风险、价格波动风险、合规风险。先从合同条款入手。',
    },
  },
  {
    stepNumber: 2,
    type: 'tool',
    label: '调用：合同条款分析',
    badge: 'Action',
    expanded: false,
    detail: {
      type: 'code',
      codeHead: '>> contract_analyzer tool call',
      content: `{
  "contract_id": "SUP-2024-0891",
  "analysis_type": "risk_clause",
  "focus_areas": ["termination_penalty", "price_adjustment", "sla_guarantee"]
}`,
    },
  },
  {
    stepNumber: 3,
    type: 'observation',
    label: '观察：合同分析结果',
    badge: 'Observation',
    expanded: false,
    detail: {
      type: 'code',
      codeHead: '>> contract_analyzer result',
      content: `{
  "risk_level": "HIGH",
  "findings": [
    {
      "clause": "提前终止违约金",
      "detail": "6个月合同金额",
      "benchmark": "行业平均3个月",
      "deviation": "+100%"
    },
    {
      "clause": "单方调价权",
      "detail": "供应商可30天前通知调价",
      "benchmark": "通常需双方协商",
      "deviation": "异常"
    },
    {
      "clause": "最低采购量",
      "detail": "2年锁定, 年度500万",
      "benchmark": "行业1年锁定",
      "deviation": "+100%"
    }
  ]
}`,
    },
  },
  {
    stepNumber: 4,
    type: 'thinking',
    label: '思考：综合评估决策',
    badge: 'Thought',
    expanded: false,
    detail: {
      type: 'text',
      label: '推理内容',
      content: '合同条款风险已经确认为高。违约金和最低采购量锁定形成双重约束——提前终止代价极大。需要量化两种场景的损失期望值来做最终决策。',
    },
  },
  {
    stepNumber: 5,
    type: 'observation',
    label: '调用：风险量化计算',
    badge: 'Action',
    expanded: false,
    loading: true,
  },
];

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<AppMode>('chat');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chats, setChats] = useState<ChatItem[]>(initialChats);
  const [activeChatId, setActiveChatId] = useState<number | null>(1);
  const [processes, setProcesses] = useState<ProcessStep[]>(initialProcesses);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  const newChat = useCallback(() => {
    setActiveChatId(null);
  }, []);

  const deleteChat = useCallback((id: number) => {
    setChats(prev => prev.filter(c => c.id !== id));
    if (activeChatId === id) {
      setActiveChatId(null);
    }
  }, [activeChatId]);

  const toggleProcessStep = useCallback((index: number) => {
    setProcesses(prev => prev.map((p, i) =>
      i === index ? { ...p, expanded: !p.expanded } : p
    ));
  }, []);

  const toggleAllProcessSteps = useCallback(() => {
    setProcesses(prev => {
      const anyExpanded = prev.some(p => p.expanded);
      return prev.map(p => ({ ...p, expanded: !anyExpanded }));
    });
  }, []);

  const value: AppContextValue = {
    mode,
    setMode,
    sidebarOpen,
    toggleSidebar,
    chats,
    activeChatId,
    setActiveChatId,
    newChat,
    deleteChat,
    processes,
    toggleProcessStep,
    toggleAllProcessSteps,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}

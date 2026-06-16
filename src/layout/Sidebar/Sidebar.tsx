import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppStore } from '../../store/appStore';
import { useConversationStore, type Conversation } from '../../store/conversationStore';
import { useTheme } from '../../store/themeContext';
import { useToast } from '../../store/toastContext';
import type { AppMode } from '../../types';
import '../../styles/tokens.css';
import './sidebar.css';

function SidebarItem({ conv, isActive, onSelect, onDelete }: {
  conv: Conversation;
  isActive: boolean;
  onSelect: () => void;
  onDelete: () => void;
}) {
  const modeLabels: Record<string, string> = { chat: '对话', pro: '分析', task: '任务' };
  return (
    <div
      className={`sidebar-item${isActive ? ' active' : ''}`}
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => { if (e.key === 'Enter') onSelect(); }}
    >
      <div className="sidebar-item-inner">
        <div className="sidebar-item-title">{conv.title}</div>
        <div className="sidebar-item-meta">
          <span className="sidebar-item-mode-tag">{modeLabels[conv.mode]}</span>
          {conv.preview && <span className="sidebar-item-preview">{conv.preview}</span>}
        </div>
      </div>
      <button
        className="sidebar-item-delete"
        onClick={(e) => { e.stopPropagation(); onDelete(); }}
        aria-label="删除会话"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 4l6 6M10 4l-6 6"/>
        </svg>
      </button>
    </div>
  );
}

const themes: { value: 'light' | 'dark' | 'system'; icon: JSX.Element; label: string }[] = [
  {
    value: 'light',
    icon: <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3"><circle cx="7" cy="7" r="3"/><path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M3.1 3.1l1 1M9.9 9.9l1 1M3.1 10.9l1-1M9.9 4.1l1-1"/></svg>,
    label: '浅色',
  },
  {
    value: 'dark',
    icon: <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M12 8.5A5.5 5.5 0 015.5 2 5.5 5.5 0 1012 8.5z"/></svg>,
    label: '深色',
  },
  {
    value: 'system',
    icon: <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3"><rect x="1" y="1" width="8" height="8" rx="1.5"/><path d="M11 5h1a1 1 0 011 1v6a1 1 0 01-1 1H6a1 1 0 01-1-1v-1"/></svg>,
    label: '系统',
  },
];

function AccountPopover() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { showToast } = useToast();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('click', handler);
      return () => document.removeEventListener('click', handler);
    }
  }, [open]);

  return (
    <div className="sidebar-account" ref={ref}>
      <div
        className="sidebar-account-trigger"
        role="button"
        tabIndex={0}
        aria-label="账号菜单"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen(prev => !prev)}
        onKeyDown={(e) => { if (e.key === 'Enter') setOpen(prev => !prev); }}
      >
        <div className="sidebar-avatar">李</div>
        <div className="sidebar-user-info">
          <div className="sidebar-user-name">李总</div>
          <div className="sidebar-user-plan">专业版</div>
        </div>
      </div>

      {open && (
        <div className="account-popover">
          <div className="account-popover-user">
            <div className="account-popover-avatar">李</div>
            <div>
              <div className="account-popover-name">李总</div>
              <div className="account-popover-email">admin@chuangludao.com</div>
            </div>
          </div>
          <div className="account-popover-label">主题</div>
          <div className="popover-theme-switch" role="radiogroup" aria-label="主题切换">
            {themes.map(t => (
              <button
                key={t.value}
                className={`popover-theme-opt${theme === t.value ? ' active' : ''}`}
                role="radio"
                aria-checked={theme === t.value}
                title={t.label}
                onClick={() => setTheme(t.value)}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>
          <button className="account-popover-item" onClick={() => { setOpen(false); showToast('设置页面'); }}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="8" cy="8" r="2.5"/>
              <path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M3.4 12.6l1.4-1.4M11.2 4.8l1.4-1.4"/>
            </svg>
            设置与偏好
          </button>
          <button className="account-popover-item" onClick={() => { setOpen(false); showToast('已登出'); }}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
              <path d="M6 14H3a1 1 0 01-1-1V3a1 1 0 011-1h3M11 10l3-3-3-3M14 7H6"/>
            </svg>
            退出登录
          </button>
        </div>
      )}
    </div>
  );
}

export function Sidebar() {
  const { mode, setMode, sidebarOpen, toggleSidebar } = useAppStore();
  const {
    conversations, activeId, activate, create, remove,
  } = useConversationStore();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSwitchMode = useCallback((m: AppMode) => {
    setMode(m);
    navigate(`/${m}`);
    if (sidebarOpen) toggleSidebar();
  }, [setMode, navigate, sidebarOpen, toggleSidebar]);

  const handleNewConversation = useCallback(() => {
    const id = create(mode);
    navigate(`/${mode}`);
    showToast('已创建新会话');
    (() => id)();
  }, [create, mode, navigate, showToast]);

  const handleSelectConversation = useCallback((conv: Conversation) => {
    activate(conv.id);
    setMode(conv.mode);
    navigate(`/${conv.mode}`);
  }, [activate, setMode, navigate]);

  const grouped = conversations.reduce<Record<string, Conversation[]>>((acc, c) => {
    (acc[c.group] ??= []).push(c);
    return acc;
  }, {});

  return (
    <>
      <div
        className={`sidebar-overlay${sidebarOpen ? ' open' : ''}`}
        onClick={toggleSidebar}
      />
      <aside className={`sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">创</div>
            <span className="sidebar-logo-text">创路Agent</span>
          </div>
          <div className="sidebar-mode-switcher" role="tablist" aria-label="模式切换">
            {(['chat', 'pro', 'task'] as const).map((m) => (
              <button
                key={m}
                className={`sidebar-mode-btn${mode === m ? ' active' : ''}`}
                role="tab"
                aria-selected={mode === m}
                onClick={() => handleSwitchMode(m)}
              >
                {m === 'chat' && (
                  <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3">
                    <path d="M2 3h10a1 1 0 011 1v5a1 1 0 01-1 1H5l-3 2V4a1 1 0 011-1z"/>
                  </svg>
                )}
                {m === 'pro' && (
                  <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3">
                    <path d="M2 2h4v4H2zM8 2h4v4H8zM2 8h4v4H2zM8 8h4v4H8z"/>
                  </svg>
                )}
                {m === 'task' && (
                  <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3">
                    <rect x="1" y="1" width="12" height="12" rx="2"/>
                    <path d="M4 5h6M4 7h4M4 9h5"/>
                  </svg>
                )}
                {{ chat: '对话', pro: '分析', task: '任务' }[m]}
              </button>
            ))}
          </div>
          <button className="btn-new-chat" onClick={handleNewConversation}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="8" y1="3" x2="8" y2="13"/>
              <line x1="3" y1="8" x2="13" y2="8"/>
            </svg>
            新建会话
          </button>
        </div>

        <div className="sidebar-list">
          {Object.entries(grouped).map(([group, items]) => (
            <React.Fragment key={group}>
              <div className="sidebar-group-label">{group}</div>
              {items.map(item => (
                <SidebarItem
                  key={item.id}
                  conv={item}
                  isActive={item.id === activeId}
                  onSelect={() => handleSelectConversation(item)}
                  onDelete={() => remove(item.id)}
                />
              ))}
            </React.Fragment>
          ))}
        </div>

        <div className="sidebar-footer">
          <AccountPopover />
        </div>
      </aside>
    </>
  );
}
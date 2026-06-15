import React, { useCallback } from 'react';
import { useAppContext } from '../../store/appContext';
import { useToast } from '../../store/toastContext';
import { SidebarItem as SidebarItemComponent } from './SidebarItem';
import { AccountPopover } from './AccountPopover';

export function Sidebar() {
  const {
    mode, setMode, sidebarOpen, toggleSidebar,
    chats, activeChatId, setActiveChatId, newChat, deleteChat,
  } = useAppContext();
  const { showToast } = useToast();

  const handleSwitchMode = useCallback((m: typeof mode) => {
    setMode(m);
    toggleSidebar();
  }, [setMode, toggleSidebar]);

  const handleNewChat = useCallback(() => {
    newChat();
    showToast('已创建新会话');
  }, [newChat, showToast]);

  const handleSwitchChat = useCallback((id: number) => {
    setActiveChatId(id);
    showToast('已切换会话');
  }, [setActiveChatId, showToast]);

  const grouped = chats.reduce<Record<string, typeof chats>>((acc, c) => {
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
            <button
              className={`sidebar-mode-btn${mode === 'chat' ? ' active' : ''}`}
              role="tab"
              aria-selected={mode === 'chat'}
              tabIndex={mode === 'chat' ? 0 : -1}
              onClick={() => handleSwitchMode('chat')}
            >
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3">
                <path d="M2 3h10a1 1 0 011 1v5a1 1 0 01-1 1H5l-3 2V4a1 1 0 011-1z"/>
              </svg>
              对话
            </button>
            <button
              className={`sidebar-mode-btn${mode === 'pro' ? ' active' : ''}`}
              role="tab"
              aria-selected={mode === 'pro'}
              tabIndex={mode === 'pro' ? 0 : -1}
              onClick={() => handleSwitchMode('pro')}
            >
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3">
                <path d="M2 2h4v4H2zM8 2h4v4H8zM2 8h4v4H2zM8 8h4v4H8z"/>
              </svg>
              分析
            </button>
            <button
              className={`sidebar-mode-btn${mode === 'task' ? ' active' : ''}`}
              role="tab"
              aria-selected={mode === 'task'}
              tabIndex={mode === 'task' ? 0 : -1}
              onClick={() => handleSwitchMode('task')}
            >
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3">
                <rect x="1" y="1" width="12" height="12" rx="2"/>
                <path d="M4 5h6M4 7h4M4 9h5"/>
              </svg>
              任务
            </button>
          </div>
          <button className="btn-new-chat" onClick={handleNewChat}>
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
                <SidebarItemComponent
                  key={item.id}
                  chat={item}
                  isActive={item.id === activeChatId}
                  onSelect={() => handleSwitchChat(item.id)}
                  onDelete={() => deleteChat(item.id)}
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

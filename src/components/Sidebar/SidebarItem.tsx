import React, { useCallback } from 'react';
import { ChatItem } from '../../types';

interface Props {
  chat: ChatItem;
  isActive: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export function SidebarItem({ chat, isActive, onSelect, onDelete }: Props) {
  const handleDelete = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  }, [onDelete]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onSelect();
  }, [onSelect]);

  return (
    <div
      className={`sidebar-item${isActive ? ' active' : ''}`}
      role="button"
      tabIndex={0}
      aria-label={chat.title}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
    >
      <svg className="sidebar-item-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 4h12M2 8h12M2 12h8"/>
      </svg>
      <span className="sidebar-item-text">{chat.title}</span>
      <div className="sidebar-item-actions">
        <button title="删除" aria-label="删除会话" onClick={handleDelete}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 4l8 8M12 4l-8 8"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

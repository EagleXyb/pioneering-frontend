import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTheme } from '../../store/themeContext';
import { useToast } from '../../store/toastContext';
import { ThemeMode } from '../../types';

const themes: { value: ThemeMode; icon: JSX.Element; label: string }[] = [
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

export function AccountPopover() {
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

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') setOpen(prev => !prev);
  }, []);

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
        onKeyDown={handleKeyDown}
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
                data-theme={t.value}
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

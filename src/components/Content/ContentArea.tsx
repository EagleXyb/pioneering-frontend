import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../../store/appContext';
import { ChatMode } from './ChatMode/ChatMode';
import { ProMode } from './ProMode/ProMode';
import { TaskMode } from './TaskMode/TaskMode';

export function ContentArea() {
  const { mode } = useAppContext();
  const prevModeRef = useRef(mode);

  useEffect(() => {
    if (prevModeRef.current !== mode) {
      prevModeRef.current = mode;
      // Focus the textarea on mode switch (P2: focus management)
      requestAnimationFrame(() => {
        const panel = document.querySelector('.mode-panel.active');
        const textarea = panel?.querySelector('.uni-textarea') as HTMLTextAreaElement;
        textarea?.focus();
      });
    }
  }, [mode]);

  return (
    <div className="content-area">
      <div className={`mode-panel chat-mode${mode === 'chat' ? ' active' : ''}`}>
        {mode === 'chat' && <ChatMode />}
      </div>
      <div className={`mode-panel pro-mode${mode === 'pro' ? ' active' : ''}`}>
        {mode === 'pro' && <ProMode />}
      </div>
      <div className={`mode-panel task-mode${mode === 'task' ? ' active' : ''}`}>
        {mode === 'task' && <TaskMode />}
      </div>
    </div>
  );
}

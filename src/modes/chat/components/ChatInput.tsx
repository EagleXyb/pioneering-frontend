import React, { useState, useCallback } from 'react';
import type { ChatStatus } from 'tdesign-web-components/lib/chat-engine';

interface Props {
  status: ChatStatus;
  onSend: (text: string) => void;
  onStop: () => void;
}

const MODEL_OPTIONS = [
  { label: '默认模型', value: 'default' },
  { label: 'Deepseek', value: 'deepseek-r1' },
  { label: '混元', value: 'hunyuan' },
];

export function ChatInput({ status, onSend, onStop }: Props) {
  const [value, setValue] = useState('');
  const [selectedModel, setSelectedModel] = useState('default');
  const [deepThinking, setDeepThinking] = useState(false);

  const handleSend = useCallback(() => {
    const text = value.trim();
    if (!text) return;
    onSend(text);
    setValue('');
  }, [value, onSend]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  const isStreaming = status === 'streaming' || status === 'pending';

  return (
    <div className="chat-input-area">
      <div className="chat-input-inner">
        <div className="chat-input-row">
          <textarea
            className="chat-input-textarea"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="有问题，尽管问～ Enter 发送，Shift+Enter 换行"
            rows={1}
            disabled={isStreaming}
          />
          <div className="chat-input-actions">
            {isStreaming ? (
              <button className="chat-input-btn chat-input-btn-stop" onClick={onStop}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                  <rect x="2" y="2" width="10" height="10" rx="1"/>
                </svg>
                停止
              </button>
            ) : (
              <button
                className="chat-input-btn chat-input-btn-send"
                onClick={handleSend}
                disabled={!value.trim()}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14 2L2 7l4 2 8-7-4 8 4 4z"/>
                </svg>
              </button>
            )}
          </div>
        </div>
        {/* 底部工具栏：模型选择 + 深度思考 */}
        <div className="chat-input-footer">
          <select
            className="chat-model-select"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
          >
            {MODEL_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <button
            className={`chat-deep-think-btn ${deepThinking ? 'active' : ''}`}
            onClick={() => setDeepThinking(!deepThinking)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
            </svg>
            深度思考
          </button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import type { ChatMessagesData } from 'tdesign-web-components/lib/chat-engine';

interface Props {
  message: ChatMessagesData;
}

function getMessageText(msg: ChatMessagesData): string {
  if (!msg.content || msg.content.length === 0) return '';
  return msg.content
    .map((c: any) => {
      if (c.type === 'text' || c.type === 'markdown') return c.data || '';
      if (c.type === 'thinking') return `[思考: ${c.data?.title || c.data?.text || ''}]`;
      return '';
    })
    .filter(Boolean)
    .join('\n');
}

export function ChatMessageItem({ message }: Props) {
  const isUser = message.role === 'user';
  const text = getMessageText(message);

  return (
    <div className={`chat-message${isUser ? ' chat-message-user' : ' chat-message-assistant'}`}>
      {!isUser && (
        <div className="chat-message-avatar chat-message-avatar-ai">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2a4 4 0 014 4c0 2.5-1.5 4-4 6-2.5-2-4-3.5-4-6a4 4 0 014-4z"/>
            <path d="M8 14c-3 1-6 3-6 6v1h20v-1c0-3-3-5-6-6"/>
          </svg>
        </div>
      )}
      <div className={`chat-message-content${isUser ? ' chat-message-content-user' : ''}`}>
        <div className="chat-message-text">{text}</div>
      </div>
      {isUser && (
        <div className="chat-message-avatar chat-message-avatar-user">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="8" r="4"/>
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
          </svg>
        </div>
      )}
    </div>
  );
}
import { useChat } from '@tdesign-react/chat';
import { ChatMessageList } from './components/ChatMessageList';
import { ChatInput } from './components/ChatInput';
import { useConversationStore } from '../../store/conversationStore';
import { useChatSync } from './hooks/useChatSync';
import './chat.css';

export default function ChatMode() {
  const activeId = useConversationStore((s) => s.activeId);
  const create = useConversationStore((s) => s.create);

  const { chatEngine, messages, status } = useChat({
    chatServiceConfig: {
      endpoint: '/api/agent/chat',
      stream: true,
      protocol: 'agui',
      onRequest: (params) => ({
        ...params,
        conversationId: activeId,
      }),
    },
    defaultMessages: [],
  });

  useChatSync(activeId, messages);

  if (!activeId) {
    return (
      <div className="chat-mode">
        <div className="chat-messages-empty">
          <div className="chat-empty-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
          </div>
          <div className="chat-empty-title">你好，有什么可以帮你的？</div>
          <div className="chat-suggestions-list">
            {['帮我分析销售流失原因', '本季度渠道回报如何', '新开产品线需要什么'].map((s, i) => (
              <button
                key={i}
                className="chat-suggestion-btn"
                onClick={() => {
                  const id = create('chat');
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-mode">
      <ChatMessageList messages={messages} status={status} />
      <ChatInput
        status={status}
        onSend={(text) => chatEngine.sendUserMessage({ prompt: text })}
        onStop={() => chatEngine.abortChat()}
      />
    </div>
  );
}
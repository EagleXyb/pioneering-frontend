import { useRef, useCallback } from 'react';
import { ChatBot } from '@tdesign-react/chat';
import type { TdChatbotApi } from '@tdesign-react/chat';

const suggestionItems = [
  { title: '帮我分析最近销售团队流失率高的原因', prompt: '帮我分析最近销售团队流失率高的原因' },
  { title: '这个季度渠道投入回报怎么样', prompt: '这个季度渠道投入回报怎么样' },
  { title: '新开一条产品线需要准备什么', prompt: '新开一条产品线需要准备什么' },
  { title: '帮我评估一下换供应商的风险', prompt: '帮我评估一下换供应商的风险' },
];

export function ChatMode() {
  const chatBotRef = useRef<TdChatbotApi>(null);

  const handleSuggestionClick = useCallback((prompt: string) => {
    chatBotRef.current?.addPrompt(prompt, true);
  }, []);

  return (
    <div className="chat-mode-inner">
      <ChatBot
        ref={chatBotRef as any}
        senderProps={{
          placeholder: '有问题，尽管问～ Enter 发送，Shift+Enter 换行',
          autosize: { minRows: 1, maxRows: 6 },
        }}
      />

      {/* 空状态：居中覆盖层 */}
      <div className="chat-suggestions-wrapper">
        <div className="chat-empty-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        </div>
        <div className="chat-empty-title">你好，有什么可以帮你的？</div>
        <div className="chat-empty-desc">我是创路Agent，可以帮你分析业务问题、梳理决策思路、评估方案风险</div>
        <div className="chat-suggestions">
          {suggestionItems.map((item, i) => (
            <button
              key={i}
              className="chat-suggestion"
              onClick={() => handleSuggestionClick(item.prompt)}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

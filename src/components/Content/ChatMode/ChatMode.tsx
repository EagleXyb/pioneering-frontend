import { useRef, useCallback } from 'react';
import { ChatBot } from '@tdesign-react/chat';
import { useToast } from '../../../store/toastContext';

const suggestions = [
  '帮我分析最近销售团队流失率高的原因',
  '这个季度渠道投入回报怎么样',
  '新开一条产品线需要准备什么',
  '帮我评估一下换供应商的风险',
];

/** Demo 对话消息 */
const demoMessages = [
  {
    id: 'demo-1',
    role: 'user' as const,
    content: [{ type: 'text' as const, data: '帮我分析最近销售团队流失率高的原因，上个月走了3个骨干，都是跟了我两年的老人。' }],
  },
  {
    id: 'demo-2',
    role: 'assistant' as const,
    content: [
      {
        type: 'markdown' as const,
        data: `这个问题需要从多个维度拆解。根据你的描述——**跟了两年**、**骨干**、**集中出走**，我帮你做一个系统性分析：

**1. 时机异常点**
跟了两年才走，说明不是入职适应期问题。集中出走更像是**某个触发事件**导致的连锁反应。

**2. 需要排查的方向**

\`\`\`
流失分析框架
├── 薪酬竞争力（外部拉力）
│   ├── 同行近期是否有挖角动作
│   └── 绩效考核是否调整过
├── 成长空间（内部推力）
│   ├── 两年老兵是否有明确的晋升通道
│   └── 重复性工作是否导致倦怠
├── 管理关系（隐性因素）
│   ├── 直属主管是否更换
│   └── 团队氛围是否有变化
└── 业务压力（环境因素）
    ├── 目标是否突然加码
    └── 资源支持是否缩水
\`\`\`

**3. 快速验证建议**
先跟留下的人做一次非正式沟通，确认是否有共同的不满点。再查看离职面谈记录中是否提到相似关键词。如果两个都指向同一个方向，那就是根因。

需要我帮你设计一份留任访谈提纲吗？`,
      },
    ],
    status: 'complete' as const,
  },
];

export function ChatMode() {
  const { showToast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSuggestionClick = useCallback((text: string) => {
    const ta = containerRef.current?.querySelector('textarea') as HTMLTextAreaElement | null;
    if (ta) {
      ta.value = text;
      ta.dispatchEvent(new Event('input', { bubbles: true }));
      ta.focus();
    }
  }, []);

  return (
    <div ref={containerRef} className="chat-mode-inner">
      <ChatBot
        defaultMessages={demoMessages}
        messageProps={{
          user: {
            variant: 'base',
            placement: 'right',
            avatar: <div className="msg-avatar user">李</div>,
          },
          assistant: {
            variant: 'base',
            placement: 'left',
            avatar: (
              <div className="msg-avatar assistant">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" transform="scale(0.67)" />
                </svg>
              </div>
            ),
            handleActions: {
              copy: (data: any) => {
                const text = data?.content?.[0]?.data ?? '';
                if (text) { navigator.clipboard?.writeText(text); showToast('已复制'); }
              },
              replay: () => showToast('已重新生成'),
              good: () => showToast('感谢反馈'),
              bad: () => showToast('感谢反馈'),
            },
            actions: true,
          },
        }}
        senderProps={{
          placeholder: '有问题，尽管问～ Enter 发送，Shift+Enter 换行',
        }}
      >
        {/* 快捷建议作为 ChatBot children 渲染 */}
        <div className="chat-suggestions-wrapper" slot="sender-footer">
          <div className="chat-suggestions">
            {suggestions.map((text, i) => (
              <button
                key={i}
                className="chat-suggestion"
                onClick={() => handleSuggestionClick(text)}
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      </ChatBot>
    </div>
  );
}

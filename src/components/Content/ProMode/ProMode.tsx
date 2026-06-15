import { useCallback, useRef, useEffect } from 'react';
import { ChatSender } from '@tdesign-react/chat';
import { useToast } from '../../../store/toastContext';
import { ProcessPanel } from './ProcessPanel';

/** 初始 Agent 卡片列表（模拟 ReAct 执行步骤） */
const initialCards = [
  {
    id: '1',
    type: 'thinking' as const,
    label: '分析需求',
    time: '0.2s',
    body: '用户需要评估更换供应商的风险。我需要分解为：合同条款风险、交付连续性风险、价格波动风险、合规风险四个维度进行分析。',
  },
  {
    id: '2',
    type: 'tool' as const,
    label: '调用合同分析工具',
    time: '3.1s',
    body: '正在提取当前供应商合同中的关键条款，包括违约金比例、交付SLA、价格调整机制和终止条款。',
  },
  {
    id: '3',
    type: 'result' as const,
    label: '合同条款风险识别',
    time: '1.8s',
    body: '发现3个高风险条款：①提前终止需支付6个月违约金（行业平均3个月）；②供应商可单方面调价（无协商窗口）；③最低采购量锁定2年。',
  },
];

export function ProMode() {
  const { showToast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, []);

  const handleSend = useCallback((text: string) => {
    showToast(`已发送追问: ${text}`);
  }, [showToast]);

  const handleStop = useCallback(() => {
    showToast('已停止生成');
  }, [showToast]);

  return (
    <>
      <div className="pro-main">
        <div className="pro-main-header">
          <div className="pro-task-title">
            分析供应商合同风险评估
            <span className="pro-task-badge running">执行中</span>
          </div>
          <div className="pro-task-meta">
            <span>5个步骤 · 已完成3个</span>
            <span>用时 12s</span>
            <span className="pro-progress-pct">60%</span>
          </div>
          <div className="pro-progress-bar">
            <div className="pro-progress-fill" style={{ width: '60%' }} />
          </div>
        </div>

        <div className="pro-messages" ref={scrollRef}>
          <div className="pro-messages-inner">
            {/* Agent 思考卡片 */}
            {initialCards.map((card) => (
              <div key={card.id} className="agent-card">
                <div className="agent-card-header">
                  <div className={`agent-card-icon ${card.type}`}>
                    {card.type === 'thinking' ? (
                      <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3">
                        <circle cx="7" cy="7" r="5" /><path d="M7 5v2M7 9h.01" />
                      </svg>
                    ) : card.type === 'tool' ? (
                      <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3">
                        <path d="M5.5 1l-1 4.5L1 7l3.5 1.5 1 4.5 1-4.5L10 7 6.5 5.5z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3">
                        <path d="M2 7l3 3 7-7" />
                      </svg>
                    )}
                  </div>
                  <span className="agent-card-label">{card.label}</span>
                  <span className="agent-card-time">{card.time}</span>
                </div>
                <div className="agent-card-body">{card.body}</div>
              </div>
            ))}

            {/* 最终综合回复 */}
            <div className="pro-final-reply">
              <div className="pro-final-reply-label">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <path d="M2 2h4v4H2zM8 2h4v4H8zM2 8h4v4H2zM8 8h4v4H8z" />
                </svg>
                综合分析结果
              </div>
              <div className="pro-final-reply-content streaming-cursor">
                更换供应商的整体风险等级为<strong>中高</strong>。核心风险集中在合同违约金和交付过渡期...
              </div>
            </div>
          </div>
        </div>

        <div className="uni-input-area">
          <div className="uni-input-box">
            <ChatSender
              placeholder="追加指令或提出新问题... Enter 发送，Shift+Enter 换行"
              onSend={(e: any) => {
                const val = e?.detail?.value || '';
                if (val.trim()) handleSend(val.trim());
              }}
              onStop={handleStop}
            />
          </div>
        </div>
      </div>

      <ProcessPanel />
    </>
  );
}

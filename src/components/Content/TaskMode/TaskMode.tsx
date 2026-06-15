import React from 'react';
import { useToast } from '../../../store/toastContext';

export function TaskMode() {
  const { showToast } = useToast();

  return (
    <div className="task-placeholder">
      <div className="task-placeholder-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="3"/>
          <path d="M7 8h10M7 12h6M7 16h8"/>
        </svg>
      </div>
      <div className="task-placeholder-title">任务模式</div>
      <div className="task-placeholder-desc">
        Plan-and-Execute 多步骤任务规划引擎正在开发中，即将支持复杂业务流程的自动化拆解与执行。
      </div>
      <button className="task-notify-btn" onClick={() => showToast('已订阅上线通知')}>
        订阅上线通知
      </button>
      <div className="task-placeholder-features">
        <div className="task-feature-item">
          <div className="task-feature-icon icon-blue">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
              <path d="M2 3h12M2 7h12M2 11h12"/>
            </svg>
          </div>
          <div className="task-feature-text">
            <div className="task-feature-name">智能任务拆解</div>
            <div className="task-feature-desc">自动将复杂目标分解为可执行的子任务链</div>
          </div>
        </div>
        <div className="task-feature-item">
          <div className="task-feature-icon icon-green">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
              <path d="M2 8l4 4 8-8"/>
            </svg>
          </div>
          <div className="task-feature-text">
            <div className="task-feature-name">并行执行引擎</div>
            <div className="task-feature-desc">独立子任务并行处理，显著提升执行效率</div>
          </div>
        </div>
        <div className="task-feature-item">
          <div className="task-feature-icon icon-purple">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
              <circle cx="8" cy="8" r="6"/>
              <path d="M8 5v6M5 8h6"/>
            </svg>
          </div>
          <div className="task-feature-text">
            <div className="task-feature-name">动态调整策略</div>
            <div className="task-feature-desc">根据执行结果实时调整后续步骤与优先级</div>
          </div>
        </div>
      </div>
    </div>
  );
}

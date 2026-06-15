import React, { useRef, useCallback } from 'react';
import { useAppContext } from '../../../store/appContext';

export function ProcessPanel() {
  const { processes, toggleProcessStep, toggleAllProcessSteps } = useAppContext();
  const panelRef = useRef<HTMLDivElement>(null);

  const anyExpanded = processes.some(p => p.expanded);
  const doneCount = processes.filter(p => !p.loading).length;

  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const panel = panelRef.current;
    if (!panel) return;
    const startX = e.clientX;
    const startWidth = panel.offsetWidth;

    const onMove = (ev: MouseEvent) => {
      const delta = startX - ev.clientX;
      const newWidth = Math.max(280, Math.min(560, startWidth + delta));
      panel.style.width = newWidth + 'px';
    };
    const onUp = () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };

    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }, []);

  return (
    <div className="pro-process-panel" ref={panelRef}>
      <div className="process-resize-handle" onMouseDown={handleResizeStart} />

      <div className="process-header">
        <div className="process-title">
          推理过程
          <span className="process-live-dot" />
        </div>
        <button className="process-toggle-btn" onClick={toggleAllProcessSteps}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M2 4l4 4 4-4" />
          </svg>
          {anyExpanded ? '全部折叠' : '全部展开'}
        </button>
      </div>

      <div className="process-summary">
        <div className="process-summary-steps">
          {processes.map((p, i) => (
            <span
              key={i}
              className={`process-summary-dot${
                p.loading ? ' active' : i < doneCount ? ' done' : ''
              }`}
            />
          ))}
        </div>
        <span className="process-summary-text">
          步骤 {doneCount}/{processes.length} · 综合评估决策
        </span>
        <span className="process-summary-time">12s</span>
      </div>

      <div className="process-steps">
        {processes.map((step, idx) => (
          <div key={idx} className={`process-step${step.expanded ? ' expanded' : ''}`}>
            <div
              className="process-step-header"
              role="button"
              tabIndex={0}
              aria-expanded={step.expanded}
              onClick={() => toggleProcessStep(idx)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleProcessStep(idx);
                }
              }}
            >
              <span className={`process-step-number ${step.type}`}>{step.stepNumber}</span>
              <span className="process-step-label">{step.label}</span>
              <span className={`process-step-badge ${step.type}`}>{step.badge}</span>
              <svg className="process-step-chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 4l4 4-4 4" />
              </svg>
            </div>
            <div className="process-step-detail">
              <div className="process-step-detail-inner">
                {step.loading ? (
                  <div className="process-loading">
                    <div className="loading-dots">
                      <span />
                      <span />
                      <span />
                    </div>
                    正在执行风险量化计算...
                  </div>
                ) : step.detail ? (
                  <div className="detail-section">
                    {step.detail.type === 'text' ? (
                      <>
                        {step.detail.label && <div className="detail-label">{step.detail.label}</div>}
                        <div className="detail-text">{step.detail.content}</div>
                      </>
                    ) : (
                      <div className="detail-code">
                        {step.detail.codeHead && <span className="detail-code-head">{step.detail.codeHead}</span>}
                        <span className="detail-code-body">{step.detail.content}</span>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { ChatSender } from '@tdesign-react/chat';
import type { TdChatSenderParams } from 'tdesign-web-components';

interface Props {
  placeholder?: string;
  onSend?: (text: string) => void;
  loading?: boolean;
  onStop?: () => void;
}

/**
 * 基于 TDesign ChatSender 的统一输入组件
 * 替代原来手写的输入框，提供模型选择和深度思考等扩展能力
 */
export function UnifiedInput({
  placeholder = '有问题，尽管问～ Enter 发送，Shift+Enter 换行',
  onSend,
  loading = false,
  onStop,
}: Props) {
  return (
    <div className="uni-input-area">
      <div className="uni-input-box">
        <ChatSender
          placeholder={placeholder}
          loading={loading}
          onSend={(e: CustomEvent<TdChatSenderParams>) => {
            const val = e?.detail?.value || '';
            if (val?.trim() && onSend) {
              onSend(val.trim());
            }
          }}
          onStop={onStop as any}
        />
      </div>
    </div>
  );
}

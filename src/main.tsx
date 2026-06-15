import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './store/themeContext';
import { AppProvider } from './store/appContext';
import { ToastProvider } from './store/toastContext';

// TDesign 样式
import 'tdesign-react/es/style/index.css';

// TDesign Chat 样式
import '@tdesign-react/chat/es/style/index.js';

// 项目自定义样式（覆盖/补充）
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </ToastProvider>
    </ThemeProvider>
  </React.StrictMode>,
);

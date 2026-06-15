import React from 'react';
import { Sidebar } from './components/Sidebar/Sidebar';
import { TopNav } from './components/MainArea/TopNav';
import { ContentArea } from './components/Content/ContentArea';

export default function App() {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-area">
        <TopNav />
        <ContentArea />
      </div>
    </div>
  );
}

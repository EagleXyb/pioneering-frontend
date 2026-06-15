import React from 'react';

export const Icons = {
  Chat: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" {...props}>
      <path d="M2 3h10a1 1 0 011 1v5a1 1 0 01-1 1H5l-3 2V4a1 1 0 011-1z"/>
    </svg>
  ),
  Grid: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" {...props}>
      <path d="M2 2h4v4H2zM8 2h4v4H8zM2 8h4v4H2zM8 8h4v4H8z"/>
    </svg>
  ),
  Task: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" {...props}>
      <rect x="1" y="1" width="12" height="12" rx="2"/>
      <path d="M4 5h6M4 7h4M4 9h5"/>
    </svg>
  ),
  Plus: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <line x1="8" y1="3" x2="8" y2="13"/>
      <line x1="3" y1="8" x2="13" y2="8"/>
    </svg>
  ),
  List: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M2 4h12M2 8h12M2 12h8"/>
    </svg>
  ),
  Close: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M4 4l6 6M10 4l-6 6"/>
    </svg>
  ),
  Sun: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" {...props}>
      <circle cx="7" cy="7" r="3"/>
      <path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M3.1 3.1l1 1M9.9 9.9l1 1M3.1 10.9l1-1M9.9 4.1l1-1"/>
    </svg>
  ),
  Moon: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" {...props}>
      <path d="M12 8.5A5.5 5.5 0 015.5 2 5.5 5.5 0 1012 8.5z"/>
    </svg>
  ),
  Monitor: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" {...props}>
      <rect x="1" y="1" width="8" height="8" rx="1.5"/>
      <path d="M11 5h1a1 1 0 011 1v6a1 1 0 01-1 1H6a1 1 0 01-1-1v-1"/>
    </svg>
  ),
  Menu: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M3 5h14M3 10h14M3 15h14"/>
    </svg>
  ),
  Share: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M4 12v2a2 2 0 002 2h6a2 2 0 002-2v-2M9 2v9M9 2l3 3M9 2L6 5"/>
    </svg>
  ),
  Dots: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 18 18" fill="currentColor" {...props}>
      <circle cx="9" cy="4" r="1.2"/>
      <circle cx="9" cy="9" r="1.2"/>
      <circle cx="9" cy="14" r="1.2"/>
    </svg>
  ),
  ChevronDown: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M3 5l3 3 3-3"/>
    </svg>
  ),
  ChevronRight: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M6 4l4 4-4 4"/>
    </svg>
  ),
  Send: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 8l12-5-5 12-2-5z"/>
    </svg>
  ),
  Stop: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 14 14" fill="currentColor" {...props}>
      <rect x="2" y="2" width="10" height="10" rx="2"/>
    </svg>
  ),
  Settings: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <circle cx="8" cy="8" r="2.5"/>
      <path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M3.4 12.6l1.4-1.4M11.2 4.8l1.4-1.4"/>
    </svg>
  ),
  Logout: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" {...props}>
      <path d="M6 14H3a1 1 0 01-1-1V3a1 1 0 011-1h3M11 10l3-3-3-3M14 7H6"/>
    </svg>
  ),
  Brain: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" {...props}>
      <path d="M7 1v2M7 11v2M1 7h2M11 7h2M3.05 3.05l1.41 1.41M9.54 9.54l1.41 1.41M3.05 10.95l1.41-1.41M9.54 4.46l1.41-1.41"/>
      <circle cx="7" cy="7" r="2.5"/>
    </svg>
  ),
  Diamond: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  ),
  Question: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" {...props}>
      <circle cx="7" cy="7" r="5"/>
      <path d="M7 5v2M7 9h.01"/>
    </svg>
  ),
  Star: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" {...props}>
      <path d="M5.5 1l-1 4.5L1 7l3.5 1.5 1 4.5 1-4.5L10 7 6.5 5.5z"/>
    </svg>
  ),
  Check: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" {...props}>
      <path d="M2 7l3 3 7-7"/>
    </svg>
  ),
  Doc: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3"/>
      <path d="M7 8h10M7 12h6M7 16h8"/>
    </svg>
  ),
  Alert: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 8v4M12 16h.01"/>
    </svg>
  ),
  Refresh: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1" {...props}>
      <path d="M1 6a5 5 0 019.5-1M11 6a5 5 0 01-9.5 1"/>
      <path d="M10 1v4h-4M2 11V7h4"/>
    </svg>
  ),
  Layers: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" {...props}>
      <path d="M2 3h12M2 7h12M2 11h12"/>
    </svg>
  ),
};

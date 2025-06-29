// src/app/layout.js

import './globals.css';

export const metadata = {
  title: 'To-Do App',
  description: 'A simple full-stack to-do application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

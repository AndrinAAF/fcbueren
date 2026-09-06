"use client";

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the editor to prevent SSR issues
const DefaultEditor = dynamic(
  () => import('react-simple-wysiwyg').then((mod) => mod.DefaultEditor),
  { ssr: false }
);

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  return (
    <div style={{ backgroundColor: '#fff', color: '#000', borderRadius: '4px', overflow: 'hidden' }}>
      <DefaultEditor 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        placeholder={placeholder}
      />
    </div>
  );
}

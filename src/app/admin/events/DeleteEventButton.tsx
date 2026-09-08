"use client";

import React from 'react';

export default function DeleteEventButton({ 
  id, 
  deleteAction 
}: { 
  id: string, 
  deleteAction: (formData: FormData) => void 
}) {
  return (
    <form action={deleteAction}>
      <input type="hidden" name="id" value={id} />
      <button 
        type="submit" 
        className="admin-action-btn delete" 
        onClick={(e) => {
          if (!confirm('Veranstaltung wirklich löschen?')) {
            e.preventDefault();
          }
        }}
      >
        Löschen
      </button>
    </form>
  );
}

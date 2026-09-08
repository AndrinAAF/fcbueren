"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import RichTextEditor from '@/components/RichTextEditor';

interface EventFormClientProps {
  initialData?: {
    id: string;
    title: string;
    date: string;
    description: string | null;
    content: string;
    address: string | null;
    imageUrl: string | null;
    linkUrl: string | null;
  };
}

export default function EventFormClient({ initialData }: EventFormClientProps) {
  const router = useRouter();
  
  const [title, setTitle] = useState(initialData?.title || '');
  // Format date for the input type="date"
  const defaultDate = initialData?.date ? new Date(initialData.date).toISOString().split('T')[0] : '';
  const [dateStr, setDateStr] = useState(defaultDate);
  const [description, setDescription] = useState(initialData?.description || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [address, setAddress] = useState(initialData?.address || '');
  const [linkUrl, setLinkUrl] = useState(initialData?.linkUrl || '');
  
  // Address Autocomplete State
  const [addressSuggestions, setAddressSuggestions] = useState<{ display_name: string }[]>([]);
  const [showAddressDropdown, setShowAddressDropdown] = useState(false);
  const addressTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchAddressSuggestions = async (query: string) => {
    if (!query || query.length < 3) {
      setAddressSuggestions([]);
      return;
    }
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5`);
      const data = await res.json();
      setAddressSuggestions(data || []);
      setShowAddressDropdown(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setAddress(val);
    if (addressTimeoutRef.current) clearTimeout(addressTimeoutRef.current);
    addressTimeoutRef.current = setTimeout(() => {
      fetchAddressSuggestions(val);
    }, 500);
  };
  
  // Title Image
  const [titleImage, setTitleImage] = useState<string | null>(initialData?.imageUrl || null);
  const [titleImageFile, setTitleImageFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const inlineImageInputRef = useRef<HTMLInputElement>(null);
  const titleImageInputRef = useRef<HTMLInputElement>(null);

  const handleTitleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTitleImageFile(e.target.files[0]);
    }
  };

  const handleInlineImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      try {
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = await res.json();
        if (data.success) {
          const imgTag = `<img src="${data.url}" alt="Inline Bild" style="display: block; max-width: 100%; border-radius: 8px; margin: 1.5rem auto;" />`;
          setContent(prev => prev + '<p></p>' + imgTag + '<p></p>');
        } else {
          alert('Fehler beim Hochladen des Bildes.');
        }
      } catch (error) {
        console.error("Inline image upload error", error);
        alert('Fehler beim Hochladen.');
      }
      // Reset input
      e.target.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !dateStr) return alert("Titel und Datum sind Pflichtfelder.");
    
    setIsSubmitting(true);
    
    let finalTitleImageUrl = titleImage || '';
    if (titleImageFile) {
      const formData = new FormData();
      formData.append('file', titleImageFile);
      try {
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = await res.json();
        if (data.success) {
          finalTitleImageUrl = data.url;
        }
      } catch (error) {
        console.error("Upload title image error", error);
      }
    }

    const payload = new FormData();
    if (initialData) payload.append('id', initialData.id);
    payload.append('title', title);
    payload.append('date', dateStr);
    payload.append('description', description);
    payload.append('content', content);
    payload.append('address', address);
    payload.append('linkUrl', linkUrl);
    payload.append('imageUrl', finalTitleImageUrl);

    const method = initialData ? 'PUT' : 'POST';

    try {
      const res = await fetch('/api/admin/events', {
        method,
        body: payload
      });
      if (res.ok) {
        router.push('/admin/events');
        router.refresh();
      } else {
        alert("Fehler beim Speichern");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      alert("Ein Fehler ist aufgetreten");
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{initialData ? 'Veranstaltung Bearbeiten' : 'Neue Veranstaltung'}</h1>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        
        {/* Left Column */}
        <div style={{ flex: '1 1 60%', display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: 0 }}>
          <div className="admin-dark-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label className="admin-label">Veranstaltung Titel *</label>
                <input 
                  type="text" 
                  required
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                  className="admin-dark-input"
                  placeholder="z.B. Generalversammlung 2026"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label className="admin-label">Datum *</label>
                <input 
                  type="date" 
                  required
                  value={dateStr} 
                  onChange={(e) => setDateStr(e.target.value)}
                  className="admin-dark-input"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative' }}>
                <label className="admin-label">Adresse / Ort (Für Google Maps)</label>
                <input 
                  type="text" 
                  value={address} 
                  onChange={handleAddressChange}
                  onFocus={() => {
                    if (addressSuggestions.length > 0) setShowAddressDropdown(true);
                  }}
                  className="admin-dark-input"
                  placeholder="z.B. Sportplatz Lachen, Büren an der Aare"
                />
                
                {/* Autocomplete Dropdown */}
                {showAddressDropdown && addressSuggestions.length > 0 && (
                  <div style={{ position: 'absolute', top: '70px', left: 0, right: 0, backgroundColor: '#333', border: '1px solid #444', borderRadius: '4px', zIndex: 20, maxHeight: '200px', overflowY: 'auto' }}>
                    {addressSuggestions.map((sugg, idx) => (
                      <div 
                        key={idx}
                        onClick={() => {
                          setAddress(sugg.display_name);
                          setShowAddressDropdown(false);
                        }}
                        style={{ padding: '0.75rem', cursor: 'pointer', color: '#fff', fontSize: '0.9rem', borderBottom: '1px solid #444' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#444'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        {sugg.display_name}
                      </div>
                    ))}
                  </div>
                )}

                {/* Overlay to close dropdown */}
                {showAddressDropdown && (
                  <div 
                    onClick={() => setShowAddressDropdown(false)} 
                    style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10 }}
                  />
                )}
                
                {/* Google Maps Preview */}
                {address && address.length > 3 && (
                  <div style={{ marginTop: '0.5rem', width: '100%', height: '200px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--clr-border)' }}>
                    <iframe
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
                    ></iframe>
                  </div>
                )}
                <span style={{ fontSize: '0.8rem', color: 'var(--clr-text-muted)' }}>Die Karte wird Besuchern automatisch basierend auf dieser Adresse angezeigt. Überprüfe die Vorschau, um sicherzustellen, dass der Ort richtig gefunden wird.</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label className="admin-label">Inhalt</label>
                  
                  <button 
                    type="button" 
                    onClick={() => inlineImageInputRef.current?.click()}
                    style={{ 
                      background: 'none', 
                      border: '1px solid var(--clr-primary)', 
                      color: 'var(--clr-primary)', 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                    Bild im Text einfügen
                  </button>
                  <input 
                    type="file" 
                    accept="image/*" 
                    ref={inlineImageInputRef} 
                    onChange={handleInlineImageUpload} 
                    style={{ display: 'none' }} 
                  />
                </div>
                <div style={{ backgroundColor: '#fff', borderRadius: '4px' }}>
                  <RichTextEditor value={content} onChange={setContent} />
                </div>
              </div>

              
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ flex: '1 1 30%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Titel Bild Box */}
          <div className="admin-dark-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid var(--clr-border)', paddingBottom: '0.5rem' }}>
              Titelbild
            </h3>
            
            {(titleImageFile || titleImage) && (
              <div style={{ marginBottom: '1rem', position: 'relative', width: '100%', height: '150px', borderRadius: '8px', overflow: 'hidden' }}>
                <img 
                  src={titleImageFile ? URL.createObjectURL(titleImageFile) : titleImage!} 
                  alt="Titelbild" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <button
                  type="button"
                  onClick={() => {
                    setTitleImageFile(null);
                    setTitleImage(null);
                    if (titleImageInputRef.current) titleImageInputRef.current.value = '';
                  }}
                  style={{
                    position: 'absolute', top: '5px', right: '5px',
                    background: 'rgba(0,0,0,0.6)', color: 'white',
                    border: 'none', borderRadius: '50%',
                    width: '24px', height: '24px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
            )}
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <input 
                type="file" 
                accept="image/*" 
                ref={titleImageInputRef}
                onChange={handleTitleImageChange}
                style={{ display: 'none' }}
                id="titleImageInput"
              />
              <label 
                htmlFor="titleImageInput" 
                style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  padding: '0.75rem', border: '1px dashed var(--clr-border)', borderRadius: '4px',
                  cursor: 'pointer', color: 'var(--clr-text-muted)', fontSize: '0.9rem',
                  transition: 'background 0.2s, color 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--clr-surface-hover)';
                  e.currentTarget.style.color = 'var(--clr-text)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--clr-text-muted)';
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                Bild auswählen
              </label>
            </div>
          </div>

          {/* Action Button Bottom Right */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
            <button type="submit" disabled={isSubmitting} className="admin-btn-red" style={{ padding: '0.75rem 2.5rem', fontSize: '1.1rem', fontWeight: 'bold', width: '100%' }}>
              {isSubmitting ? 'Speichere...' : 'Speichern'}
            </button>
          </div>
          
        </div>
      </form>
    </div>
  );
}

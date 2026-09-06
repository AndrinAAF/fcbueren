"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import RichTextEditor from '@/components/RichTextEditor';

interface NewsFormClientProps {
  initialData?: {
    id: string;
    title: string;
    content: string;
    author: string | null;
    photographer: string | null;
    imageUrl: string | null;
    tags: string; // JSON string
    images: string; // JSON string
  };
}

const PREDEFINED_TAGS = [
  '1. Mannschaft', '2. Mannschaft', 'Ü40+', 
  'Team Häftli', 'Büren E Junioren', 'Büren F/G Junioren', 
  'Aktive', 'Junioren', 'Verein', 'Sponsoren'
];

export default function NewsFormClient({ initialData }: NewsFormClientProps) {
  const router = useRouter();
  
  const [title, setTitle] = useState(initialData?.title || '');
  const [author, setAuthor] = useState(initialData?.author || '');
  const [photographer, setPhotographer] = useState(initialData?.photographer || '');
  const [content, setContent] = useState(initialData?.content || '');
  
  // Tags
  const [tags, setTags] = useState<string[]>(() => {
    try {
      if (initialData?.tags) return JSON.parse(initialData.tags);
    } catch (e) {}
    return [];
  });
  const [tagInput, setTagInput] = useState('');
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  
  // Title Image
  const [titleImage, setTitleImage] = useState<string | null>(initialData?.imageUrl || null);
  const [titleImageFile, setTitleImageFile] = useState<File | null>(null);

  // Images
  const [noImages, setNoImages] = useState(() => {
    try {
      if (initialData?.images && JSON.parse(initialData.images).length > 0) return false;
    } catch (e) {}
    return initialData ? true : false;
  });
  const [images, setImages] = useState<string[]>(() => {
    try {
      if (initialData?.images) return JSON.parse(initialData.images);
    } catch (e) {}
    return [];
  });
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const titleImageInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFilesToUpload(Array.from(e.target.files));
      setNoImages(false);
    }
  };

  const handleTitleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTitleImageFile(e.target.files[0]);
    }
  };

  const handleAddTag = (tagToAdd: string) => {
    if (tagToAdd.trim() && !tags.includes(tagToAdd.trim())) {
      setTags([...tags, tagToAdd.trim()]);
    }
    setTagInput('');
    setShowTagDropdown(false);
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return alert("Titel und Inhalt sind Pflichtfelder.");
    
    setIsSubmitting(true);
    
    // Upload files if any
    let uploadedUrls: string[] = [];
    if (!noImages && filesToUpload.length > 0) {
      for (const file of filesToUpload) {
        const formData = new FormData();
        formData.append('file', file);
        try {
          const res = await fetch('/api/upload', { method: 'POST', body: formData });
          const data = await res.json();
          if (data.success) {
            uploadedUrls.push(data.url);
          }
        } catch (error) {
          console.error("Upload error", error);
        }
      }
    }

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
        console.error("Title image upload error", error);
      }
    }
    
    const finalImages = noImages ? [] : [...images, ...uploadedUrls];
    
    const formData = new FormData();
    if (initialData) formData.append('id', initialData.id);
    formData.append('title', title);
    formData.append('author', author);
    formData.append('photographer', photographer);
    formData.append('content', content);
    formData.append('imageUrl', finalTitleImageUrl);
    formData.append('tags', JSON.stringify(tags));
    formData.append('images', JSON.stringify(finalImages));
    
    // We will post to a server action or API route
    try {
      const response = await fetch('/api/admin/news', {
        method: initialData ? 'PUT' : 'POST',
        body: formData
      });
      
      if (response.ok) {
        router.push('/admin/news');
        router.refresh();
      } else {
        alert("Fehler beim Speichern");
      }
    } catch (error) {
      console.error(error);
      alert("Fehler beim Speichern");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredPredefinedTags = PREDEFINED_TAGS.filter(t => t.toLowerCase().includes(tagInput.toLowerCase()) && !tags.includes(t));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{initialData ? 'Beitrag Bearbeiten' : 'Neuer Beitrag'}</h1>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        
        {/* Left Column */}
        <div style={{ flex: '1 1 60%', display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: 0 }}>
          
          <div className="admin-dark-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label className="admin-label">Autor Name</label>
                <input 
                  type="text" 
                  value={author} 
                  onChange={(e) => setAuthor(e.target.value)}
                  className="admin-dark-input"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label className="admin-label">Fotograph Name</label>
                <input 
                  type="text" 
                  value={photographer} 
                  onChange={(e) => setPhotographer(e.target.value)}
                  className="admin-dark-input"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label className="admin-label">Beitrag Titel *</label>
                <input 
                  type="text" 
                  required
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                  className="admin-dark-input"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label className="admin-label">Inhalt *</label>
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
            <h3 style={{ margin: '0 0 1rem 0', color: '#ccc', fontWeight: 'normal' }}>Titelbild</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label className="admin-label">Bild auswählen</label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input 
                  type="file" 
                  className="admin-dark-input" 
                  accept="image/png, image/jpeg" 
                  onChange={handleTitleImageChange}
                  ref={titleImageInputRef}
                  style={{ flex: 1 }} 
                />
              </div>
              {(titleImageFile || titleImage) && (
                <div style={{ marginTop: '0.5rem', color: '#aaa', fontSize: '0.85rem' }}>
                  {titleImageFile ? 'Neues Bild ausgewählt' : 'Bestehendes Bild vorhanden'}
                </div>
              )}
            </div>
          </div>

          {/* Bilder Box */}
          <div className="admin-dark-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#ccc', fontWeight: 'normal' }}>Bilder für Slideshow</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              
              {!noImages && (
                <>
                  <label className="admin-label">Bilder auswählen</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    style={{ 
                      backgroundColor: 'var(--admin-input-bg)', 
                      border: '1px solid var(--admin-border)', 
                      padding: '0.75rem', 
                      borderRadius: '6px', 
                      color: '#fff', 
                      cursor: 'pointer',
                      fontSize: '0.95rem'
                    }}
                  >
                    {filesToUpload.length > 0 ? `${filesToUpload.length} Dateien ausgewählt` : 'Dateien auswählen'}
                  </div>
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    style={{ display: 'none' }} 
                  />
                  
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                    {images.map((img, idx) => (
                      <div key={idx} style={{ position: 'relative', width: '50px', height: '50px' }}>
                        <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                        <button type="button" onClick={() => setImages(images.filter(i => i !== img))} style={{ position: 'absolute', top: 0, right: 0, background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: '16px', height: '16px', fontSize: '10px', cursor: 'pointer' }}>x</button>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                <input 
                  type="checkbox" 
                  id="no-images" 
                  checked={noImages} 
                  onChange={(e) => setNoImages(e.target.checked)} 
                  style={{ cursor: 'pointer' }}
                />
                <label htmlFor="no-images" style={{ cursor: 'pointer', fontSize: '0.85rem', color: '#aaa' }}>Kein Slideshow Bild vorhanden</label>
              </div>
            </div>
          </div>

          {/* Tags Box */}
          <div className="admin-dark-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#ccc', fontWeight: 'normal' }}>Tags</h3>
            
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label className="admin-label">Tags hinzufügen</label>
              
              <input 
                type="text" 
                placeholder="Tag..." 
                value={tagInput}
                onChange={(e) => {
                  setTagInput(e.target.value);
                  setShowTagDropdown(true);
                }}
                onFocus={() => setShowTagDropdown(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag(tagInput);
                  }
                }}
                className="admin-dark-input"
              />

              {/* Custom Dropdown */}
              {showTagDropdown && (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: '#333', border: '1px solid #444', borderRadius: '4px', zIndex: 20, maxHeight: '150px', overflowY: 'auto', marginTop: '4px' }}>
                  {filteredPredefinedTags.map(tag => (
                    <div 
                      key={tag}
                      onClick={() => handleAddTag(tag)}
                      style={{ padding: '0.5rem', cursor: 'pointer', color: '#fff' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#444'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      {tag}
                    </div>
                  ))}
                  {tagInput && !PREDEFINED_TAGS.includes(tagInput) && !tags.includes(tagInput) && (
                    <div 
                      onClick={() => handleAddTag(tagInput)}
                      style={{ padding: '0.5rem', cursor: 'pointer', color: '#fff', fontStyle: 'italic' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#444'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      "{tagInput}" hinzufügen
                    </div>
                  )}
                </div>
              )}
              
              {/* Overlay to close dropdown */}
              {showTagDropdown && (
                <div 
                  onClick={() => setShowTagDropdown(false)} 
                  style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10 }}
                />
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
              {tags.map(tag => (
                <div key={tag} style={{ backgroundColor: 'var(--clr-primary)', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {tag}
                  <span onClick={() => removeTag(tag)} style={{ cursor: 'pointer', fontWeight: 'bold' }}>&times;</span>
                </div>
              ))}
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

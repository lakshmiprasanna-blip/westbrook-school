"use client";

import { useState, useRef, useCallback, useEffect } from "react";

function FileChip({ file, onRemove }) {
  return (
    <span className="chip">
      <span className="chip-name">{file.name}</span>
      <button type="button" className="chip-x" onClick={onRemove}>×</button>
    </span>
  );
}

function DropZone({ label, hint, accept, multiple = false, files, onChange }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = Array.from(e.dataTransfer.files);
    if (!dropped.length) return;
    onChange(multiple ? [...files, ...dropped] : [dropped[0]]);
  }, [files, multiple, onChange]);

  const removeFile = (idx) => {
    const updated = [...files];
    updated.splice(idx, 1);
    onChange(updated);
  };

  return (
    <div
      className={`dz${dragging ? " dz--drag" : ""}${files.length ? " dz--filled" : ""}`}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => !files.length && inputRef.current?.click()}
      role="button" tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
    >
      <input ref={inputRef} type="file" accept={accept} multiple={multiple} className="sr-only"
        onChange={(e) => {
          const picked = Array.from(e.target.files || []);
          onChange(multiple ? [...files, ...picked] : [picked[0]]);
          e.target.value = "";
        }}
      />
      {files.length === 0 ? (
        <div className="dz-empty">
          <p className="dz-label">{label}</p>
          {hint && <p className="dz-hint">{hint}</p>}
        </div>
      ) : (
        <div className="dz-filled" onClick={(e) => e.stopPropagation()}>
          <div className="dz-chips">
            {files.map((f, i) => <FileChip key={i} file={f} onRemove={() => removeFile(i)} />)}
          </div>
          {multiple && (
            <button type="button" className="dz-add" onClick={() => inputRef.current?.click()}>
              + Add more
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Edit Modal ─── */
function EditModal({ blog, slug, onClose, onSaved }) {
  const [form, setForm] = useState(() => ({
    title: blog.title || "",
    intro: blog.intro || "",
    metaTitle: blog.metaTitle || blog.title || "",
    metaDescription: blog.metaDescription || "",
    sections: (blog.sections || []).map(s => ({
      heading: s.heading || "",
      content: Array.isArray(s.paragraphs) && s.paragraphs.length
        ? s.paragraphs.join("\n\n")
        : (s.content || ""),
    })),
    faqs: (blog.faqs || []).map(f => ({ ...f })),
    // Images: sideImages stored as { url, file } objects
    bannerImage: blog.bannerImage || "",
    sideImages: (blog.sideImages || []).map(url => ({ url, file: null })),
  }));

  const [newBannerFile, setNewBannerFile] = useState(null);
  const [removeBanner,  setRemoveBanner]  = useState(false);
  const bannerInputRef = useRef(null);

  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState(null);
  const [activeSection, setActiveSection] = useState("meta");

  const setField = (key, val) => setForm(f => ({ ...f, [key]: val }));

  /* sections helpers */
  const updateSection = (idx, key, val) =>
    setForm(f => ({ ...f, sections: f.sections.map((s, i) => i === idx ? { ...s, [key]: val } : s) }));
  const addSection    = () => setForm(f => ({ ...f, sections: [...f.sections, { heading: "", content: "" }] }));
  const removeSection = (idx) => setForm(f => ({ ...f, sections: f.sections.filter((_, i) => i !== idx) }));
  const moveSection   = (idx, dir) => setForm(f => {
    const s = [...f.sections]; const t = idx + dir;
    if (t < 0 || t >= s.length) return f;
    [s[idx], s[t]] = [s[t], s[idx]];
    return { ...f, sections: s };
  });

  /* faqs helpers */
  const updateFaq = (idx, key, val) =>
    setForm(f => ({ ...f, faqs: f.faqs.map((q, i) => i === idx ? { ...q, [key]: val } : q) }));
  const addFaq    = () => setForm(f => ({ ...f, faqs: [...f.faqs, { question: "", answer: "" }] }));
  const removeFaq = (idx) => setForm(f => ({ ...f, faqs: f.faqs.filter((_, i) => i !== idx) }));

  /* image helpers */
  const removeSideImage = (idx) =>
    setForm(f => ({ ...f, sideImages: f.sideImages.filter((_, i) => i !== idx) }));
  const addSideFiles = (files) =>
    setForm(f => ({
      ...f,
      sideImages: [...f.sideImages, ...files.map(file => ({ url: "", file }))],
    }));

  const handleSave = async () => {
    setSaving(true); setError(null);
    try {
      const sectionsForApi = form.sections.map(({ heading, content }) => ({
        heading,
        paragraphs: content.split(/\n\n+/).map(p => p.trim()).filter(Boolean),
      }));

      const hasImageChanges = newBannerFile || removeBanner || form.sideImages.some(s => s.file);

      if (hasImageChanges) {
        const fd = new FormData();
        fd.append("json", JSON.stringify({
          title: form.title,
          intro: form.intro,
          metaTitle: form.metaTitle,
          metaDescription: form.metaDescription,
          sections: sectionsForApi,
          faqs: form.faqs,
          // pass back existing (non-new) side image URLs so the server keeps them
          sideImages: form.sideImages.filter(s => !s.file).map(s => s.url),
        }));
        if (newBannerFile)  fd.append("banner", newBannerFile);
        if (removeBanner)   fd.append("removeBanner", "true");
        form.sideImages.forEach(s => { if (s.file) fd.append("newSideImages", s.file); });

        const res  = await fetch(`/api/blogs?slug=${slug}`, { method: "PATCH", body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Save failed");
        onSaved(slug, data); onClose();
      } else {
        const res  = await fetch(`/api/blogs?slug=${slug}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: form.title, intro: form.intro, metaTitle: form.metaTitle, metaDescription: form.metaDescription, sections: sectionsForApi, faqs: form.faqs }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Save failed");
        onSaved(slug, data); onClose();
      }
    } catch (e) { setError(e.message); }
    finally { setSaving(false); }
  };

  const tabs = [
    { id: "meta",     label: "Meta & Title",                      },
    { id: "sections", label: `Sections (${form.sections.length})`,  },
    { id: "faqs",     label: `FAQs (${form.faqs.length})`,          },
    { id: "images",   label: "Images",                           },
  ];

  /* Banner preview src */
  const bannerSrc = newBannerFile
    ? URL.createObjectURL(newBannerFile)
    : (!removeBanner && form.bannerImage) ? form.bannerImage : null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="edit-modal" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="em-header">
          <div>
            <h3 className="em-title">Edit Blog</h3>
            <p className="em-slug">/blogs/{slug}</p>
          </div>
          <button className="em-close" onClick={onClose}>✕</button>
        </div>

        {/* Inner tabs */}
        <div className="em-tabs">
          {tabs.map(t => (
            <button key={t.id}
              className={`em-tab${activeSection === t.id ? " em-tab--active" : ""}`}
              onClick={() => setActiveSection(t.id)}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="em-body">

          {/* META */}
          {activeSection === "meta" && (
            <div className="em-section">
              <div className="ef-group">
                <label className="ef-label">Blog Title</label>
                <input className="ef-input" value={form.title}
                  onChange={e => setField("title", e.target.value)}
                  placeholder="Main display title shown on the blog page" />
              </div>
              <div className="ef-group">
                <label className="ef-label">Intro Paragraph</label>
                <textarea className="ef-textarea" rows={4} value={form.intro}
                  onChange={e => setField("intro", e.target.value)}
                  placeholder="Opening paragraph shown below the title on the blog page" />
                <p className="ef-hint">Displayed directly below the blog title, before any sections.</p>
              </div>
              <div className="ef-group">
                <label className="ef-label">Meta Title <span className="ef-badge">SEO</span></label>
                <input className="ef-input" value={form.metaTitle}
                  onChange={e => setField("metaTitle", e.target.value)}
                  placeholder="Title used in browser tab & search results" />
                <p className="ef-hint">{form.metaTitle.length}/60 chars recommended</p>
              </div>
              <div className="ef-group">
                <label className="ef-label">Meta Description <span className="ef-badge">SEO</span></label>
                <textarea className="ef-textarea" rows={3} value={form.metaDescription}
                  onChange={e => setField("metaDescription", e.target.value)}
                  placeholder="Short description shown in search results (120–160 chars)" />
                <p className="ef-hint">{form.metaDescription.length}/160 chars recommended</p>
              </div>
            </div>
          )}

          {/* SECTIONS */}
          {activeSection === "sections" && (
            <div className="em-section">
              {form.sections.length === 0 && <div className="em-empty">No sections yet. Add one below.</div>}
              {form.sections.map((sec, i) => (
                <div key={i} className="ec-card">
                  <div className="ec-card-head">
                    <span className="ec-num">§{i + 1}</span>
                    <div className="ec-card-actions">
                      <button className="ec-icon-btn" title="Move up"   onClick={() => moveSection(i, -1)} disabled={i === 0}>↑</button>
                      <button className="ec-icon-btn" title="Move down" onClick={() => moveSection(i, 1)}  disabled={i === form.sections.length - 1}>↓</button>
                      <button className="ec-icon-btn ec-icon-btn--del"  onClick={() => removeSection(i)}>✕</button>
                    </div>
                  </div>
                  <div className="ef-group">
                    <label className="ef-label">Heading</label>
                    <input className="ef-input" value={sec.heading}
                      onChange={e => updateSection(i, "heading", e.target.value)}
                      placeholder="Section heading (H2)" />
                  </div>
                  <div className="ef-group" style={{ marginBottom: 0 }}>
                    <label className="ef-label">Content</label>
                    <textarea className="ef-textarea" rows={5} value={sec.content}
                      onChange={e => updateSection(i, "content", e.target.value)}
                      placeholder="Section body text" />
                  </div>
                </div>
              ))}
              <button className="em-add-btn" onClick={addSection}>+ Add Section</button>
            </div>
          )}

          {/* FAQS */}
          {activeSection === "faqs" && (
            <div className="em-section">
              {form.faqs.length === 0 && <div className="em-empty">No FAQs yet. Add one below.</div>}
              {form.faqs.map((faq, i) => (
                <div key={i} className="ec-card">
                  <div className="ec-card-head">
                    <span className="ec-num">Q{i + 1}</span>
                    <button className="ec-icon-btn ec-icon-btn--del" onClick={() => removeFaq(i)}>✕</button>
                  </div>
                  <div className="ef-group">
                    <label className="ef-label">Question</label>
                    <input className="ef-input" value={faq.question}
                      onChange={e => updateFaq(i, "question", e.target.value)}
                      placeholder="FAQ question" />
                  </div>
                  <div className="ef-group" style={{ marginBottom: 0 }}>
                    <label className="ef-label">Answer</label>
                    <textarea className="ef-textarea" rows={3} value={faq.answer}
                      onChange={e => updateFaq(i, "answer", e.target.value)}
                      placeholder="FAQ answer" />
                  </div>
                </div>
              ))}
              <button className="em-add-btn" onClick={addFaq}>+ Add FAQ</button>
            </div>
          )}

          {/* IMAGES */}
          {activeSection === "images" && (
            <div className="em-section">

              {/* Banner */}
              <div className="ef-group">
                <label className="ef-label">Banner / Hero Image</label>
                {bannerSrc ? (
                  <div className="img-preview-card">
                    <img src={bannerSrc} alt="banner" className="img-preview-thumb" />
                    <div className="img-preview-info">
                      <span className="img-preview-name">
                        {newBannerFile ? newBannerFile.name : form.bannerImage.split("/").pop()}
                      </span>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <label className="btn btn-sm btn-outline" style={{ cursor: "pointer" }}>
                          ↑ Replace
                          <input type="file" accept="image/*" style={{ display: "none" }}
                            onChange={e => { if (e.target.files[0]) { setNewBannerFile(e.target.files[0]); setRemoveBanner(false); } e.target.value = ""; }} />
                        </label>
                        <button className="btn btn-sm btn-danger" onClick={() => { setRemoveBanner(true); setNewBannerFile(null); }}>
                          ✕ Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <label className="img-upload-zone">
                    <div className="img-upload-zone-inner">
                      <p className="dz-label">Drop banner image here</p>
                      <p className="dz-hint">jpg, png, webp — click or drag & drop</p>
                    </div>
                    <input type="file" accept="image/*" style={{ display: "none" }}
                      onChange={e => {
                        if (e.target.files[0]) { setNewBannerFile(e.target.files[0]); setRemoveBanner(false); }
                        e.target.value = "";
                      }} />
                  </label>
                )}
              </div>

              {/* Side Images */}
              <div className="ef-group">
                <label className="ef-label">Side Images</label>
                <div className="side-img-grid">
                  {form.sideImages.map((item, i) => (
                    <div key={i} className="side-img-card">
                      <button className="side-img-remove ec-icon-btn ec-icon-btn--del"
                        onClick={() => removeSideImage(i)} title="Remove">✕</button>
                      <img
                        src={item.file ? URL.createObjectURL(item.file) : item.url}
                        alt={`side-${i + 1}`}
                        className="side-img-thumb"
                      />
                      <span className="side-img-name">
                        {item.file ? item.file.name : item.url.split("/").pop()}
                      </span>
                    </div>
                  ))}
                  {/* Add tile */}
                  <label className="side-img-add">
                    <span style={{ fontSize: "1.4rem", lineHeight: 1 }}>+</span>
                    <span style={{ fontSize: ".78rem", fontWeight: 600 }}>Add image</span>
                    <input type="file" accept="image/*" multiple style={{ display: "none" }}
                      onChange={e => {
                        const files = Array.from(e.target.files || []);
                        if (files.length) addSideFiles(files);
                        e.target.value = "";
                      }} />
                  </label>
                </div>
                <p className="ef-hint">Images are saved to /public/assets/blogs/ and referenced automatically.</p>
              </div>

            </div>
          )}
        </div>

        {/* Footer */}
        {error && <p className="em-error">⚠️ {error}</p>}
        <div className="em-footer">
          <button className="btn btn-sm btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn btn-sm" onClick={handleSave} disabled={saving}>
            {saving ? <><span className="spinner" /> Saving…</> : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function AdminBlogsPage() {
  const [docxFiles,    setDocxFiles]    = useState([]);
  const [bannerFiles,  setBannerFiles]  = useState([]);
  const [sideFiles,    setSideFiles]    = useState([]);
  const [slug,         setSlug]         = useState("");
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);
  const [blogs,        setBlogs]        = useState({});
  const [listLoading,  setListLoading]  = useState(true);
  const [deletingSlug, setDeletingSlug] = useState(null);
  const [confirmSlug,  setConfirmSlug]  = useState(null);
  const [editingSlug,  setEditingSlug]  = useState(null);
  const [tab,          setTab]          = useState("upload");

  const fetchBlogs = useCallback(async () => {
    setListLoading(true);
    try {
      const res  = await fetch("/api/blogs");
      const data = await res.json();
      setBlogs(data);
    } catch { setBlogs({}); }
    finally { setListLoading(false); }
  }, []);

  useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!docxFiles.length) return;
    setUploadStatus("loading"); setUploadResult(null);
    const fd = new FormData();
    fd.append("docx", docxFiles[0]);
    if (bannerFiles[0]) fd.append("banner", bannerFiles[0]);
    sideFiles.forEach((f) => fd.append("sideImages", f));
    if (slug.trim()) fd.append("slug", slug.trim());
    try {
      const res  = await fetch("/api/blogs", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setUploadResult(data); setUploadStatus("success");
      setDocxFiles([]); setBannerFiles([]); setSideFiles([]); setSlug("");
      fetchBlogs();
    } catch (err) {
      setUploadResult({ error: err.message }); setUploadStatus("error");
    }
  };

  const handleDelete = async (slugToDelete) => {
    setDeletingSlug(slugToDelete);
    try {
      const res = await fetch(`/api/blogs?slug=${slugToDelete}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setConfirmSlug(null); fetchBlogs();
    } catch (err) { alert("Delete failed: " + err.message); }
    finally { setDeletingSlug(null); }
  };

  const handleEditSaved = (savedSlug, updatedBlog) => {
    setBlogs(prev => ({ ...prev, [savedSlug]: updatedBlog }));
  };

  const blogEntries = Object.entries(blogs);
  const ready = docxFiles.length > 0 && uploadStatus !== "loading";

  return (
    <div className="admin-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@500;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
        .admin-root *, .admin-root *::before, .admin-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .admin-root {
          --ink: #18160f; --bg: #f6f3ee; --surface: #fff; --cream: #edeae3;
          --border: #d9d4ca; --muted: #8c8578; --accent: #bf4e0e;
          --green: #2a6047; --red: #8f1c1c; --blue: #1a4a7a; --r: 10px;
          --shadow: 0 1px 3px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.07);
          --fd: 'Lora', Georgia, serif; --fb: 'DM Sans', system-ui, sans-serif;
          font-family: var(--fb); background: var(--bg); color: var(--ink);
        }
        .sr-only { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); border:0; }
        .page { max-width: 860px; margin: 0 auto; padding: 100px 24px 80px; }
        .hd { margin-bottom: 32px; }
        .hd h1 { font-family: var(--fd); font-size: 2rem; font-weight: 700; }
        .hd p  { color: var(--muted); font-size: .88rem; margin-top: 4px; }
        .hd-divider { height: 1.5px; background: var(--border); margin-top: 20px; }
        .tabs { display: flex; margin-bottom: 28px; border: 1px solid var(--border); border-radius: var(--r); overflow: hidden; background: var(--surface); }
        .tab-btn { flex: 1; padding: 13px 20px; font-size: .9rem; font-weight: 600; font-family: var(--fb); background: none; border: none; cursor: pointer; color: var(--muted); transition: background .15s, color .15s; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .tab-btn:first-child { border-right: 1px solid var(--border); }
        .tab-btn.active { background: var(--ink); color: #fff; }
        .badge { background: var(--accent); color: #fff; font-size: .7rem; font-weight: 700; padding: 2px 7px; border-radius: 20px; line-height: 1.4; }
        .tab-btn.active .badge { background: rgba(255,255,255,.25); }
        .card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--r); box-shadow: var(--shadow); }
        .cs { padding: 24px 28px; border-bottom: 1px solid var(--border); }
        .cs:last-child { border-bottom: none; }
        .cs-head { display: flex; align-items: center; gap: 10px; margin-bottom: 4px; }
        .cs-num { width: 24px; height: 24px; border-radius: 50%; background: var(--ink); color: #fff; font-size: .72rem; font-weight: 600; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .cs-title { font-weight: 600; font-size: .95rem; }
        .cs-sub { color: var(--muted); font-size: .79rem; margin-left: 34px; margin-bottom: 12px; }
        .dz { border: 2px dashed var(--border); border-radius: 8px; background: var(--bg); cursor: pointer; transition: border-color .15s, background .15s; outline: none; }
        .dz:not(.dz--filled) { padding: 28px 20px; text-align: center; }
        .dz:hover:not(.dz--filled), .dz:focus:not(.dz--filled), .dz--drag { border-color: var(--accent); background: #fdf3ee; }
        .dz--filled { padding: 12px 16px; cursor: default; }
        .dz-label { font-weight: 600; font-size: .88rem; margin-bottom: 3px; }
        .dz-hint { color: var(--muted); font-size: .76rem; }
        .dz-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 8px; }
        .dz-add { background: none; border: 1.5px dashed var(--border); border-radius: 18px; padding: 3px 12px; font-size: .76rem; font-family: var(--fb); color: var(--muted); cursor: pointer; }
        .dz-add:hover { border-color: var(--accent); color: var(--accent); }
        .chip { display: inline-flex; align-items: center; gap: 5px; background: var(--cream); border: 1px solid var(--border); border-radius: 18px; padding: 3px 8px 3px 11px; font-size: .78rem; font-weight: 500; }
        .chip-name { max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .chip-x { background: none; border: none; cursor: pointer; font-size: 1rem; color: var(--muted); padding: 0; line-height: 1; }
        .chip-x:hover { color: var(--red); }
        .img-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        @media(max-width:520px){ .img-grid { grid-template-columns: 1fr; } }
        .img-grid label { display: block; font-size: .8rem; font-weight: 500; color: var(--muted); margin-bottom: 6px; }
        .field input { width: 100%; padding: 10px 13px; border: 1.5px solid var(--border); border-radius: 8px; font-size: .88rem; font-family: var(--fb); background: var(--bg); color: var(--ink); outline: none; transition: border-color .15s; }
        .field input:focus { border-color: var(--accent); }
        .field-hint { color: var(--muted); font-size: .74rem; margin-top: 5px; }
        .submit-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; padding: 18px 28px; }
        .submit-meta { color: var(--muted); font-size: .82rem; }
        .submit-meta strong { color: var(--ink); }
        .btn { display: inline-flex; align-items: center; gap: 8px; background: var(--ink); color: #fff; border: none; border-radius: 8px; padding: 11px 24px; font-size: .88rem; font-weight: 600; font-family: var(--fb); cursor: pointer; white-space: nowrap; transition: background .15s, transform .12s; }
        .btn:hover:not(:disabled) { background: var(--accent); transform: translateY(-1px); }
        .btn:disabled { opacity: .4; cursor: not-allowed; }
        .btn-sm { padding: 7px 14px; font-size: .8rem; border-radius: 7px; }
        .btn-outline { background: none; color: var(--ink); border: 1.5px solid var(--border); }
        .btn-outline:hover:not(:disabled) { background: var(--ink); color: #fff; transform: none; }
        .btn-edit { background: none; color: var(--blue); border: 1.5px solid #c0d4e8; }
        .btn-edit:hover:not(:disabled) { background: var(--blue); color: #fff; transform: none; }
        .btn-danger { background: none; color: var(--red); border: 1.5px solid #e8c0c0; }
        .btn-danger:hover:not(:disabled) { background: var(--red); color: #fff; transform: none; }
        .btn-danger-solid { background: var(--red); color: #fff; border: none; }
        .btn-danger-solid:hover:not(:disabled) { background: #7a1515; transform: none; }
        .spinner { width: 14px; height: 14px; border-radius: 50%; border: 2px solid rgba(255,255,255,.35); border-top-color: #fff; animation: spin .65s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .result { margin-top: 20px; border-radius: var(--r); padding: 18px 22px; border-left: 4px solid; animation: pop .22s ease; }
        @keyframes pop { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:none; } }
        .result--ok  { background: #f0f8f4; border-color: var(--green); color: var(--green); }
        .result--err { background: #fdf1f1; border-color: var(--red); color: var(--red); }
        .result-title { font-weight: 700; font-size: .95rem; margin-bottom: 8px; }
        .result-row { font-size: .83rem; margin: 3px 0; }
        .result-row strong { font-weight: 600; }
        .result-link { display: inline-flex; align-items: center; gap: 6px; margin-top: 11px; font-size: .83rem; font-weight: 600; color: inherit; text-decoration: none; border: 1.5px solid currentColor; border-radius: 7px; padding: 5px 13px; }
        .result-link:hover { opacity: .65; }
        .list-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 24px; border-bottom: 1px solid var(--border); }
        .list-header-title { font-weight: 600; font-size: .9rem; }
        .list-count { font-size: .8rem; color: var(--muted); }
        .blog-list { display: flex; flex-direction: column; }
        .blog-item { display: flex; align-items: center; gap: 16px; padding: 14px 24px; border-bottom: 1px solid var(--border); transition: background .15s; }
        .blog-item:last-child { border-bottom: none; }
        .blog-item:hover { background: #faf9f7; }
        .blog-thumb { width: 64px; height: 48px; border-radius: 6px; background: var(--cream); flex-shrink: 0; overflow: hidden; }
        .blog-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .blog-thumb-ph { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; }
        .blog-info { flex: 1; min-width: 0; }
        .blog-title { font-weight: 600; font-size: .9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 4px; }
        .blog-meta { font-size: .75rem; color: var(--muted); display: flex; gap: 12px; flex-wrap: wrap; }
        .blog-actions { display: flex; gap: 8px; flex-shrink: 0; }
        .empty { text-align: center; padding: 48px 24px; color: var(--muted); }
        .empty-icon { font-size: 2.5rem; margin-bottom: 12px; }
        .empty p { font-size: .88rem; line-height: 1.6; }
        .skel { background: linear-gradient(90deg, var(--cream) 25%, #e8e4dc 50%, var(--cream) 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; border-radius: 6px; }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

        /* ── Delete Modal ── */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.45); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 24px; animation: fadeIn .15s ease; }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        .modal { background: var(--surface); border-radius: var(--r); padding: 28px; max-width: 400px; width: 100%; box-shadow: 0 20px 60px rgba(0,0,0,.2); animation: slideUp .2s ease; }
        @keyframes slideUp { from{transform:translateY(16px);opacity:0} to{transform:none;opacity:1} }
        .modal h3 { font-family: var(--fd); font-size: 1.15rem; font-weight: 700; margin-bottom: 8px; }
        .modal p  { font-size: .87rem; color: var(--muted); margin-bottom: 20px; line-height: 1.5; }
        .modal-actions { display: flex; gap: 10px; justify-content: flex-end; }

        /* ── Edit Modal ── */
        .edit-modal { background: var(--surface); border-radius: var(--r); width: 100%; max-width: 680px; max-height: 90vh; display: flex; flex-direction: column; box-shadow: 0 24px 72px rgba(0,0,0,.22); animation: slideUp .2s ease; overflow: hidden; }
        .em-header { display: flex; align-items: flex-start; justify-content: space-between; padding: 22px 26px 16px; border-bottom: 1px solid var(--border); flex-shrink: 0; }
        .em-title { font-family: var(--fd); font-size: 1.2rem; font-weight: 700; margin-bottom: 2px; }
        .em-slug  { font-size: .76rem; color: var(--muted); font-family: monospace; }
        .em-close { background: none; border: none; cursor: pointer; font-size: 1rem; color: var(--muted); padding: 4px 6px; border-radius: 6px; line-height: 1; transition: background .12s, color .12s; flex-shrink: 0; }
        .em-close:hover { background: var(--cream); color: var(--ink); }
        .em-tabs { display: flex; gap: 2px; padding: 10px 18px; border-bottom: 1px solid var(--border); background: var(--bg); flex-shrink: 0; flex-wrap: wrap; }
        .em-tab { padding: 7px 14px; font-size: .8rem; font-weight: 600; font-family: var(--fb); background: none; border: 1.5px solid transparent; border-radius: 7px; cursor: pointer; color: var(--muted); transition: all .13s; }
        .em-tab:hover { background: var(--cream); color: var(--ink); }
        .em-tab--active { background: var(--surface); border-color: var(--border); color: var(--ink); box-shadow: 0 1px 4px rgba(0,0,0,.07); }
        .em-body { flex: 1; overflow-y: auto; padding: 20px 26px; }
        .em-section { display: flex; flex-direction: column; gap: 0; }
        .em-empty { text-align: center; padding: 32px; color: var(--muted); font-size: .85rem; background: var(--bg); border-radius: 8px; border: 1.5px dashed var(--border); margin-bottom: 14px; }
        .em-add-btn { width: 100%; padding: 10px; font-size: .82rem; font-weight: 600; font-family: var(--fb); background: none; border: 1.5px dashed var(--border); border-radius: 8px; color: var(--muted); cursor: pointer; transition: all .13s; margin-top: 4px; }
        .em-add-btn:hover { border-color: var(--accent); color: var(--accent); background: #fdf3ee; }
        .em-footer { display: flex; justify-content: flex-end; gap: 10px; padding: 14px 26px; border-top: 1px solid var(--border); flex-shrink: 0; background: var(--bg); }
        .em-error { padding: 8px 26px; font-size: .8rem; color: var(--red); background: #fdf1f1; border-top: 1px solid #f0cece; }

        /* Edit form fields */
        .ef-group { margin-bottom: 16px; }
        .ef-label { display: flex; align-items: center; gap: 7px; font-size: .8rem; font-weight: 600; color: var(--muted); margin-bottom: 6px; text-transform: uppercase; letter-spacing: .04em; }
        .ef-badge { font-size: .66rem; background: #e8f0e0; color: #3a6020; border-radius: 4px; padding: 1px 6px; text-transform: uppercase; letter-spacing: .05em; }
        .ef-input { width: 100%; padding: 9px 12px; border: 1.5px solid var(--border); border-radius: 7px; font-size: .88rem; font-family: var(--fb); background: var(--bg); color: var(--ink); outline: none; transition: border-color .15s; }
        .ef-input:focus { border-color: var(--accent); background: #fff; }
        .ef-textarea { width: 100%; padding: 9px 12px; border: 1.5px solid var(--border); border-radius: 7px; font-size: .85rem; font-family: var(--fb); line-height: 1.55; background: var(--bg); color: var(--ink); outline: none; resize: vertical; transition: border-color .15s; }
        .ef-textarea:focus { border-color: var(--accent); background: #fff; }
        .ef-hint { font-size: .72rem; color: var(--muted); margin-top: 4px; }

        /* Section / FAQ cards */
        .ec-card { border: 1px solid var(--border); border-radius: 8px; padding: 14px 16px; margin-bottom: 12px; background: var(--bg); }
        .ec-card-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
        .ec-num { font-size: .72rem; font-weight: 700; color: var(--muted); background: var(--cream); border: 1px solid var(--border); border-radius: 5px; padding: 2px 8px; }
        .ec-card-actions { display: flex; gap: 4px; }
        .ec-icon-btn { background: none; border: 1px solid var(--border); border-radius: 5px; padding: 3px 8px; font-size: .8rem; cursor: pointer; color: var(--muted); transition: all .12s; font-family: var(--fb); }
        .ec-icon-btn:hover:not(:disabled) { background: var(--cream); color: var(--ink); }
        .ec-icon-btn:disabled { opacity: .3; cursor: not-allowed; }
        .ec-icon-btn--del:hover:not(:disabled) { background: #fdf1f1; border-color: #e8c0c0; color: var(--red); }

        /* Image editing */
        .img-preview-card { display: flex; align-items: center; gap: 14px; background: var(--bg); border: 1px solid var(--border); border-radius: 8px; padding: 12px; }
        .img-preview-thumb { width: 90px; height: 64px; object-fit: cover; border-radius: 6px; flex-shrink: 0; background: var(--cream); }
        .img-preview-info { flex: 1; display: flex; flex-direction: column; gap: 8px; }
        .img-preview-name { font-size: .78rem; color: var(--muted); word-break: break-all; }
        .img-upload-zone { display: block; border: 2px dashed var(--border); border-radius: 8px; background: var(--bg); cursor: pointer; transition: border-color .15s, background .15s; }
        .img-upload-zone:hover { border-color: var(--accent); background: #fdf3ee; }
        .img-upload-zone-inner { padding: 28px 20px; text-align: center; pointer-events: none; }
        .side-img-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 10px; }
        .side-img-card { position: relative; display: flex; flex-direction: column; align-items: center; gap: 6px; background: var(--bg); border: 1px solid var(--border); border-radius: 8px; padding: 10px 10px 8px; }
        .side-img-remove { position: absolute; top: 6px; right: 6px; padding: 2px 6px !important; font-size: .7rem !important; }
        .side-img-thumb { width: 100%; height: 70px; object-fit: cover; border-radius: 5px; background: var(--cream); }
        .side-img-name { font-size: .68rem; color: var(--muted); word-break: break-all; text-align: center; max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .side-img-add { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; min-height: 108px; border: 1.5px dashed var(--border); border-radius: 8px; cursor: pointer; color: var(--muted); transition: all .13s; }
        .side-img-add:hover { border-color: var(--accent); color: var(--accent); background: #fdf3ee; }
      `}</style>

      <div className="page">
        <header className="hd">
          <h1>Blog Manager</h1>
          <p>Upload, edit, view and delete blog posts — changes go live instantly</p>
          <div className="hd-divider" />
        </header>

        {/* Tabs */}
        <div className="tabs">
          <button className={`tab-btn${tab === "upload" ? " active" : ""}`} onClick={() => setTab("upload")}>
            ✦ Upload New Blog
          </button>
          <button className={`tab-btn${tab === "list" ? " active" : ""}`} onClick={() => setTab("list")}>
            All Blogs
            {blogEntries.length > 0 && <span className="badge">{blogEntries.length}</span>}
          </button>
        </div>

        {/* ── UPLOAD TAB ── */}
        {tab === "upload" && (
          <>
            <form onSubmit={handleUpload}>
              <div className="card">
                <div className="cs">
                  <div className="cs-head"><span className="cs-num">1</span><span className="cs-title">Blog Document</span></div>
                  <p className="cs-sub">Required · .docx file with Meta Title, headings marked (h2), and content</p>
                  <DropZone label="Drop your .docx file here" hint="Drag & drop or click to browse" accept=".docx" files={docxFiles} onChange={setDocxFiles} />
                </div>

                <div className="cs">
                  <div className="cs-head"><span className="cs-num">2</span><span className="cs-title">Images</span></div>
                  <p className="cs-sub">Optional · Saved to public/assets/blogs/ and referenced automatically</p>
                  <div className="img-grid">
                    <div>
                      <label>Banner / Hero image</label>
                      <DropZone label="Drop banner image" hint="jpg, png, webp" accept="image/*" files={bannerFiles} onChange={setBannerFiles} />
                    </div>
                    <div>
                      <label>Side images (multiple)</label>
                      <DropZone label="Drop side images" hint="Multiple allowed" accept="image/*" multiple files={sideFiles} onChange={setSideFiles} />
                    </div>
                  </div>
                </div>

                <div className="cs">
                  <div className="cs-head"><span className="cs-num">3</span><span className="cs-title">URL Slug</span></div>
                  <p className="cs-sub">Optional · Auto-generated from Meta Title if left blank</p>
                  <div className="field">
                    <input type="text" placeholder="e.g. best-school-in-madhapur" value={slug}
                      onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))} />
                    <p className="field-hint">Lowercase letters, numbers and hyphens only.</p>
                  </div>
                </div>

                <div className="submit-row">
                  <p className="submit-meta">
                    {docxFiles.length > 0
                      ? <><strong>{docxFiles[0].name}</strong>{bannerFiles.length > 0 && " · banner"}{sideFiles.length > 0 && ` · ${sideFiles.length} side image${sideFiles.length > 1 ? "s" : ""}`}</>
                      : "Upload a .docx to get started"}
                  </p>
                  <button type="submit" className="btn" disabled={!ready}>
                    {uploadStatus === "loading" ? <><span className="spinner" /> Publishing…</> : "Publish Blog"}
                  </button>
                </div>
              </div>
            </form>

            {uploadStatus === "success" && uploadResult && (
              <div className="result result--ok">
                <p className="result-title">{uploadResult.isUpdate ? "✅ Blog updated!" : "✅ Blog published!"}</p>
                <p className="result-row"><strong>Title:</strong> {uploadResult.title}</p>
                <p className="result-row"><strong>URL:</strong> /blogs/{uploadResult.slug}</p>
                <p className="result-row"><strong>Sections:</strong> {uploadResult.sectionsCount} · <strong>FAQs:</strong> {uploadResult.faqsCount}</p>
                {uploadResult.bannerImage && <p className="result-row"><strong>Banner:</strong> {uploadResult.bannerImage}</p>}
                {uploadResult.sideImages?.length > 0 && <p className="result-row"><strong>Side images:</strong> {uploadResult.sideImages.length} saved</p>}
                <a href={`/blogs/${uploadResult.slug}`} target="_blank" rel="noopener noreferrer" className="result-link">View live post →</a>
              </div>
            )}

            {uploadStatus === "error" && uploadResult && (
              <div className="result result--err">
                <p className="result-title">⚠️ Upload failed</p>
                <p className="result-row">{uploadResult.error}</p>
              </div>
            )}
          </>
        )}

        {/* ── LIST TAB ── */}
        {tab === "list" && (
          <div className="card">
            <div className="list-header">
              <span className="list-header-title">Published Blogs</span>
              <span className="list-count">{blogEntries.length} blog{blogEntries.length !== 1 ? "s" : ""} total</span>
            </div>

            {listLoading ? (
              <div style={{ padding: "20px 24px" }}>
                {[1,2,3].map(i => (
                  <div key={i} style={{ display:"flex", gap:16, alignItems:"center", marginBottom:16 }}>
                    <div className="skel" style={{ width:64, height:48, flexShrink:0 }} />
                    <div style={{ flex:1 }}>
                      <div className="skel" style={{ height:13, width:"55%", marginBottom:8 }} />
                      <div className="skel" style={{ height:10, width:"35%" }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : blogEntries.length === 0 ? (
              <div className="empty">
                <div className="empty-icon">📭</div>
                <p>No blogs published yet.<br />Switch to Upload tab to add your first blog.</p>
              </div>
            ) : (
              <div className="blog-list">
                {blogEntries.map(([s, blog]) => (
                  <div key={s} className="blog-item">
                    <div className="blog-thumb">
                      {blog.sideImages?.[0] || blog.bannerImage
                        ? <img src={blog.sideImages?.[0] || blog.bannerImage} alt="" />
                        : <div className="blog-thumb-ph">📄</div>}
                    </div>
                    <div className="blog-info">
                      <div className="blog-title">{blog.title || s}</div>
                      <div className="blog-meta">
                        <span>/blogs/{s}</span>
                        <span>{blog.sections?.length || 0} sections</span>
                        <span>{blog.faqs?.length || 0} FAQs</span>
                        {blog.bannerImage && <span>banner ✓</span>}
                        {blog.sideImages?.length > 0 && <span>{blog.sideImages.length} side img{blog.sideImages.length !== 1 ? "s" : ""}</span>}
                      </div>
                    </div>
                    <div className="blog-actions">
                      <a href={`/blogs/${s}`} target="_blank" rel="noopener noreferrer"
                        className="btn btn-sm btn-outline">View</a>
                      <button className="btn btn-sm btn-edit" onClick={() => setEditingSlug(s)}>Edit</button>
                      {/* <button className="btn btn-sm btn-danger" onClick={() => setConfirmSlug(s)}>Delete</button> */}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Edit Modal ── */}
      {editingSlug && blogs[editingSlug] && (
        <EditModal
          slug={editingSlug}
          blog={blogs[editingSlug]}
          onClose={() => setEditingSlug(null)}
          onSaved={handleEditSaved}
        />
      )}

      {/* Delete Confirm Modal */}
      {confirmSlug && (
        <div className="modal-overlay" onClick={() => setConfirmSlug(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Delete this blog?</h3>
            <p>
              <strong>{blogs[confirmSlug]?.title || confirmSlug}</strong> will be permanently removed. This cannot be undone.
            </p>
            <div className="modal-actions">
              <button className="btn btn-sm btn-outline" onClick={() => setConfirmSlug(null)}>Cancel</button>
              <button className="btn btn-sm btn-danger-solid"
                disabled={deletingSlug === confirmSlug}
                onClick={() => handleDelete(confirmSlug)}>
                {deletingSlug === confirmSlug ? <><span className="spinner" /> Deleting…</> : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
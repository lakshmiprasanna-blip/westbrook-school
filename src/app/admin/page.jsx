"use client";

import { useState, useRef, useCallback } from "react";

// ─── Sub-components ───────────────────────────────────────────────────────────

function FileChip({ file, onRemove }) {
  return (
    <span className="chip">
      <span className="chip-name">{file.name}</span>
      <button type="button" className="chip-x" onClick={onRemove} aria-label={`Remove ${file.name}`}>
        ×
      </button>
    </span>
  );
}

function DropZone({ label, hint, accept, multiple = false, files, onChange, icon }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(false);
      const dropped = Array.from(e.dataTransfer.files);
      if (!dropped.length) return;
      onChange(multiple ? [...files, ...dropped] : [dropped[0]]);
    },
    [files, multiple, onChange]
  );

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
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        onChange={(e) => {
          const picked = Array.from(e.target.files || []);
          onChange(multiple ? [...files, ...picked] : [picked[0]]);
          e.target.value = "";
        }}
      />

      {files.length === 0 ? (
        <div className="dz-empty">
          <span className="dz-icon">{icon}</span>
          <p className="dz-label">{label}</p>
          {hint && <p className="dz-hint">{hint}</p>}
        </div>
      ) : (
        <div className="dz-filled" onClick={(e) => e.stopPropagation()}>
          <div className="dz-chips">
            {files.map((f, i) => (
              <FileChip key={i} file={f} onRemove={() => removeFile(i)} />
            ))}
          </div>
          {multiple && (
            <button
              type="button"
              className="dz-add"
              onClick={() => inputRef.current?.click()}
            >
              + Add more
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function UploadBlogPage() {
  const [docxFiles,   setDocxFiles]   = useState([]);
  const [bannerFiles, setBannerFiles] = useState([]);
  const [sideFiles,   setSideFiles]   = useState([]);
  const [slug,        setSlug]        = useState("");
  const [status,      setStatus]      = useState(null); // null | loading | success | error
  const [result,      setResult]      = useState(null);

  const ready = docxFiles.length > 0 && status !== "loading";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ready) return;
    setStatus("loading");
    setResult(null);

    const fd = new FormData();
    fd.append("docx", docxFiles[0]);
    if (bannerFiles[0]) fd.append("banner", bannerFiles[0]);
    sideFiles.forEach((f) => fd.append("sideImages", f));
    if (slug.trim()) fd.append("slug", slug.trim());

    try {
      const res  = await fetch("/api/blogs", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setResult(data);
      setStatus("success");
      setDocxFiles([]); setBannerFiles([]); setSideFiles([]); setSlug("");
    } catch (err) {
      setResult({ error: err.message });
      setStatus("error");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@500;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --ink:      #18160f;
          --bg:       #f6f3ee;
          --surface:  #ffffff;
          --cream:    #edeae3;
          --border:   #d9d4ca;
          --muted:    #8c8578;
          --accent:   #bf4e0e;
          --accent-h: #a03d08;
          --green:    #2a6047;
          --red:      #8f1c1c;
          --r:        10px;
          --shadow:   0 1px 3px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.07);
          --font-d:   'Lora', Georgia, serif;
          --font-b:   'DM Sans', system-ui, sans-serif;
        }

        body { font-family: var(--font-b); background: var(--bg); color: var(--ink); min-height: 100vh; }

        .sr-only { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }

        /* ── Page layout ── */
        .page { max-width: 780px; margin: 0 auto; padding: 72px 24px 80px; }

        /* ── Header ── */
        .hd { margin-bottom: 44px; }
        .hd-row { display: flex; align-items: center; gap: 14px; margin-bottom: 8px; }
        .hd-badge {
          width: 44px; height: 44px; border-radius: 9px;
          background: var(--accent); color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; flex-shrink: 0;
        }
        .hd h1 { font-family: var(--font-d); font-size: 1.85rem; font-weight: 700; line-height: 1.15; }
        .hd p { color: var(--muted); font-size: .88rem; margin-top: 2px; }
        .hd-divider { height: 1.5px; background: var(--border); margin-top: 20px; }

        /* ── Card ── */
        .card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--r); box-shadow: var(--shadow); }

        /* ── Card section ── */
        .cs { padding: 26px 30px; border-bottom: 1px solid var(--border); }
        .cs:last-child { border-bottom: none; }

        .cs-head { display: flex; align-items: center; gap: 10px; margin-bottom: 5px; }
        .cs-num {
          width: 24px; height: 24px; border-radius: 50%;
          background: var(--ink); color: #fff;
          font-size: .72rem; font-weight: 600;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .cs-title { font-weight: 600; font-size: .97rem; }
        .cs-sub { color: var(--muted); font-size: .8rem; margin-left: 34px; margin-bottom: 14px; }

        /* ── Drop zone ── */
        .dz {
          border: 2px dashed var(--border);
          border-radius: 8px;
          background: var(--bg);
          cursor: pointer;
          transition: border-color .15s, background .15s;
          outline: none;
        }
        .dz:not(.dz--filled) { padding: 32px 20px; text-align: center; }
        .dz:hover:not(.dz--filled), .dz:focus:not(.dz--filled), .dz--drag { border-color: var(--accent); background: #fdf3ee; }
        .dz--filled { padding: 14px 16px; cursor: default; }

        .dz-icon  { font-size: 1.8rem; display: block; margin-bottom: 8px; }
        .dz-label { font-weight: 600; font-size: .9rem; margin-bottom: 4px; }
        .dz-hint  { color: var(--muted); font-size: .78rem; }

        .dz-chips { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 10px; }
        .dz-add {
          background: none; border: 1.5px dashed var(--border); border-radius: 18px;
          padding: 3px 12px; font-size: .78rem; font-family: var(--font-b);
          color: var(--muted); cursor: pointer; transition: border-color .15s, color .15s;
        }
        .dz-add:hover { border-color: var(--accent); color: var(--accent); }

        /* ── Chips ── */
        .chip {
          display: inline-flex; align-items: center; gap: 5px;
          background: var(--cream); border: 1px solid var(--border);
          border-radius: 18px; padding: 3px 8px 3px 11px;
          font-size: .8rem; font-weight: 500;
        }
        .chip-name { max-width: 160px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .chip-x { background: none; border: none; cursor: pointer; font-size: 1rem; color: var(--muted); padding: 0; line-height: 1; transition: color .12s; }
        .chip-x:hover { color: var(--red); }

        /* ── Image grid ── */
        .img-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        @media(max-width:520px){ .img-grid { grid-template-columns: 1fr; } }
        .img-grid label { display: block; font-size: .82rem; font-weight: 500; color: var(--muted); margin-bottom: 7px; }

        /* ── Slug field ── */
        .field { margin-top: 2px; }
        .field input {
          width: 100%; padding: 10px 13px;
          border: 1.5px solid var(--border); border-radius: 8px;
          font-size: .9rem; font-family: var(--font-b);
          background: var(--bg); color: var(--ink); outline: none;
          transition: border-color .15s;
        }
        .field input:focus { border-color: var(--accent); }
        .field-hint { color: var(--muted); font-size: .76rem; margin-top: 6px; }

        /* ── Submit row ── */
        .submit-row {
          display: flex; align-items: center; justify-content: space-between;
          gap: 16px; flex-wrap: wrap;
          padding: 20px 30px;
        }
        .submit-meta { color: var(--muted); font-size: .83rem; }
        .submit-meta strong { color: var(--ink); }

        .btn {
          display: inline-flex; align-items: center; gap: 9px;
          background: var(--ink); color: #fff;
          border: none; border-radius: 9px;
          padding: 12px 26px; font-size: .92rem; font-weight: 600;
          font-family: var(--font-b); cursor: pointer; white-space: nowrap;
          transition: background .15s, transform .12s;
        }
        .btn:hover:not(:disabled) { background: var(--accent); transform: translateY(-1px); }
        .btn:disabled { opacity: .4; cursor: not-allowed; }

        .spinner {
          width: 15px; height: 15px; border-radius: 50%;
          border: 2px solid rgba(255,255,255,.35); border-top-color: #fff;
          animation: spin .65s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── Result ── */
        .result {
          margin-top: 22px; border-radius: var(--r);
          padding: 20px 24px; border-left: 4px solid;
          animation: pop .22s ease;
        }
        @keyframes pop { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:none; } }
        .result--ok  { background: #f0f8f4; border-color: var(--green); color: var(--green); }
        .result--err { background: #fdf1f1; border-color: var(--red);   color: var(--red); }

        .result-title { font-weight: 700; font-size: .97rem; margin-bottom: 10px; }
        .result-row   { font-size: .85rem; margin: 3px 0; }
        .result-row strong { font-weight: 600; }

        .result-link {
          display: inline-flex; align-items: center; gap: 6px;
          margin-top: 13px; font-size: .85rem; font-weight: 600;
          color: inherit; text-decoration: none;
          border: 1.5px solid currentColor; border-radius: 7px;
          padding: 6px 14px; transition: opacity .14s;
        }
        .result-link:hover { opacity: .65; }
      `}</style>

      <div className="page">

        {/* Header */}
        <header className="hd">
          
              <h1>Blog Upload</h1>
              <p>Upload a .docx file — it goes live instantly, no rebuild required</p>
            
          <div className="hd-divider" />
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="card">

            {/* 1 — DOCX */}
            <div className="cs">
              <div className="cs-head">
                <span className="cs-num">1</span>
                <span className="cs-title">Blog Document</span>
              </div>
              <p className="cs-sub">Required · .docx file following the standard Westbrook template</p>
              <DropZone
                label="Drop your .docx file here"
                hint="Drag & drop or click to browse"
                accept=".docx"
                files={docxFiles}
                onChange={setDocxFiles}
                // icon="📄"
              />
            </div>

            {/* 2 — Images */}
            <div className="cs">
              <div className="cs-head">
                <span className="cs-num">2</span>
                <span className="cs-title">Images</span>
              </div>
              <p className="cs-sub">Optional · Saved to public/assets/blogs/ and referenced automatically</p>
              <div className="img-grid">
                <div>
                  <label>Banner / Hero image</label>
                  <DropZone
                    label="Drop banner image"
                    hint="jpg, png, webp"
                    accept="image/*"
                    files={bannerFiles}
                    onChange={setBannerFiles}
                    // icon="🖼️"
                  />
                </div>
                <div>
                  <label>Side images (multiple)</label>
                  <DropZone
                    label="Drop side images"
                    hint="Multiple allowed"
                    accept="image/*"
                    multiple
                    files={sideFiles}
                    onChange={setSideFiles}
                    // icon="🗂️"
                  />
                </div>
              </div>
            </div>

            {/* 3 — Slug */}
            <div className="cs">
              <div className="cs-head">
                <span className="cs-num">3</span>
                <span className="cs-title">URL Slug</span>
              </div>
              <p className="cs-sub">Optional · Auto-generated from the document title if left blank</p>
              <div className="field">
                <input
                  type="text"
                  placeholder="e.g. dandruff-treatment-guide"
                  value={slug}
                  onChange={(e) =>
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))
                  }
                />
                <p className="field-hint">
                  Lowercase letters, numbers and hyphens only. Leave blank to auto-generate from title.
                </p>
              </div>
            </div>

            {/* Submit */}
            <div className="submit-row">
              <p className="submit-meta">
                {docxFiles.length > 0 ? (
                  <>
                    <strong>{docxFiles[0].name}</strong>
                    {bannerFiles.length > 0 && " · banner"}
                    {sideFiles.length > 0 && ` · ${sideFiles.length} side image${sideFiles.length > 1 ? "s" : ""}`}
                  </>
                ) : (
                  "Upload a .docx to get started"
                )}
              </p>
              <button type="submit" className="btn" disabled={!ready}>
                {status === "loading" ? (
                  <><span className="spinner" /> Publishing…</>
                ) : (
                  <>Publish Blog</>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Result */}
        {status === "success" && result && (
          <div className="result result--ok">
            <p className="result-title">
              {result.isUpdate ? "✅ Blog updated!" : "✅ Blog published!"}
            </p>
            <p className="result-row"><strong>Title:</strong> {result.title}</p>
            <p className="result-row"><strong>URL:</strong> /blogs/{result.slug}</p>
            <p className="result-row">
              <strong>Sections:</strong> {result.sectionsCount}&nbsp;&nbsp;·&nbsp;&nbsp;
              <strong>FAQs:</strong> {result.faqsCount}
            </p>
            {result.bannerImage && (
              <p className="result-row"><strong>Banner:</strong> {result.bannerImage}</p>
            )}
            {result.sideImages?.length > 0 && (
              <p className="result-row">
                <strong>Side images:</strong> {result.sideImages.length} saved
              </p>
            )}
            <a href={`/blogs/${result.slug}`} target="_blank" rel="noopener noreferrer" className="result-link">
              View live post →
            </a>
          </div>
        )}

        {status === "error" && result && (
          <div className="result result--err">
            <p className="result-title"> Upload failed</p>
            <p className="result-row">{result.error}</p>
          </div>
        )}

      </div>
    </>
  );
}
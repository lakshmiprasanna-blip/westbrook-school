"use client";

import { useEffect, useState } from "react";

export default function LeadsPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [leads, setLeads] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [viewLead, setViewLead] = useState(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("leads_password");
    if (saved) {
      setPassword(saved);
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    setLoading(true);
    fetch("/api/leads", { headers: { "x-leads-password": password } })
      .then((r) => {
        if (r.status === 401) {
          sessionStorage.removeItem("leads_password");
          setAuthenticated(false);
          setAuthError("Incorrect password.");
          setLoading(false);
          return null;
        }
        return r.json();
      })
      .then((data) => {
        if (!data) return;
        setLeads(data.leads || []);
        setTotal(data.total || 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [authenticated, password]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!password.trim()) { setAuthError("Please enter the password."); return; }
    setAuthError("");
    sessionStorage.setItem("leads_password", password);
    setAuthenticated(true);
  };

  // --- Login Screen ---
  if (!authenticated) {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f2744 0%, #1a3a5c 50%, #0f2744 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", fontFamily: "'Georgia', serif" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');
          .login-card { background: rgba(255,255,255,0.04); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 48px 40px; width: 100%; max-width: 400px; box-shadow: 0 40px 80px rgba(0,0,0,0.4); }
          .login-title { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; color: #e8c97a; text-align: center; margin-bottom: 8px; letter-spacing: 0.5px; }
          .login-sub { font-family: 'DM Sans', sans-serif; font-size: 13px; color: rgba(255,255,255,0.4); text-align: center; margin-bottom: 32px; letter-spacing: 1px; text-transform: uppercase; }
          .login-input { width: 100%; padding: 14px 18px; border-radius: 12px; border: 1px solid rgba(232,201,122,0.2); background: rgba(255,255,255,0.05); color: #fff; font-family: 'DM Sans', sans-serif; font-size: 14px; outline: none; box-sizing: border-box; transition: border-color 0.2s; }
          .login-input:focus { border-color: rgba(232,201,122,0.6); }
          .login-input::placeholder { color: rgba(255,255,255,0.3); }
          .login-btn { width: 100%; padding: 14px; border-radius: 12px; border: none; background: linear-gradient(135deg, #e8c97a, #c9a84c); color: #0f2744; font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 15px; cursor: pointer; margin-top: 16px; letter-spacing: 0.5px; transition: opacity 0.2s; }
          .login-btn:hover { opacity: 0.9; }
          .error-box { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); border-radius: 10px; padding: 12px; margin-bottom: 16px; color: #fca5a5; font-family: 'DM Sans', sans-serif; font-size: 13px; text-align: center; }
        `}</style>
        <div className="login-card">
          <h1 className="login-title">Leads Dashboard</h1>
          <p className="login-sub">Westbrook International School</p>
          {authError && <div className="error-box">{authError}</div>}
          <form onSubmit={handleLogin}>
            <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); setAuthError(""); }} placeholder="Enter password" className="login-input" autoFocus />
            <button type="submit" className="login-btn">Access Dashboard</button>
          </form>
        </div>
      </div>
    );
  }

  // API saves: parent_name, student_name, phone, email, grade
  const fd = (lead, key) => lead.formData?.[key] || "";

  const filtered = leads.filter((lead) => {
    const q = search.toLowerCase();
    const matchesSearch = !q ||
      fd(lead, "parent_name").toLowerCase().includes(q) ||
      fd(lead, "student_name").toLowerCase().includes(q) ||
      fd(lead, "email").toLowerCase().includes(q) ||
      fd(lead, "phone").includes(q);
    let matchesDate = true;
    if (dateFrom) { const from = new Date(dateFrom); from.setHours(0,0,0,0); if (new Date(lead.submittedAt) < from) matchesDate = false; }
    if (dateTo) { const to = new Date(dateTo); to.setHours(23,59,59,999); if (new Date(lead.submittedAt) > to) matchesDate = false; }
    return matchesSearch && matchesDate;
  });

  const successCount = leads.filter((l) => l.success).length;
  const failedCount = leads.filter((l) => !l.success).length;
  const hasFilters = search || dateFrom || dateTo;

  return (
    <div style={{ minHeight: "100vh", background: "#f4f1ec", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

.dash-body { padding: 120px 40px 36px; max-width: 1300px; margin: 0 auto; }        .page-title { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; color: #0f2744; margin-bottom: 4px; }
        .page-sub { font-size: 13px; color: #999; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 32px; }

        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 32px; }
        .stat-card { background: #fff; border-radius: 16px; padding: 24px 28px; border: 1px solid #e8e2d9; position: relative; overflow: hidden; }
        .stat-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; }
        .stat-card.total::before { background: #0f2744; }
        .stat-card.success::before { background: #16a34a; }
        .stat-card.failed::before { background: #dc2626; }
        .stat-label { font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: #aaa; margin-bottom: 10px; }
        .stat-value { font-family: 'Playfair Display', serif; font-size: 48px; font-weight: 700; line-height: 1; }
        .stat-card.total .stat-value { color: #0f2744; }
        .stat-card.success .stat-value { color: #16a34a; }
        .stat-card.failed .stat-value { color: #dc2626; }

        .filters-row { display: flex; gap: 12px; align-items: center; margin-bottom: 24px; flex-wrap: wrap; }
        .search-input { flex: 1; min-width: 220px; padding: 12px 18px; border-radius: 10px; border: 1.5px solid #ddd; background: #fff; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #333; outline: none; transition: border-color 0.2s; }
        .search-input:focus { border-color: #0f2744; }
        .search-input::placeholder { color: #bbb; }
        .filter-label { font-size: 12px; color: #888; font-weight: 500; white-space: nowrap; }
        .date-input { padding: 11px 14px; border-radius: 10px; border: 1.5px solid #ddd; background: #fff; font-family: 'DM Sans', sans-serif; font-size: 13px; color: #555; outline: none; transition: border-color 0.2s; }
        .date-input:focus { border-color: #0f2744; }
        .clear-btn { padding: 11px 18px; border-radius: 10px; border: 1.5px solid #ddd; background: #fff; font-family: 'DM Sans', sans-serif; font-size: 13px; color: #666; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
        .clear-btn:hover { border-color: #0f2744; color: #0f2744; }

        .table-wrap { background: #fff; border-radius: 16px; border: 1px solid #e8e2d9; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.05); }
        .table-scroll { overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; }
        thead tr { background: #0f2744; }
        th { padding: 14px 18px; text-align: left; font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,0.7); white-space: nowrap; }
        th:first-child { color: rgba(255,255,255,0.3); width: 48px; }
        tbody tr { border-bottom: 1px solid #f0ebe4; transition: background 0.15s; }
        tbody tr:last-child { border-bottom: none; }
        tbody tr:hover { background: #faf8f5; }
        td { padding: 14px 18px; font-size: 14px; color: #444; }
        td.num { color: #ccc; font-size: 12px; }
        td.name { font-weight: 500; color: #1a1a1a; }
        td.muted { color: #999; font-size: 13px; }
        td.date-cell { color: #888; font-size: 12px; white-space: nowrap; }

        .badge { display: inline-flex; align-items: center; gap: 5px; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .badge.success { background: #dcfce7; color: #166534; }
        .badge.failed { background: #fee2e2; color: #991b1b; }
        .badge::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: currentColor; }

        .view-btn { padding: 6px 16px; border-radius: 8px; border: none; background: #0f2744; color: #e8c97a; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600; cursor: pointer; letter-spacing: 0.5px; transition: all 0.2s; }
        .view-btn:hover { background: #1a3a5c; }

        .table-footer { padding: 14px 20px; border-top: 1px solid #f0ebe4; font-size: 12px; color: #bbb; background: #fdfcfa; display: flex; justify-content: space-between; align-items: center; }

        .empty-state { padding: 80px 20px; text-align: center; color: #bbb; font-size: 15px; }

        /* Modal */
        .modal-overlay { position: fixed; inset: 0; z-index: 99999; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); padding: 20px; }
        .modal-box { position: relative; width: 100%; max-width: 680px; max-height: 88vh; overflow-y: auto; background: #fff; border-radius: 20px; box-shadow: 0 40px 80px rgba(0,0,0,0.2); }
        .modal-header { background: #0f2744; padding: 28px 32px 24px; border-radius: 20px 20px 0 0; position: sticky; top: 0; z-index: 10; }
        .modal-title { font-family: 'Playfair Display', serif; font-size: 22px; color: #e8c97a; font-weight: 700; }
        .modal-date { font-size: 12px; color: rgba(255,255,255,0.4); margin-top: 4px; letter-spacing: 0.5px; }
        .modal-close { position: absolute; right: 24px; top: 24px; width: 32px; height: 32px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.15); background: transparent; color: rgba(255,255,255,0.5); font-size: 20px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; line-height: 1; }
        .modal-close:hover { background: rgba(255,255,255,0.1); color: #fff; }
        .modal-body { padding: 28px 32px; }
        .modal-section { margin-bottom: 28px; }
        .modal-section-title { font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #aaa; margin-bottom: 14px; padding-bottom: 8px; border-bottom: 1px solid #f0ebe4; }
        .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .detail-item { background: #faf8f5; border-radius: 10px; padding: 12px 16px; border: 1px solid #ede8e1; }
        .detail-key { font-size: 10px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: #bbb; margin-bottom: 4px; }
        .detail-val { font-size: 14px; color: #1a1a1a; font-weight: 500; }
        .detail-item.full { grid-column: 1 / -1; }
        .code-block { background: #1a1a2e; border-radius: 12px; padding: 20px; overflow-x: auto; }
        .code-block pre { font-size: 12px; line-height: 1.6; white-space: pre-wrap; word-break: break-all; }
        .code-block.green pre { color: #4ade80; }
        .code-block.yellow pre { color: #fbbf24; }
      `}</style>

      {/* Body */}
      <div className="dash-body">
        <h1 className="page-title">Leads Dashboard</h1>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
          <p className="page-sub">Admissions enquiries</p>
          <button className="logout-btn" style={{ border: "1.5px solid #ddd", background: "#fff", color: "#555", fontFamily: "'DM Sans',sans-serif", fontSize: "13px", padding: "8px 20px", borderRadius: "8px", cursor: "pointer" }} onClick={() => { sessionStorage.removeItem("leads_password"); setAuthenticated(false); setPassword(""); setLeads([]); }}>
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card total">
            <p className="stat-label">Total Leads</p>
            <p className="stat-value">{total}</p>
          </div>
          <div className="stat-card success">
            <p className="stat-label">Successful</p>
            <p className="stat-value">{successCount}</p>
          </div>
          <div className="stat-card failed">
            <p className="stat-label">Failed</p>
            <p className="stat-value">{failedCount}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-row">
          <input type="text" className="search-input" placeholder="Search by name, email or phone..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <span className="filter-label">From:</span>
          <input type="date" className="date-input" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
          <span className="filter-label">To:</span>
          <input type="date" className="date-input" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
          {hasFilters && <button className="clear-btn" onClick={() => { setSearch(""); setDateFrom(""); setDateTo(""); }}>Clear filters</button>}
        </div>

        {/* Table */}
        {loading ? (
          <div className="empty-state">Loading leads...</div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">No leads found.</div>
        ) : (
          <div className="table-wrap">
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Status</th>
                    <th>Parent Name</th>
                    <th>Child Name</th>
                    <th>Grade</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Pref Date</th>
                    <th>Pref Time</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((lead, i) => (
                    <tr key={lead.id || i}>
                      <td className="num">{i + 1}</td>
                      <td>
                        <span className={`badge ${lead.success ? "success" : "failed"}`}>
                          {lead.success ? "Success" : "Failed"}
                        </span>
                      </td>
                      <td className="name">{fd(lead, "parent_name") || "—"}</td>
                      <td>{fd(lead, "student_name") || "—"}</td>
                      <td className="muted">{fd(lead, "grade") || "—"}</td>
                      <td className="muted">{fd(lead, "email") || "—"}</td>
                      <td className="muted">{fd(lead, "phone") || "—"}</td>
                      <td className="muted">{fd(lead, "date") || "—"}</td>
<td className="muted">{fd(lead, "time") || "—"}</td>
                      <td className="date-cell">
                        {lead.submittedAt ? new Date(lead.submittedAt).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—"}
                      </td>
                      <td>
                        <button className="view-btn" onClick={() => setViewLead(lead)}>View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="table-footer">
              <span>Showing {filtered.length} of {total} leads</span>
              <span>{new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span>
            </div>
          </div>
        )}
      </div>

      {/* View Modal */}
      {viewLead && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setViewLead(null); }}>
          <div className="modal-box">
            <div className="modal-header">
              <p className="modal-title">Lead Details</p>
              <p className="modal-date">
                {viewLead.submittedAt ? new Date(viewLead.submittedAt).toLocaleString("en-IN", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" }) : ""}
              </p>
              <button className="modal-close" onClick={() => setViewLead(null)}>×</button>
            </div>

            <div className="modal-body">
              {/* Status */}
              <div className="modal-section">
                <span className={`badge ${viewLead.success ? "success" : "failed"}`} style={{ fontSize: 13, padding: "6px 16px" }}>
                  CRM: {viewLead.success ? "Success" : "Failed"} {viewLead.crmStatusCode ? `(${viewLead.crmStatusCode})` : ""}
                </span>
              </div>

              {/* Form Data */}
              <div className="modal-section">
                <p className="modal-section-title">Form Data Submitted</p>
                <div className="detail-grid">
                  <div className="detail-item">
                    <p className="detail-key">Parent Name</p>
                    <p className="detail-val">{fd(viewLead, "parent_name") || "—"}</p>
                  </div>
                  <div className="detail-item">
                    <p className="detail-key">Child Name</p>
                    <p className="detail-val">{fd(viewLead, "student_name") || "—"}</p>
                  </div>
                  <div className="detail-item">
                    <p className="detail-key">Grade</p>
                    <p className="detail-val">{fd(viewLead, "grade") || "—"}</p>
                  </div>
                  <div className="detail-item">
                    <p className="detail-key">Mobile</p>
                    <p className="detail-val">{fd(viewLead, "phone") || "—"}</p>
                  </div>
                  <div className="detail-item full">
                    <p className="detail-key">Email</p>
                    <p className="detail-val">{fd(viewLead, "email") || "—"}</p>
                  </div>
                  {(viewLead.formData?.date) && (
                    <div className="detail-item">
                      <p className="detail-key">Preferred Date</p>
                      <p className="detail-val">{viewLead.formData?.date}</p>
                    </div>
                  )}
                  {(viewLead.formData?.time) && (
                    <div className="detail-item">
                      <p className="detail-key">Preferred Time</p>
                      <p className="detail-val">{viewLead.formData?.time}</p>
                    </div>
                  )}
                  {(viewLead.formData?.message) && (
                    <div className="detail-item full">
                      <p className="detail-key">Message</p>
                      <p className="detail-val">{viewLead.formData?.message}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Request Payload */}
              <div className="modal-section">
                <p className="modal-section-title">Request Payload (Sent to CRM)</p>
                <div className="code-block green">
                  <pre>{JSON.stringify(viewLead.requestPayload, null, 2)}</pre>
                </div>
              </div>

              {/* CRM Response */}
              <div className="modal-section">
                <p className="modal-section-title">CRM Response</p>
                <div className="code-block yellow">
                  <pre>{JSON.stringify(viewLead.crmResponse, null, 2)}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
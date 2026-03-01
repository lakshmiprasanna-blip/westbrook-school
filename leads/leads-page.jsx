"use client";

import { useEffect, useState } from "react";

export default function LeadsPage() {
  /* ================= AUTH ================= */
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  /* ================= DATA ================= */
  const [leads, setLeads] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  /* ================= FILTERS ================= */
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [viewLead, setViewLead] = useState(null);

  /* ================= AUTO LOGIN ================= */
  useEffect(() => {
    const saved = sessionStorage.getItem("leads_password");
    if (saved) {
      setPassword(saved);
      setAuthenticated(true);
    }
  }, []);

  /* ================= FETCH LEADS ================= */
  useEffect(() => {
    if (!authenticated) return;

    setLoading(true);

    fetch("/api/leads", {
      headers: { "x-leads-password": password },
    })
      .then((res) => {
        if (res.status === 401) {
          sessionStorage.removeItem("leads_password");
          setAuthenticated(false);
          setAuthError("Incorrect password");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        setLeads(data.leads || []);
        setTotal(data.total || 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [authenticated, password]);

  /* ================= LOGIN ================= */
  const handleLogin = (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setAuthError("Enter password");
      return;
    }
    sessionStorage.setItem("leads_password", password);
    setAuthenticated(true);
    setAuthError("");
  };

  /* ================= LOGIN SCREEN ================= */
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDF6F2] p-6">
        <div className="bg-white p-8 rounded-xl shadow border w-full max-w-sm">
          <h1 className="text-2xl font-semibold text-center mb-4 text-[#A03D13]">
            Leads Dashboard
          </h1>

          {authError && (
            <p className="text-sm text-red-600 mb-3 text-center">
              {authError}
            </p>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 text-sm"
            />
            <button className="w-full bg-[#A03D13] text-white py-3 rounded-lg text-sm">
              Access
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* ================= FILTER LOGIC ================= */
  const filtered = leads.filter((lead) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      (lead.formData?.parent_name || "").toLowerCase().includes(q) ||
      (lead.formData?.email || "").toLowerCase().includes(q) ||
      (lead.formData?.mobile || "").includes(q);

    let matchesDate = true;

    if (dateFrom) {
      const from = new Date(dateFrom);
      from.setHours(0, 0, 0, 0);
      if (new Date(lead.submittedAt) < from) matchesDate = false;
    }

    if (dateTo) {
      const to = new Date(dateTo);
      to.setHours(23, 59, 59, 999);
      if (new Date(lead.submittedAt) > to) matchesDate = false;
    }

    return matchesSearch && matchesDate;
  });

  /* ================= DASHBOARD ================= */
  return (
    <div className="min-h-screen bg-[#FDF6F2] p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-[#A03D13]">
              Leads Dashboard
            </h1>
            <p className="text-sm text-gray-500">
              Total Leads: {total}
            </p>
          </div>

          <button
            onClick={() => {
              sessionStorage.removeItem("leads_password");
              setAuthenticated(false);
              setPassword("");
            }}
            className="border px-4 py-2 rounded-lg text-sm"
          >
            Logout
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-5">
          <input
            type="text"
            placeholder="Search name / email / phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-2 text-sm flex-1"
          />

          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          />

          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          />

          {(search || dateFrom || dateTo) && (
            <button
              onClick={() => {
                setSearch("");
                setDateFrom("");
                setDateTo("");
              }}
              className="border px-3 py-2 rounded-lg text-sm"
            >
              Clear
            </button>
          )}
        </div>

        {/* Table */}
        {loading ? (
          <p className="text-center py-20 text-gray-400">Loading…</p>
        ) : filtered.length === 0 ? (
          <p className="text-center py-20 text-gray-400">No leads found</p>
        ) : (
          <div className="bg-white rounded-xl border overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#FDF6F2]">
                <tr>
                  <th className="p-4 text-left">Parent</th>
                  <th className="p-4 text-left">Child</th>
                  <th className="p-4 text-left">Grade</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Mobile</th>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead, i) => (
                  <tr key={lead._id || i} className="border-t">
                    <td className="p-4">{lead.formData?.parent_name || "—"}</td>
                    <td className="p-4">{lead.formData?.child_name || "—"}</td>
                    <td className="p-4">{lead.formData?.grade || "—"}</td>
                    <td className="p-4">{lead.formData?.email || "—"}</td>
                    <td className="p-4">{lead.formData?.mobile || "—"}</td>
                    <td className="p-4 text-gray-500">
                      {lead.submittedAt
                        ? new Date(lead.submittedAt).toLocaleString("en-IN")
                        : "—"}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => setViewLead(lead)}
                        className="text-xs bg-[#A03D13] text-white px-3 py-1 rounded"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View Modal */}
      {viewLead && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full relative">
            <button
              onClick={() => setViewLead(null)}
              className="absolute top-3 right-4 text-xl"
            >
              ×
            </button>

            <h2 className="text-xl font-semibold mb-4 text-[#A03D13]">
              Lead Details
            </h2>

            <pre className="bg-gray-900 text-green-400 p-4 rounded text-xs overflow-auto">
              {JSON.stringify(viewLead, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
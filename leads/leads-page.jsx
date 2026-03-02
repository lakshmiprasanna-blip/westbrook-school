"use client";

import { useState, useEffect } from "react";

export default function LeadsPage() {
  /* ---------- AUTH ---------- */
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  /* ---------- DATA ---------- */
  const [leads, setLeads] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  /* ---------- FETCH LEADS AFTER LOGIN ---------- */
  useEffect(() => {
    if (!authenticated) return;

    setLoading(true);
    fetch("/api/leads", {
      headers: {
        "x-leads-password": password,
      },
    })
      .then((res) => {
        if (res.status === 401) {
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

  /* ---------- LOGIN ---------- */
  const handleLogin = (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setAuthError("Please enter password");
      return;
    }
    setAuthError("");
    setAuthenticated(true);
  };

  /* ---------- LOGOUT ---------- */
  const handleLogout = () => {
    setAuthenticated(false);
    setPassword("");
    setLeads([]);
    setTotal(0);
  };

  /* ---------- STATS ---------- */
  const successCount = leads.filter((l) => l.success === true).length;
  const failedCount = leads.filter((l) => l.success === false).length;

  /* ================= LOGIN SCREEN ================= */
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDF6F2] p-6">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-xl shadow-sm border w-full max-w-sm"
        >
          <h1 className="text-2xl font-semibold text-center mb-2">
            Leads Dashboard
          </h1>
          <p className="text-sm text-gray-500 text-center mb-6">
            Enter password to continue
          </p>

          {authError && (
            <p className="mb-4 text-sm text-red-600 text-center">
              {authError}
            </p>
          )}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 mb-4"
            autoFocus
          />

          <button className="w-full bg-[#A03D13] text-white py-3 rounded-lg">
            Login
          </button>
        </form>
      </div>
    );
  }

<<<<<<< HEAD
  /* ================= DASHBOARD ================= */
=======
  // --- Dashboard ---
  const filtered = leads.filter((lead) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      (lead.formData?.name || "").toLowerCase().includes(q) ||
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

  const successCount = leads.filter((l) => l.success).length;
  const failedCount = leads.filter((l) => !l.success).length;
  const hasFilters = search || dateFrom || dateTo;

>>>>>>> c84a58e116785705aae5f630902b84c8ab296db8
  return (
    <div className="min-h-screen bg-[#FDF6F2] p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-[#A03D13]">
            Leads Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="border px-4 py-2 rounded-lg bg-white"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Stat label="Total Leads" value={total} />
          <Stat label="Successful" value={successCount} color="text-green-600" />
          <Stat label="Failed" value={failedCount} color="text-red-600" />
        </div>

        {/* Table */}
        {loading ? (
          <p className="text-center py-20 text-gray-400">Loading leads…</p>
        ) : leads.length === 0 ? (
          <p className="text-center py-20 text-gray-400">No leads found</p>
        ) : (
<<<<<<< HEAD
          <div className="bg-white rounded-xl border overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#f5e8e2]">
                <tr>
                  <th className="px-4 py-3 text-left">Parent</th>
                  <th className="px-4 py-3 text-left">Child</th>
                  <th className="px-4 py-3 text-left">Grade</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Mobile</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead._id} className="border-t">
                    <td className="px-4 py-3">{lead.formData?.parent_name}</td>
                    <td className="px-4 py-3">
                      {lead.formData?.child_name || "—"}
                    </td>
                    <td className="px-4 py-3">
                      {lead.formData?.grade || "—"}
                    </td>
                    <td className="px-4 py-3">
                      {lead.formData?.email}
                    </td>
                    <td className="px-4 py-3">
                      {lead.formData?.mobile}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          lead.success
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {lead.success ? "Success" : "Failed"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(lead.submittedAt).toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
=======
          <div className="bg-white rounded-xl shadow-sm border border-[#f0ddd5] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                <th className="px-6 py-5 text-left">Parent Name</th>
                <th className="px-6 py-5 text-left">Child Name</th>
                <th className="px-6 py-5 text-left">Grade</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
                </thead>
                <tbody>
                  {filtered.map((lead, i) => (
                    <tr
                      key={lead.id || i}
                      className={`border-t border-[#f5e8e2] ${
                        i % 2 === 0 ? "bg-white" : "bg-[#fdf6f2]"
                      }`}
                    >
                      <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                            lead.success
                              ? "bg-green-100 text-green-700"
                              : lead.status === "error"
                              ? "bg-orange-100 text-orange-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {lead.success ? "Success" : "Failed"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-800">{lead.formData?.parent_name || "—"}</td>
                      <td className="px-4 py-3 text-gray-800">{lead.formData?.child_name || "—"}</td>
                      <td className="px-4 py-3 text-gray-800">{lead.formData?.grade || "—"}</td>
                      <td className="px-4 py-3 text-gray-600">{lead.formData?.email || "—"}</td>
                      <td className="px-4 py-3 text-gray-600">{lead.formData?.mobile || "—"}</td>
                      
                      <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                        {lead.submittedAt
                          ? new Date(lead.submittedAt).toLocaleString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setViewLead(lead)}
                          className="px-3 py-1 rounded-lg text-xs font-medium bg-[#A03D13] text-white hover:bg-[#7f3214] transition-colors"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 border-t border-[#f0ddd5] text-xs text-gray-400">
              Showing {filtered.length} of {total} leads
            </div>
>>>>>>> c84a58e116785705aae5f630902b84c8ab296db8
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- STAT CARD ---------- */
function Stat({ label, value, color = "text-[#A03D13]" }) {
  return (
    <div className="bg-white rounded-xl p-4 border">
      <p className="text-xs text-gray-400 uppercase">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
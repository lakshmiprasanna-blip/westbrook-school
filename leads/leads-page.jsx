"use client";

import { useEffect, useState } from "react";

export default function LeadsPage() {
  // Auth
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // Data
  const [leads, setLeads] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [viewLead, setViewLead] = useState(null);

  // Check if already authenticated (sessionStorage)
  useEffect(() => {
    const saved = sessionStorage.getItem("leads_password");
    if (saved) {
      setPassword(saved);
      setAuthenticated(true);
    }
  }, []);

  // Fetch leads when authenticated
  useEffect(() => {
    if (!authenticated) return;

    setLoading(true);
    fetch("/api/leads", {
      headers: { "x-leads-password": password },
    })
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
    if (!password.trim()) {
      setAuthError("Please enter the password.");
      return;
    }
    setAuthError("");
    sessionStorage.setItem("leads_password", password);
    setAuthenticated(true);
  };

  // --- Login Screen ---
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#FDF6F2] flex items-center justify-center p-6 font-sans">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-[#f0ddd5] p-8">
          <h1 className="text-2xl font-semibold text-[#A03D13] mb-2 text-center">
            Leads Dashboard
          </h1>
          <p className="text-sm text-gray-400 mb-6 text-center">
            Enter password to access
          </p>

          {authError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600 text-center">{authError}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setAuthError("");
              }}
              placeholder="Password"
              className="w-full rounded-lg border border-[#e0c9bf] bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#A03D13]"
              autoFocus
            />
            <button
              type="submit"
              className="w-full py-3 rounded-lg text-sm font-medium bg-[#A03D13] text-white hover:bg-[#7f3214] transition-colors"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- Dashboard ---
  const filtered = leads.filter((lead) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      (lead.formData?.name || "").toLowerCase().includes(q) ||
      (lead.formData?.email || "").toLowerCase().includes(q) ||
      (lead.formData?.phone || "").includes(q);

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

  return (
    <div className="min-h-screen bg-[#FDF6F2] p-6 font-sans">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[#A03D13]">Leads Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">VSR Vriksha Nature Cure Centre</p>
          </div>
          <button
            onClick={() => {
              sessionStorage.removeItem("leads_password");
              setAuthenticated(false);
              setPassword("");
              setLeads([]);
            }}
            className="px-4 py-2 rounded-lg text-sm bg-white border border-[#e0c9bf] text-gray-600 hover:border-[#A03D13] transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Total", value: total, color: "text-[#A03D13]" },
            { label: "Successful", value: successCount, color: "text-green-600" },
            { label: "Failed", value: failedCount, color: "text-red-500" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white rounded-xl p-4 shadow-sm border border-[#f0ddd5]">
              <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
              <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-lg border border-[#e0c9bf] bg-white px-4 py-2 text-sm text-gray-700 outline-none focus:border-[#A03D13]"
          />
          <div className="flex gap-2 items-center flex-wrap">
            <label className="text-sm text-gray-500 whitespace-nowrap">From:</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="rounded-lg border border-[#e0c9bf] bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#A03D13]"
            />
            <label className="text-sm text-gray-500 whitespace-nowrap">To:</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="rounded-lg border border-[#e0c9bf] bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#A03D13]"
            />
            {hasFilters && (
              <button
                onClick={() => {
                  setSearch("");
                  setDateFrom("");
                  setDateTo("");
                }}
                className="px-3 py-2 rounded-lg text-sm bg-white border border-[#e0c9bf] text-gray-600 hover:border-[#A03D13] transition-colors whitespace-nowrap"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading leads...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No leads found.</div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-[#f0ddd5] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                <th className="px-6 py-5 text-left">Parent Name</th>
                <th className="px-6 py-5 text-left">Child Name</th>
                <th className="px-6 py-5 text-left">Grade</th>
                <th>Email</th>
                <th>Phone</th>
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
          </div>
        )}
      </div>

      {/* View Modal */}
      {viewLead && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-6">
            <button
              onClick={() => setViewLead(null)}
              className="absolute right-4 top-4 text-2xl text-gray-400 hover:text-gray-600 transition-colors"
            >
              ×
            </button>

            <h2 className="text-xl font-semibold text-[#A03D13] mb-1">Lead Details</h2>
            <p className="text-sm text-gray-400 mb-6">
              {viewLead.submittedAt
                ? new Date(viewLead.submittedAt).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                : ""}
            </p>

            {/* Status Badge */}
            <div className="mb-6">
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  viewLead.success
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                CRM Status: {viewLead.success ? "Success" : "Failed"} ({viewLead.crmStatusCode})
              </span>
            </div>

            {/* Form Data */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                Form Data Submitted
              </h3>
              <div className="bg-[#FDF6F2] rounded-lg p-4 border border-[#f0ddd5]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-400">Name:</span>
                    <span className="ml-2 text-gray-800">{viewLead.formData?.parent_name}</span>
                  </div>
                   <div>
                    <span className="text-gray-400">ChildName:</span>
                    <span className="ml-2 text-gray-800">{viewLead.formData?.child_name}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Grade:</span>
                    <span className="ml-2 text-gray-800">{viewLead.formData?.grade}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Email:</span>
                    <span className="ml-2 text-gray-800">{viewLead.formData?.email}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Phone:</span>
                    <span className="ml-2 text-gray-800">{viewLead.formData?.mobile}</span>
                  </div>
                  
                  {viewLead.formData?.message && (
                    <div className="col-span-1 sm:col-span-2">
                      <span className="text-gray-400">Message:</span>
                      <span className="ml-2 text-gray-800">{viewLead.formData?.message}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Request Payload */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                Request Payload (Sent to CRM)
              </h3>
              <pre className="bg-gray-900 text-green-400 rounded-lg p-4 text-xs overflow-x-auto whitespace-pre-wrap">
                {JSON.stringify(viewLead.requestPayload, null, 2)}
              </pre>
            </div>

            {/* CRM Response */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                CRM Response
              </h3>
              <pre className="bg-gray-900 text-yellow-400 rounded-lg p-4 text-xs overflow-x-auto whitespace-pre-wrap">
                {JSON.stringify(viewLead.crmResponse, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

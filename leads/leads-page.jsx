"use client";

import { useEffect, useState } from "react";

export default function LeadsPage() {
  /* ---------------- AUTH ---------------- */
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  /* ---------------- DATA ---------------- */
  const [leads, setLeads] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  /* ---------------- CHECK SAVED PASSWORD ---------------- */
  useEffect(() => {
    const saved = sessionStorage.getItem("leads_password");
    if (!saved) return;

    fetch("/api/leads", {
      headers: { "x-leads-password": saved },
    }).then((res) => {
      if (res.ok) {
        setPassword(saved);
        setAuthenticated(true);
      } else {
        sessionStorage.removeItem("leads_password");
      }
    });
  }, []);

  /* ---------------- FETCH LEADS ---------------- */
  useEffect(() => {
    if (!authenticated) return;

    setLoading(true);
    fetch("/api/leads", {
      headers: { "x-leads-password": password },
    })
      .then((res) => {
        if (res.status === 401) {
          setAuthenticated(false);
          sessionStorage.removeItem("leads_password");
          setAuthError("Invalid password");
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

  /* ---------------- LOGIN ---------------- */
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

  /* ---------------- STATS ---------------- */
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
            <p className="mb-3 text-sm text-red-600 text-center">
              {authError}
            </p>
          )}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 mb-4"
          />

          <button className="w-full bg-[#A03D13] text-white py-3 rounded-lg">
            Login
          </button>
        </form>
      </div>
    );
  }

  /* ================= DASHBOARD ================= */
  return (
    <div className="min-h-screen bg-[#FDF6F2] p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold">Leads Dashboard</h1>
          <button
            onClick={() => {
              sessionStorage.removeItem("leads_password");
              setAuthenticated(false);
              setPassword("");
              setLeads([]);
            }}
            className="border px-4 py-2 rounded-lg"
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
          <p className="text-center py-20">Loading...</p>
        ) : leads.length === 0 ? (
          <p className="text-center py-20">No leads found</p>
        ) : (
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
                    <td className="px-4 py-3">{lead.formData?.child_name || "—"}</td>
                    <td className="px-4 py-3">{lead.formData?.grade || "—"}</td>
                    <td className="px-4 py-3">{lead.formData?.email}</td>
                    <td className="px-4 py-3">{lead.formData?.mobile}</td>
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
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- STAT CARD ---------------- */
function Stat({ label, value, color = "text-[#A03D13]" }) {
  return (
    <div className="bg-white rounded-xl p-4 border">
      <p className="text-xs text-gray-400 uppercase">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
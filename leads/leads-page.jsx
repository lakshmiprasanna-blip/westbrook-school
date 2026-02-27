"use client";

import { useState } from "react";

export default function LeadsPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!password.trim()) {
      setAuthError("Enter password");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/leads", {
      headers: {
        "x-leads-password": password,
      },
    });

    if (res.status === 401) {
      setAuthError("Incorrect password");
      setLoading(false);
      return;
    }

    const data = await res.json();
    setLeads(data.leads || []);
    setAuthenticated(true);
    setLoading(false);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F4D81] to-[#062b4d] p-6">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-2xl font-semibold text-center mb-6 text-[#0F4D81]">
            Leads Dashboard
          </h1>

          {authError && (
            <p className="text-red-500 text-sm mb-4 text-center">
              {authError}
            </p>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 outline-none focus:border-[#0F4D81]"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-[#0F4D81] text-white font-medium"
            >
              {loading ? "Checking..." : "Access Dashboard"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const successLeads = leads.filter((l) => l.success);
  const failedLeads = leads.filter((l) => !l.success);
  const total = leads.length;

  const successPercent = total
    ? ((successLeads.length / total) * 100).toFixed(0)
    : 0;

  const failedPercent = total
    ? ((failedLeads.length / total) * 100).toFixed(0)
    : 0;

  return (
    <div className="min-h-screen flex">
      <aside className="w-72 bg-[#A2D5EB] min-h-screen shadow-lg flex flex-col justify-between">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-[#0F4D81] mb-6">
            Leads Dashboard
          </h2>

          <div className="h-[1px] bg-[#0F4D81]/30 mb-6"></div>

          <button
            onClick={() => {
              setAuthenticated(false);
              setPassword("");
              setLeads([]);
            }}
            className="text-[#0F4D81] font-medium hover:text-red-600 transition"
          >
            Logout
          </button>
        </div>

        <div className="p-6 text-sm text-[#0F4D81]/70">
          Admin Panel
        </div>
      </aside>

      <main className="flex-1 p-12 bg-gradient-to-br from-[#eaf4ff] via-[#f5f9ff] to-white relative overflow-hidden">
        <h1 className="text-4xl font-bold text-[#0F4D81] mb-12">
          Leads Analytics
        </h1>

        <div className="grid grid-cols-3 gap-8 mb-14">
          <GlassStatCard title="Total Leads" value={total} gradient="from-blue-500 to-indigo-500" />
          <GlassStatCard title="Successful" value={successLeads.length} gradient="from-green-500 to-emerald-500" />
          <GlassStatCard title="Failed" value={failedLeads.length} gradient="from-red-500 to-pink-500" />
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-blue-50 text-[#0F4D81]">
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
  {leads.map((lead, i) => (
    <tr key={i} className="border-t hover:bg-gray-50 transition">
      <td className="px-6 py-4 font-medium">
        {lead.formData?.parentName || "—"}
      </td>

      <td className="px-6 py-4">
        {lead.formData?.childName || "—"}
      </td>

      <td className="px-6 py-4">
        {lead.formData?.grade || "—"}
      </td>

      <td>
        {lead.formData?.email || "—"}
      </td>

      <td>
        {lead.formData?.mobile || "—"}
      </td>

      <td>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            lead.success
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {lead.success ? "Success" : "Failed"}
        </span>
      </td>

      <td>
        {lead.submittedAt
          ? new Date(lead.submittedAt).toLocaleString()
          : "—"}
      </td>
    </tr>
  ))}
</tbody>
          </table>

          {leads.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              No leads available.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function GlassStatCard({ title, value, gradient }) {
  return (
    <div className="relative rounded-3xl p-[2px]">
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${gradient} opacity-40 blur-xl`} />
      <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 border shadow-lg">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-4xl font-bold mt-3 text-[#0F4D81]">{value}</p>
      </div>
    </div>
  );
}
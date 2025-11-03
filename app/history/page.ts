'use client';
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from 'react';

type CallLog = {
  id: number;
  phone: string;
  strategy: string;
  result: string;
  timestamp: string;
};

export default function HistoryPage() {
  const { data: session, status } = useSession();
  const [logs, setLogs] = useState<CallLog[]>([]);

  useEffect(() => {
    fetch('/api/logs')
      .then(res => res.json())
      .then(data => setLogs(data));
  }, []);

  const handleExportCSV = () => {
    const header = ["Number", "Strategy", "Result", "Timestamp"];
    const rows = logs.map(log => [
      log.phone,
      log.strategy,
      log.result,
      new Date(log.timestamp).toLocaleString()
    ]);
    const csvContent = [header, ...rows]
      .map(row => row.join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "call_logs.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (status === "loading") {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!session) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="mb-4">You must sign in to view the call history.</h2>
        <button onClick={() => signIn()} className="bg-blue-500 text-white rounded p-2">Sign In</button>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <button onClick={() => signOut()} className="fixed top-4 right-4 bg-zinc-800 text-white px-4 py-2 rounded">Sign Out</button>
      <h1 className="text-2xl font-bold mb-4">Call History</h1>
      <button
        onClick={handleExportCSV}
        className="mb-4 px-5 py-2 bg-blue-500 text-white rounded shadow"
      >
        Export CSV
      </button>
      <table className="w-full border rounded shadow bg-white/90">
        <thead>
          <tr>
            <th className="border p-2">Number</th>
            <th className="border p-2">Strategy</th>
            <th className="border p-2">Result (AMD)</th>
            <th className="border p-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.id} className="hover:bg-blue-100">
              <td className="border p-2">{log.phone}</td>
              <td className="border p-2">{log.strategy}</td>
              <td className="border p-2">{log.result}</td>
              <td className="border p-2">{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {logs.length === 0 && (
        <div className="text-gray-500 mt-6 text-center">No call logs yet.</div>
      )}
    </main>
  );
}

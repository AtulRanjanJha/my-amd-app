'use client';
import { SessionProvider } from "next-auth/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  return (
    <SessionProvider>
      <DialerApp />
    </SessionProvider>
  );
}

function DialerApp() {
  const { data: session, status } = useSession();
  const [number, setNumber] = useState("");
  const [strategy, setStrategy] = useState("twilio");
  const [isLoading, setIsLoading] = useState(false);

  if (status === "loading") {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!session) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="mb-4">You must sign in to use the dialer.</h2>
        <button onClick={() => signIn()} className="bg-blue-500 text-white rounded p-2">Sign In</button>
      </main>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/dial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number, strategy }),
      });
      const data = await res.json();
      alert(data.message);
    } catch {
      alert('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black">
      <button onClick={() => signOut()} className="absolute top-4 right-4 bg-zinc-800 text-white px-4 py-2 rounded">Sign Out</button>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm w-full p-6 border rounded bg-white/80 text-black">
        <input
          type="text"
          placeholder="Enter phone number"
          value={number}
          onChange={e => setNumber(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <label htmlFor="strategy" className="font-bold">AMD Strategy</label>
        <select
          id="strategy"
          title="Select AMD Strategy"
          value={strategy}
          onChange={e => setStrategy(e.target.value)}
          className="border p-2 rounded"
          required
        >
          <option value="twilio">Twilio Native AMD</option>
          <option value="jambonz">Twilio + Jambonz</option>
          <option value="huggingface">Hugging Face ML</option>
          <option value="gemini">Google Gemini 2.5 Flash</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white rounded p-2" disabled={isLoading}>
          {isLoading ? 'Dialing...' : 'Dial Now'}
        </button>
      </form>
    </main>
  );
}

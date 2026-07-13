"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Incorrect password. Please try again.");
    }
  }

  return (
    <div className="login-wrap">
      <form className="login-card" onSubmit={submit}>
        <a className="brand" href="/" style={{ justifyContent: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="logo-img" src="/logo.png" alt="Nordic Ceylonians" style={{ height: 52 }} />
        </a>
        <h1>Welcome back</h1>
        <p>Sign in to manage your website content.</p>
        <div className="a-field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            autoFocus
          />
        </div>
        {error && (
          <p className="toast err" style={{ marginBottom: 12 }}>
            {error}
          </p>
        )}
        <button
          className="btn btn-gold"
          style={{ width: "100%", justifyContent: "center" }}
          disabled={loading}
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}

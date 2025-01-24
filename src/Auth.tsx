import React, { useState, useEffect } from "react";
import supabase from "./supabaseClient";
import { Session } from "@supabase/supabase-js";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if there's a logged-in session on page load
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data?.session);
    };

    checkSession();
  }, []);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Create user and log them in
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setSession(data?.session);
      console.log("User signed up:", data?.user);
      // Optionally add user to the users table with admin role
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      console.log("User logged in:", data?.user);
      setSession(data?.session);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      setError(error.message);
    } else {
      setSession(null);
      console.log("User logged out");
    }
  };

  return (
    <div>
      {session ? (
        <div>
          <h2>Welcome, Admin</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>Login or Sign Up</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignUp}>Sign Up</button>
            <button onClick={handleLogin}>Log In</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Auth;

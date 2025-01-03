import React, { useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation logic if needed
    console.log("Submitted:", { email, pass });
    // Add logic here to send login data to your backend or perform other actions.
    setIsSubmitted(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="name@gmail.com"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="********"
          id="password"
          name="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          aria-label="Password"
          required
        />

        <button type="submit">Log In</button>
      </form>

      {isSubmitted && <p>Login successful! Redirecting...</p>}

      
    </>
  );
};

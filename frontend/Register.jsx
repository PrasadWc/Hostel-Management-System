import React, { useState } from "react";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation logic if needed
    console.log("Submitted:", { email, pass, name });
    // Add logic here to send registration data to your backend or perform other actions.
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

        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="John Doe"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label="Name"
          required
        />

        <button type="submit">Register</button>
      </form>

      {isSubmitted && <p>Registration successful! You can now log in.</p>}

      
    </>
  );
};

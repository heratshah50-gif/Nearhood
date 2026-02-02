"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, fontFamily: "system-ui, sans-serif", backgroundColor: "#f9fafb", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", padding: "2rem", maxWidth: "400px" }}>
          <h1 style={{ fontSize: "3rem", color: "#6b7280", marginBottom: "0.5rem" }}>500</h1>
          <p style={{ fontSize: "1.125rem", color: "#374151", marginBottom: "1.5rem" }}>
            Something went wrong. Please try again.
          </p>
          <button
            onClick={() => reset()}
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              fontWeight: 600,
              color: "white",
              backgroundColor: "#7c3aed",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}

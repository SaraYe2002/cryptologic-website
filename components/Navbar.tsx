export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <a
        href="#"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontWeight: 800,
          letterSpacing: 0.3,
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 10,
            height: 10,
            borderRadius: 3,
            background: "linear-gradient(135deg,var(--accent),var(--accent2))",
          }}
        />
        CryptoLogic LLC
      </a>
      <div className="nav-links">
        <a href="#about">About</a>
        <a href="#team">Team</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}

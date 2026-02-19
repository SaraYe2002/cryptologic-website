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
          gap: 12,
          fontWeight: 800,
          letterSpacing: 0.3,
        }}
      >
        <img src="/images/cryptologic.svg" alt="CryptoLogic Logo" style={{ height: 32 }} />
        CryptoLogic LLC
      </a>
      <div className="nav-links">
        <a href="#work">Work</a>
        <a href="#team">Team</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}

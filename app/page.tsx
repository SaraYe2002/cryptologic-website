import Navbar from "@/components/Navbar";
import PhysicsHexCanvas from "@/components/PhysicsHexCanvas";

export default function Home() {
  return (
    <main>
      <header className="nav">
        <div className="container nav-inner">
          <Navbar />
        </div>
      </header>

      <section className="hero">
        <PhysicsHexCanvas className="canvas-bg" />
        <div className="container hero-content">
          <h1>Security-first engineering for web3 companies</h1>
          <p>
            We design, audit, and build smart contract systems and secure web
            apps. Our work blends cryptography, formal methods, and
            high-assurance engineering.
          </p>
          <a className="cta" href="#contact">
            Start a conversation
          </a>
        </div>
      </section>

      <section id="about" className="section">
        <div className="container">
          <h2>Trusted by teams</h2>
          <div className="carousel">
            <div className="carousel-track">
              {Array.from({ length: 10 }).map((_, i) => (
                <img
                  key={i}
                  src={`https://dummyimage.com/200x60/0f1117/ffffff&text=Logo+${
                    i + 1
                  }`}
                  alt={`Logo ${i + 1}`}
                  className="logo"
                />
              ))}
              {Array.from({ length: 10 }).map((_, i) => (
                <img
                  key={"b" + i}
                  src={`https://dummyimage.com/200x60/0f1117/ffffff&text=Logo+${
                    i + 1
                  }`}
                  alt={`Logo ${i + 1}`}
                  className="logo"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="section">
        <div className="container">
          <h2>Team</h2>
          <div className="cards">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card">
                <div
                  style={{
                    height: 120,
                    background: "#111623",
                    borderRadius: 10,
                    marginBottom: 12,
                  }}
                />
                <strong>Member {i + 1}</strong>
                <div style={{ color: "var(--muted)" }}>Role</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="container">
          <h2>Contact</h2>
          <ContactForm />
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          © {new Date().getFullYear()} CryptoLogic LLC
        </div>
      </footer>
    </main>
  );
}

function ContactForm() {
  async function handleSubmit(formData: FormData) {
    "use server";
    const email = String(formData.get("email") || "");
    const message = String(formData.get("message") || "");
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message }),
      });
    } catch {}
  }
  return (
    <form
      action={handleSubmit}
      style={{ display: "grid", gap: 12, maxWidth: 560 }}
    >
      <input
        name="email"
        type="email"
        required
        placeholder="you@company.com"
        style={{
          padding: 12,
          borderRadius: 10,
          border: "1px solid rgba(255,255,255,.15)",
          background: "#0b0d14",
          color: "var(--fg)",
        }}
      />
      <textarea
        name="message"
        required
        placeholder="Tell us about your project"
        rows={5}
        style={{
          padding: 12,
          borderRadius: 10,
          border: "1px solid rgba(255,255,255,.15)",
          background: "#0b0d14",
          color: "var(--fg)",
        }}
      />
      <button className="cta" type="submit">
        Send
      </button>
    </form>
  );
}

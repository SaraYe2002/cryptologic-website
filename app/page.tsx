import Navbar from "@/components/Navbar";
import PhysicsHexCanvas from "@/components/PhysicsHexCanvas";
import ContactForm from "@/components/ContactForm";

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
          <h1>Specialized engineering for complex domains</h1>
          <p>
            General software engineering contracting with deep expertise in
            high-frequency trading, distributed systems, and advanced cryptography.
            We build high-performance infrastructure and secure full-stack
            applications for industry leaders across finance, tech, and healthcare.
          </p>
          <a className="cta" href="#contact">
            Start a conversation
          </a>
        </div>
      </section>

      <section className="experience-ticker section">
        <div className="carousel">
          <div className="carousel-track">
            {[
              { src: "/images/vmex.jpg", name: "VMEX" },
              { src: "/images/oyl.jpg", name: "OYL" },
              { src: "/images/subfrost.svg", name: "Subfrost" },
              { src: "/images/amazon-icon.svg", name: "Amazon" },
              { src: "/images/optiver.svg", name: "Optiver" },
              { src: "/images/jump trading.png", name: "Jump Trading" },
              { src: "/images/houston methodist.png", name: "Houston Methodist" },
              { src: "/images/baylor college of medicine.jpg", name: "Baylor Medicine" },
              { name: "FBAFlexPrep" }
            ].map((p, i) => (
              <div key={i} className="ticker-item">
                {p.src ? (
                  <img src={p.src} alt={p.name} className="logo" />
                ) : (
                  <span className="logo-text">{p.name}</span>
                )}
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {[
              { src: "/images/vmex.jpg", name: "VMEX" },
              { src: "/images/oyl.jpg", name: "OYL" },
              { src: "/images/subfrost.svg", name: "Subfrost" },
              { src: "/images/amazon-icon.svg", name: "Amazon" },
              { src: "/images/optiver.svg", name: "Optiver" },
              { src: "/images/jump trading.png", name: "Jump Trading" },
              { src: "/images/houston methodist.png", name: "Houston Methodist" },
              { src: "/images/baylor college of medicine.jpg", name: "Baylor Medicine" },
              { name: "FBAFlexPrep" }
            ].map((p, i) => (
              <div key={"b" + i} className="ticker-item">
                {p.src ? (
                  <img src={p.src} alt={p.name} className="logo" />
                ) : (
                  <span className="logo-text">{p.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="section">
        <div className="container">
          <h2>Proven Experience</h2>
          <div className="cards">
            {[
              {
                name: "VMEX Finance",
                desc: "Lending and borrowing protocol on EVM. Specialized blockchain engineering and full-stack development with Next.js.",
                tags: ["EVM", "Next.js", "Smart Contracts"]
              },
              {
                name: "OYL Corp",
                desc: "Bitcoin smart contract infrastructure. Protocol-level engineering and comprehensive full-stack development.",
                tags: ["Bitcoin", "Protocol Design", "Next.js"]
              },
              {
                name: "Subfrost",
                desc: "FROST multisig federation for decentralized BTC wrapping on metaprotocols. Advanced cryptography and Next.js frontend.",
                tags: ["Cryptography", "BTC Meta", "Security"]
              },
              {
                name: "Amazon",
                desc: "Implemented a high-throughput NoSQL to SQL database conversion pipeline using Golang for cross-team data migration.",
                tags: ["Golang", "NoSQL/SQL", "Data Pipelines"]
              },
              {
                name: "Optiver",
                desc: "High-frequency trading systems execution logic. Low-latency development in C++ and Python.",
                tags: ["C++", "Python", "HFT"]
              },
              {
                name: "Jump Trading",
                desc: "Real-time market data systems for high-frequency trading. Built robust, low-latency data ingestion logic in C++.",
                tags: ["C++", "Market Data", "Real-time"]
              },
              {
                name: "Baylor College of Medicine",
                desc: "Used R and statistical learning to predict biomarkers for cancer. Published peer-reviewed research papers.",
                tags: ["R", "Bioinformatics", "Research"]
              },
              {
                name: "Houston Methodist",
                desc: "Unity-based mobile application for stroke patient assessment and neurological examination using C#.",
                tags: ["Unity", "C#", "Healthcare"]
              },
              {
                name: "FBAFlexPrep",
                desc: "A traditional SaaS startup for Amazon FBA logistics. Scalable full-stack development and cloud architecture.",
                tags: ["SaaS", "Full Stack", "Logistics"]
              }
            ].map((p, i) => (
              <div key={i} className="card">
                <div className="card-tags">
                  {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                <h3>{p.name}</h3>
                <p style={{ color: "var(--muted)", fontSize: "15px", lineHeight: "1.5" }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="section">
        <div className="container">
          <h2>Team</h2>
          <div className="cards">
            {[
              { name: "Kevin", role: "Partner", img: "/images/kevin.jpg" },
              { name: "Steven", role: "Partner", img: "/images/steven.webp" },
              { name: "Sara", role: "Software Engineer", img: "/images/sara.jpg" },
            ].map((member, i) => (
              <div key={i} className="card" style={{ textAlign: "center" }}>
                <div
                  style={{
                    height: 240,
                    background: member.img ? `url(${member.img}) center/cover no-repeat` : "#111623",
                    borderRadius: 10,
                    marginBottom: 16,
                  }}
                />
                <strong>{member.name}</strong>
                <div style={{ color: "var(--muted)", fontSize: "14px" }}>{member.role}</div>
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


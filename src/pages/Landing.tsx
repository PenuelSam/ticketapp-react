import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Button from '../components/Button';
import circleOne from '../assets/circle1.svg';
import circleTwo from '../assets/circle2.svg';
import Card from '../components/Card';
import Footer from '../components/Footer';

export default function Landing() {
  return (
    <div className="layout">
      <Nav />
      <main className="layout-main">
        {/* HERO SECTION */}
        <section className="hero">

          {/* Background wave */}
          <div className="hero-bg" aria-hidden="true">
            <svg
              className="hero-wave"
              viewBox="0 0 1440 320"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                className="wave-path"
                fill="#eef2ff"
                fillOpacity="1"
                d="M0,160 L48,154.7 C96,149 192,139 288,133.3 C384,128 480,128 576,144 C672,160 768,192 864,181.3 C960,171 1056,117 1152,96 C1248,75 1344,85 1392,90.7 L1440,96 L1440,320 L0,320 Z"
              >
                <animate
                  className="anim-wave"
                  attributeName="d"
                  dur="10s"
                  repeatCount="indefinite"
                  values="
                    M0,160 L48,154.7 C96,149 192,139 288,133.3 C384,128 480,128 576,144 C672,160 768,192 864,181.3 C960,171 1056,117 1152,96 C1248,75 1344,85 1392,90.7 L1440,96 L1440,320 L0,320 Z;
                    M0,176 L48,170 C96,164 192,148 288,156 C384,164 480,196 576,202.7 C672,209 768,192 864,168 C960,144 1056,112 1152,128 C1248,144 1344,208 1392,234.7 L1440,261 L1440,320 L0,320 Z;
                    M0,160 L48,154.7 C96,149 192,139 288,133.3 C384,128 480,128 576,144 C672,160 768,192 864,181.3 C960,171 1056,117 1152,96 C1248,75 1344,85 1392,90.7 L1440,96 L1440,320 L0,320 Z
                  "
                />
              </path>
            </svg>
          </div>

          {/* Decorative circles */}
          <img src={circleOne} alt="" className="circle circle-one" aria-hidden="true" />
          <img src={circleTwo} alt="" className="circle circle-two" aria-hidden="true" />

          <div className="container hero-content">
            <div className="content-left">
              <span>Customer Support Platform</span>
              <h1 className="hero-title">Customer support, elevated.</h1>
              <p className="hero-text">
                TicketApp helps support teams capture, prioritize, and resolve customer requests with
                speed. Collaborate effortlessly and keep everyone in the loop.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Button className='dis-btn' as={Link} to="/auth/login" variant="primary">
                  Log in
                </Button>
                <Button as={Link} to="/auth/signup" variant="secondary">
                  Get started
                </Button>
              </div>
            </div>

            <Card className="content-right">
              <h3 style={{ marginTop: 0 }}>Designed for modern teams</h3>
              <ul
                style={{
                  margin: '1.25rem 0 0',
                  paddingLeft: '1.25rem',
                  color: 'var(--text-muted)',
                  lineHeight: '1.6',
                }}
              >
                <li>Visualize workload with live ticket counts.</li>
                <li>Share context-rich updates with your teammates.</li>
                <li>Stay focused with smart priorities and filters.</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="features">
          <div className="container">
            <div className="features-header">
              <h2>Built to delight customers</h2>
              <p>
                From the first response to final resolution, TicketApp React keeps service teams aligned.
                Automate the busywork so you can focus on empathy and expertise.
              </p>
            </div>

            <div className="features-grid">
              <Card>
                <h3>Frictionless onboarding</h3>
                <p>Start tracking tickets in minutes with an intuitive workspace.</p>
              </Card>
              <Card>
                <h3>Insights that matter</h3>
                <p>Understand queue health and keep stakeholders informed.</p>
              </Card>
              <Card>
                <h3>Team accountability</h3>
                <p>Assign owners, capture notes, and close the loop together.</p>
              </Card>
            </div>
          </div>
        </section>

       
       <Footer />
      </main>
    </div>
  );
}

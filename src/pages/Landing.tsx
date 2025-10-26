import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Button from '../components/Button';
import circleOne from '../assets/circle1.svg';
import circleTwo from '../assets/circle2.svg';

export default function Landing() {
  return (
    <div className="layout">
      <Nav />
      <main className="layout-main">
        <section className="hero">
          <img src={circleOne} alt="" className="circle circle-one" aria-hidden="true" />
          <img src={circleTwo} alt="" className="circle circle-two" aria-hidden="true" />
          <div className="container hero-content">
            <span style={{ color: 'var(--brand)', fontWeight: 700 }}>Customer Support Platform</span>
            <h1 className="hero-title">TicketFlow</h1>
            <p className="hero-text">
              Manage support requests, track progress, and collaborate with your team through a delightful
              interface designed for fast-moving teams.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Button as={Link} to="/auth/login" variant="primary">
                Log in
              </Button>
              <Button as={Link} to="/auth/signup" variant="secondary">
                Get started
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

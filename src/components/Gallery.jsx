export default function Gallery() {
  return (
    <section id="location-section" className="reveal tc">
      <div className="loc-wrap">
        <span className="sec-label" style={{ color: 'var(--sage-deep)' }}>The Destination</span>
        <h2 className="sec-heading">Venue</h2>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.6rem', color: 'var(--text-dark)', marginTop: '1rem', fontWeight: '500' }}>Hotel Heaven Reegal</h3>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.1rem', color: 'var(--text-mid)', marginTop: '0.5rem' }}>Wagholi, Pune</p>

        <img
          className="loc-img reveal"
          src="https://pub-1953a6673e864f3488c645252f75de98.r2.dev/may/Meenal%20%26%20Avinash%201st%20july/f42b77b0-fd74-4c53-aaab-f14019023302.avif"
          alt="Hotel Heaven Reegal"
          loading="lazy"
        />

        <a
          className="dir-btn"
          href="https://maps.google.com/?q=Hotel+Heaven+Reegal+Wagholi"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ width: '16px', height: '16px' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          Get Directions
        </a>
      </div>
    </section>
  )
}
export default function RSVP() {
  return (
    <>
      <section id="footer-section">
        <div className="tc reveal">
          <p className="footer-msg">
            Your presence will turn this celebration into a treasured memory we'll cherish forever.<br /><br />
            Come, celebrate love, and share this beautiful moment with us!
          </p>
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '.85rem', fontWeight: '600', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--text-mid)', display: 'block', marginBottom: '1rem' }}>Warm regards,</span>
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.4rem', color: 'var(--sage-dark)', fontStyle: 'italic', display: 'block' }}>The Family</span>

          <span className="footer-name" style={{ marginTop: '3rem' }}>Harshita & Akash</span>
        </div>
      </section>

      <footer style={{ background: 'var(--cream-2)', padding: '1.5rem', textAlign: 'center', fontSize: '0.85rem', opacity: '0.75', borderTop: '1px solid var(--border)' }}>
        <p>Created with ❤️ for a Special Day</p>
      </footer>
    </>
  )
}
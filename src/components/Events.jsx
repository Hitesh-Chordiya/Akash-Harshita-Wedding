export default function Events() {
  return (
    <section id="events-section">
      <div className="tc reveal" style={{ marginBottom: '1rem' }}>
        <span className="sec-label">The Celebrations</span>
        <h2 className="sec-heading">Wedding Events</h2>
      </div>

      <h3 className="day-header reveal">20 June 2026 · Main Celebration</h3>

      <section className="timeline-section reveal">
        <div className="tl-wrap">
          <div className="tl-line"></div>

          <div className="tl-row">
            <div className="tl-dot"></div>
            <div className="tl-content">
              <span className="tl-time">12:21 PM</span>
              <span className="tl-evt">Wedding Ceremony</span>
              <span className="tl-sub">The sacred vows to begin our forever.</span>
            </div>
          </div>

          <div className="tl-row">
            <div className="tl-dot"></div>
            <div className="tl-content">
              <span className="tl-time">3:00 PM</span>
              <span className="tl-evt">Reception Lunch</span>
              <span className="tl-sub">Celebration with family and close friends.</span>
            </div>
          </div>

          <div className="tl-row">
            <div className="tl-dot"></div>
            <div className="tl-content">
              <span className="tl-time">7:00 PM</span>
              <span className="tl-evt">Evening Reception</span>
              <span className="tl-sub">Dance, celebration, and joyous moments.</span>
            </div>
          </div>
        </div>
      </section>

      <div className="event-block reveal">
        <div className="evt-img-wrap">
          <img src="https://pub-1953a6673e864f3488c645252f75de98.r2.dev/may/Meenal%20%26%20Avinash%201st%20july/128.png" alt="Wedding Ceremony" loading="eager" />
        </div>
        <div className="evt-card reveal reveal-d1" style={{ borderColor: 'var(--gold-light)', background: 'linear-gradient(135deg, var(--sage-pale), var(--white))' }}>
          <div className="evt-info">
            <span className="evt-name" style={{ color: 'var(--sage-deep)', fontSize: 'clamp(2.4rem, 6vw, 3.2rem)' }}>Ceremony</span>
            <span className="evt-time">12:21 PM</span>
            <span className="evt-desc">The sacred vows to begin our forever together.</span>
          </div>
        </div>
      </div>

      <div className="event-block reveal">
        <div className="evt-img-wrap">
          <img src="https://pub-1953a6673e864f3488c645252f75de98.r2.dev/may/Meenal%20%26%20Avinash%201st%20july/129.png" alt="Reception" loading="eager" />
        </div>
        <div className="evt-card reveal reveal-d1">
          <div className="evt-info">
            <span className="evt-name">Reception</span>
            <span className="evt-time">7:00 PM</span>
            <span className="evt-desc">Join us for an evening of celebration, dance, and joy!</span>
          </div>
        </div>
      </div>
    </section>
  )
}
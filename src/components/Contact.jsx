export default function Contact() {
  return (
    <section className="contact" id="contact" aria-label="Contact">
      <div className="wrap contact-grid">
        <div className="reveal">
          <span className="eyebrow">Get in Touch</span>
          <h2>Let's create your look.</h2>
          <p className="lead">Available for bridal, events and shoots across the Kathmandu Valley. Reach out to check availability and book your session.</p>
          <ul className="cinfo">
            <li><span className="ci">✉</span><div><small>Email</small><b><a href="mailto:madhusamaharjan123@gmail.com">madhusamaharjan123@gmail.com</a></b></div></li>
            <li><span className="ci">◉</span><div><small>Location</small><b>Kirtipur-10, Kathmandu, Nepal</b></div></li>
            <li><span className="ci">◎</span><div><small>Instagram</small><b><a href="https://www.instagram.com/glamby_madhusa/" target="_blank" rel="noopener">@glamby_madhusa</a></b></div></li>
          </ul>
        </div>
        <form action="mailto:madhusamaharjan123@gmail.com" method="post" encType="text/plain" className="reveal">
          <label htmlFor="name">Your Name</label>
          <input id="name" name="name" type="text" required placeholder="Full name" />
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required placeholder="you@example.com" />
          <label htmlFor="occasion">Occasion / Service</label>
          <input id="occasion" name="occasion" type="text" placeholder="Bridal, event, shoot…" />
          <label htmlFor="msg">Message</label>
          <textarea id="msg" name="message" placeholder="Tell me about your date and the look you have in mind."></textarea>
          <button type="submit" className="btn btn-primary">Send Enquiry</button>
        </form>
      </div>
    </section>
  )
}

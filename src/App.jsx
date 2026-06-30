import { useEffect, useState } from 'react'
import { awards, experience, munYears, news, publications } from './data.js'
import profileImage from '../Profile.JPG'

const Arrow = () => <span aria-hidden="true">↗</span>

function ExternalLink({ href, children, className = '' }) {
  return <a className={className} href={href} target="_blank" rel="noreferrer">{children} <Arrow /></a>
}

function Header() {
  const [open, setOpen] = useState(false)
  const links = [['education', 'Education'], ['notes', 'Updates'], ['experience', 'Experience'], ['publications', 'Publications']]

  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [])

  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="James Tu, home">
        <span className="wordmark-mark">JT</span><span>Eng-Shen (James) Tu</span>
      </a>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="site-nav">
        <span>{open ? 'Close' : 'Menu'}</span>
      </button>
      <nav id="site-nav" className={open ? 'nav-open' : ''} aria-label="Main navigation">
        {links.map(([href, label]) => <a key={href} href={`#${href}`} onClick={() => setOpen(false)}>{label}</a>)}
        <a href="https://www.linkedin.com/in/james-tu-ncku/" target="_blank" rel="noreferrer" className="nav-cta">Say hello <Arrow /></a>
      </nav>
    </header>
  )
}

function SectionHead({ eyebrow, title, side }) {
  return (
    <div className="section-head reveal">
      <div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>
      {side && <p className="section-side">{side}</p>}
    </div>
  )
}

function Hero() {
  return (
    <main id="top">
      <section className="marquee" aria-label="Research interests">
        <div className="marquee-track">
          <span>Reliable AI4SE</span><b>✦</b><span>Trustworthy AI</span><b>✦</b><span>LLM Reasoning &amp; Evaluation</span><b>✦</b><span>Human-AI Collaboration</span><b>✦</b>
          <span>Reliable AI4SE</span><b>✦</b><span>Trustworthy AI</span><b>✦</b><span>LLM Reasoning &amp; Evaluation</span><b>✦</b><span>Human-AI Collaboration</span><b>✦</b>
        </div>
      </section>
      <section className="hero shell">
        <div className="hero-copy reveal">
          <h1>Towards <em>Reliable AI </em><br />for <em>Software Engineering.</em></h1>
          <p className="hero-lede">I am Eng-Shen (James) Tu, currently a Computer Science PhD student at Cornell University. Previously, I was a Software Engineer at Appier, and I received my B.S. in Computer Science from National Cheng Kung University (NCKU).</p>
          <p className="hero-research"><strong>Research Interests:</strong> Reliable AI4SE, Trustworthy AI, LLM Reasoning &amp; Evaluation, Human-AI Collaboration.</p>
          <div className="hero-actions">
            <a className="button primary" href="#publications">View publications <span>↓</span></a>
            <ExternalLink className="button text" href="https://scholar.google.com/citations?user=Ec3gA-EAAAAJ&hl=en&oi=sra">Google Scholar</ExternalLink>
          </div>
        </div>
        <div className="portrait-wrap reveal">
          <div className="portrait-frame"><img src={profileImage} alt="James Tu playing guitar" /></div>
          <div className="outside-card">
            <p className="eyebrow">Outside research</p>
            <p>Volleyball, Music, Chess, Casual Model UN</p>
            <a href="?view=model-un">Explore my Model UN experience <span>→</span></a>
          </div>
        </div>
        {/* <div className="hero-index" aria-hidden="true"><span>Research</span><span>Reliable AI × Software Engineering</span></div> */}
      </section>

    </main>
  )
}

function Education() {
  return (
    <section id="education" className="section education-section">
      <div className="shell">
        <SectionHead eyebrow="Education" title="Education." />
        <div className="education-list">
          <article><time>2026 — 2031 expected</time><div><h3>PhD, Computer Science</h3><p>Cornell University</p></div></article>
          <article><time>2019 — 2024</time><div><h3>BS, Computer Science &amp; Information Engineering</h3><p>National Cheng Kung University</p></div></article>
        </div>
      </div>
    </section>
  )
}

function Publications() {
  return (
    <section id="publications" className="section publication-section">
      <div className="shell">
        <SectionHead eyebrow="Publications" title="Selected publications." side="* Equal contribution. Please see Google Scholar for the latest record." />
        <div className="publication-list">
          {publications.map((paper, index) => (
            <article className="paper reveal" key={paper.title}>
              <div className="paper-count">0{index + 1}</div>
              <div className="paper-main"><p>{paper.venue} <span>· {paper.year}</span></p><h3>{paper.title}</h3><div className="authors">{paper.authors}</div>{paper.note && <div className="paper-note">{paper.note}</div>}</div>
              <ExternalLink href={paper.href} className="circle-link"><span className="sr-only">Open {paper.title}</span><Arrow /></ExternalLink>
            </article>
          ))}
        </div>
        <div className="publication-footer">
          <ExternalLink href="https://scholar.google.com/citations?user=Ec3gA-EAAAAJ&hl=en&oi=sra">Google Scholar</ExternalLink>
          <ExternalLink href="https://orcid.org/0000-0001-9038-1481">ORCID</ExternalLink>
        </div>
      </div>
    </section>
  )
}

function Experience() {
  const [filter, setFilter] = useState('all')
  const shown = filter === 'all' ? experience : experience.filter(item => item.type === filter)
  return (
    <section id="experience" className="section shell">
      <SectionHead eyebrow="Experience" title="Research and work experience." side="Use the filters to view research or industry roles separately." />
      <div className="filters" role="group" aria-label="Filter experience">
        {['all', 'research', 'work'].map(item => <button className={filter === item ? 'active' : ''} key={item} onClick={() => setFilter(item)}>{item}</button>)}
      </div>
      <div className="experience-list">
        {shown.map(item => (
          <article className="experience-row" key={`${item.org}-${item.role}`}>
            <time>{item.dates}</time>
            <div><h3>{item.role}</h3><p className="org">{item.org} <span>· {item.place}</span></p></div>
            <div className="experience-copy">
              {item.bullets ? <ul>{item.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul> : <p>{item.copy}</p>}
              <div className="tag-row">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Updates() {
  const [expanded, setExpanded] = useState(false)
  const shown = expanded ? news : news.slice(0, 5)
  return (
    <section id="notes" className="section notes-section">
      <div className="shell">
        <SectionHead eyebrow="Updates" title="Recent news." />
        <div className="news-list">
          {shown.map(([date, item], i) => <div className="news-item" key={`${date}-${i}`}><time>{date}</time><p>{item}</p></div>)}
        </div>
        <button className="button outline" onClick={() => setExpanded(!expanded)}>{expanded ? 'Show less' : `Show all ${news.length} updates`} <span>{expanded ? '↑' : '↓'}</span></button>
      </div>
    </section>
  )
}

function Recognition() {
  const leadership = [
    ['2024 — Present', 'Group Leader', 'GDG OnCampus NYCU · Agentic AI Research Group', 'Led weekly seminars on Agentic AI for undergraduate students, focusing on Context Retrieval, Theory of Mind (ToM), and Strategic Reasoning (e.g., Bayesian Inference in game-based evaluations like Mafia and Among Us).'],
    ['May 2026 — Present', 'Managing Supervisor', 'MUN Society Taiwan'],
    ['2021 — 2025', 'Director', 'MUN Society Taiwan'],
    ['2022, 2024', 'Head Teaching Assistant', 'Harvard Undergraduate Taiwan Leadership Conference'],
    ['2022 — 2024', 'Head Coach', 'NCKU Statistics Women’s Volleyball'],
    ['2024', 'Assistant Chair', 'Harvard WorldMUN'],
    ['2021 — 2022', 'Director of Research', 'NCKU Blockchain Club'],
    ['2020 — 2021', 'Founder & Campus Director', 'Hult Prize at NCKU'],
  ]
  return (
    <section className="section shell recognition">
      <div className="recognition-grid">
        <div><SectionHead eyebrow="Recognition" title="Awards and honors." />{awards.map(([year, award, place]) => <div className="award" key={award}><span>{year}</span><p><b>{award}</b><small>{place}</small></p></div>)}</div>
        <div><SectionHead eyebrow="Leadership & service" title="Leadership and service." />{leadership.map(([year, role, org, detail]) => <div className="award" key={`${role}-${org}`}><span>{year}</span><p><b>{role}</b><small>{org}</small>{detail && <span className="award-detail">{detail}</span>}</p></div>)}</div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="shell footer-main">
        <p className="eyebrow">Get in touch</p>
        <h3>I’m happy to chat about PhD applications,<br />research, or just to meet.</h3>
        <a className="footer-email" href="mailto:ejt82@cornell.edu">ejt82@cornell.edu <Arrow /></a>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Eng-Shen (James) Tu</span>
        <div><ExternalLink href="https://github.com/JamesTu-jtjt">GitHub</ExternalLink><ExternalLink href="https://www.linkedin.com/in/james-tu-ncku/">LinkedIn</ExternalLink><ExternalLink href="https://scholar.google.com/citations?user=Ec3gA-EAAAAJ&hl=en&oi=sra">Scholar</ExternalLink></div>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  )
}

function ModelUN() {
  return (
    <div className="mun-page">
      <header className="site-header"><a className="wordmark" href="/"><span className="wordmark-mark">JT</span><span>James Tu</span></a><a href="/" className="back-link">← Back home</a></header>
      <main>
        <section className="mun-hero shell"><p className="eyebrow">Beyond the terminal · 2017—Present</p><h1>Model United<br /><em>Nations.</em></h1><p>From delegate to chair, teacher, Director, and now Managing Supervisor at MUN Society Taiwan. MUN taught me to listen carefully, make complex ideas legible, and help a room do its best thinking together.</p></section>
        <section className="mun-bio">
          <div className="shell mun-bio-grid">
            <div><p className="eyebrow">Outside research</p><h2>Biography.</h2><p className="mun-bio-role">Managing Supervisor @ MUN Society Taiwan · May 2026 — Present<br />Ex-Director @ MUN Society Taiwan</p></div>
            <div className="mun-bio-copy">
              <p>With a deep passion for Model United Nations, which I actively pursue alongside my studies in Computer Science. My journey through MUN has been marked not only by participation but also by a commitment to fostering learning and growth among delegates. As a chair, my focus is always on creating an environment where delegates can maximize their learning potential.</p>
              <p>Although my current busy schedule does not provide me the luxury of keeping up with all the latest global events in detail as much as I&apos;d like to, I am still active in chairing conferences from time to time as well as helping out the MUN community by taking on teaching roles to help cultivate the next generation of MUNers in Taiwan. However, if you&apos;re looking for advice, chairing, or consulting, please note that since this is not among my priorities at the moment, I no longer contribute to such efforts for free.</p>
            </div>
          </div>
        </section>
        <section className="shell mun-body">
          <div className="mun-intro"><p className="eyebrow">2017 — 2024</p><h2>Conferences attended</h2></div>
          <div className="mun-years">{munYears.map(([year, items]) => <article key={year}><h3>{year}</h3><ul>{items.map(item => <li key={item}>{item}</li>)}</ul></article>)}</div>
        </section>
        <section className="mun-roles"><div className="shell"><SectionHead eyebrow="Other roles & contributions" title="Teaching the next room." /><div className="role-grid">
          {['Managing Supervisor · MUN Society Taiwan (May 2026–Present)','Former Director · MUN Society Taiwan','Instructor · National Tainan Junior College of Nursing (2023–2024)','Instructor · Tainan Chang Jung Senior High School (2019–2022)','Director of Academics · Phoenix MUN Club, NCKU','Founding Member & Head of Academics · FLYMUN','4th Head of Academics · Fudan High School MUN Club','Guest speaker at five high schools across Taiwan','Organizer and speaker for workshops on public speaking, drafting, and debate'].map((role, i) => <div key={role}><span>0{i + 1}</span><p>{role}</p></div>)}
        </div></div></section>
      </main>
      <Footer />
    </div>
  )
}

function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible')), { threshold: 0.08 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return <><Header /><Hero /><Education /><Updates /><Experience /><Publications /><Recognition /><Footer /></>
}

export default function App() {
  const isModelUN = new URLSearchParams(window.location.search).get('view') === 'model-un'
  return isModelUN ? <ModelUN /> : <Home />
}

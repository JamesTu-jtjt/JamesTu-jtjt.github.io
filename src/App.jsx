import { useEffect, useState } from 'react'
import { awards, experience, munYears, news, publications } from './data.js'
import profileImage from '../Profile.JPG'

const Arrow = () => <span aria-hidden="true">↗</span>

function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light')

  useEffect(() => {
    const system = window.matchMedia('(prefers-color-scheme: dark)')
    const syncPreference = () => {
      let saved
      try { saved = localStorage.getItem('james-tu-theme') } catch { /* Storage is optional. */ }
      setTheme(saved === 'light' || saved === 'dark' ? saved : system.matches ? 'dark' : 'light')
    }
    const syncStorage = (event) => {
      if (event.key === 'james-tu-theme' || event.key === null) syncPreference()
    }
    system.addEventListener('change', syncPreference)
    window.addEventListener('storage', syncStorage)
    return () => {
      system.removeEventListener('change', syncPreference)
      window.removeEventListener('storage', syncStorage)
    }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#101316' : '#f4f1e9'
  }, [theme])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    try { localStorage.setItem('james-tu-theme', next) } catch { /* Keep the toggle usable without storage. */ }
    setTheme(next)
  }
  return { theme, toggleTheme }
}

function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button className="theme-toggle" onClick={toggleTheme} aria-label="Dark theme" aria-pressed={theme === 'dark'} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
      <span className="theme-toggle-thumb" aria-hidden="true" />
      <svg className="sun-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="3.5" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></svg>
      <svg className="moon-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.5 13.1A8.5 8.5 0 0 1 10.9 3.5a8.5 8.5 0 1 0 9.6 9.6Z" /></svg>
    </button>
  )
}

function ExternalLink({ href, children, className = '' }) {
  return <a className={className} href={href} target="_blank" rel="noreferrer">{children} <Arrow /></a>
}

function useScrollMotion() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion || !('IntersectionObserver' in window)) return undefined

    const selector = [
      '.reveal',
      '.education-list article',
      '.news-item',
      '.experience-row',
      '.award',
      '.publication-footer',
      '.footer-main > *',
      '.mun-hero > *',
      '.mun-bio-grid > div',
      '.mun-years article',
      '.role-grid > div',
    ].join(',')
    const staggeredParents = '.education-list, .news-list, .experience-list, .publication-list, .recognition-grid > div, .footer-main, .mun-hero, .mun-years, .role-grid'
    const tracked = new WeakSet()
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0, rootMargin: '0px 0px -20px' })

    const register = (root) => {
      const elements = []
      if (root instanceof Element && root.matches(selector)) elements.push(root)
      if (root.querySelectorAll) elements.push(...root.querySelectorAll(selector))
      elements.forEach((element) => {
        if (tracked.has(element)) return
        tracked.add(element)
        element.classList.add('scroll-reveal')
        const parent = element.parentElement
        if (parent?.matches(staggeredParents)) {
          const index = [...parent.children].indexOf(element)
          element.style.setProperty('--reveal-delay', `${Math.min(index, 7) * 55}ms`)
        }
        observer.observe(element)
      })
    }

    register(document)
    document.documentElement.classList.add('motion-ready')
    const mutations = new MutationObserver((records) => records.forEach((record) => record.addedNodes.forEach(register)))
    mutations.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutations.disconnect()
      document.documentElement.classList.remove('motion-ready')
    }
  }, [])
}

function Header({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false)
  const links = [['education', 'Education'], ['notes', 'Updates'], ['experience', 'Experience'], ['publications', 'Publications']]

  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [])

  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="James Tu 杜霙笙, home">
        <span className="wordmark-mark">JT</span><span>James Tu 杜霙笙</span>
      </a>
      <nav id="site-nav" className={open ? 'nav-open' : ''} aria-label="Main navigation" onKeyDown={(event) => { if (event.key === 'Escape') setOpen(false) }}>
        {links.map(([href, label]) => <a key={href} href={`#${href}`} onClick={() => setOpen(false)}>{label}</a>)}
        <a href="https://www.linkedin.com/in/james-tu-ncku/" target="_blank" rel="noreferrer" className="nav-cta">Say hello <Arrow /></a>
      </nav>
      <div className="header-controls">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="site-nav">
          <span>{open ? 'Close' : 'Menu'}</span>
        </button>
      </div>
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
          <span>Agentic Workflow Design</span><b>✦</b><span>AI for Software Engineering</span><b>✦</b><span>Trustworthy AI</span><b>✦</b><span>LLM Reasoning &amp; Evaluation</span><b>✦</b><span>Human-AI Interaction</span><b>✦</b><span>Quality Assurance</span><b>✦</b>
          <span>Agentic Workflow Design</span><b>✦</b><span>AI for Software Engineering</span><b>✦</b><span>Trustworthy AI</span><b>✦</b><span>LLM Reasoning &amp; Evaluation</span><b>✦</b><span>Human-AI Interaction</span><b>✦</b><span>Quality Assurance</span><b>✦</b>
          <span>Agentic Workflow Design</span><b>✦</b><span>AI for Software Engineering</span><b>✦</b><span>Trustworthy AI</span><b>✦</b><span>LLM Reasoning &amp; Evaluation</span><b>✦</b><span>Human-AI Interaction</span><b>✦</b><span>Quality Assurance</span><b>✦</b>
        </div>
      </section>
      <section className="hero shell">
        <div className="hero-copy reveal">
          <h1><span className="hero-title-intro">About </span><em> James Tu </em></h1>
          <p className="hero-lede">My name is 杜霙笙, but most friends just call me James. I am currently a Computer Science PhD student at Cornell University working with Dr. <a href="https://www.cs.cornell.edu/~saikatd/" target="_blank" rel="noreferrer" style={{color: 'inherit', textDecoration: 'underline'}}>Saikat Dutta</a>. Previously, I was a Software Engineer at Appier, and I received my B.S. in Computer Science from National Cheng Kung University (NCKU).</p>
          <p className="hero-lede">I'm passionate about investigating reliable and trustworthy AI that bridges research and real-world impact in Software Engineering. With experience across academia and industry, I specialize in agentic workflow design, software quality assurance, and AI application reliability research. </p>
          <p className="hero-research"><strong>Research Interests:</strong> AI4SE, Quality Assurance for AI.</p>
          <div className="hero-actions">
            <a className="button primary" href="#publications">View publications <span>↓</span></a>
            <ExternalLink className="button text" href="https://scholar.google.com/citations?user=Ec3gA-EAAAAJ&hl=en&oi=sra">Google Scholar</ExternalLink>
          </div>
        </div>
        <div className="portrait-wrap reveal">
          <div className="portrait-orbit" aria-hidden="true"><span /></div>
          <span className="portrait-spark" aria-hidden="true">✦</span>
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
        <h3>Happy to meet and connect to chat about AI and research. <br />Feel free to email or DM me on LinkedIn! </h3>
        <a className="footer-email" href="mailto:james2@cs.cornell.edu">james2@cs.cornell.edu <Arrow /></a>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Eng-Shen (James) Tu</span>
        <div><ExternalLink href="https://github.com/JamesTu-jtjt">GitHub</ExternalLink><ExternalLink href="https://www.linkedin.com/in/james-tu-ncku/">LinkedIn</ExternalLink><ExternalLink href="https://scholar.google.com/citations?user=Ec3gA-EAAAAJ&hl=en&oi=sra">Scholar</ExternalLink></div>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  )
}

function ModelUN({ theme, toggleTheme }) {
  return (
    <div className="mun-page">
      <header className="site-header"><a className="wordmark" href="/"><span className="wordmark-mark">JT</span><span>James Tu</span></a><div className="header-controls"><a href="/" className="back-link">← Back home</a><ThemeToggle theme={theme} toggleTheme={toggleTheme} /></div></header>
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
        <section className="mun-roles"><div className="shell"><SectionHead eyebrow="Other roles & contributions" title="Teaching and Service." /><div className="role-grid">
          {['Managing Supervisor · MUN Society Taiwan (May 2026–Present)','Former Director · MUN Society Taiwan','Instructor · National Tainan Junior College of Nursing (2023–2024)','Instructor · Tainan Chang Jung Senior High School (2019–2022)','Director of Academics · Phoenix MUN Club, NCKU','Founding Member & Head of Academics · FLYMUN','4th Head of Academics · Fudan High School MUN Club','Guest speaker at five high schools across Taiwan','Organizer and speaker for workshops on public speaking, drafting, and debate'].map((role, i) => <div key={role}><span>0{i + 1}</span><p>{role}</p></div>)}
        </div></div></section>
      </main>
      <Footer />
    </div>
  )
}

function Home({ theme, toggleTheme }) {
  return <><Header theme={theme} toggleTheme={toggleTheme} /><Hero /><Education /><Updates /><Experience /><Publications /><Recognition /><Footer /></>
}

export default function App() {
  const { theme, toggleTheme } = useTheme()
  useScrollMotion()
  const isModelUN = new URLSearchParams(window.location.search).get('view') === 'model-un'
  return isModelUN ? <ModelUN theme={theme} toggleTheme={toggleTheme} /> : <Home theme={theme} toggleTheme={toggleTheme} />
}

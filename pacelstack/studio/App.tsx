import { useRef, useState, type KeyboardEvent } from 'react';
import logo from './assets/logo.svg';
import catIcon from '../../nyangnyangbox/assets/app-icon.webp';
import catGameplay from '../../nyangnyangbox/assets/gameplay.webp';
import catCharacters from '../../nyangnyangbox/assets/cats.webp';
import parcelIcon from '../assets/app-icon.webp';
import parcelGameplay from '../assets/gameplay.webp';
import bikeBanner from '../../stuntbiketour/assets/harbor-loading.png';

const email = 'binijuni.support@gmail.com';

function Spark({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M20 2v36M2 20h36M7 7l26 26M7 33L33 7" stroke="currentColor" strokeWidth="3" /></svg>;
}

function Plus() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" /></svg>;
}

function Brand({ light = false }: { light?: boolean }) {
  return <a className={`brand${light ? ' brand-light' : ''}`} href="#home" aria-label="BiniJuni Studio 홈"><img src={logo} width="44" height="44" alt="" /><span>BiniJuni<span className="brand-studio">STUDIO</span></span></a>;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape' && menuOpen) {
      setMenuOpen(false);
      menuButton.current?.focus();
    }
  }

  return <header className="site-header" onKeyDown={handleKeyDown}>
    <div className="header-inner shell">
      <Brand />
      <button className="menu-toggle" ref={menuButton} aria-expanded={menuOpen} aria-controls="primary-nav" onClick={() => setMenuOpen(!menuOpen)}>
        <span>{menuOpen ? '메뉴 닫기' : '메뉴 열기'}</span>
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">{menuOpen ? <path d="m6 6 12 12M6 18 18 6" /> : <path d="M4 8h16M4 16h16" />}</svg>
      </button>
      <nav id="primary-nav" className={`primary-nav${menuOpen ? ' is-open' : ''}`} aria-label="주 메뉴">
        <a href="#games" onClick={() => setMenuOpen(false)}>우리의 게임</a>
        <a href="#studio" onClick={() => setMenuOpen(false)}>스튜디오 소개</a>
        <a href="#contact" className="nav-contact" onClick={() => setMenuOpen(false)}>이야기 나누기 <span aria-hidden="true">+</span></a>
      </nav>
    </div>
  </header>;
}

function Hero() {
  return <section className="hero shell" aria-labelledby="hero-title">
    <div className="hero-copy">
      <p className="eyebrow"><span className="eyebrow-line" /> AN INDEPENDENT GAME STUDIO</p>
      <h1 id="hero-title">작은 순간에,<br /><span>새로운 즐거움.</span></h1>
      <p className="hero-description">무심코 시작한 한 판이 기분 좋은 하루가 되도록.<br className="desktop-break" /> 일상 가까이, 오래 머무는 재미를 만듭니다.</p>
      <div className="hero-actions"><a className="button button-dark" href="#games">게임 둘러보기 <Plus /></a><a className="quiet-link" href="#studio">비니주니를 소개합니다</a></div>
      <div className="hero-caption"><span className="caption-line" /><p>Small moments.<br /><strong>Big delight.</strong></p></div>
    </div>
    <div className="hero-visual">
      <div className="visual-orbit" aria-hidden="true" />
      <span className="visual-side-label" aria-hidden="true">A LITTLE PLAY, EVERY DAY</span>
      <div className="phone phone-parcel"><div className="phone-screen"><img src={parcelGameplay} width="440" height="852" alt="차곡차곡 택배의 트럭에 상자를 싣는 실제 게임 화면" fetchPriority="high" /></div></div>
      <div className="phone phone-cat"><div className="phone-screen"><img src={catGameplay} width="1320" height="2868" alt="냥냥 박스에서 귀여운 고양이를 합치는 실제 게임 화면" fetchPriority="high" /></div></div>
      <div className="floating-character" aria-hidden="true" style={{ backgroundImage: `url(${catCharacters})` }} />
      <div className="visual-sticker" aria-hidden="true"><Spark /><span>Made for<br />your little break.</span></div>
      <p className="visual-bottom-note"><span aria-hidden="true">✦</span> 평범한 하루에, 작은 플레이 하나.</p>
    </div>
  </section>;
}

function GameShowcase() {
  return <section id="games" className="games section-space shell" aria-labelledby="games-title">
    <div className="section-heading"><div><p className="eyebrow">OUR LITTLE WORLDS</p><h2 id="games-title">당신의 다음 <span>좋아하는 게임.</span></h2></div><p className="section-intro">포근한 퍼즐부터 짜릿한 도전까지.<br />저마다의 즐거움을 담은 세계를 만나보세요.</p></div>
    <article className="featured-game">
      <div className="featured-copy"><div className="game-kicker"><img src={catIcon} width="48" height="48" alt="" /><span>NYANG NYANG BOX</span></div><span className="genre">고양이 합치기 퍼즐</span><h3>귀여움은 더하고,<br />걱정은 잠시 내려놓고.</h3><p>톡, 떨어뜨리면 시작되는 고양이 한 상자.<br />같은 냥이를 합치고, 새로운 친구를 만나세요.</p><a className="button button-dark" href="/nyangnyangbox/">냥냥 박스 만나보기 <Plus /></a><a className="store-link" href="https://apps.apple.com/app/id6833966509">App Store에서 다운로드</a></div>
      <a className="featured-art" href="/nyangnyangbox/" aria-label="냥냥 박스 게임 소개 보기"><div className="featured-art-circle" /><img className="featured-icon" src={catIcon} width="1254" height="1254" loading="lazy" alt="작은 상자에 옹기종기 모여 웃고 있는 세 마리 고양이" /><span className="art-script" aria-hidden="true">A box full of happy.</span><span className="art-plus" aria-hidden="true"><Plus /></span></a>
    </article>
    <div className="more-games">
      <article className="secondary-game parcel-game"><a className="secondary-art parcel-art" href="/pacelstack/" aria-label="차곡차곡 택배 게임 소개 보기"><img src={parcelIcon} width="1024" height="1024" loading="lazy" alt="퍼즐 상자를 가득 실은 라일락색 택배 트럭" /><span className="image-label">차곡차곡, 딱 맞는 즐거움.</span><span className="art-plus" aria-hidden="true"><Plus /></span></a><div className="game-info"><div><p className="eyebrow">PARCEL STACK</p><h3><a href="/pacelstack/">차곡차곡 택배</a></h3></div><span className="genre">패킹 퍼즐</span></div><p className="game-description">돌리고, 맞추고, 배송 순서까지. 작은 트럭에 담긴 알찬 퍼즐.</p></article>
      <article className="secondary-game bike-game"><a className="secondary-art bike-art" href="/stuntbiketour/" aria-label="Stunt Bike Tour 게임 소개 보기"><img src={bikeBanner} width="1672" height="941" loading="lazy" alt="석양의 항구에서 앞바퀴를 들고 달리는 라이더와 Stunt Bike Tour 타이틀이 담긴 공식 게임 배너" /><span className="image-label">Find your balance.</span><span className="art-plus" aria-hidden="true"><Plus /></span></a><div className="game-info"><div><p className="eyebrow">STUNT BIKE TOUR</p><h3><a href="/stuntbiketour/">Stunt Bike Tour</a></h3></div><span className="genre">3D 트라이얼 바이크</span></div><p className="game-description">균형을 잡고, 한계를 넘어. 손끝으로 완성하는 나만의 라이딩.</p></article>
    </div>
  </section>;
}

function Studio() {
  return <section id="studio" className="studio" aria-labelledby="studio-title"><div className="shell studio-layout">
    <div className="studio-identity" aria-hidden="true"><span className="identity-label">PLAYFUL BY NATURE.</span><img src={logo} width="230" height="230" loading="lazy" alt="" /><p>BiniJuni<span>Small studio. Thoughtful play.</span></p><Spark className="identity-spark" /></div>
    <div className="studio-copy"><p className="eyebrow">THE PEOPLE BEHIND THE PLAY</p><h2 id="studio-title">우리가 만드는 건 게임,<br />전하고 싶은 건 <span>좋은 기분.</span></h2><p>복잡한 설명 대신, 한 번의 터치로 시작하는 재미.<br />화려한 약속 대신, 다시 만나고 싶은 작은 디테일.</p><p>비니주니 스튜디오는 누구나 편하게 머물 수 있는<br className="desktop-break" /> 게임을 생각합니다. 바쁜 하루의 틈 사이에<br className="desktop-break" /> 자연스럽게 스며드는 즐거움을 만들고 싶습니다.</p><div className="studio-values"><span><Plus /> 쉽게 시작하고</span><span><Plus /> 즐겁게 머물고</span><span><Plus /> 다시 떠오르는</span></div></div>
  </div></section>;
}

function Contact() {
  return <section id="contact" className="contact shell section-space" aria-labelledby="contact-title"><div className="contact-box"><div><p className="eyebrow">GOOD THINGS START WITH A HELLO</p><h2 id="contact-title">다음 즐거움은,<br />우리의 대화에서.</h2><p>게임에 대한 이야기, 새로운 아이디어, 협업 제안까지.<br />당신의 이야기를 기다립니다.</p><a className="email-link" href={`mailto:${email}`}>{email}<span aria-hidden="true">+</span></a></div><div className="contact-graphic" aria-hidden="true"><div className="hello-circle"><Spark /><span>Say hello.</span></div><span className="contact-caption">LET'S MAKE SOMETHING GOOD.</span></div></div></section>;
}

function Footer() {
  return <footer className="site-footer"><div className="shell"><div className="footer-top"><div className="footer-identity"><Brand light /><p>작은 순간에, 새로운 즐거움.</p><a href={`mailto:${email}`}>{email}</a></div><div className="footer-links"><div><h2>EXPLORE</h2><a href="#games">우리의 게임</a><a href="#studio">스튜디오 소개</a><a href="#contact">문의하기</a></div><div><h2>GAME SUPPORT</h2><a href="/nyangnyangbox/support/">냥냥 박스 고객지원</a><a href="/pacelstack/support/">차곡차곡 택배 고객지원</a><a href="/stuntbiketour/support/">Stunt Bike Tour 고객지원</a></div><div><h2>PRIVACY</h2><a href="/nyangnyangbox/privacy/">냥냥 박스 개인정보처리방침</a><a href="/pacelstack/privacy/">차곡차곡 택배 개인정보처리방침</a><a href="/stuntbiketour/privacy/">Stunt Bike Tour 개인정보처리방침</a></div></div></div><div className="footer-bottom"><p>© {new Date().getFullYear()} BiniJuni Studio. All rights reserved.</p><p>Small moments. Big delight.</p></div></div></footer>;
}

export default function App() {
  return <><a className="skip-link" href="#main">본문으로 이동</a><div id="home" /><Header /><main id="main"><Hero /><div className="brand-strip"><div className="shell"><span>MADE WITH CARE.</span><Spark /><span>PLAYED WITH A SMILE.</span><Spark /><span>A LITTLE BINIJUNI.</span></div></div><GameShowcase /><Studio /><Contact /></main><Footer /></>;
}

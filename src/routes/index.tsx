import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowUpRight, ArrowRight, Instagram, MapPin, Menu, X, Flower2, Heart, Sparkles, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import hero from '@/assets/juliette-editorial.jpg';
import dress from '@/assets/juliette-dress.jpg';
import knit from '@/assets/juliette-knit.jpg';
import occasion from '@/assets/juliette-occasion.jpg';
import brand from '@/assets/juliette-brand.jpg.asset.json';

const instagram = 'https://www.instagram.com/julietteboutiqueshop/';
const maps = 'https://maps.app.goo.gl/cYU9vFyHzDDiwTCR6';
const collections = [
  { name: 'Vestidos', subtitle: 'Movimiento, luz y feminidad', image: dress, label: 'ESPÍRITU ROMÁNTICO' },
  { name: 'Esenciales', subtitle: 'Lo sencillo, extraordinario', image: knit, label: 'CADA DÍA, TÚ' },
  { name: 'Ocasiones especiales', subtitle: 'Para momentos que se quedan', image: occasion, label: 'ELEGANCIA NATURAL' },
];
export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Juliette Boutique | Moda femenina con personalidad' },
    { name: 'description', content: 'Descubre el universo Juliette Boutique: moda femenina, inspiración y pequeños detalles que hacen especial tu estilo. Visítanos y síguenos en Instagram.' },
    { property: 'og:title', content: 'Juliette Boutique | Moda femenina con personalidad' },
    { property: 'og:description', content: 'Un universo de moda femenina, elegancia natural y detalles que enamoran. Descubre Juliette Boutique.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});
function Wordmark() { return <a href="#" className="wordmark" aria-label="Juliette Boutique, inicio"><span>Juliette</span><small>B O U T I Q U E</small></a>; }
function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState('Todo');
  const visible = category === 'Todo' ? collections : collections.filter(item => item.name === category);
  return <>
    <div className="announcement"><Flower2 aria-hidden="true" /> Un pequeño universo de moda, pensado para ti <Flower2 aria-hidden="true" /></div>
    <header className="site-header">
      <div className="nav-inner">
        <nav className="nav-links" aria-label="Navegación principal"><a href="#coleccion">La colección</a><a href="#nosotras">Nuestra esencia</a></nav>
        <Button variant="ghost" size="icon" className="mobile-toggle" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
        <Wordmark />
        <div className="nav-right"><a href="#visitanos"><MapPin /> Visítanos</a><a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram de Juliette Boutique"><Instagram /></a></div>
      </div>
      {menuOpen && <nav className="mobile-nav" aria-label="Navegación móvil">{[['#coleccion','La colección'],['#nosotras','Nuestra esencia'],['#visitanos','Visítanos']].map(([href, label]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>}
    </header>
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <img className="hero-photo" src={hero} width={1920} height={1024} alt="Inspiración Juliette: blusa marfil y falda satinada rosa en una calle mediterránea" fetchPriority="high" />
        <div className="hero-content reveal"><p className="eyebrow">FEMENINA. NATURAL. INCONFUNDIBLE.</p><h1 id="hero-title">Juliette<br /><em>Boutique</em></h1><p className="hero-copy">Prendas que hablan de ti.<br />Detalles que marcan la diferencia.</p><Button asChild className="hero-action"><a href="#coleccion">Descubre la colección <ArrowUpRight /></a></Button></div>
        <div className="hero-bottom"><span /> TU ESTILO, TU ESENCIA</div><div className="hero-index">01 — JULIETTE</div>
      </section>
      <div className="values"><div><Heart /> Moda elegida con cariño</div><div><Sparkles /> Detalles que enamoran</div><div><Leaf /> Estilo con personalidad</div></div>
      <section id="coleccion" className="section">
        <div className="section-heading"><div><p className="eyebrow">EL UNIVERSO JULIETTE</p><h2>Encuentra tu próxima <em>favorita.</em></h2><p>Un poco de romanticismo. Mucho de ti.</p></div><a className="editorial-link" href={instagram} target="_blank" rel="noopener noreferrer">Novedades en Instagram <ArrowUpRight /></a></div>
        <div className="category-tabs" role="group" aria-label="Filtrar colección">{['Todo', ...collections.map(item => item.name)].map(tab => <Button key={tab} variant="ghost" className="category-tab" data-active={category === tab} aria-pressed={category === tab} onClick={() => setCategory(tab)}>{tab}</Button>)}</div>
        <div className={`collection-grid ${category !== 'Todo' ? 'filtered' : ''}`}>{visible.map(item => <a className="collection-item" key={item.name} href={instagram} target="_blank" rel="noopener noreferrer" aria-label={`Descubrir ${item.name} en Instagram`}><div className="collection-image"><img src={item.image} alt={`Inspiración de moda: ${item.name.toLowerCase()}`} width={512} height={1024} loading="lazy" /><span className="image-label">{item.label}</span></div><div className="collection-caption"><div><h3>{item.name}</h3><p>{item.subtitle}</p></div><ArrowUpRight /></div></a>)}</div>
      </section>
      <section id="nosotras" className="story"><img className="story-image" src={brand.url} alt="Etiquetas de Juliette Boutique sobre una prenda floral con flores y detalles de costura" width={1044} height={565} loading="lazy" /><div className="story-content"><Flower2 aria-hidden="true" /><span className="eyebrow">NUESTRA ESENCIA</span><h2>La belleza está en<br /><em>los pequeños detalles.</em></h2><p>Creemos en una feminidad libre, natural y muy tuya. En esas prendas que te hacen sentir bien y en los detalles que convierten un look en algo especial.</p><a href={instagram} target="_blank" rel="noopener noreferrer" className="editorial-link">Conoce nuestro universo <ArrowRight /></a></div></section>
      <section className="section"><div className="social-heading"><span className="eyebrow">UN POCO MÁS CERCA</span><h2>Un diario de <em>inspiración.</em></h2><p><a href={instagram} target="_blank" rel="noopener noreferrer">@julietteboutiqueshop <ArrowUpRight className="inline size-3" /></a></p></div><div className="social-images">{[{src:knit,alt:'Texturas suaves y tonos naturales'},{src:brand.url,alt:'Los detalles de Juliette Boutique'},{src:dress,alt:'Inspiración romántica en rosa'},{src:hero,alt:'Estilo femenino mediterráneo'}].map((image,i) => <a key={i} href={instagram} target="_blank" rel="noopener noreferrer" aria-label={`Ver Juliette en Instagram: ${image.alt}`}><img src={image.src} alt={image.alt} width={400} height={400} loading="lazy" /><Instagram /></a>)}</div></section>
      <section id="visitanos" className="visit"><div><span className="eyebrow">NOS ENCANTARÁ VERTE</span><h2>Tu próxima historia empieza <em>aquí.</em></h2><p>Ven a descubrir Juliette Boutique. Encuentra eso que es tan tú.</p></div><Button asChild variant="outline" className="visit-action"><a href={maps} target="_blank" rel="noopener noreferrer"><MapPin /> Cómo llegar <ArrowUpRight /></a></Button></section>
    </main>
    <footer className="footer"><div className="footer-top"><Wordmark /><nav className="footer-links" aria-label="Navegación al pie"><a href="#coleccion">La colección</a><a href="#nosotras">Nuestra esencia</a><a href={maps} target="_blank" rel="noopener noreferrer">Visítanos</a><a href={instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a></nav></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Juliette Boutique</span><span>Con cariño, para ti.</span></div></footer>
  </>;
}

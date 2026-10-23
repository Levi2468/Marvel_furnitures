import { Link } from 'react-router-dom';
import './css/aboutus.css';

function AboutUs(){
    const sections=[
        {title:'Our Crafting Materials',text:'To perfectly complement our signature stone, our furniture collections utilize premium hardwoods like solid oak, walnut, and teak. Each piece of wood is selected for its rich grain patterns and structural integrity.',image:'aboutusmaterial.jpeg'},
        {title:'Master Craftsmanship & Design',text:'Every piece in the Hype Marble collection is a study in precision, balance, and artistic intent. Our design process begins by studying the raw, organic variations of our materials.',image:'aboutusdesign.jpeg',reverse:true},
        {title:'Global Distribution & Retail Partners',text:'The Hype Marble collection is accessible through a curated network of design partners, furniture showrooms, and interior design firms. We collaborate with partners who share our passion for luxury aesthetics and exceptional customer service.',image:'aboutusdist.jpeg'},
        {title:'White-Glove Customer Care',text:'Our commitment to exceptional design is matched by our dedication to a seamless customer experience. Our team guides you through every step of your journey, from choosing a piece to arranging delivery.',image:'aboutusservice.jpeg',reverse:true}
    ];
    const images=import.meta.glob('./assets/*',{eager:true,import:'default'});
    const getImage=(name)=>images[`./assets/${name}`];
    return(
        <div className="about-page">
            <header className="about-header">
                <div>
                    <h1>About Our <span>Brand</span></h1>
                    <p>Hype Marble merges raw urban energy with natural luxury, crafting bold statement pieces.</p>
                </div>
            </header>
            <main className="about-overview">
                <h2>Overview</h2>
                <p>Hype Marble is a modern design brand that creates bold, high-quality home decor and lifestyle pieces featuring unique stone aesthetics. We blend timeless natural materials with fresh, contemporary styles to elevate everyday living spaces. Our collection brings modern luxury, refined craftsmanship, and distinct character into every home.</p>
            </main>
            <section className="about-sections">
                {sections.map((section)=>
                    <div className={`about-card ${section.reverse?'reverse':''}`} key={section.title}>
                        <div>
                            <h2>{section.title}</h2>
                            <p>{section.text}</p>
                        </div>
                        <img src={getImage(section.image)} alt={section.title}/>
                    </div>
                )}
            </section>
            <aside className="about-offer">
                <div><img src={getImage('offer.jpeg')} alt="Special furniture offer"/></div>
                <div className="about-offer-text">
                    <h2>✨ ELEVATE YOUR SPACE TODAY</h2>
                    <p>Experience the luxury of Hype Marble in your home.</p>
                    <h3>🔥 50% OFF FOR NEW CUSTOMERS</h3>
                    <p>Get half off your first premium decor piece or consultation.</p>
                    <Link to="/contact">Contact Us</Link>
                </div>
            </aside>
        </div>
    );
}
export default AboutUs;

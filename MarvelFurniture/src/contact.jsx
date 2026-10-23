import { useState } from 'react';
import './css/contact.css';

function Contact(){
    const [formData,setFormData]=useState({FirstName:'',LastName:'',Email:'',PhoneNumber:'',help:'',terms:false});
    const [sent,setSent]=useState(false);
    const updateForm=(event)=>{
        const {name,value,type,checked}=event.target;
        setFormData((previous)=>({...previous,[name]:type==='checkbox'?checked:value}));
    };
    const sendMessage=(event)=>{
        event.preventDefault();
        setSent(true);
    };
    const images=import.meta.glob('./assets/*',{eager:true,import:'default'});
    const mapImage=images['./assets/Google Maps.jpeg'];
    return(
        <div className="contact-page">
            <header className="contact-header">
                <div className="contact-company">
                    <h1>Contact us and get your deal of choice</h1>
                    <p><em>Get the information to start decorating your home with us. Hype Marble makes it easier to create the space you love. Find answers to your questions or get specific help.</em></p>
                    <div className="contact-info">
                        <span className="contact-phone">☎</span>
                        <h3>Call Us</h3>
                        <p>+91 87839 78362</p>
                    </div>
                </div>
                <div className="contact-message">
                    <form onSubmit={sendMessage}>
                        <h2>Send Us A Message</h2>
                        <div className="contact-name">
                            <div><label htmlFor="FirstName">First name</label><input id="FirstName" name="FirstName" value={formData.FirstName} onChange={updateForm} placeholder="Your First Name" required/></div>
                            <div><label htmlFor="LastName">Last name</label><input id="LastName" name="LastName" value={formData.LastName} onChange={updateForm} placeholder="Your Last Name" required/></div>
                        </div>
                        <label htmlFor="Email">Email</label>
                        <input id="Email" name="Email" type="email" value={formData.Email} onChange={updateForm} placeholder="Examplemailid@gmail.com" required/>
                        <label htmlFor="PhoneNumber">Phone Number</label>
                        <input id="PhoneNumber" name="PhoneNumber" type="tel" value={formData.PhoneNumber} onChange={updateForm} placeholder="+91 00000 00000"/>
                        <label htmlFor="help">How can we help you?</label>
                        <textarea id="help" name="help" value={formData.help} onChange={updateForm} placeholder="Your message" required/>
                        <div className="contact-agreement">
                            <input type="checkbox" id="terms" name="terms" checked={formData.terms} onChange={updateForm} required/>
                            <label htmlFor="terms">I acknowledge the privacy policy of Hype Marble</label>
                        </div>
                        <button type="submit">Send</button>
                        {sent && <p className="contact-success">Thank you, {formData.FirstName}! Your message is ready. Message delivery needs a backend connection.</p>}
                    </form>
                </div>
            </header>
            <section className="contact-location">
                <h2>Map Location</h2>
                <div className="contact-map"><img src={mapImage} alt="Map location"/></div>
                <p>Love our online collection? Come experience it in person. Visit our store to feel the quality of our products, enjoy personalized assistance, and find furniture for your home.</p>
            </section>
        </div>
    );
}
export default Contact;

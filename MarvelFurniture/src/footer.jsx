import logo from './assets/company-logo.png';
import "./css/footer.css"
function Footer(){
    return(
 <footer>
        <div className='content'> 
        <img className='foot-logo' src={logo} alt="logo"/>
        <p>Hype Marbles crafts luxury stone furniture, blending
            bold modern design with timeless marble and natural stone
            bold modern design with timeless marble and natural stone.
        </p>
        </div>
    
     <div className='content lists' >
        <h4>QUICK LINKS</h4>
        <ul>
        <li><a href="#">SOFA</a></li>
        <li><a href="#" >BEDS</a></li>
        <li><a href="#" >TABLES</a></li>
        <li><a href="#" >DRESSERS</a></li>
        <li><a href="#" >CHAIRS</a></li>
        <li><a href="#" >BENCH</a></li>
        <li><a href="#" >SHELVING</a></li>
        </ul>
    </div>
    
    <div className='content'>
        <h4>TERMS & POLICIES</h4>
        <ul>
        <li><a href="#" >TERMS & CONDITIONS</a></li>
        <li><a href="#" >REFUND POLICY</a></li>
        <li><a href="#" >PRIVACY POLICY</a></li>
        <li><a href="#" >RESCHEDULING POLICY</a></li>
        </ul>
    </div>
    <div className='content'>
        <h4>CONTACT US</h4>
        <ul>
            <li>+91 86988  67679</li>
            <li>+91 84763 48345</li>
        </ul>
        <div>
            <h4>LOCATION</h4>
            Flat No. 402, Sunshine Apartments, 
            4th Cross Street, Anna Nagar,
            Chennai, Tamil Nadu, 
            600040, India.
        </div>
        </div>
    
</footer>

    );
}
export default Footer
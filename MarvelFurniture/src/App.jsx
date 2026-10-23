import { lazy } from 'react';
import './css/App.css'
import {Route,Routes,BrowserRouter, NavLink} from 'react-router-dom'
const Navbar=lazy(()=>import('./navbar'))
const Footer=lazy(()=>import('./footer'))
const Home=lazy(()=>import('./Home') )
const Catalog=lazy(()=>import('./catalog'))
const Topselling=lazy(()=>import('./topselling'))
const AboutUs=lazy(()=>import('./aboutus'))
const Contact=lazy(()=>import('./contact') )
const Cart=lazy(()=>import('./cart'))
function App(){
  return (
  <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/cart' element={<Cart/>}/>
    <Route path='/catalog' element={<Catalog/>}/>
    <Route path='/topselling' element={<Topselling/>}/>
    <Route path='/aboutus' element={<AboutUs/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route/>
  </Routes>
    <Footer/>
  </BrowserRouter>
  );
}
export default App


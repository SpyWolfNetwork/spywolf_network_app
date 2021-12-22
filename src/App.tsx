import './App.scss';
import './AppOverride.scss';
import './antd-override/ant-override.scss';
import Root from './core/routes/root-routing';
import { Breadcrumb, Button } from 'antd';
import { CCollapse, CContainer, CNavbar, CNavbarBrand, CNavbarNav, CNavbarToggler, CNavItem, CNavLink } from '@coreui/react';

import { FaMedium, FaTelegram, FaTwitter } from 'react-icons/fa';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { HashRouter, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';



function App() {
  const [navbarOpen, setNavbarOpen] = useState<boolean>();
  const [windowScroller, setWindowScroller] = useState<boolean>();
  let navbarRef: HTMLDivElement | null;
  useEffect(() => {
    if (window.scrollY > 0) {
      setWindowScroller(true);
    }
    document.addEventListener('scroll', (e) => {
      if (window.scrollY > 0) {
        setWindowScroller(true);
        console.log('set true')
      } else {
        setWindowScroller(false);
        console.log('set false')

      }
    })
  }
    , [])

  return (
    <HashRouter>
      <div className="App">
        <CNavbar className={`${ windowScroller ? 'sticky' : ''}`} ref={e => navbarRef = e} expand="lg" colorScheme="light" >
          <CContainer fluid>
          <Button  type="text" className=' d-lg-none btn btn-icon btn-active-color-primary w-30px h-30px ms-n2 me-3' icon={
            <span className="svg-icon svg-icon-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
               <path d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z" fill="black"></path>
               <path opacity="0.3" d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z" fill="black"></path>
            </svg>
         </span>
          } onClick={() => { setNavbarOpen(!navbarOpen) }} />
            <CNavbarBrand href="#">
              <a href="/#/">
                <img alt="Logo" src="https://spywolf.co/demo/network/assets/media/logos/SpyWolf_Network_Logo.svg" className="h-20px h-lg-40px" />
              </a>
            </CNavbarBrand>

            <CCollapse className="navbar-collapse" visible={navbarOpen}>
              <CNavbarNav>
                <CNavItem>
                  <CNavLink className="menu-item menu-lg-down-accordion me-lg-1 menu-link py-3 menu-title" href="#" active>
                    Get Audited
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink href="#">Learn</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink target='__blank' href="https://pancakeswap.finance/swap?outputCurrency=0xc2d0f6b7513994a1ba86cef3aac181a371a4ca0c">
                    Buy $SPY
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink href="#">
                    About
                  </CNavLink>
                </CNavItem>
                <CNavItem className="social">
                  <CNavLink href="https://twitter.com/SpyWolfNetwork" target='__blank'>
                    <FaTwitter color={'#a1a5b7'} fontSize={20} />
                  </CNavLink>
                </CNavItem>
                <CNavItem className="social">
                  <CNavLink href="https://t.me/SpyWolfNetwork" target='__blank'>
                    <FaTelegram color={'#a1a5b7'} fontSize={20} />
                  </CNavLink>
                </CNavItem>
                <CNavItem className="social">
                  <CNavLink href="https://spywolf.medium.com/" target='__blank'>
                    <FaMedium color={'#a1a5b7'} fontSize={20} />
                  </CNavLink>
                </CNavItem>
              </CNavbarNav>
            </CCollapse>
          </CContainer>
        </CNavbar>
        <div className="breadcumb-navigation" style={{ width: '100%', maxWidth: '1264px', padding: '16px' }}>

        </div>
        <Root />
        <div className="footer py-4 d-flex flex-lg-column" id="kt_footer">
          <div className="container-xxl d-flex flex-column flex-md-row align-items-center justify-content-between">
            <div className="text-dark order-2 order-md-1">
              <span className="text-muted fw-bold me-1">© 2021</span>
              <a href="https://spywolf.co" target="_blank" className="text-gray-800 text-hover-primary">SpyWolf</a>
            </div>
            <ul className="menu menu-gray-600 menu-hover-primary fw-bold order-1">
              <li className="menu-item">
                <a href="#" target="_blank" className="menu-link px-2">About</a>
              </li>
              <li className="menu-item">
                <a href="#" target="_blank" className="menu-link px-2">Disclaimer</a>
              </li>
              <li className="menu-item">
                <a href="#" target="_blank" className="menu-link px-2">Terms and Conditions</a>
              </li>
              <li className="menu-item">
                <a href="#" target="_blank" className="menu-link px-2">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;

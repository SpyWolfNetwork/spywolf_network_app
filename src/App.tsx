import './App.scss';
import './AppOverride.scss';
import './antd-override/ant-override.scss';
import Root from './core/routes/root-routing';
import { Badge, Breadcrumb, Button, Input, Popover } from 'antd';
import { CCollapse, CContainer, CNavbar, CNavbarBrand, CNavbarNav, CNavbarToggler, CNavItem, CNavLink } from '@coreui/react';

import { FaMedium, FaTelegram, FaTwitter } from 'react-icons/fa';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { HashRouter, useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import Modal from 'antd/lib/modal/Modal';
import SubmissionHeader from './modules/components/submission-header/submission-header';
import SubmissionContent from './modules/components/submisson-content/submission-content';
import axios from 'axios';
import { ApplicationContext } from './core/routes/providers/application.provider';
import SearchAdressInput from './modules/components/search-address/search-address';
import moment from 'moment';



function App() {
  const [navbarOpen, setNavbarOpen] = useState<boolean>();
  const [windowScroller, setWindowScroller] = useState<boolean>();

  const { ctxDisabled, ctxModal } = useContext(ApplicationContext) as any;

  const [visibleModal, setVisibleModal] = ctxModal;
  const [buttonDisabled, setButtonDisabled] = ctxDisabled;

  let navbarRef: HTMLDivElement | null;


  useEffect(() => {
    if (window.scrollY > 0) {
      setWindowScroller(true);
    }
    document.addEventListener('scroll', (e) => {
      if (window.scrollY > 0) {
        setWindowScroller(true);
      } else {
        setWindowScroller(false);

      }
    })
  }
    , [])

  const [sendSubmit, setSendSubmit] = useState<boolean>();
  const submit = () => {
    setSendSubmit(true)
    setTimeout(() => {
      setSendSubmit(false)
    }, 300)

  }

  return (
    <HashRouter>
      <div className="App">
        <CNavbar className={`${windowScroller ? 'sticky' : ''}`} ref={e => navbarRef = e} expand="lg" colorScheme="light" >
          <CContainer fluid>
            <Button type="text" id="toggler" className='hamburger-toggle d-lg-none btn btn-icon btn-active-color-primary w-30px h-30px ms-n2 me-3' icon={
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
            <SearchAdressInput></SearchAdressInput>
            <CCollapse className="navbar-collapse" visible={navbarOpen}>
              <CNavbarNav>
                <Popover  content={'get up to 10% rewards on your next $SPY purchase'} >
                  <Badge count="NEW" offset={[-15, 7]}  style={{ fontSize: '10px' }} status='success'>
                    <CNavItem>
                      <CNavLink style={{fontSize: '13px'}} className="menu-item menu-lg-down-accordion me-lg-1 menu-link py-3 menu-title" href="/#/charity" active>
                        Got Scammed?
                      </CNavLink>
                    </CNavItem>
                  </Badge>
                </Popover>
                <CNavItem>
                  <CNavLink className="menu-item menu-lg-down-accordion me-lg-1 menu-link py-3 menu-title" href="https://spywolf.co/" target="_blank" active>
                    Get Audited
                  </CNavLink>
                </CNavItem>

                <CNavItem>
                  <CNavLink target='__blank' href="https://pancakeswap.finance/swap?outputCurrency=0xc2d0f6b7513994a1ba86cef3aac181a371a4ca0c">
                    Buy $SPY
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink href="/#/frequently-asked-questions">
                    FAQ
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

                <Button onClick={() => setVisibleModal(true)} className="submitButton" type="primary" size='large' style={{ color: '#152B36 !important', fontSize: '14px', fontWeight: '500' }} >Submit</Button>
              </CNavbarNav>
            </CCollapse>
          </CContainer>
        </CNavbar>
        <div className="breadcumb-navigation" style={{ width: '100%', maxWidth: '1264px', padding: '10px' }}>

        </div>
        <Root />
        <div className="footer py-4 d-flex flex-lg-column" id="kt_footer">
          <div className="container-xxl d-flex flex-column flex-md-row align-items-center justify-content-between">
            <div className="text-dark order-2 order-md-1">
              <span className="text-muted fw-bold me-1">© {moment().year()}</span>
              <a href="https://spywolf.co" target="_blank" className="text-gray-800 text-hover-primary">SpyWolf</a>
            </div>
            <ul className="menu menu-gray-600 menu-hover-primary fw-bold order-1">

              <li className="menu-item">
                <Link to="disclaimer">
                  <a className="menu-link px-2">Disclaimer</a>
                </Link>
              </li>
              <li className="menu-item">
                <a href="mailto:audit@spywolf.co" target="_blank" className="menu-link px-2">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Modal
        title={
          <SubmissionHeader></SubmissionHeader>
        }
        visible={visibleModal}
        width={'100%'}
        centered={true}
        style={{ width: '100%', maxWidth: '650px', margin: 0 }}
        okText="Submit"
        onOk={
          submit
        }
        destroyOnClose={true}
        onCancel={
          () => setVisibleModal(false)
        }
        closable={true}
        okButtonProps={{
          disabled: buttonDisabled
        }}
      >
        <SubmissionContent submitProp={sendSubmit}></SubmissionContent>
      </Modal>


    </HashRouter>
  );
}

export default App;

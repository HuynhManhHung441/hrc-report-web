import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faDeleteLeft, faUserCircle, faCircleDot } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const handleMenuClick = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <>
      <header className="navbar">
        <div
          className="navbar-logo-report"
          onMouseEnter={() => setShowSidebar(true)}
          style={{ userSelect: 'none' }}
        >
          <div className="navbar-title">
            <span className='navbar__report-name'>HRC REPORT</span> 
            <FontAwesomeIcon icon={faCircleDot} />
          </div>
        </div>
        <nav className="navbar-links">
          <Link to="/ccm">CCM</Link>
          <Link to="/rhf">RHF</Link>
          <Link to="/hsm">HSM</Link>
        </nav>
        <div className="sign-in">
          <FontAwesomeIcon icon={faUserCircle} />
          <span>Sign In</span>
        </div>
      </header>

      {showSidebar && (
        <div className="sidebar-overlay">
          <aside className="sidebar-menu">
            <div className="sidebar-close-btn" onClick={() => setShowSidebar(false)}>
              <FontAwesomeIcon icon={faDeleteLeft} />
            </div>
            <ul className="sidebar-menu-list">
              {/* CCM */}
              <li className="sidebar-menu-item">
                <div
                  className="sidebar-menu-label"
                  onClick={() => handleMenuClick('ccm')}
                  style={{ cursor: 'pointer' }}
                >
                  <span>CCM</span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`sidebar-down-icon${openMenu === 'ccm' ? ' rotated' : ''}`}
                  />
                </div>
                {openMenu === 'ccm' && (
                  <ul className="sidebar-submenu inline-submenu">
                    <li><Link to="/ccm/heat-report">Heat Report</Link></li>
                    <li><Link to="/ccm/shift-report">Shift Report</Link></li>
                    <li><Link to="/ccm/quality-report">Quality Report</Link></li>
                  </ul>
                )}
              </li>
              {/* RHF */}
              <li className="sidebar-menu-item">
                <div
                  className="sidebar-menu-label"
                  onClick={() => handleMenuClick('rhf')}
                  style={{ cursor: 'pointer' }}
                >
                  <span>RHF</span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`sidebar-down-icon${openMenu === 'rhf' ? ' rotated' : ''}`}
                  />
                </div>
                {openMenu === 'rhf' && (
                  <ul className="sidebar-submenu inline-submenu">
                    <li><Link to="/rhf/slab-discharged-report">Slab Discharged</Link></li>
                  </ul>
                )}
              </li>
              {/* HSM */}
              <li className="sidebar-menu-item">
                <div
                  className="sidebar-menu-label"
                  onClick={() => handleMenuClick('hsm')}
                  style={{ cursor: 'pointer' }}
                >
                  <span>HSM</span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`sidebar-down-icon${openMenu === 'hsm' ? ' rotated' : ''}`}
                  />
                </div>
                {openMenu === 'hsm' && (
                  <ul className="sidebar-submenu inline-submenu">
                    <li><Link to="/hsm/production-coil-report">Production Coil</Link></li>
                  </ul>
                )}
              </li>
            </ul>
          </aside>
        </div>
      )}
    </>
  );
}

export default Header;
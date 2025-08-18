import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  // Đóng sidebar khi click ngoài vùng sidebar
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('sidebar-overlay')) {
      setShowSidebar(false);
      setOpenMenu(null);
    }
  };

  // Toggle menu cấp 2
  const handleMenuClick = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <>
      <header className="navbar">
        <div
          className="navbar-logo-report"
          onMouseEnter={() => setShowSidebar(true)}
          onMouseLeave={() => setShowSidebar(false)}
        >
          <span className="navbar-title">HRC REPORT</span>
        </div>
        <nav className="navbar-links">
          <Link to="/ccm">CCM</Link>
          <Link to="/rhf">RHF</Link>
          <Link to="/hsm">HSM</Link>
        </nav>
      </header>

      {/* Sidebar menu */}
      {showSidebar && (
        <div className="sidebar-overlay" onClick={handleOverlayClick}>
          <aside
            className="sidebar-menu"
            onMouseEnter={() => setShowSidebar(true)}
            onMouseLeave={() => setShowSidebar(false)}
          >
            <ul className="sidebar-menu-list">
              {/* CCM */}
              <li className="sidebar-menu-item">
                <div
                  className="sidebar-menu-label"
                  onClick={() => handleMenuClick('ccm')}
                  style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                >
                  <span>CCM</span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`sidebar-down-icon${openMenu === 'ccm' ? ' rotated' : ''}`}
                  />
                </div>
                {openMenu === 'ccm' && (
                  <ul className="sidebar-submenu">
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
                  style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                >
                  <span>RHF</span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`sidebar-down-icon${openMenu === 'rhf' ? ' rotated' : ''}`}
                  />
                </div>
                {openMenu === 'rhf' && (
                  <ul className="sidebar-submenu">
                    <li><Link to="/rhf/slab-discharged-report">Slab Discharged</Link></li>
                  </ul>
                )}
              </li>
              {/* HSM */}
              <li className="sidebar-menu-item">
                <div
                  className="sidebar-menu-label"
                  onClick={() => handleMenuClick('hsm')}
                  style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                >
                  <span>HSM</span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`sidebar-down-icon${openMenu === 'hsm' ? ' rotated' : ''}`}
                  />
                </div>
                {openMenu === 'hsm' && (
                  <ul className="sidebar-submenu">
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
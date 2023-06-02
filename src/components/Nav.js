import "./Nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Nav() {
  return (
    <nav
      className="navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-left">
        <div className="navbar-icons">
          <span className="navbar-icon bar-icon">
            <FontAwesomeIcon icon={faBars} />
          </span>
        </div>

        <div className="navbar-workspace">
          <div className="workspace-title">Workspace Title</div>
        </div>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-search field">
          <p className="control has-icons-left">
            <input className="input" type="password" placeholder="Search" />
            <span className="icon is-small is-left">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
          </p>
        </div>

        <div className="navbar-end">
          <div className="navbar-item auth-buttons">
            <div className="buttons">
              <a className="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a className="button is-light">Log in</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;

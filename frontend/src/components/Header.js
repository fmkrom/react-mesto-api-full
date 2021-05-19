import '../components/styles/Header.css';
import mestoLogo from '../images/__graphics/graphics__logo.png';
import { Link } from 'react-router-dom';

function Header(props){
    
 return (
      <div className="header">
              <div className="header__logo">
                <img src={mestoLogo} className="header__vector" alt="Лого" />
              </div>  
              <div className="header__info">
                <p className="header__user-email">{props.headerUserEmail}</p>
                <Link to={props.headerLinkRoute} onClick={props.handleHeaderLink} className={`header__link ${props.isLoggedIn ? "header__link_enter-page": "header__link_frontpage"}`}>{props.headerLinkText}</Link>
              </div>                  
      </div>
  )
};

export default Header;
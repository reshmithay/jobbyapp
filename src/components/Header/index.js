import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const {history} = props

  const onLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <>
      <nav className="small-navbar">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="small-nav-logo"
          />
        </Link>
        <ul className="small-nav-menu">
          <li className="small-nav-item">
            <Link to="/">
              <AiFillHome color="#ffffff" size="25" />
            </Link>
          </li>
          <li className="small-nav-item">
            <Link to="/jobs">
              <BsFillBriefcaseFill color="#ffffff" size="25" />
            </Link>
          </li>
          <li className="small-nav-item">
            <button
              type="button"
              className="small-logout-button"
              onClick={onLogout}
            >
              <FiLogOut color="#ffffff" size="25" />
            </button>
          </li>
        </ul>
      </nav>
      <nav className="large-navbar">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="large-nav-logo"
          />
        </Link>
        <ul className="large-nav-menu">
          <li className="large-nav-item">
            <Link to="/" className="large-nav-link">
              Home
            </Link>
          </li>
          <li className="large-nav-item">
            <Link to="/jobs" className="large-nav-link">
              Jobs
            </Link>
          </li>
        </ul>
        <button type="button" className="nav-logout-button" onClick={onLogout}>
          Logout
        </button>
      </nav>
    </>
  )
}

export default withRouter(Header)

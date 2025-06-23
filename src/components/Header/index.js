import {Link, withRouter} from 'react-router-dom'
import {useState} from 'react'

import Cookies from 'js-cookie'

import CartContext from '../../context/CartContext'

import './index.css'

const Header = props => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false)

  const onClickLogout = () => {
    setShowLogoutPopup(true)
  }

  const confirmLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const cancelLogout = () => {
    setShowLogoutPopup(false)
  }

  const renderCartItemsCount = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartItemsCount = cartList.length

        return (
          <>
            {cartItemsCount > 0 ? (
              <span className="cart-count-badge">{cartList.length}</span>
            ) : null}
          </>
        )
      }}
    </CartContext.Consumer>
  )

  return (
    <>
      <div className={showLogoutPopup ? 'blurred' : ''}>
        <nav className="nav-header">
          <div className="nav-content">
            <div className="nav-bar-mobile-logo-container">
              <Link to="/">
                <img
                  className="website-logo-mob"
                  src="https://i.ibb.co/bj9d3rrW/output-onlinetools1.png"
                  alt="website logo"
                />
              </Link>

              <button
                type="button"
                className="nav-mobile-btn"
                onClick={onClickLogout}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
                  alt="nav logout"
                  className="nav-bar-img"
                />
              </button>
            </div>

            <div className="nav-bar-large-container">
              <Link to="/">
                <img
                  className="website-logo"
                  src="https://i.ibb.co/bj9d3rrW/output-onlinetools1.png"
                  alt="website logo"
                />
              </Link>
              <ul className="nav-menu">
                <li className="nav-menu-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>

                <li className="nav-menu-item">
                  <Link to="/products" className="nav-link">
                    Products
                  </Link>
                </li>

                <li className="nav-menu-item cart-link-wrapper">
                  <Link to="/cart" className="nav-link cart-link">
                    Cart
                    {renderCartItemsCount()}
                  </Link>
                </li>
              </ul>
              <button
                type="button"
                className="logout-desktop-btn"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </div>
          </div>
          <div className="nav-menu-mobile">
            <ul className="nav-menu-list-mobile">
              <li className="nav-menu-item-mobile">
                <Link to="/" className="nav-link">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                    alt="nav home"
                    className="nav-bar-img"
                  />
                </Link>
              </li>

              <li className="nav-menu-item-mobile">
                <Link to="/products" className="nav-link">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
                    alt="nav products"
                    className="nav-bar-img"
                  />
                </Link>
              </li>
              <li className="nav-menu-item-mobile">
                <Link to="/cart" className="nav-link">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                    alt="nav cart"
                    className="nav-bar-img"
                  />
                  {renderCartItemsCount()}
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      {showLogoutPopup && (
        <div className="logout-popup">
          <div className="popup-box">
            <p>Are you sure you want to logout?</p>
            <div className="popup-buttons">
              <button
                className="confirm-btn"
                type="button"
                onClick={confirmLogout}
              >
                Confirm
              </button>
              <button
                className="cancel-btn"
                type="button"
                onClick={cancelLogout}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default withRouter(Header)

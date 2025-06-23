import {useState} from 'react'
import CartContext from '../../context/CartContext'
import Header from '../Header'
import EmptyCartView from '../EmptyCartView'
import CartListView from '../CartListView'
import CartSummary from '../CartSummary'
import './index.css'

const Cart = () => {
  const [showConfirmation, setShowConfirmation] = useState(false)

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList, removeAllCartItems} = value
        const showEmptyView = cartList.length === 0

        const onClickRemoveAllBtn = () => {
          setShowConfirmation(true)
        }

        const handleConfirmRemove = () => {
          removeAllCartItems()
          setShowConfirmation(false)
        }

        const handleCancelRemove = () => {
          setShowConfirmation(false)
        }

        return (
          <>
            <Header />
            <div
              className={`cart-container ${
                showConfirmation ? 'blur-background' : ''
              }`}
            >
              {showEmptyView ? (
                <EmptyCartView />
              ) : (
                <div className="cart-content-container">
                  <h1 className="cart-heading">My Cart</h1>
                  <button
                    type="button"
                    className="remove-all-btn"
                    onClick={onClickRemoveAllBtn}
                  >
                    Remove All
                  </button>
                  <CartListView />
                  <CartSummary />
                </div>
              )}
            </div>

            {showConfirmation && (
              <div className="confirmation-popup-overlay">
                <div className="confirmation-popup">
                  <h3>Are you sure you want to remove all items?</h3>
                  <div className="popup-buttons">
                    <button
                      className="cancel-btn"
                      type="button"
                      onClick={handleCancelRemove}
                    >
                      Cancel
                    </button>
                    <button
                      className="confirm-btn"
                      type="button"
                      onClick={handleConfirmRemove}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )
      }}
    </CartContext.Consumer>
  )
}

export default Cart

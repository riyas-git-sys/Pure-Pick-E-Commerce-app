import {useState} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => {
  const [showCheckoutPopup, setShowCheckoutPopup] = useState(false)
  const [showOrderAlert, setShowOrderAlert] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        let total = 0
        cartList.forEach(item => {
          total += item.price * item.quantity
        })

        const handleCheckoutClick = () => {
          setShowCheckoutPopup(true)
        }

        const handleClosePopup = () => {
          setShowCheckoutPopup(false)
          setName('')
          setPhone('')
          setAddress('')
          setPaymentMethod('')
        }

        const handleConfirmOrder = () => {
          console.log({name, phone, address, paymentMethod, cartList, total})
          handleClosePopup()
          setShowOrderAlert(true)
          setTimeout(() => setShowOrderAlert(false), 3000)
        }

        const isFormValid =
          name.trim() && phone.trim() && address.trim() && paymentMethod

        return (
          <>
            <div
              className={`cart-summary-container ${
                showCheckoutPopup ? 'blur-background' : ''
              }`}
            >
              <h1 className="order-total-label">
                Order Total:{' '}
                <span className="order-total-value">Rs {total}/-</span>
              </h1>
              <p className="total-items">{cartList.length} items in cart</p>
              <button
                type="button"
                className="checkout-button"
                onClick={handleCheckoutClick}
              >
                Checkout
              </button>
            </div>

            {showCheckoutPopup && (
              <div className="checkout-popup-overlay">
                <div className="checkout-popup-container">
                  <div className="checkout-popup-header">
                    <h3>Order Summary</h3>
                    <button
                      className="close-popup-btn"
                      type="button"
                      onClick={handleClosePopup}
                    >
                      &times;
                    </button>
                  </div>

                  <div className="product-list-summary">
                    <h4>Products:</h4>
                    <ul>
                      {cartList.map(item => (
                        <li key={item.id}>
                          {item.title} (Qty: {item.quantity}) - ₹
                          {item.price * item.quantity}
                        </li>
                      ))}
                    </ul>
                    <p className="total-amount">
                      <strong>Total Amount:</strong> ₹{total}
                    </p>
                  </div>

                  <div className="form-group">
                    <label htmlFor="name">Full Name:</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number:</label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="address">Shipping Address:</label>
                    <textarea
                      id="address"
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      placeholder="Enter complete shipping address"
                      required
                      rows="3"
                    />
                  </div>

                  <div className="payment-methods">
                    <h4>Payment Method:</h4>
                    <div className="radio-group">
                      <label>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cash_on_delivery"
                          checked={paymentMethod === 'cash_on_delivery'}
                          onChange={() => setPaymentMethod('cash_on_delivery')}
                        />
                        Cash on Delivery
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="upi"
                          checked={paymentMethod === 'upi'}
                          onChange={() => setPaymentMethod('upi')}
                        />
                        UPI Payment
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="bank_transfer"
                          checked={paymentMethod === 'bank_transfer'}
                          onChange={() => setPaymentMethod('bank_transfer')}
                        />
                        Bank Transfer
                      </label>
                    </div>
                  </div>

                  <div className="popup-buttons">
                    <button
                      className="cancel-btn"
                      type="button"
                      onClick={handleClosePopup}
                    >
                      Cancel
                    </button>
                    {isFormValid ? (
                      <button
                        className="confirm-btn"
                        type="button"
                        onClick={handleConfirmOrder}
                      >
                        Confirm Order
                      </button>
                    ) : (
                      <button
                        className="confirm-btn disabled"
                        type="button"
                        disabled
                      >
                        Fill all details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {showOrderAlert && (
              <div className="order-confirmation-alert">
                <div className="alert-content">
                  <div>
                    <h3>Order Confirmed Successfully!</h3>
                    <p>Your order will be delivered soon.</p>
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

export default CartSummary

import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import CartContext from '../../context/CartContext'

import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    productData: {},
    similarProductsData: [],
    apiStatus: apiStatusConstants.initial,
    quantity: 1,
    orderConfirmed: false,
    showBuyNowPopup: false,
    name: '',
    address: '',
    paymentMethod: '',
    isOrderProcessing: false,
  }

  componentDidMount() {
    this.getProductData()
  }

  componentDidUpdate(prevProps) {
    const {match: currentMatch} = this.props
    const {params: currentParams} = currentMatch
    const {id: currentId} = currentParams

    const {match: prevMatch} = prevProps
    const {params: prevParams} = prevMatch
    const {id: prevId} = prevParams

    if (prevId !== currentId) {
      this.getProductData()
    }
  }

  getFormattedData = data => ({
    availability: data.availability,
    brand: data.brand,
    description: data.description,
    id: data.id,
    imageUrl: data.image_url,
    price: data.price,
    rating: data.rating,
    title: data.title,
    totalReviews: data.total_reviews,
  })

  onClickSimilarProducts = id => {
    const {history} = this.props
    history.push(`/products/${id}`)
    this.getProductData()
  }

  getProductData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = this.getFormattedData(fetchedData)
      const updatedSimilarProductsData = fetchedData.similar_products.map(
        eachSimilarProduct => this.getFormattedData(eachSimilarProduct),
      )
      this.setState({
        productData: updatedData,
        similarProductsData: updatedSimilarProductsData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="button">
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  onDecrementQuantity = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  onIncrementQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  onClickBuyNow = () => {
    this.setState({showBuyNowPopup: true})
  }

  onCloseBuyNowPopup = () => {
    this.setState({
      showBuyNowPopup: false,
      name: '',
      address: '',
      paymentMethod: '',
    })
  }

  handleInputChange = e => {
    const {name, value} = e.target
    this.setState({[name]: value})
  }

  handlePaymentChange = e => {
    this.setState({paymentMethod: e.target.value})
  }

  confirmOrder = () => {
    this.setState({isOrderProcessing: true})

    setTimeout(() => {
      this.setState({
        isOrderProcessing: false,
        showBuyNowPopup: false,
        orderConfirmed: true,
        name: '',
        address: '',
        paymentMethod: '',
      })

      setTimeout(() => {
        this.setState({orderConfirmed: false})
      }, 3000)
    }, 2000)
  }

  renderBuyNowPopup = () => {
    const {
      productData,
      quantity,
      name,
      address,
      paymentMethod,
      isOrderProcessing,
    } = this.state
    const isFormValid = name.trim() && address.trim() && paymentMethod

    return (
      <div className="buy-now-popup-overlay">
        <div className="buy-now-popup-container">
          <div className="buy-now-popup-header">
            <h3>Order Summary</h3>
            <button
              className="close-popup-btn"
              type="button"
              onClick={this.onCloseBuyNowPopup}
            >
              &times;
            </button>
          </div>

          <div className="product-summary">
            <p>
              <strong>Product:</strong> {productData.title}
            </p>
            <p>
              <strong>Quantity:</strong> {quantity}
            </p>
            <p>
              <strong>Total:</strong> ₹{productData.price * quantity}
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={this.handleInputChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Shipping Address:</label>
            <textarea
              id="address"
              name="address"
              value={address}
              onChange={this.handleInputChange}
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
                  onChange={this.handlePaymentChange}
                />
                Cash on Delivery
              </label>

              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={this.handlePaymentChange}
                />
                UPI Payment
              </label>

              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank_transfer"
                  checked={paymentMethod === 'bank_transfer'}
                  onChange={this.handlePaymentChange}
                />
                Bank Transfer
              </label>
            </div>
          </div>

          <div className="popup-buttons">
            <button
              className="cancel-btn"
              type="button"
              onClick={this.onCloseBuyNowPopup}
            >
              Cancel
            </button>

            {isFormValid ? (
              <button
                className="confirm-btn"
                type="button"
                onClick={this.confirmOrder}
                disabled={isOrderProcessing}
              >
                {isOrderProcessing ? 'Processing...' : 'Confirm Order'}
              </button>
            ) : (
              <button className="confirm-btn disabled" type="button" disabled>
                Fill all details
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  renderProductDetailsView = () => (
    <CartContext.Consumer>
      {value => {
        const {productData, quantity, similarProductsData} = this.state
        const {
          availability,
          brand,
          description,
          imageUrl,
          price,
          rating,
          title,
          totalReviews,
        } = productData
        const {addCartItem} = value
        const onClickAddToCart = () => {
          addCartItem({...productData, quantity})
        }

        return (
          <div className="product-details-success-view">
            <div className="product-details-container">
              <img src={imageUrl} alt="product" className="product-image" />
              <div className="product">
                <h1 className="product-name">{title}</h1>
                <p className="price-details">Rs {price}/-</p>
                <div className="rating-and-reviews-count">
                  <div className="rating-container">
                    <p className="rating">{rating}</p>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                      alt="star"
                      className="star"
                    />
                  </div>
                  <p className="reviews-count">{totalReviews} Reviews</p>
                </div>
                <p className="product-description">{description}</p>
                <div className="label-value-container">
                  <p className="label">Available:</p>
                  <p className="value">{availability}</p>
                </div>
                <div className="label-value-container">
                  <p className="label">Brand:</p>
                  <p className="value">{brand}</p>
                </div>
                <hr className="horizontal-line" />
                <div className="quantity-container">
                  <button
                    type="button"
                    className="quantity-controller-button"
                    onClick={this.onDecrementQuantity}
                  >
                    <BsDashSquare className="quantity-controller-icon" />
                  </button>
                  <p className="quantity">{quantity}</p>
                  <button
                    type="button"
                    className="quantity-controller-button"
                    onClick={this.onIncrementQuantity}
                  >
                    <BsPlusSquare className="quantity-controller-icon" />
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="button buy-now-btn"
                    onClick={this.onClickBuyNow}
                  >
                    BUY NOW
                  </button>
                  <button
                    type="button"
                    className="button add-to-cart-btn"
                    onClick={onClickAddToCart}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
            <h1 className="similar-products-heading">Similar Products</h1>
            <ul className="similar-products-list">
              {similarProductsData.map(eachSimilarProduct => (
                <SimilarProductItem
                  productDetails={eachSimilarProduct}
                  key={eachSimilarProduct.id}
                  onClickSimilarProducts={this.onClickSimilarProducts}
                />
              ))}
            </ul>
          </div>
        )
      }}
    </CartContext.Consumer>
  )

  renderProductDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {showBuyNowPopup, orderConfirmed} = this.state

    return (
      <>
        <Header />
        <div
          className={`product-item-details-container ${
            showBuyNowPopup || orderConfirmed ? 'blur-background' : ''
          }`}
        >
          {this.renderProductDetails()}
        </div>
        {showBuyNowPopup && this.renderBuyNowPopup()}
        {orderConfirmed && (
          <div className="order-confirmation-alert">
            Order Confirmed!
            <br />
            We will update you soon
          </div>
        )}
      </>
    )
  }
}

export default withRouter(ProductItemDetails)

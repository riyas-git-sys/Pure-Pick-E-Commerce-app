import {Link} from 'react-router-dom'

import './index.css'

const EmptyCartView = () => (
  <div className="cart-empty-view-container">
    <img
      src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNm52Mm14cG42dXVwbzcyaXUwZXRsNmF3d2llNjE0MjVlb2hybWZyYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/QERQLKLS5bx1f3ygLq/giphy.gif"
      className="cart-empty-img"
      alt="cart empty"
    />
    <h1 className="cart-empty-heading">Your Cart Is Empty</h1>

    <Link to="/products">
      <button type="button" className="shop-now-btn">
        Shop Now
      </button>
    </Link>
  </div>
)

export default EmptyCartView

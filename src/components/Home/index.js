import {Link} from 'react-router-dom'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {useEffect} from 'react'
import {FaArrowCircleRight} from 'react-icons/fa'

import Header from '../Header'
import './index.css'

gsap.registerPlugin(ScrollTrigger)

const Home = () => {
  useEffect(() => {
    gsap.from('.first-img', {
      scrollTrigger: {
        trigger: '.first-img',
        start: 'top 80%',
        toggleActions: 'play reverse play reverse',
      },
      x: -100,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
    })

    gsap.from('.second-img', {
      scrollTrigger: {
        trigger: '.second-img',
        start: 'top 80%',
        toggleActions: 'play reverse play reverse',
      },
      x: 100,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
    })

    gsap.from('.third-img', {
      scrollTrigger: {
        trigger: '.third-img',
        start: 'top 80%',
        toggleActions: 'play reverse play reverse',
      },
      y: 100,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
    })

    gsap.from('.buy-now-button', {
      scrollTrigger: {
        trigger: '.buy-now-button',
        start: 'top 80%',
        toggleActions: 'play reverse play reverse',
      },
      y: 100,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
    })

    gsap.from('.carosel-home', {
      scrollTrigger: {
        trigger: '.carosel-home',
        start: 'top 80%',
        toggleActions: 'play reverse play reverse',
      },
      y: -100,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
    })
  }, [])

  return (
    <>
      <Header />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="home-container">
            <div className="home-content">
              <h1 className="home-heading">
                🧥 Stand Out. Be Seen. Own the Look.
              </h1>
              <p className="home-description">
                Fashion isn’t just what you wear — it’s who you are. Styles
                evolve, and so do you. We’re in the middle of a style
                revolution, and your outfit is your loudest voice. From bold
                statements to subtle flair, wear what gets you noticed.
                <br />
                <span className="slogan-home">
                  New season. Fresh vibes. Your style, your rules.
                </span>
              </p>
            </div>
          </div>

          <div className="first-img">
            <img
              src="https://i.ibb.co/rf7J7ygp/young-people-standing-looking-different-direction.jpg"
              alt="clothes that get you noticed"
              className="home-img"
            />
            <div>
              <h1 className="head-home">🧥 Dresses That Define You</h1>
              <p className="para-home">
                Fashion is more than just clothing — it’s self-expression.
                Discover our handpicked collection of trendy, elegant, and
                comfortable dresses for every occasion. From casual day-outs to
                stunning evening wear, find your perfect fit and style it your
                way.
                <br />
                <span className="span-home">
                  🛒 Step out in style. Explore now.
                </span>
              </p>
            </div>
          </div>

          <div className="second-img">
            <div>
              <h1 className="head-home">
                💻 Smart Electronics for Smarter Living
              </h1>
              <p className="para-home">
                Upgrade your world with the latest laptops, tablets, and gadgets
                built to boost performance and style. Whether you are working,
                gaming, or creating — our electronics section has cutting-edge
                devices from top brands at unbeatable prices.
                <br />
                <span className="span-home">
                  ⚡ Tech made simple. Shop the future today.
                </span>
              </p>
            </div>
            <img
              src="https://i.ibb.co/pv6wVz1M/laptopimg.jpg"
              alt="clothes that get you noticed"
              className="home-img"
            />
          </div>

          <div className="third-img">
            <img
              src="https://i.ibb.co/D0QmG34/toyimg.jpg"
              alt="clothes that get you noticed"
              className="home-imge"
            />
            <div>
              <h1 className="head-home">🧸 Toys That Spark Imagination</h1>
              <p className="para-home">
                Let playtime be magical! From educational kits to cuddly
                companions and action-packed playsets — we’ve got toys that
                bring joy to every child. Safe, creative, and full of fun for
                all age groups.
                <br />
                <span className="span-home">
                  🎁 Because every smile matters. Browse now.
                </span>
              </p>
            </div>
          </div>

          <Link to="/products">
            <button type="button" className="shop-now-button">
              🛍️ Shop Now
            </button>
          </Link>

          <div className="carosel-home">
            <div className="carousel">
              <ul className="slides">
                <input
                  type="radio"
                  name="radio-buttons"
                  id="img-1"
                  defaultChecked
                />
                <li className="slide-container">
                  <div className="slide-image">
                    <img
                      src="https://i.ibb.co/TB0MW5vg/electonicsimg.jpg"
                      alt="Timisoara Regional Business Centre"
                      className="carosel-img"
                    />
                  </div>
                  <div className="carousel-controls">
                    <label htmlFor="img-3" className="prev-slide">
                      <span>&lsaquo;</span>
                    </label>
                    <label htmlFor="img-2" className="next-slide">
                      <span>&rsaquo;</span>
                    </label>
                  </div>
                </li>

                <input type="radio" name="radio-buttons" id="img-2" />
                <li className="slide-container">
                  <div className="slide-image">
                    <img
                      src="https://i.ibb.co/bgsPY7hB/toysimg.jpg"
                      alt="Timisoara city view"
                      className="carosel-img"
                    />
                  </div>
                  <div className="carousel-controls">
                    <label htmlFor="img-1" className="prev-slide">
                      <span>&lsaquo;</span>
                    </label>
                    <label htmlFor="img-3" className="next-slide">
                      <span>&rsaquo;</span>
                    </label>
                  </div>
                </li>

                <input type="radio" name="radio-buttons" id="img-3" />
                <li className="slide-container">
                  <div className="slide-image">
                    <img
                      src="https://i.ibb.co/0V6bhRB1/groceryimg.jpg"
                      alt="Timisoara scenic view"
                      className="carosel-img"
                    />
                  </div>
                  <div className="carousel-controls">
                    <label htmlFor="img-2" className="prev-slide">
                      <span>&lsaquo;</span>
                    </label>
                    <label htmlFor="img-1" className="next-slide">
                      <span>&rsaquo;</span>
                    </label>
                  </div>
                </li>

                <div className="carousel-dots">
                  <label
                    htmlFor="img-1"
                    className="carousel-dot"
                    id="img-dot-1"
                  >
                    .
                  </label>
                  <label
                    htmlFor="img-2"
                    className="carousel-dot"
                    id="img-dot-2"
                  >
                    .
                  </label>
                  <label
                    htmlFor="img-3"
                    className="carousel-dot"
                    id="img-dot-3"
                  >
                    .
                  </label>
                </div>
              </ul>
            </div>
          </div>
          <Link to="/products">
            <button type="button" className="shop-now-button">
              View More{' '}
              <FaArrowCircleRight
                style={{marginLeft: '10px', marginTop: '5px'}}
              />
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home

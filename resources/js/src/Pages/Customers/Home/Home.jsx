import Header from '@/src/Components/Header/Header'
import HeroImage from '@/src/Images/shopping_model.png'
import './Home.scss'
import Button from '@/src/Components/Button/Button'
import { Link } from 'react-router-dom'
const Home = () => {
    return (
        <div className='home_page_container'>
            <Header />
            <section className="container hero_section">
                <div className="row my-5">
                    <div className="col-lg-6 d-flex flex-column  justify-content-center">
                        <div className='heading'>
                            <p className=''>Fashion</p>  <p className='strong_text'>Big Sale <span className='offertext'>30% off</span> </p> <p className='small_text'>Grap Your Favorite cloths with low price now!</p>
                        </div>
                        <div className='my-3'>
                            <Link to={'/products'}><Button className="shop_now_btn" >Shop Now</Button></Link>
                        </div>
                    </div>
                    <div className="col-lg-6 d-flex justify-content-end">
                        <img src={HeroImage} alt="hero_image" className='image-fluid' height={'450px'} />
                    </div>
                </div>

            </section>
            <section className="featured_section"></section>
        </div>
    )
}
export default Home

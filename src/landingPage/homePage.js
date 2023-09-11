import { Link } from 'react-router-dom';
import '../style/LandingPage.css';
import icon from '../img/pngegg.png';


function LandingPage() {
    return (
        <div className='page'>
            <div className='contenGarra'>
                <Link to='/home' className='landigPageLink'  ><img className='lagarra' src={icon} alt='lagrarra'  /></Link>
            </div>

        </div>
    )
};

export default LandingPage;
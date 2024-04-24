import googlePlay from '../../../images/Google-Play.png';
import appStore from '../../../images/App-Store.png';
import { Link } from 'react-router-dom';
import { FaLinkedinIn, FaTwitter } from "react-icons/fa";
import './Footer.css';
import { MDBIcon } from 'mdb-react-ui-kit';
import "@fortawesome/fontawesome-free/css/all.min.css";

function Footer() {
    return (
        <div className="footerContainer bg-gray-950 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 text-white">

                <div className="platform space-y-4">
                    <h3 className='text-3xl font-bold pb-3'>Available On</h3>
                    <div><Link to="/"><img src={googlePlay} alt="Google Play" className='h-14' /></Link></div>
                    <div><Link to="/"><img src={appStore} alt="App Store" className='h-14' /></Link></div>
                </div>

                <div className="platform space-y-2 flex flex-col">
                    <h3 className='text-3xl font-bold pb-3'>Important Links</h3>
                    <Link className='text-2xl hover:underline w-fit' to="/about">About</Link>
                    <Link className='text-2xl hover:underline w-fit' to="/contact">Contact</Link>
                </div>

                <div className="platform space-y-2 flex flex-col">
                    <h3 className='text-3xl font-bold pb-3'>Social Media</h3>
                    <div className='flex space-x-4 items-center'>
                        <Link className='text-3xl hover:underline w-fit hover:text-blue-600' to="/about"><FaLinkedinIn /></Link>
                        <Link className='text-3xl hover:underline w-fit' to="/about"><MDBIcon fab icon="instagram" className='instagram' /></Link>
                        <Link className='text-3xl hover:underline w-fit hover:text-sky-400' to="/about"><FaTwitter /></Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Footer
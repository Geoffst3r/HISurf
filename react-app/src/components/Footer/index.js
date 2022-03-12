import SelfImage from './SelfImage.jpg';
import './footer.css';


const Footer = () => {
    return (
        <div className='footer'>
            <p className='footer-title'>Built by Geoffrey Cox</p>
            <img src={SelfImage} alt='' />
            <div className='links'>
                <a target='_blank' rel="noreferrer" href='https://github.com/Geoffst3r'><i className='fa fa-github fa-2x' /></a>
                <a target='_blank' rel="noreferrer" href='https://www.linkedin.com/in/geoffreyptcox/'><i className='fab fa-linkedin-in fa-2x' /></a>
            </div>
        </div>
    )
}

export default Footer;

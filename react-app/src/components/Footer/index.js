import { useState, useEffect } from 'react';
import './footer.css';


const Footer = () => {
    const [mQuery, setMQuery] = useState(window.innerWidth);

    useEffect(() => {
        const checkWindow = () => {
            setMQuery(window.innerWidth);
        };
        window.addEventListener('resize', checkWindow);
        return () => window.removeEventListener('resize', checkWindow)
    }, []);

    return (
        <div className={mQuery > 1050 ? 'footer fullsize' : 'footer'}>
            <div className='links'>
                <a target='_blank' rel="noreferrer" href='https://github.com/Geoffst3r'><i className='fa fa-github fa-2x' /></a>
                <a target='_blank' rel="noreferrer" href='https://www.linkedin.com/in/geoffreyptcox/'><i className='fab fa-linkedin-in fa-2x' /></a>
                <a target='_blank' rel="noreferrer" href='https://angel.co/u/geoffrey-cox-2'><i className='fab fa-angellist fa-2x' /></a>
                <a target='_blank' rel="noreferrer" href='https://geoffst3r.github.io/'><i className='fa fa-folder-open fa-2x' /></a>
            </div>
        </div>
    )
}

export default Footer;

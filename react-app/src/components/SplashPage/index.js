import { useHistory } from 'react-router-dom';
import "./splashStyling.css"

const Landing = () => {
    const history = useHistory();
    const onClick = () => {
        return history.push(`/surfboards/`);
    };
    return (
        <div className='splash-page'>
            <div className='site-description'>
                <h1 className='splash_text'>Welcome to Hi Surf 🏄</h1>
                <div className='description'>
                    Your one-stop shop to ensuring that a rad beach day won't be missed because of your lack of surfboard.
                </div>
                <button className='continue-to-site' onClick={() => onClick()}>Continue!</button>
                <div className='about-container'>
                    <div className='built'>Built By:</div>
                    <a target='_blank' rel='noreferrer' href='https://github.com/Geoffst3r'>Geoffrey Cox</a>
                </div>
            </div>
        </div>
    )
}

export default Landing

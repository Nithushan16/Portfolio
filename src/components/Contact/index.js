import { useEffect, useState,useRef } from 'react'
import Loader from 'react-loaders';
import './index.scss';
import AnimatedLetters from '../AnimatedLetters';
import emailjs from '@emailjs/browser'
import {MapContainer, Popup, TileLayer, Marker} from 'react-leaflet'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact =()=>{
    const [letterClass, setLetterClass] = useState('text-animate')
    const refForm = useRef()

    useEffect(() => {
         setTimeout(() => {
        setLetterClass('text-animate-hover')
        }, 3000)
    }, [])
    const sendEmail = (e)=>{
        e.preventDefault()
        emailjs
            .sendForm (
                'Your_service_ID',
                'Your_Public_ID',
                refForm.current,
                'Your_Public KEy'
            )
            .then(
                ()=>{
                    toast.success("Sent successfully")
                    window.location.reload(false)
                },
                ()=>{
                    alert('Failed, please try again')
                }
            )

    }
    return(
       <>
       <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            closeButton={true}
            style={{ top: '60px', right: '10px' }}
            toastStyle={{ backgroundColor: '#212529', color: '#fff' }}
            toastClassName="toast-container"
            bodyClassName="toast-body"
            theme="light"/>  

        <div className='container contact-page'>
            <div className='text-zone'>
                <h1>
                    <AnimatedLetters 
                    letterClass={letterClass}
                    strArray={['C', 'o', 'n', 't', 'a', 'c', 't', ' ', 'm', 'e']}
                    idx={15}/>
                </h1>
                <p>
                    I am interested in freelance opportunities - especially on ambitious
                    or large projects. However, if you have any other requests or
                    questions, don't hesitate to contact me using below form either.
                </p>
                <div className='contact-form'>
                    <form ref={refForm} onSubmit={sendEmail}>
                        <ul>
                            <li className='half'>
                                <input type='text' name='name' placeholder='Name' required/>
                            </li>
                            <li className='half'>
                                <input type='email' name='email' placeholder='Email' required/>
                            </li>
                            <li>
                                <input placeholder="Subject" type='text' name = 'subject' required/>
                            </li>
                            <li>
                                <textarea placeholder='Message' name='message' required></textarea>
                            </li>
                            <li>
                                <button className='flat-button'>Submit</button>
                            </li>                     
                        </ul>
                    </form>
                </div>
            </div>
            <div className='info-map'>
                Nithushan Balasingham
                <br/>
                Sri Lanka
                <br/>
                Thirugnanasampanther street <br/>
                Trincomalee <br/>
                <span>nithubalasingham@gmail.com</span>
            </div>
            <div className='map-wrap'>
                <MapContainer center={[8.5877,81.2152]} zoom={13}>
                    <TileLayer  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[8.5877,81.2152]}>
                    <Popup>Nithushan lives here, come over for a cup of coffee :)</Popup>
                    </Marker>

                </MapContainer>
            </div>
        </div>
        <Loader type='pacman'/>
       </> 
       
    )
}

export default Contact
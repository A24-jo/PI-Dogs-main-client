import { useDispatch, useSelector } from 'react-redux';
import '../style/header.css';
import { useEffect, useState } from 'react';
import { AZ, Temeperament, ZA, filtradoApi, filtradoBd, filtradoTeperament, fistadoDosrasa, heavy, light, searchInput } from '../redux/action';
import Botones from './botones';
import { Link } from 'react-router-dom';
import microfono from '../img/microphone-2-svgrepo-com.svg';
import backgroundImage from '../img/534645.jpg';

function Header() {
    const dispatch = useDispatch();
    const [listen, setListen] = useState(true);
    const [input, setInput] = useState('');
    const selector = useSelector((state) => state.temperament);
    const handlreFIlter = (raza) => {
        dispatch(filtradoTeperament(raza));
    };
    const handlerFiltApi = () => {
        dispatch(filtradoApi())
    };
    const handlerFiltBd = () => {
        dispatch(filtradoBd())
    };
    const ordeAZ = () => {
        dispatch(AZ())
    }
    const ordeZA = () => {
        dispatch(ZA())
    }
    const lightth = () => {
        dispatch(light())
    };
    const heavyhj = () => {
        dispatch(heavy())
    };

    useEffect(() => {
        dispatch(Temeperament())
    }, []);
    //fdsfdshfkjsdahfkjsah
    // Comprobamos si el navegador admite la API de reconocimiento de voz
    function quitarTildes(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    const funtio = () => {
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

            // Configuramos el idioma para el reconocimiento de voz
            recognition.lang = 'es-ES'; // Puedes cambiarlo al idioma que desees
            recognition.onstart = () => {
                setListen(false);
            }
            // Capturamos el resultado del reconocimiento de voz
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                const letra = quitarTildes(transcript)
                dispatch(searchInput(letra))
                setInput(letra)
                setListen(true)
                // Aquí puedes realizar cualquier acción con el texto reconocido, como enviarlo a un servidor o mostrarlo en la interfaz de usuario.
            };
            recognition.start()

        } else {
            console.error('El navegador no admite la API de reconocimiento de voz.');
        }
    }
    const boxHeaderStyle = {
        display: 'flex',
        justifyContent: 'center',
        /* Centra horizontalmente */
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.644), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '73vh',
        width: '100%',
      };
      const minboxStyles = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '17px',
        textAlign: 'center',
        /* Centra el contenido de manera horizontal */
        paddingLeft: '30px',
        paddingRight: '30px',
        border: '1px solid #dddcdc',
        /* Añade un borde para visualización */
        borderRadius: '10px',
        width: '60rem',
        maxWidth: '80%',
        /* Limita el ancho máximo para hacerlo responsive */
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        minHeight: '58px',
        maxHeight: '150px',
        position: 'fixed',
        zIndex: 2,
      };
      
    return (
        <div style={boxHeaderStyle} >
            <div style={minboxStyles}>
                <div className='homes'>
                    <div className={listen ? 'listening' : 'not-listening'} onClick={() => funtio()}>
                        <img src={microfono} alt="Microfono" className="microfono-img" />
                    </div>
                    <input placeholder="Search something" className='inputHeader' value={input} onChange={(event) => setInput(event.target.value)} />
                    <button className='buttonHeader' onClick={() => dispatch(searchInput(input))} >search</button>

                </div>
                <div className='contenbutton'>
                    <Botones heavyhj={heavyhj} lightth={lightth} ordeAZ={ordeAZ} ordeZA={ordeZA} temperamentos={selector} filtrado={handlreFIlter} handlerFiltApi={handlerFiltApi} handlerFiltBd={handlerFiltBd} />
                    <Link to='/formulario'><button className='newBreeds'>+BREEDS</button></Link>
                </div>
            </div>
        </div>
    )
};

export default Header;
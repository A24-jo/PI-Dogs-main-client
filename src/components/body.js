import { useEffect, useState } from 'react';
import { addBreed } from '../redux/action';
import '../style/body.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';



function Body() {

    const dispatch = useDispatch();
    const estard = useSelector((state) => state.breed);

    const [pag, setPag] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);


    function handlerNext() {
        if (estard.length > pag + 8) {
            setCurrentPage(currentPage + 1);
            setPag(pag + 8);
        };
    }

    function handlerPrevious() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setPag(pag - 8);
        };
    }

    const datavisible = () => {

        if (estard.length >= 1) {
            return estard.slice(pag, pag + 8)
        } else {
            return [];
        }

    };  

    useEffect(() => {
        dispatch(addBreed());
    }, []);
    return (
        <div className='boxbody'>
            <div className='minbody'>
                <div className='boxnext'>
                    <div>
                        <button className='buttonNext' onClick={() => handlerPrevious()}>previous</button>
                        <button className='buttonNext' onClick={() => handlerNext()}>next</button>
                    </div>
                    <h4 className='pag'>PAG: {currentPage}</h4>
                </div>
                <div className='continer-box-card'>
                    {!!(datavisible().length) && datavisible().map(i => {
                        if (!(typeof i === 'string')) {
                            return (
                                <Link className='cardLink' key={i.id} to={`/detail/${i.id}`}><div className='box-card'  >
                                    <img className='boxImg' src={i.reference_image_id} alt='esfdf' />

                                    <div className='texto' style={{
                                        opacity:'0.3',
                                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.425)',
                                        marginTop: '-22.4rem', color: 'black', background: 'transparent', height: '22rem', borderRadius: '13px',
                                        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <h1 style={{fontFamily: 'Pacifico,cursive'}}>{i.name}</h1>
                                        <p>temperament:{i.temperament}<br />weight:{i.weight} kg</p>
                                    </div>

                                </div></Link>
                            )
                        }
                    })}
                </div>
            </div>  
        </div>
    )
};

export default Body;
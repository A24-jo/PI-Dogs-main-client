import '../style/detail.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DetailBreed } from "../redux/action";


function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const state = useSelector(state => state.detail)
  useEffect(() => {
    dispatch(DetailBreed(id))
  }, []);

  return (
    <div className='box-detail'>
      <div className='mini-detail'>
        <img style={{ borderRadius: '25px', minWidth: '40%', height: '60vh', margin: '10px' }} src={state.reference_image_id} />
        <div className='text-detail'>
          <p className='nombre-titulo'>{state.name}</p>
          <p><span className='etiqueta-pequena'>Altura:</span> {state.height}</p>
          <p><span className='etiqueta-pequena'>Peso:</span> {state.weight}</p>
          <p><span className='etiqueta-pequena'>Temperamentos:<br/></span> {state.temperament}</p>
          <p><span className='etiqueta-pequena'>Años de vida:</span> {state.life_span}</p>
          <p style={{fontFamily: 'Pacifico,cursive',fontSize:'30px'}}>{state.id}</p>
        </div>
      </div>
    </div>
  )
};

export default Detail;
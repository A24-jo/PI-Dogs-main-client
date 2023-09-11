import { useState } from "react";
import '../style/button.css';

const Botones = ({temperamentos,filtrado,handlerFiltApi,handlerFiltBd,ordeZA,ordeAZ,lightth,heavyhj}) => {
    const [filter, setFilter] = useState(false);
    const [alf, setAlf] = useState(false);
    const [lift , setLift] = useState(false);


    return (
        <div >
            <div className='headerDropdown'>
                <label onClick={() => setAlf(!alf)}>alphabetical</label>
                {alf && (
                    <ul className='dropdown-contenHeader'>
                        <li onClick={()=>ordeAZ()}> A-Z </li>
                        <li onClick={()=>ordeZA()}> Z-A </li> 
                    </ul> 
                )}
            </div> 
            <div className='headerDropdown'>
                <label onClick={() => setLift(!lift)}>weight</label>
                {lift && (
                    <ul className='dropdown-contenHeader'>
                        <li onClick={()=>lightth()}>light</li>
                        <li onClick={()=>heavyhj()}>heavy</li> 
                    </ul>
                )}
            </div>
            <div className='headerDropdown'>
                <select  id="temperamento" onChange={(e)=>filtrado(e.target.value)} >
                    <option value="" >temperament</option>
                    {temperamentos.map((a,index) => (
                        <option key={index} value={a.name}>
                            {a.name}
                        </option>
                    ))} 
                </select>
            </div>
            <div className='headerDropdown'>
                <label onClick={() => setFilter(!filter)}>origin</label>
                {filter && (
                    <ul className='dropdown-contenHeader'>
                        <li onClick={()=>handlerFiltApi()}> originApi </li>
                        <li onClick={()=>handlerFiltBd()}> originBd </li> 
                    </ul>
                )}
            </div>
        </div>
    )
};

export default Botones;
import '../style/formulario.css';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newBeeds } from "../redux/action";
import {useNavigate} from 'react-router-dom';

function Formulario() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const seltro = useSelector(state => state.temperament);
    const form = useSelector(state => state.newdogs);
    const [select, setSelect] = useState([]);
    const [tempSelect, setTempSelect] = useState([]);//esto solomuestra los temperament seleccion
    const [dataFom, setDataFom] = useState({
        name: "",
        height: "",
        weight: "",
        life_span: "",
        reference_image_id:""
    });
    const [error, setError] = useState({
        name: false,
        height: false,
        weight: false,
        life_span: false,
        temperament1: false,
    });
    //cargar imagen 
    const fileImg = (img) => {
        Array.from(img).forEach(imgs => {
            let read = new FileReader();
            read.readAsDataURL(imgs);
            read.onload = function () {
                let base64 = read.result;
                setDataFom({...dataFom,reference_image_id:base64});
            }
        })
    };
    const handlerT = (event) => {
        const teh = event.split(',');
        if (select.length <= 4 && !select.includes(teh[0])) {
            setSelect([...select, teh[0]]);
            setTempSelect([...tempSelect, teh[1]]);
            setError((s) => ({ ...s, temperament1: false }))
        } else {
            if (select.length >= 4) {
                alert('solo puedes selccionar 5 temperamentos')
            } else {
                alert('no puedes selcionar el mismo temperamento');
            }
        }
    };
    const handleForm = (e) => {

        setDataFom({ ...dataFom, [e.target.name]: e.target.value });

        if (dataFom.name) {
            setError((a) => ({ ...a, name: false }));
        };
        if (dataFom.height) {
            setError((a) => ({ ...a, height: false }));
        };
        if (dataFom.life_span) {
            setError((a) => ({ ...a, life_span: false }));
        };
        if (dataFom.weight) {
            setError((a) => ({ ...a, weight: false }));
        };

    }; 
  
    const HndlreSubmit = (e) => {
        e.preventDefault();
        const newData = { ...dataFom };
        for (let i = 0; i < select.length; i++) {
            newData['temperament' + (i + 1)] = parseFloat(select[i]);
        };
        if (!newData.name || !newData.height || !newData.weight || !newData.life_span || !newData.temperament1) {
            if (!newData.name) {
                setError((d) => ({ ...d, name: true }));
            };
            if (!newData.height) {
                setError((d) => ({ ...d, height: true }));
            };
            if (!newData.weight) {
                setError((d) => ({ ...d, weight: true }));
            };
            if (!newData.life_span) {
                setError((d) => ({ ...d, life_span: true }));
            }
            if (!newData.temperament1) {
                setError((d) => ({ ...d, temperament1: true }));
            };

            return
        };
   
        dispatch(newBeeds(newData));
        if(form.mensaje){
            navigate('/home');
        }
    };
    useEffect(() => {
        const regex = /^[A-Za-z]+$/;
        const numer = /^[0-9-]*$/;
        if (dataFom.name.length && !regex.test(dataFom.name)) {
            alert('ingresa solo letras')
        };
        if ((dataFom.height.length && !numer.test(dataFom.height)) || (dataFom.life_span.length && !numer.test(dataFom.life_span)) || (dataFom.weight.length && !numer.test(dataFom.weight))) {
            alert('ingresa solo numeros ')
        }

    }, [dataFom]); 

    return (
        <div className='box-form'>
            <form  onSubmit={HndlreSubmit}>
                <h1>new breed</h1>
                <div>
                    <input className='form-name' name="name" placeholder="name breed" onChange={(e) => handleForm(e)} value={dataFom.name} />
                    <label >name</label>
                </div>
                {error.name && <p>'tiens que ingresar un nombre'</p>}
                <div>
                    <input name="height" placeholder="example 2-4" onChange={(e) => handleForm(e)} value={dataFom.height} />
                    <label>height</label>
                </div>
                {error.height && <p>tienes que ingresar una altura valida</p>}
                <div>
                    <input name="weight" placeholder="example 2-4" onChange={(e) => handleForm(e)} value={dataFom.weight} />
                    <label>weight</label>
                </div>
                {error.weight && <p>tienes que ingresar un perro valido</p>}
                <div>
                    <input name="life_span" placeholder="example 2-4" onChange={(e) => handleForm(e)} value={dataFom.life_span} />
                    <label>life_span</label>
                </div>
                {error.life_span && <p>es neserio ingresar un life_span</p>}
                <div>
                    <select multiple onChange={(e) => handlerT(e.target.value)} >
                        <option value=''>temperament</option>
                        {seltro.map((item, index) => (
                            <option key={index} value={`${item.id},${item.name}`}>{item.name}</option>
                        ))}
                    </select> <br/>
                    {error.temperament1 && <p> seleciona almenos un teperamento </p>}
                    <label>temperaments</label>
                   <h4>temp select:{tempSelect.join(',')}</h4>
                </div>
                <input type="file" onChange={(e)=>fileImg(e.target.files)} /><br/>
                <button type="submit">submit</button>
            </form>
           {form.error && <label>ya existe una raza con es nombre</label>}
        </div>
    )
};

export default Formulario;
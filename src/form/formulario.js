import '../style/formulario.css';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Temeperament, newBeeds } from "../redux/action";
import {useNavigate} from 'react-router-dom';
import InputField from './InputField';
import SelectField from './SelectField';


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
        console.log(form.mensaje)
        if(form.mensaje){
            navigate('/home');
        }
    };
    useEffect(()=>{
      dispatch(Temeperament())
    },[]);
    useEffect(() => {
        const regex = /^[A-Za-z]+$/;
        const numer = /^[0-9-]*$/;
        if (dataFom.name.length && !regex.test(dataFom.name)) {
            setDataFom({...dataFom,name:''})
            alert('ingresa solo letras')
        };
        if ((dataFom.height.length && !numer.test(dataFom.height)) || (dataFom.life_span.length && !numer.test(dataFom.life_span)) || (dataFom.weight.length && !numer.test(dataFom.weight))) {
            alert('ingresa solo numeros ')
        }

    }, [dataFom]); 
    return (
        <div className="box-form">
          <form onSubmit={HndlreSubmit}>
            <h1>new breed</h1>
            <InputField
              name="name"
              placeholder="name breed"
              value={dataFom.name}
              onChange={handleForm}
              error={error.name && "Tienes que ingresar un nombre"}
            />
            <InputField
              name="height"
              placeholder="example 2-4"
              value={dataFom.height}
              onChange={handleForm}
              error={error.height && "Tienes que ingresar una altura válida"}
            />
            <InputField
              name="weight"
              placeholder="example 2-4"
              value={dataFom.weight}
              onChange={handleForm}
              error={error.weight && "Tienes que ingresar un peso válido"}
            />
            <InputField
              name="life_span"
              placeholder="example 2-4"
              value={dataFom.life_span}
              onChange={handleForm}
              error={error.life_span && "Es necesario ingresar un life_span"}
            />
            <SelectField
              options={seltro}
              onChange={(e) => handlerT(e.target.value)}
              error={error.temperament1}
            />
          <h6>{tempSelect.map(s=>`${s} ,`)}</h6>
            <input type="file" onChange={(e) => fileImg(e.target.files)} />
            <br />
            <button type="submit">submit</button>
          </form>
          {form.error && <label>Ya existe una raza con este nombre</label>}
        </div>
      );
    }
    
    export default Formulario;
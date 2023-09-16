export const ADD_BREED = 'ADD_BREED';
export const DETAIL_BREED = 'DETAIL_BREED';
export const SEARCH_INPUT = 'SEARCH_INPUT';
export const TEMPERAMENT = 'TEMPERAMENT';
export const FILTRARTEMP = 'FILTRARTEMP';
export const FILT_API = 'FILT_API';
export const FILT_BD = 'FILT_BD';
export const A_Z = 'A_Z';
export const Z_A = 'Z_A';
export const LIGHT = 'LIGHT';
export const HEAVY = 'HEAVY';
export const NEWDOGS = 'NEWDOGS';

export const addBreed = () => {
    return async function (dispatch) {
        try {
            const data = await fetch('http://localhost:3001/dogs');
            // console.log(data.ok)
            if (!data.ok) throw Error('action addBreed:recarga la pagina')
            const resul = await data.json();
            dispatch({ type: ADD_BREED, payload: resul });
        } catch (error) {
            console.error({ error: error.message });
            window.location.reload();
        }
    }
};

export const DetailBreed = (id) => {
    return async function (dispatch) {
        try {
            const data = await fetch(`http://localhost:3001/dogs/${id}`);
            if (!data.ok) throw Error('action Detail: Failed to fetch')
            const datos = await data.json();
            dispatch({ type: DETAIL_BREED, payload: datos });
        } catch (error) {
            console.error({ error: error.message });

        }
    }
};
export const searchInput = (name) => {
    return async function (dispatch) {
        try {
            const data = await fetch(`http://localhost:3001/dogs/name?name=${name}`);
            const result = await data.json();
            dispatch({ type: SEARCH_INPUT, payload: result });
        } catch (error) {
            console.log({ error: error.message });
        }
    }
};
export const Temeperament = () => {
    return async function (dispatch) {
        try {
            const data = await fetch(`http://localhost:3001/temperaments`);
            const result = await data.json();
            dispatch({ type: TEMPERAMENT, payload: result });
        } catch (error) {
            console.log({ error: error.message });
        }
    }
};
export const filtradoTeperament = (raza) => {
    return { type: FILTRARTEMP, payload: raza };
};
export const filtradoApi = () => {
    return { type: FILT_API }
};
export const filtradoBd = () => {
    return { type: FILT_BD }
};
export const AZ = () => {
    return { type: A_Z }
};
export const ZA = () => {
    return { type: Z_A }
};
export const light = () => {
    return { type: LIGHT }
};
export const heavy = () => {
    return { type: HEAVY }
};
export const newBeeds = (obj) => {
    return async function (dispatch) {
        try {
            let eldast= JSON.stringify(obj);
            const data = await fetch(`http://localhost:3001/dogs`, {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: eldast 
            });
            const resul = await data.json();
            dispatch({ type: NEWDOGS, payload: resul });
        } catch (error) {
             console.error({error: error.message});
        }

    } 
};


    // const data = await fetch(`http://localhost:3001/temperaments`,{
    //             method:'POST',
    //             body:JSON.stringify({})
    //         });

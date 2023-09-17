import axios from 'axios';
axios.defaults.baseURL='https://proyecto-perros-8g26.onrender.com';
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
        const response = await axios.get('/dogs');
        if (!response.data) throw Error('action addBreed: recarga la pagina');
        dispatch({ type: ADD_BREED, payload: response.data });
      } catch (error) {
        console.error({ error: error.message });
        window.location.reload();
      }
    };
  };
  

  export const DetailBreed = (id) => {
    return async function (dispatch) {
      try {
        const response = await axios.get(`/dogs/${id}`);
        if (!response.data) throw Error('action Detail: Failed to fetch');
        dispatch({ type: DETAIL_BREED, payload: response.data });
      } catch (error) {
        console.error({ error: error.message });
      }
    };
  };
  export const searchInput = (name) => {
    return async function (dispatch) {
      try {
        const response = await axios.get(`/dogs/name?name=${name}`);
        dispatch({ type: SEARCH_INPUT, payload: response.data });
      } catch (error) {
        console.log({ error: error.message });
      }
    };
  };
  export const Temeperament = () => {
    return async function (dispatch) {
      try {
        const response = await axios.get('/temperaments');
        dispatch({ type: TEMPERAMENT, payload: response.data });
      } catch (error) {
        console.log({ error: error.message });
      }
    };
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
        let eldast = JSON.stringify(obj);
        const response = await axios.post(`/dogs`, eldast, {
          headers: { 'content-type': 'application/json' },
        });
        dispatch({ type: NEWDOGS, payload: response.data });
      } catch (error) {
        console.error({ error: error.message });
      }
    };
  };

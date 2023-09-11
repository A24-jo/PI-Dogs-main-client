import { ADD_BREED, A_Z, FILTRARTEMP, FILT_API, FILT_BD, HEAVY, LIGHT, NEWDOGS, SEARCH_INPUT, TEMPERAMENT, Z_A } from "./action";
import { DETAIL_BREED } from "./action";

const initalState = {
    breedst:[],
    breed:[],
    detail:{},
    temperament:[],
    newdogs:{}
};

const reduserBreed = (state=initalState,action) => {
    switch(action.type) {
        case ADD_BREED:
            return{
                ...state,
                breed:action.payload, 
                breedst:action.payload
            };
        case DETAIL_BREED:
            return{
                ...state,
              detail:action.payload,
            };
        case SEARCH_INPUT:
            return{
                ...state,
                breed:action.payload
            };
        case TEMPERAMENT:
            return{
              ...state,
              temperament:action.payload
            };
        case FILTRARTEMP:
            return {
                ...state,
                breed:state.breedst.filter(item=>item.temperament !==undefined && item.temperament.includes(action.payload))
            };
        case FILT_API:
            return {
                ...state,
                breed:state.breedst.filter(item=>typeof item.id === 'number' )
            };
        case FILT_BD:    
            return {
                ...state,
                breed:state.breedst.filter(item=>typeof item.id === 'string')
            };
        case A_Z:
            const filtAZ = [...state.breedst].sort((a,b)=>{
                const nombreA = a.name.toUpperCase();
                const nombreB = b.name.toUpperCase();
                if(nombreA < nombreB){
                    return -1
                    } ;
                if(nombreA > nombreB) {
                   return 1
                } ;
                return 0;
            });
            return{
                ...state,
                breed:filtAZ
            };
        case Z_A:
            const filZA=[...state.breedst].sort((a,b)=>{
                const nombreA = a.name.toUpperCase();
                const nombreB = b.name.toUpperCase();
                if(nombreA > nombreB){
                   return -1 
                };
                if(nombreA < nombreB){
                    return 1
                    };
                return 0;
            });
            return{
                ...state,
                breed:filZA
            };
            case LIGHT:
                const objetosFiltrados = state.breedst.filter((obj) => {
                  const peso = parseFloat(obj.weight[0]);
                  return !isNaN(peso);
                });
                const breedOrdenado = objetosFiltrados.sort((a, b) => {
                  const pesoA = parseFloat(a.weight.split('-')[0]);
                  const pesoB = parseFloat(b.weight.split('-')[0]);
              
                  if (pesoA < pesoB) {
                    return -1;
                  }
                  if (pesoA > pesoB) {
                    return 1;
                  }
                  return 0;
                });
              
                return {
                  ...state,
                  breed: breedOrdenado,
                };
            case HEAVY :
                const filtraHeavy = state.breedst.sort((a,b)=>{
                    const itemA = parseFloat(a.weight.split('-')[0]);
                    const itemB = parseFloat(b.weight.split('-')[0]);
                    if(itemA > itemB) {
                        return -1;
                    }
                    if(itemA < itemB) {
                        return 1;
                    }
                     return 0;
                })
                return{
                    ...state,
                    breed:filtraHeavy
                };
            case NEWDOGS:
                return {
                    ...state,
                    newdogs:action.payload
                }

        default: return {...state}
    }
};

export default reduserBreed;
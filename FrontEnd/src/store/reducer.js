
//REDUCERS
import {TYPES} from './action';
//MENSAJES DE ALERTA
import Swal from 'sweetalert2';
//API
import axiosClient from '../configuration/axiosClient';

//ESTADO INICIAL
export const initialState={
    elementos:[],
    carro:[],
    totalCarro:0
};

//CONEXION API
//BD
export const getProductos = async () => {     
  const respuesta = await axiosClient.get('/products');
  initialState.elementos=respuesta.data;
};
getProductos()

//FUNCION REDUCER
export function productosReducer(state=initialState,action) {
    
  switch (action.type){

    case TYPES.AGREGAR_CARRO:{
        let nuevoItem = state.elementos.find((elementos)=> elementos.id === action.payload);
        let itemEnCarro =state.carro.find(item=>item.id === nuevoItem.id)
        let totalCarro=state.totalCarro+(nuevoItem.precio)
     
        return itemEnCarro ?
            {...state, carro:state.carro.map(item=> item.id === nuevoItem.id ? {...item,cantComprada:item.cantComprada+1}: item ) ,totalCarro}
           :{...state, carro:[...state.carro,{...nuevoItem,cantComprada:1}] , totalCarro};
    };

    case TYPES.QUITAR_CARRO:{
        let quitaItem = state.carro.find((carro) => carro.id === action.payload);
        let borrar = Swal.fire({
                  title: "  Producto eliminado : " + quitaItem.nombre,
                  showConfirmButton:false,
                  timer:1500,
                  icon: "success"
                });

        let totalCarro=state.totalCarro-(quitaItem.precio*quitaItem.cantComprada)

        if (!state.carro ) {
           totalCarro =0;  
        };

        return{     
            borrar,
            ...state, carro:[...state.carro.filter((carro) => carro.id !== action.payload)], totalCarro
        }
    }; 
    
    case TYPES.LIMPIAR_CARRO:{
        let vaciar = Swal.fire({
                  title: " Carrito sin productos ",
                  showConfirmButton:false,
                  timer:1500,
                  icon: "success"
                });
        
        return{   
            vaciar, 
            elementos:initialState.elementos,
            carro:initialState.carro,
            totalCarro:initialState.totalCarro
        }
    }; 

    case TYPES.PAGAR_CARRO:{
        let pagar = Swal.fire({
                  title: " En Construccion ",
                  showConfirmButton:false,
                  timer:1500,
                  icon: "info"
                });
        
        return{   
            pagar,
            elementos:initialState.elementos,
            carro:initialState.carro,
            totalCarro:initialState.totalCarro
        }
    }; 

    default : return state
       
    }
};

import Swal from "sweetalert2";


const Informes = () => {

    Swal.fire({
      icon: 'warning', 
      title:"En construcción !",
      text: "disculpe las molestias",
      showConfirmButton: false
    });

    setTimeout( function() { window.location.href = `/UserAllProducts`; },1500 )
   
};
export default Informes;
//SweetAlert2 
import swal from 'sweetalert2';
function LoginCheckAlert(msg) {
    new swal({
        //*重要* sweetalert不能設置高度，不然會蓋到底圖
        heightAuto: false,
        position: "center",
        icon: "info",
        title: msg,
        showConfirmButton: false,
        timer: 0
    });
}
function ErrorAlert(msg) {
    new swal({
        //*重要* sweetalert不能設置高度，不然會蓋到底圖
        heightAuto: false,
        position: "center",
        icon: "error",
        title: msg,
        showConfirmButton: false,
        timer: 2000,
    });
}
function LoginAlert(msg) {
    new swal({
        //*重要* sweetalert不能設置高度，不然會蓋到底圖
        heightAuto: false,
        position: "center",
        icon: "success",
        title: msg,
        showConfirmButton: false,
        timer: 2000,
    });
}

// 將自己寫好的js物件,函數全部導出 導到olmap.vue
export {
    LoginCheckAlert,
    ErrorAlert,
    LoginAlert
}
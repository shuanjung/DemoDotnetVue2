import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import {
    Tile as TileLayer,
    Vector as VectorLayer
} from "ol/layer";
import {
    Vector as VectorSource
} from "ol/source";
// 圖磚圖層、圖層集合參數、座標轉換
import LayerGroup from "ol/layer/Group";
// 引入圖層設定參數
import Feature from "ol/Feature";
// SweetAlert2
import swal from 'sweetalert2';

// 設備圖層設定
let waterlayGroup = new LayerGroup ({
    title: "自來水基本圖"
});
// 設定 icon 圖層
let GPSiconFeature = new Feature ({
    name: 'GpsPoint'
});
let GpsSource = new VectorSource ({
    features: [GPSiconFeature]
});
let GpsLayer = new VectorLayer ({
    name: "Gps",
    source: GpsSource,
    zIndex: 0
});

waterlayGroup.getLayers().push(GpsLayer);

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
    GpsSource,
    Map,
    View,
    TileLayer,
    LoginCheckAlert,
    ErrorAlert,
    LoginAlert
}
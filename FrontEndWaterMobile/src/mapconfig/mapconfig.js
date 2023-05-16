import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import {
    Tile as TileLayer,
    // Vector as VectorLayer
} from "ol/layer";
import {
    Vector as VectorSource
} from "ol/source";
// 圖磚圖層、圖層集合參數、座標轉換
import {
    get as getProjection,
    transform,
    getTransform
} from "ol/proj";
import { applyTransform } from 'ol/extent';
import LayerGroup from "ol/layer/Group";
// WMTS 引入參數
import WMTS from "ol/source/WMTS.js";
import WMTSTileGrid from "ol/tilegrid/WMTS.js";
// 坐標系引入(轉換)參數
import proj4 from "proj4";
import {
    register
} from "ol/proj/proj4";
import {
    getWidth,
    getTopLeft
} from "ol/extent.js";
// 引入圖層設定參數
import Feature from "ol/Feature";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import Point from "ol/geom/Point";
// SweetAlert2
import swal from 'sweetalert2';
// 坐標系註冊
proj4.defs(
    "EPSG:3826",
    "+proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
);
register(proj4);

// 設定圖層參數
let projection = getProjection("EPSG:900913");
let projectionExtent = projection.getExtent();
let size = getWidth(projectionExtent) / 256;
let resolutions = new Array(26);
let matrixIds = new Array(26);
for (let z = 0; z < 26; ++z) {
    resolutions[z] = size / Math.pow(2, z);
    matrixIds[z] = z;
}

// 設備圖層設定
let waterlayGroup = new LayerGroup ({
    title: "自來水基本圖"
});
let TWEFeature = new Feature({
    name: "TWE Feature"
});
let TWESource = new VectorSource({
    name: [TWEFeature]
});
// let TWEMap = new VectorLayer({
//     title: "自來水設備圖",
//     source: TWESource
// });
// 設定 icon 圖層
// let GPSiconFeature = new Feature ({
//     name: 'GpsPoint'
// });
// let GpsSource = new VectorSource ({
//     features: [GPSiconFeature]
// });
// let GpsLayer = new VectorLayer ({
//     name: "Gps",
//     source: GpsSource,
//     zIndex: 0
// });
// let FuzzyiconFeature = new Feature ({
//     name: 'FuzzyPoint'
// });
// let FuzzySource = new VectorSource ({
//     features: [FuzzyiconFeature]
// });
// let FuzzyLayer = new VectorLayer ({
//     name: "Fuzzy",
//     source: FuzzySource,
//     zIndex: 0
// });
// let IntericonFeature = new Feature ({
//     name: 'InterPoint'
// });
// let InterSource = new VectorSource ({
//     features: [IntericonFeature]
// });
// let InterLayer = new VectorLayer ({
//     name: "Inter",
//     source: InterSource,
//     zIndex: 0
// });
// let EumetericonFeature = new Feature ({
//     name: 'EumeterPoint'
// });
// let EumeterSource = new VectorSource ({
//     features: [EumetericonFeature]
// });
// let EumeterLayer = new VectorLayer ({
//     name: "Eumeter",
//     source: EumeterSource,
//     zIndex: 0
// });
// let LeakiconFeature = new Feature ({
//     name: 'LeakPoint'
// });
// let LeakSource = new VectorSource ({
//     features: [LeakiconFeature]
// });
// let LeakLayer = new VectorLayer ({
//     name: "Leak",
//     source: LeakSource,
//     zIndex: 0
// });
// let ValveiconFeature = new Feature ({
//     name: 'ValvePoint'
// });
// let ValveSource = new VectorSource ({
//     features: [ValveiconFeature]
// });
// let ValveLayer = new VectorLayer ({
//     name: "Valve",
//     source: ValveSource,
//     zIndex: 0
// });
// let HydranticonFeature = new Feature ({
//     name: 'HydrantPoint'
// });
// let HydrantSource = new VectorSource ({
//     features: [HydranticonFeature]
// });
// let HydrantLayer = new VectorLayer ({
//     name: "Hydrant",
//     source: HydrantSource,
//     zIndex: 0
// });
// let ManholeiconFeature = new Feature ({
//     name: 'ManholePoint'
// });
// let ManholeSource = new VectorSource ({
//     features: [ManholeiconFeature]
// });
// let ManholeLayer = new VectorLayer ({
//     name: "Manhole",
//     source: ManholeSource,
//     zIndex: 0
// });
// 水錶圖層之前已命名過 水錶屬性圖層+point區分
// let EumeterQueryiconFeature = new Feature ({
//     name: 'EumeterQueryPoint'
// });
// let EumeterQuerySource = new VectorSource ({
//     features: [EumeterQueryiconFeature]
// });
// let EumeterQueryLayer = new VectorLayer ({
//     name: "EumeterQuery",
//     source: EumeterQuerySource,
//     zIndex: 0
// });

// waterlayGroup.getLayers().push(TWEMap);
// waterlayGroup.getLayers().push(GpsLayer);
// waterlayGroup.getLayers().push(FuzzyLayer);
// waterlayGroup.getLayers().push(InterLayer);
// waterlayGroup.getLayers().push(EumeterLayer);
// waterlayGroup.getLayers().push(LeakLayer);
// waterlayGroup.getLayers().push(ValveLayer);
// waterlayGroup.getLayers().push(HydrantLayer);
// waterlayGroup.getLayers().push(ManholeLayer);
// waterlayGroup.getLayers().push(EumeterQueryLayer);

function transformExtent (extent, destp, sourcep) {
    let pdestp = getProjection("EPSG:" + destp); //destination
    let psourcep = getProjection("EPSG:" + sourcep);
    return applyTransform(extent, getTransform(pdestp, psourcep))
}
function LoginCheckAlert (msg) {
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
function ErrorAlert (msg) {
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
function LoginAlert (msg) {
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
function CorrectAlert (msg) {
    new swal({
        // *重要* sweetalert不能設置高度，不然會蓋到底圖
        heightAuto: false,
        position: "center",
        icon: "info",
        title: msg,
        showConfirmButton: false,
        timer: 2000,
    });
}
function CloseSWAlert() {
    swal.close();
}
function ClearAllPoint () {
    // GpsSource.clear();
    // FuzzySource.clear();
    // InterSource.clear();
    // EumeterSource.clear();
    // LeakSource.clear();
    // ValveSource.clear();
    // HydrantSource.clear();
    // ManholeSource.clear();
    // EumeterQuerySource.clear();
}

// 將自己寫好的js物件,函數全部導出 導到olmap.vue
export {
    TWESource,
    waterlayGroup,
    // GpsSource,
    // FuzzySource,
    // InterSource,
    // EumeterSource,
    // LeakSource,
    // ValveSource,
    // HydrantSource,
    // ManholeSource,
    // EumeterQuerySource,
    projection,
    projectionExtent,
    resolutions,
    matrixIds,
    Map,
    View,
    TileLayer,
    WMTS,
    WMTSTileGrid,
    Feature,
    Style,
    Icon,
    Point,
    getTopLeft,
    transform,
    getProjection,
    LoginCheckAlert,
    ErrorAlert,
    LoginAlert,
    CorrectAlert,
    CloseSWAlert,
    ClearAllPoint,
    transformExtent
}
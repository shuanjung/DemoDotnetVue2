<template>
    <div id="map" style="width:100%;height:100%;"></div>
</template>
  
<script>
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import {
    Tile
} from "ol/layer";
//import OSM from 'ol/source/OSM';
import {
    getWidth,
    getTopLeft
} from "ol/extent.js";
import {
    get as getProjection
} from "ol/proj";
// WMTS 引入參數
import WMTS from "ol/source/WMTS.js";
import WMTSTileGrid from "ol/tilegrid/WMTS.js";

let projection = getProjection("EPSG:900913");
let projectionExtent = projection.getExtent();
let size = getWidth(projectionExtent) / 256;
let resolutions = new Array(26);
let matrixIds = new Array(26);
for (let z = 0; z < 26; ++z) {
    resolutions[z] = size / Math.pow(2, z);
    matrixIds[z] = z;
}

export default {
    name: 'MapTest',
    data() {
        return {
            map: null
        }
    },
    methods: {
        initMap() {
            // 地图实例
            this.map = new Map({
                target: "map", // 对应页面里 id 为 map 的元素
                layers: [ // 图层
                    new Tile({
                        title: "通用版電子地圖(圖磚)",
                        opacity: 0.7,
                        source: new WMTS({
                            url: "https://maps.nlsc.gov.tw/S_Maps/wmts?",
                            layer: "EMAP",
                            matrixSet: "EPSG:3857",
                            format: "image/png",
                            style: "_null",
                            projection: projection,
                            tileGrid: new WMTSTileGrid({
                                origin: getTopLeft(projectionExtent),
                                resolutions: resolutions,
                                matrixIds: matrixIds,
                            })
                        })
                    })
                ],
                view: new View({ // 地图视图
                    projection: "EPSG:3826", // 坐标系，有EPSG:4326和EPSG:3857
                    center: [223018.96663640972, 2630278.90885104], // 深圳坐标
                    zoom: 7.5,
                    // minZoom: 7.5,
                    maxZoom: 23,
                    // minZoom: 10, // 地图缩放最小级别
                    // zoom: 12 // 地图缩放级别（打开页面时默认级别）
                })
            })
        }
    },
    mounted() {
        // 在此生命周期阶段，调用 initMap 完成地图渲染
        this.initMap();
    }
}
</script>
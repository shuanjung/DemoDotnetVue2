import Vue from 'vue'
import Vuex from 'vuex'

import {
  TWESource,
  waterlayGroup,
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
  // transformExtent
} from '@/mapconfig/mapconfig'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseLayer: null,
    landLayer: null,
    maxLayer: null,
    IsLayerSelect: false,
    LandSelect: false,
    MaxSelect: false,
    map: null,
    extent: null,
    clickPoint: null,
    BuiltGid: null,
    Scale: null,
    Tolerance: null,
    TrackUse: null,
    Attributes: false,
    mapFileStr: "01,02,03,04,05,06,07,08,09,10,11,12,13",
    MaplayerSelected: ['pipe80', 'pipe100-300', 'pipe350-700', 'pipe800', 'pipe400u', 'pipe400d', 'pcross', 'hydrantl', 'hydrant', 'manhole', 'valve'],
    MaplayerOptions: [{
      "text": "所有圖層",
      "value": null,
      "icon": "layerIcon layer",
      "opened": true,
      "children": [
        {
          "text": "DMA",
          "icon": "layerIcon DMA",
          "value": "regionnetl_b,regionnetl_a,regionnetm_b,regionnetm_a,regionnet_a,regionnet_b",
          "selected": false,
          "children": [
            {
              "text": "邊界閥",
              "icon": "layerIcon boundvalve",
              "value": "boundvalve",
              "selected": false
            },
            {
              "text": "分區計量管網水量計",
              "icon": "layerIcon meter",
              "value": "meter",
              "selected": false
            }
          ]
        },
        {
          "text": "基本地形圖",
          "icon": "layerIcon mainbuildingbg",
          "value": "rodes,river,railway,roadlbl,village,admin1,place,build",
          "selected": false
        },
        {
          "text": "管塞",
          "icon": "layerIcon pipecover",
          "value": "pipecover",
          "selected": false
        },
        {
          "text": "管帽",
          "icon": "layerIcon pipehat",
          "value": "pipehat",
          "selected": false
        },
        {
          "text": "管線",
          "value": "pipe80,pipe100-300,pipe350-700,pipe800,pipe400u,pipe400d",
          "selected": true,
          "disabled": true
        },
        {
          "text": "跨管",
          "value": "pcross",
          "selected": true,
          "disabled": true
        },
        {
          "text": "消防栓",
          "value": "hydrantl,hydrant",
          "selected": true,
          "disabled": true
        },
        {
          "text": "人手孔",
          "value": "manhole",
          "selected": true,
          "disabled": true
        },
        {
          "text": "開關閥",
          "value": "valve",
          "selected": true,
          "disabled": true
        },
        {
          "text": "用戶水表組",
          "icon": "layerIcon eumeter",
          "value": "eupipe,saddle,packer,eumeter",
          "selected": false
        },
        {
          "text": "廢棄管線",
          "icon": "layerIcon discardpipe",
          "value": "pipediscard",
          "selected": false
        },
        {
          "text": "修漏點",
          "icon": "layerIcon leak",
          "value": "leak",
          "selected": false
        },
        {
          "text": "場站(設施、水池)",
          "icon": "layerIcon station",
          "value": "station,stationl,station_quality,station_pressure,station_intake,station_distribute",
          "selected": false
        }
      ]
    }]
  },
  getters: {
  },
  mutations: {
    BaseMap (state) {
      state.baseLayer = new TileLayer ({
        title: "通用版電子地圖(圖磚)",
        opacity: 0.7,
        source: new WMTS ({
          url: "https://maps.nlsc.gov.tw/S_Maps/wmts?",
          layer: "EMAP",
          matrixSet: "EPSG:3857",
          format: "image/png",
          style: "_null",
          projection: projection,
          tileGrid: new WMTSTileGrid ({
            origin: getTopLeft(projectionExtent),
            resolutions: resolutions,
            matrixIds: matrixIds,
          })
        }),
      });
      state.landLayer = new TileLayer ({
        title: "地籍圖",
        opacity: 0.7,
        visible: state.LandSelect,
        source: new WMTS ({
          url: "https://landmaps.nlsc.gov.tw/S_Maps/wmts?",
          layer: "DMAPS",
          matrixSet: "EPSG:3857",
          format: "image/png",
          style: "_null",
          projection: projection,
          tileGrid: new WMTSTileGrid ({
            origin: getTopLeft(projectionExtent),
            resolutions: resolutions,
            matrixIds: matrixIds,
          })
        }),
      });
      state.maxLayer = new TileLayer ({
        title: '正射影像圖(混合)',
        type: 'base',
        opacity: 1,
        visible: state.MaxSelect,
        source: new WMTS ({
          url: 'https://maps.nlsc.gov.tw/S_Maps/wmts?',
          layer: 'PHOTO_MIX',
          matrixSet: 'EPSG:3857',
          format: 'image/png',
          projection: projection,
          tileGrid: new WMTSTileGrid ({
            origin: getTopLeft(projectionExtent),
            resolutions: resolutions,
            matrixIds: matrixIds,
          })
        }),
      });
      state.map = new Map ({
        target: "map",
        layers: [state.baseLayer, state.maxLayer, state.landLayer, waterlayGroup],
        // 設定view值
        view: new View({
          projection: "EPSG:3826", // 使用這個坐標系
          center: [223018.96663640972, 2630278.90885104],
          zoom: 7.5,
          minZoom: 7.5,
          maxZoom: 23,
        }),
      });
      // 註冊單點
      state.map.on("click", (e) => state.clickPoint = (e.coordinate));

      // 滑鼠移動事件
      state.map.on("movestart", () => { TWESource.clear(); this.commit('ControlLayerSetting', { LayerSelect: false }); });

      // 註冊畫面移動
      state.map.on("moveend", () => {
        this.commit('set_TWE');
        // inchesPerMetre * DPI 約 39.37 * 96 = 3779.52
        state.Scale = Math.floor(state.map.getView().getResolution() * 3779.52);
        this.commit('GetTolerance');
      });

      // 註冊滾輪縮放
      state.map.on("wheel", event => {
        let str = 
          event.originalEvent.wheelDelta <= 0 || event.originalEvent.detail > 0
            ? "down"
            : "up";
        let zoom = 7;
        if (str == "down") zoom++;
        if (state.map.getView().getZoom() >= zoom) return;
        // TWESource.clear();
      });
    },
    changMaxlayer (state) {
      state.maxLayer.setVisible(state.MaxSelect);
    },
    changLandlayer (state) {
      state.landLayer.setVisible(state.LandSelect);
    },
    // flyToZoneExtent (state, payload) {
    //   let Extent = payload.userExtent.split(",");
    //   let b = [Extent[0], Extent[1], Extent[2], Extent[3]];
    //   b = transformExtent(b, "3826", "3826");
    //   state.map.getView().fit(b, state.map.getSize())
    // },
    // flyToExtent (state, extent) {
    //   // 取消小括號內容(不含小括號) 資料格式為(a b, c d)
    //   // eslint-disable-next-line
    //   let regex = /[^\(\)]+(?=\))/g;
    //   let temp = extent.extent.match(regex)[0].split(",");
    //   // 第一組XY
    //   let XY1 = temp[0].split(" ");
    //   // 第二組XY
    //   let XY2 = temp[1].split(" ");
    //   // 上面分出來後 接入下方(因為需要逗號所以上方再切一次)
    //   let b = [XY1[0], XY1[1], XY2[0], XY2[1]];
    //   b = transformExtent(b, "3826", "3826");
    //   state.map.getView().fit(b, state.map.getSize())
    // },
    // TWE = Tainwan Water Equipment (Map)
    set_TWE (state) {
      let ip = location.host.split(":")[0];
      // 實際環境
      // let ip = "gis.water.gov.tw";
      let minx, maxx, miny, maxy;
      // 取得目前範圍
      state.extent = state.map.getView().calculateExtent();
      let x = 0,
          y = 0;
      minx = state.extent[0] - x;
      miny = state.extent[1] + y;
      maxx = state.extent[2] - x;
      maxy = state.extent[3] + y;
      let Mapserverlayers = state.MaplayerSelected.toString();
      let mapArr = state.mapFileStr.split(",");
      let mapStyle, mapfeature;
      for (let i = 0; i < mapArr.length; i++) {
        mapStyle = new Style({
          image: new Icon ({
            anchor: [0.5, 0.5],
            anchorXUnits: "fraction",
            anchorYUnits: "fraction",
            opacity: 1,
            width: "20px",
            src:
              "https://" + 
              ip + 
              "/mapserver/mapserv?map=map/wgism" + mapArr[i] + ".map&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&LAYERS=" + 
              Mapserverlayers + 
              "&CRS=EPSG:3826&bbox=" + 
              minx + 
              "," + 
              miny + 
              "," + 
              maxx + 
              "," + 
              maxy + 
              "&format=image/png&width=" + 
              state.map.getSize()[0] + 
              "&height=" + 
              state.map.getSize()[1] + 
              "&gid=" + 
              state.PipeGid + 
              "&PlanGid=" + 
              state.PlanGid + 
              "&BuiltGid=" + 
              state.BuiltGid
          }),
        });
        mapfeature = new Feature ({
          geometry: new Point ([
            state.map.getView().getCenter()[0],
            state.map.getView().getCenter()[1],
          ]),
        });
        mapfeature.setStyle(mapStyle);
        TWESource.addFeature(mapfeature);
      }
    },
    TWEReflash () {
      TWESource.clear();
      this.commit('set_TWE');
    },
    GetTolerance (state) {
      state.Tolerance = (state.Scale <= 12753 && state.Scale > 3188) ? 15 : (state.Scale <= 3188 && state.Scale > 797) ? 3 : (state.Scale <= 797 && state.Scale > 398) ? 1.5 : (state.Scale <= 398 && state.Scale > 199) ? 1 : (state.Scale <= 199 && state.Scale > 0) ? 0.5 : 0;
    },
    UseTrack (state, payload) {
      let tempUse = payload.isUsing;
      state.TrackUse = (tempUse == 0) ? "POSITION" : (tempUse == 1) ? "PIPE" : (tempUse == 2) ? "PARTITION" : (tempUse == 3) ? "VALUE" : (tempUse == 4) ? "HYDRANT" : (tempUse == 5) ? "MANHOLE" : (tempUse == 6) ? "EUMETER" : (tempUse == 7) ? "NAVIGATION" : (tempUse == 8) ? "FUZZY" : (tempUse == 9) ? "GPS" : (tempUse == 10) ? "CLEARALL" : (tempUse == 11) ? "SELECTLAYER" : null;
    },
    // GetMapFileStr (state, payload) {
    //   state.mapFileStr = payload.MapStr;
    // },
    MaplayerSelected (state, payload) {
      state.MaplayerSelected = payload.maplayerSelected;
    },
    MaplayerOptions (state, payload) {
      state.MaplayerOptions = payload.maplayerOptions;
    },
    ControlLayerSetting (state, payload) {
      state.IsLayerSelect = payload.LayerSelect;
      if (payload.LayerSelect) {
        // 紀錄目前使用的功能
        this.commit('UseTrack', {
          isUsing: 11
        });
      }
    },
    MaxlayerOptions (state, payload) {
      state.MaxSelect = payload.maxSelect;
    },
    LandlayerOptions (state, payload) {
      state.LandSelect = payload.landSelect;
    },
  },
  actions: {
  },
  modules: {
  }
})

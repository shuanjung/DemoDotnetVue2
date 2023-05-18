<template>
  <div id="map">
    <!-- 查詢條 -->
    <SearchBar v-if="ShowSearch"></SearchBar>
    <!-- 按鍵開啟折疊的div -->
    <CommonCard v-on:SmitSearch="OpenBar" ref="CommonMethod"></CommonCard>
    <!-- 圖層設定 -->
    <LayerSelect v-if="ShowLayerSelect"></LayerSelect>
    <!-- GPS按鈕功能 -->
    <b-button class="ml-auto btnFix" variant="link" v-b-tooltip.top.focus="'GPS定位'" @click="getLocation">
      <b-icon icon="geo"></b-icon>
    </b-button>
    <!-- 更多按鈕功能 -->
    <b-dropdown id="dropdown-dropup" class="ml-auto optionFix">
      <template slot="button-content">
        <b-icon class="listfix" icon="eject" variant="link"></b-icon>
      </template>
      <b-dropdown-item-button class="ibtnfix clearbtn" variant="link">
        <b-icon icon="trash"></b-icon>
      </b-dropdown-item-button>
      <b-dropdown-item-button class="ibtnfix selectlayer" variant="link" @click.stop="ShowLayerSelect!=ShowLayerSelect" @click="ControlLayerSetting(true)">
        <b-icon icon="layers"></b-icon>
      </b-dropdown-item-button>
    </b-dropdown>
    <!-- 屬性資料按鈕 -->
    <b-button class="ml-auto attributeFix" variant="link" v-show="showAttributes"></b-button>
  </div>
</template>

<script>
import { 
  CorrectAlert,
  ErrorAlert,
  CloseSWAlert,
  ClearAllPoint,
} from '@/mapconfig/mapconfig';
import SearchBar from "@/components/SearchDetails/SearchBar.vue";
import CommonCard from "@/components/CommonCard.vue";
import LayerSelect from "@/components/LayerSelect.vue";

export default {
  components: {
    SearchBar,
    CommonCard,
    LayerSelect
  },
  data() {
    return {
      gpsLoction: null,
      ShowSearch: false,
      timer: null,
      time: 600,
    };
  },
  computed: {
    showAttributes() {
      return this.$store.state.Attributes;
    },
    ShowLayerSelect: {
      get() {
        return this.$store.state.IsLayerSelect;
      },
      set(value) {
        this.$store.commit('ControlLayerSetting', {
          LayerSelect: value
        });
      }
    }
  },
  watch: {
    // 監聽目前範圍決定要載入的map檔
    // '$store.state.extent' : function (newValue) {
    //   if (newValue) {
    //     this.axios.get('api/MapfileQuery/' + encodeURIComponent(newValue[0]) + "/" + encodeURIComponent(newValue[2]) + "/" + encodeURIComponent(newValue[1]) + "/" + encodeURIComponent(newValue[3]))
    //       .then(response => {
    //         this.$store.commit('GetMapFileStr', {
    //           MapStr: response.data.wT_ID
    //         });
    //       })
    //       // .catch(function () {
    //       //   new ErrorAlert("連接逾時！請重新操作");
    //       // });
    //   }
    // },
    // 當mapFileStr值改變時，必須重新截圖(更換mapserver參數)
    // '$store.state.mapFileStr': function (newValue) {
    //   if (newValue) {
    //     this.$store.commit("set_TWE");
    //   }
    // },
  },
  mounted() {
    this.$nextTick(function () {
      this.BaseMap();
      this.Countdown();
      this.$el.addEventListener('click', this.timeRefresh);
      this.$el.addEventListener('touchstart', this.timeRefresh, {
        passive: true
      });
      this.$el.addEventListener('touchend', this.timeRefresh);
    });
  },
  methods: {
    // 載圖以及定位分區
    BaseMap () {
      this.$store.commit("BaseMap");
      // let UserExtent = sessionStorage.getItem('UserExtent');
      let UserExtent = '';  // 略過登入驗證
      if (UserExtent) {
        if (UserExtent.length !== 0){
          this.$store.commit("flyToZoneExtent", {
            userExtent: UserExtent
          });
        }
      }
    },
    timeRefresh() {
      this.time = 600;
    },
    Countdown () {
      this.timer = setInterval(() => {
        this.time--;
      }, 1000);
    },
    OpenBar (mes) {
      if (mes == true) {
        this.ShowSearch = true;
      } else {
        this.ShowSearch = false;
      }
    },
    showPosition (position) {
      new CorrectAlert("GPS定位中........");
      this.gpsLoction = 
          position.coords.longitude + "," + position.coords.latitude;
      this.GPSzoomxy({
        xy: this.gpsLoction,
        zoom: "19",
        epsg_code: "4326",
      });
    },
    showError (error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          new ErrorAlert(
            "請允許存取您的位置資訊，" + "</br>" + "再使用GPS定位功能！"
          );
          break;
        case error.POSITION_UNAVAILABLE:
          new ErrorAlert("無法取得GPS提供位置服務！");
          break;
        case error.TIMEOUT:
          new ErrorAlert("連接逾時，請重試！");
          break;
        case error.UNKNOWN_ERROR:
          new ErrorAlert("發生未知錯誤");
          break;
      }
    },
    getLocation () {
      this.ShowSearch = false;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          this.showPosition,
          this.showError
        );
      } else {
        new ErrorAlert("該瀏覽器不支援地理位置!");
      }
      // 紀錄目前使用的功能
      this.$store.commit('UseTrack', {
        isUsing: 9
      });
    },
    clearLayer () {
      new ClearAllPoint();
    },
    ControlLayerSetting (bool) {
      this.$store.commit('ControlLayerSetting', {
        LayerSelect: bool
      });
    }
  },
  destroyed () {
    // 離開此頁，把之前種的點去掉及清掉Select管線 包含關閉所有SweetAlert
    clearInterval(this.timer);
    new CloseSWAlert();
    new ClearAllPoint();
  }
}
</script>

<style src="@/css/olmap.css">
</style><style scoped>
@media (max-width: 320px) {
  .btnFix {
    display: flex;
    justify-content: center;
    width: 30px;
    height: 30px;
    position: absolute;
    right: 0;
    bottom: 45px;
    z-index: 1;
  }
  .btnFix .b-icon {
    display: flex;
    font-size: 0.9rem;
  }
  .optionFix {
    display: flex;
    justify-content: center;
    position: absolute;
    left: 0;
    bottom: 45px;
    z-index: 1;
  }
  .optionFix ::v-deep .dropdown-menu {
    width: 30px;
    height: 60px;
    min-width: 0;
    padding: 0;
  }
  .optionFix ::v-deep button {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .optionFix .b-icon {
    display: flex;
    font-size: 0.9rem;
  }
  .attributeFix {
    display: flex;
    justify-content: center;
    position: absolute;
    right: 0;
    bottom: 90px;
    z-index: 1;
  }
}

@media (min-width: 321px) {
  .btnFix {
    display: flex;
    justify-content: center;
    width: 36px;
    height: 36px;
    position: absolute;
    right: 0;
    bottom: 70px;
    z-index: 1;
  }
  .btnFix .b-icon {
    display: flex;
    font-size: 1.3rem;
  }
  .optionFix {
    display: flex;
    justify-content: center;
    position: absolute;
    left: 0;
    bottom: 70px;
    z-index: 1;
  }
  .optionFix ::v-deep .dropdown-menu {
    width: 36px;
    height: 72px;
    min-width: 0;
    padding: 0;
  }
  .optionFix ::v-deep button {
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .optionFix .b-icon {
    display: flex;
    font-size: 1.3rem;
  }
  .attributeFix {
    display: flex;
    justify-content: center;
    position: absolute;
    right: 0;
    bottom: 115px;
    z-index: 1;
  }
}

.btnFix {
  background-color: #fd7e14;
  border-color: #fd7e14;
  color: #fff;
}
.btnFix:hover,
.btnFix:focus {
  background-color: #fd7e14;
  color: #000;
}
.optionFix ::v-deep .btn {
  background-color: #999900;
  background-color: #999900;
  color: #fff;
}
.optionFix ::v-deep .btn:hover,
.optionFix ::v-deep .btn:focus {
  background-color: #999900;
  color: #000;
}
.optionFix ::v-deep .dropdown-menu {
  border: 0;
  border-radius: 0;
  background-color: transparent;
}
.optionFix ::v-deep .dropdown-item {
  padding: 0;
}
.optionFix ::v-deep .ibtnfix {
  display: flex;
  justify-content: center;
  align-items: center;
}
.optionFix ::v-deep .clearbtn {
  background-color: #ff6347;
  border-radius: 0.25rem;
}
.optionFix ::v-deep .selectlayer {
  background-color: #81c0c0;
  border-radius: 0.25rem;
}
.optionFix ::v-deep li {
  background-color: transparent;
}
.optionFix ::v-deep li :hover,
.optionFix ::v-deep li :focus {
  background-color: transparent;
}
</style>

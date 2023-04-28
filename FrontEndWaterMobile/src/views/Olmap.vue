<template>
  <div id="map">
    <!-- 查詢條 -->
    <SearchBar v-if="ShowSearch"></SearchBar>
    <!-- 按鍵開啟折疊的div -->
    <CommonCard v-on:SmitSearch="OpenBar" ref="CommonMethod"></CommonCard>
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
      <b-dropdown-item-button class="ibtnfix selectlayer" variant="link">
        <b-icon icon="layers"></b-icon>
      </b-dropdown-item-button>
    </b-dropdown>
    <!-- 屬性資料按鈕 -->
    <b-button class="ml-auto attributeFix" variant="link"></b-button>
  </div>
</template>

<script>
import { 
  ErrorAlert
} from '@/mapconfig/mapconfig';
import SearchBar from "@/components/SearchDetails/SearchBar.vue";
import CommonCard from '@/components/CommonCard.vue';

export default {
  components: {
    SearchBar,
    CommonCard
  },
  data() {
    return {
      ShowSearch: true
    };
  },
  computed: {

  },
  watch: {

  },
  mounted() {

  },
  methods: {
    OpenBar (mes) {
      if (mes == true) {
        this.ShowSearch = true;
      } else {
        this.ShowSearch = false;
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
    }
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

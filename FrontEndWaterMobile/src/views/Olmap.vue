<template>
  <div id="map">
    <!-- 查詢條 -->
    <SearchBar></SearchBar>
  </div>
</template>

<script>
import { 
  ErrorAlert
} from '@/mapconfig/mapconfig';
import SearchBar from "@/components/SearchDetails/SearchBar.vue";

export default {
  components: {
    SearchBar
  },
  data() {
    return {
      ShowSearch: false
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
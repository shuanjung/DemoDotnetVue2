<template>
  <div class="SearchBar">
    <div class="card Searchbar">
      <b-input-group class="searchFix">
        <template #append>
          <b-input-group-text class="clearStyle" @click="clearValue">
            <b-icon icon="x"></b-icon>
          </b-input-group-text>
          <b-input-group-text class="iconFix" @click="setTimeLimit">
            <b-icon icon="search"></b-icon>
          </b-input-group-text>
        </template>
        <b-form-input ref="inputText" v-model="inputValue" placeholder="關鍵字查詢" @click.native="showResult" @keyup.enter="setTimeLimit" @input="isInput"></b-form-input>
      </b-input-group>
    </div>
  </div>
</template>

<script>
import { 
  CorrectAlert,
  ErrorAlert 
} from '@/mapconfig/mapconfig';

export default {
  name: "SearchBar",
  data () {
    return {
      processing: false,
      inputValue: '',
      queryResult: null,
      isShow: false
    }
  },
  methods: {
    clearValue () {
      this.inputValue = '';
      this.queryResult = null;
    },
    showResult () {
      if (this.inputValue != '') {
        this.isShow = true;
      }
    },
    isInput () {
      this.isShow = false;
      this.queryResult = null;
    },
    closeResult () {
      this.isShow = false
    },
    // 設定click事件觸發間隔 禁止連續點擊
    setTimeLimit () {
      setTimeout (() => {
        this.processing = false;
      }, 2000);
      this.closeResult();
      this.getFuzzy();
    },
    getFuzzy () {
      if (this.processing === true) {
        new ErrorAlert("請勿連續查詢!請稍後...");
        return;
      }
      // ios input 輸入enter時 不會取消對input的焦點 所以需要手動取消
      this.$refs.inputText.blur();
      this.processing = true;
      if (this.inputValue.length != 0) {
        this.axios.get('api/Fuzzies/' + encodeURIComponent(this.inputValue))
            .then(response => {
              if (response != null) {
                if (response.data[0].CONTENT == "無任何資料") {
                  this.queryResult = null;
                  new CorrectAlert("查無資料！");
                } else {
                  this.queryResult = response.data;
                  this.isShow = true;
                }
              }
            })
            .catch (function () {
              new CorrectAlert("國土測繪中心介接服務" + "</br>" + "[關鍵字查詢]目前沒有回應，" + "</br>" + "請稍後再重新查詢！");
            });
      } else {
        new ErrorAlert("請輸入關鍵字！");
      }
    }
  }
};
</script>

<style scoped>
.Searchbar {
    position: absolute;
    font-weight: bold;
    top: 0;
    width: 100%;
    background-color: transparent;
    border: none;
    z-index: 3;
    margin-top: 2vh;
}
.iconFix {
  cursor: pointer;
}
.searchFix ::v-deep .iconFix {
  background: #007bff;
  color: #fff;
  border: 1px solid #ced4da;
}
.searchFix ::v-deep .clearStyle {
  background: #DFFFDF;
  color: #808080;
  border: 0;
  border-top: 1px solid #ced4da;
  border-bottom: 1px solid #ced4da;
  cursor: pointer;
}
.searchFix ::v-deep .clearStyle:hover,
.searchFix ::v-deep .clearStyle:focus,
.searchFix ::v-deep .iconFix:hover,
.searchFix ::v-deep .iconFix:focus {
  color: #000;
  cursor: pointer;
}
.form-control {
    border: 0;
    border-top: 1px solid #ced4da;
    border-bottom: 1px solid #ced4da;
    border-left: 1px solid #ced4da;
}
.searchFix ::v-deep .form-control {
  background-color: #DFFFDF;
  font-weight: bold;
}
</style>

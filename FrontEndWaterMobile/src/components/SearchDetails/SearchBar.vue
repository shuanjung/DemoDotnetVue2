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
        <b-form-input placeholder="關鍵字查詢"></b-form-input>
      </b-input-group>
    </div>
  </div>
</template>

<script>
import { ErrorAlert } from '@/mapconfig/mapconfig';

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

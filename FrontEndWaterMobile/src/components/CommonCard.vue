<template>
    <div class="commonCard">
        <!-- 按鍵功能 -->
        <div class="ButtonBar">
            <b-button :class="querybar ? null : 'collapsed'" :aria-expanded="querybar ? 'true' : 'false'" @click="handleClick" variant="primary">
                <b-icon icon="search"></b-icon>
                <p>查詢</p>
            </b-button>

            <b-button variant="secondary">
                <b-icon icon="geo-alt-fill"></b-icon>
                <p>定位</p>
            </b-button>

            <b-button @click="OpenOrClose(7)" variant="success">
                <b-icon icon="cursor"></b-icon>
                <p>座標</p>
            </b-button>

            <b-button variant="warning">
                <b-icon icon="list"></b-icon>
                <p>設施</p>
            </b-button>

            <b-button variant="info">
                <b-icon icon="square-half"></b-icon>
                <p>分區</p>
            </b-button>
        </div>
        <!-- 按鈕功能結束 -->

        <!-- 這次新增 導航 -->
        <b-collapse id="collapse-8" v-model="collapses[7].visible">
            <b-card>
                <NavigationCollapse v-on:navigationControl="navigationControl"></NavigationCollapse>
            </b-card>
        </b-collapse>
    </div>
</template>

<script>
import NavigationCollapse from '@/components/NavigationCollapse.vue';
import { CorrectAlert } from '@/mapconfig/mapconfig';

export default {
    name: "CommonCard",
    components: {
        NavigationCollapse
    },
    data() {
        return {
            querybar: false,
            collapses: [{
                    visible: false
                }, {
                    visible: false
                }, {
                    visible: false
                }, {
                    visible: false
                }, {
                    visible: false
                }, {
                    visible: false
                }, {
                    visible: false
                }, {
                    visible: false
                }
            ]
        };
    },
    mounted() {
        // const dropdown = this.$refs.dropdown;
        // // 監聽設施上拉打開時必須將所有下拉及其他功能關閉
        // this.$root.$on('bv::dropdown::shown', () => {
        //     dropdown.hideMenu();
        //     // 關閉所有下拉後再開啟設施上拉，不然會蓋到其它CSS
        //     this.collapses.forEach(collapse => {
        //         collapse.visible = false
        //     });
        //     this.querybar = false;
        //     // 將狀態發送給父節點
        //     this.$emit("SmitSearch", this.querybar);
        // })
    },
    methods: {
        handleClick() {
            this.querybar = !this.querybar;
            // 將狀態發送給父節點
            this.$emit("SmitSearch", this.querybar);
            this.collapses.forEach(collapse => {
                collapse.visible = false;
            });
            // 記錄目前使用功能
            this.$store.commit("UseTrack", {
                isUsing: 8
            });
        },
        CloseAllfunction () {
            // 將全部的下拉先設為關閉
            this.collapses.forEach(collapse => {
                collapse.visible = false;
            });
            // 把查詢的結果隱藏
            this.querybar = false;
            // 將狀態發送給父節點
            this.$emit("SmitSearch", this.querybar);
        },
        OpenOrClose (index) {
            // 需要將一開始的狀態存放到變數
            var tempStaus = this.collapses[index].visible;
            this.CloseAllfunction();
            // 判斷點擊的按鈕事件 需先判斷是否同一個功能 再記錄使用者使用的功能
            if (index == 7) {
                // NavigationContent.vue 監聽 $store.state.TrackUse = 7 ? "NAVIGATION"
                new CorrectAlert("請點選圖面欲查詢的座標!");
            } else {
                this.collapses[index].visible = !tempStaus;
            }
            // 紀錄目前使用的功能
            this.$store.commit("UseTrack", {
                isUsing: index
            });
        },
        // 導航開關按鈕
        navigationControl (close) {
            this.collapses[7].visible = close;
            // console.log("導航折疊：" + close); // 測試開關
        }
    },
}
</script>

<style>
@media (max-width: 320px) {
    .btn {
        width: 40px;
        height: 40px;
        font-size: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
    }

    /* 螢幕寬度過小圖示不顯示 */
    .btn .b-icon {
        display: none;
    }

    .dropdown-item p {
        font-size: 0.5rem;
    }

    .attributeFix {
        width: 40px;
        height: 30px;
    }
}
</style><style scoped>
* {
    font-weight: bold;
}

p {
    margin: 0;
}

#collapse {
    width: 100%;
}
.btn:hover,
.btn:focus {
    color: #000;
}
.ButtonBar {
    display: flex;
    justify-content: space-between;
}
.commonCard {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    z-index: 2;
}

</style>

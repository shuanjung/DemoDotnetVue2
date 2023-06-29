<template>
    <div class="NavigationContent postionFix">
        <b-input-group prepend="TWD97" class="mb-3 prependfix">
            <b-input-group-append class="inputGroupFix">
                <b-form-input class="selectFix" v-model="Coordinate" disabled></b-form-input>
            </b-input-group-append>
        </b-input-group>
        <b-input-group prepend="經緯度" class="mb-3 firstfix">
            <b-input-group-append class="inputGroupFix">
                <b-form-input class="selectFix" v-model="LongLat" disabled></b-form-input>
            </b-input-group-append>
        </b-input-group>
        <b-input-group prepend="高程值(僅供參考)" class="mb-3 firstfix">
            <b-input-group-append class="inputGroupFix">
                <b-form-input class="selectFix" v-model="CoordinateZ" disabled></b-form-input>
            </b-input-group-append>
        </b-input-group>
        <b-input-group class="mb-3 d-flex justify-content-center">
            <b-input-group-append class="mb-3">
                <div class="h-100 rounded btn btn-primary font-weight-bold" @click="googleNavigation">導航</div>
            </b-input-group-append>
        </b-input-group>
        <b-input-group class="mb-3 groupFix d-flex flex-column">
            <b-input-group-prepend is-text>
                <p>點選導航按鈕後將會開啟Google Maps分頁</p>
            </b-input-group-prepend>
        </b-input-group>
    </div>
</template>

<script>
import {
    transform
} from "@/mapconfig/mapconfig";
export default {
    name: "NavigationContent",
    data() {
        return {
            Coordinate: '',
            LongLat: '',
            url: '',
            CoordinateZ: ''
        }
    },
    computed: {
        getClickPoint () {
            return this.$store.state.clickPoint;
        },
        getUserTrace () {
            return this.$store.state.TrackUse;
        }
    },
    watch: {
        '$store.state.clickPoint': function () {
            console.log(this.getClickPoint);   // 查看座標
            // 想新增座標圖層，考慮將olmap.vue addpopupGPS移到store，共用新增圖層
            if (this.getUserTrace === "NAVIGATION") {
                let coordinate = this.getClickPoint;
                let longLat = new transform(this.getClickPoint, "EPSG:3826", "EPSG:4326");
                // this.axios.get('api/Polate/' + encodeURIComponent(longLat[0]) + "/" + encodeURIComponent(longLat[1]))
                //     .then(response => {
                //         if (response.data.pointArray[0].z !==0) {
                //             this.CoordinateZ = response.data.pointArray[0].z;
                //         }
                //     });  // 高程值
                this.Coordinate = `${coordinate[0].toFixed(4)},${coordinate[1].toFixed(4)}`;
                this.LongLat = `${longLat[0].toFixed(4)},${longLat[1].toFixed(4)}`;
                this.url = `https://www.google.com/maps/search/?api=1&query=${longLat[1].toFixed(7)},${longLat[0].toFixed(7)}`;
                this.openCollapse();
                console.log(this.url);  // 查看googlemap URL網址參數
            }
        }
    },
    methods: {
        openCollapse () {
            this.$emit('navigationControl', true);
            console.log("導航內容：true");
        },
        googleNavigation () {
            window.open(this.url);
        }
    }
}
</script>

<style scoped>
@media (min-width:321px) {
    .prependfix ::v-deep .input-group-text {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
    }

    .firstfix ::v-deep .input-group-text {
        padding-left: 1.75rem;
        padding-right: 1.75rem;
    }
}

@media (max-width:320px) {
    * {
        font-size: 0.7rem;
        font-weight: bold;
    }

    .prependfix ::v-deep .input-group-text {
        padding-left: 1.3rem;
        padding-right: 1.3rem;
    }

    .firstfix ::v-deep .input-group-text {
        padding-left: 1.45rem;
        padding-right: 1.45rem;
    }
}

/* 將此下拉全部一起改樣式 */
select {
    border-radius: 0;
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
}

.input-group {
    flex-wrap: nowrap;
}

.input-group-text {
    font-weight: bold;
    background-color: #D2E9FF;
    padding: 0 0.75rem;
    justify-content: center;
    color: #007bff;
}

.tabFix ::v-deep .tab-pane {
    width: 100%;
}

.inputGroupFix {
    width: 100%;
}

.groupFix ::v-deep .input-group-text {
    border: none;
    font-weight: bold;
    /* padding: 0; */
    width: 100%;
    background-color: transparent;
    color: #ff0000;
}

.selectFix {
    /* width: 100%; */
    padding: 0.45rem 0.75rem;
    background-color: #DFFFDF;
    font-weight: bold;
    color: #007bff;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

.selectFix ::v-deep option {
    font-weight: bold;
}
</style>

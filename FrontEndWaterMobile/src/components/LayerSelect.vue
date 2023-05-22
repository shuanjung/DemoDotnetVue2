<template>
    <div class="LayerSelect" @click.stop="ShowLayerSelect">
        <div class="content">
            <b-navbar>
                <b-navbar-brand>圖層設定</b-navbar-brand>
                <b-icon icon="x-square" class="ml-auto iconFix" @click="ControlLayerSetting(false)"></b-icon>
            </b-navbar>
            <div class="checkboxDiv">
                <b-form-checkbox v-model="MaxChecked" name="check-button" switch size="sm" @change="changMax">正射影像圖(混合)</b-form-checkbox>
                <b-form-checkbox v-model="LandChecked" name="check-button" switch size="sm" @change="changLand">地籍圖(國土測繪中心)</b-form-checkbox>
                <v-jstree :data="data" ref="tree" show-checkbox multiple allow-batch whole-row @item-click="setSelectedItems"></v-jstree>
            </div>
        </div>
    </div>
</template>

<script>
import VJstree from 'vue-jstree';
export default {
    name: "LayerSelect",
    components: {
        VJstree
    },
    computed: {
        data: {
            get() {
                return this.$store.state.MaplayerOptions;
            },
            set(value) {
                this.$store.commit('MaplayerOptions', {
                    maplayerOptions: value
                });
            }
        },
        ShowLayerSelect: {
            get() {
                return this.$store.state.IsLayerSelect;
            },
            set(value) {
                this.$store.commit('LayerSelect', {
                    LayerSelect: value
                });
            }
        },
        MaxChecked: {
            get() {
                return this.$store.state.MaxSelect;
            },
            set(value) {
                this.$store.commit('MaxlayerOptions', {
                    maxSelect: value
                });
            }
        },
        LandChecked: {
            get() {
                return this.$store.state.LandSelect;
            },
            set(value) {
                this.$store.commit('LandlayerOptions', {
                    landSelect: value
                });
            }
        }
    },
    watch: {
        '$store.state.MaplayerSelected': function (newValue) {
            if (newValue) {
                this.$store.commit("TWEReflash");
            }
        },
    },
    mounted () {
        document.addEventListener('click', (e) => {
            if (e.target.className !== 'LayerSelect') {
                this.ControlLayerSetting(false);
            }
        })
    },
    methods: {
        setSelectedItems () {
            let selectedItems = [];
            this.$refs.tree.handleRecursionNodeChilds(this.$refs.tree, node => {
                if (typeof node.model != 'undefined' && Object.prototype.hasOwnProperty.call(node.model, "selected") && node.model.selected) {
                    if (node.model.value != null) {
                        selectedItems.push(node.model.value);
                    }
                }
            });
            this.$store.commit('MaplayerSelected', {
                maplayerSelected: selectedItems
            });
        },
        changMax () {
            this.$store.commit('changMaxlayer');
        },
        changLand () {
            this.$store.commit('changLandlayer');
        },
        ControlLayerSetting (bool) {
            this.$store.commit('ControlLayerSetting', {
                LayerSelect: bool
            });
        },
    }
}
</script>

<style>
@media (max-width: 320px) {
    .navbar-brand {
        font-size: 0.875rem;
        font-weight: bolder;
    }

    .LayerSelect {
        width: 100%;
    }
}

@media (min-width: 321px) {
    .navbar-brand {
        font-size: 17px;
        font-weight: bolder;
    }

    .LayerSelect {
        width: 300px;
    }
}

.LayerSelect {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0.5rem;
    border-radius: 0.4rem;
    background-color: #ffffff;
    z-index: 2;
}

.content {
    width: 100%;
    background-color: #ffffdf;
}

.navbar-brand {
    padding: 0;
}

.iconFix {
    cursor: pointer;
}

.iconFix:hover,
.iconFix:focus {
    color: #007bff;
}

.checkboxDiv {
    /* height: 100%; */
    padding: 0 5px;
    max-height: 50vh;
    overflow-y: scroll;
    font-weight: bold;
    color: #007bff;
    font-size: 1.1rem;
}

/* css隱藏必要選取節點 */
.tree-children li:nth-child(5),
.tree-children li:nth-child(6),
.tree-children li:nth-child(7),
.tree-children li:nth-child(8),
.tree-children li:nth-child(9) {
    display: none;
}

/* .tree-icon .tree-themeicon-custom .layerIcon {
    vertical-align: middle;
    background-position: none;
} */

.layer {
    background-image: url(../assets/layers.png) !important;
}

.DMA {
    background-image: url(../assets/DMA.png) !important;
}

.mainbuildingbg {
    background-image: url(../assets/mainbuildingbg.png) !important;
}

.pipecover {
    background-image: url(../assets/pipecover.png) !important;
}

.pipehat {
    background-image: url(../assets/pipehat.png) !important;
}

.eumeter {
    background-image: url(../assets/eumeterIcon.png) !important;
}

.meter {
    background-image: url(../assets/meter.png) !important;
}

.discardpipe {
    background-image: url(../assets/discardpipe.png) !important;
}

.leak {
    background-image: url(../assets/leakIcon.png) !important;
}

.station {
    background-image: url(../assets/station.png) !important;
}

.boundvalve {
    background-image: url(../assets/boundvalve.png) !important;
}
</style>
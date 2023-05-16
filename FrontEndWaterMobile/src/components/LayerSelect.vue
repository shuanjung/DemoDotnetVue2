<template>
    <div class="LayerSelect">
        <div class="content">
            <b-navbar-brand>圖層設定</b-navbar-brand>
            <b-icon icon="x-ssquare" class="ml-auto iconFix" @click="ControlLayerSetting(false)"></b-icon>
        </div>
    </div>
</template>

<script>
export default {
    name: "LayerSelect",
    components: {},

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
</style>
<template>
    <div class="NavigationCollapse">
        <div>
            <b-tabs content-class="mt-3 tabFix">
                <b-tab title="座標/導航" active>
                    <NavigationContent v-on:navigationControl="navigationControl"></NavigationContent>
                </b-tab>

                <template #tabs-end>
                    <b-icon icon="x-square" class="mt-auto mb-auto ml-auto iconFix" @click="navigationControl(false)"></b-icon>
                </template>
            </b-tabs>
        </div>
    </div>
</template>

<script>
import NavigationContent from '@/components/Navigation/NavigationContent.vue';
export default {
    components: {
        NavigationContent
    },
    name: "NavigationCollapse",
    methods: {
        navigationControl (close) {
            this.$emit('navigationControl', close);
            console.log("導航摺疊：" + close);
        }
    }
}
</script>

<style>
/* 此樣式繼承PositionCollapse.vue的樣式 */
@media (max-width:350px) {
    .nav-tabs .nav-link {
        padding: 0.5rem 0.5rem;
        font-size: 0.7rem;
        font-weight: bold;
    }
    .iconFix {
        font-size: 0.7rem;
        font-weight: bold;
    }
}

.nav-tabs .nav-link.active {
    background-color: #FFE6D9;
}

/* 調整在ios nav-tabs 顯示不正常 */
.nav-tabs .nav-link.active:hover,
.nav-tabs .nav-link.active:focus {
    outline: none;
}

.iconFix {
    cursor: pointer;
}

.iconFix:hover,
.iconFix:focus {
    color: #007bff;
}

.postionFix {
    height: 25vh;
    overflow-y: scroll;
}
</style>

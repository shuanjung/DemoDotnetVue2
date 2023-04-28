<template>
    <div class="commonCard">
        <!-- 按鍵功能 -->
        <div class="ButtonBar">
            <b-button variant="primary">
                <b-icon icon="search"></b-icon>
                <p>查詢</p>
            </b-button>

            <b-button variant="secondary">
                <b-icon icon="geo-alt-fill"></b-icon>
                <p>定位</p>
            </b-button>

            <b-button variant="success">
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
    </div>
</template>

<script>
export default {
    name: "CommonCard",
    Components: {

    },
    data() {
        return {
            querybar:true
        };
    }
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
    justify-content: space-evenly;
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

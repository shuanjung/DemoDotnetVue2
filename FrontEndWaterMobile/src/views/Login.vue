<template>
  <div class="login">
    <div class="fix">
      <form class="form-signin">
        <img class="mb-4" src="../assets/自來水logo.png" alt="自來水公司LOGO" width="72" height="72" />
        <h1 class="h4 mb-3 font-weight-bold">圖資查詢系統</h1>
        <h1 class="h5 mb-3 font-weight-bold">(行動版)</h1>
        <b-form-select class="form-control mb-4 font-weight-bold selectfix" v-model="selected"
          :options="options"></b-form-select>
        <input class="form-control" type="input" v-model="userAccount" placeholder="帳號" required />
        <input class="form-control mt-4" type="password" v-model="userPassword" placeholder="密碼" autocomplete="on"
          required />
        <div class="d-flex align-items-center justify-content-between mt-4">
          <input class="form-control formifx" type="verify" v-model="userVerify" placeholder="請輸入驗證碼"
            @keyup.enter="LoginCheck" required />
          <b-icon class="iconfix refresh" icon="arrow-clockwise" @click="refreshCode"></b-icon>
          <!-- <HelloWorld class="d-flex" :identifyCode="identifyCode"></HelloWorld> -->
        </div>
        <b-button class="btn btn-lg btn-block mt-4 fixLoginBtn" variant="primary" @click="LoginCheck">登入</b-button>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    // HelloWorld
  },
  data() {
    return {
      userAccount: "guest",
      userPassword: "guest",
      userVerify: "",
      identifyCode: "",
      identifyCodes: "0123456789",
      selected: {
        ADZone: 'pubhq',
        userZone: '',
        extent: ''
      },
      options: [{
        value: {
          ADZone: 'pubhq',
          userZone: '',
          extent: ''
        },
        text: '總處'
      },
      {
        value: {
          ADZone: 'pub01',
          userZone: "01",
          extent: "290888.677753005,2729663.74354507,351549.696778188,2799121.57918878"
        },
        text: '一區'
      },
      {
        value: {
          ADZone: 'pub02',
          userZone: "02",
          extent: "248579.654944045,2720036.38602586,298550.714410571,2781020.78005939"
        },
        text: '二區'
      },
      {
        value: {
          ADZone: 'pub03',
          userZone: "03",
          extent: "211851.301448155,2687575.52830169,291760.731009999,2759835.296374"
        },
        text: '三區'
      },
      {
        value: {
          ADZone: 'pub04',
          userZone: "04",
          extent: "195969.401088417,2592423.99756662,295752.921976107,2706371.14095748"
        },
        text: '四區'
      },
      {
        value: {
          ADZone: 'pub05',
          userZone: "05",
          extent: "147609.631715938,2568124.43338973,245624.384637974,2637704.76620646"
        },
        text: '五區'
      },
      {
        value: {
          ADZone: 'pub06',
          userZone: "06",
          extent: "150435.32153896,2531723.82415404,214806.517016181,2590177.49098738"
        },
        text: '六區'
      },
      {
        value: {
          ADZone: 'pub07',
          userZone: "07",
          extent: "77693.3466582598,2485543.08320941,255014.128710709,2634766.4049369"
        },
        text: '七區'
      },
      {
        value: {
          ADZone: 'pub08',
          userZone: "08",
          extent: "282112.97659785,2689427.92328793,347551.676706314,2764841.14001586"
        },
        text: '八區'
      },
      {
        value: {
          ADZone: 'pub09',
          userZone: "09",
          extent: "248626.421698634,2555180.75007733,328508.781102712,2696207.25004611"
        },
        text: '九區'
      },
      {
        value: {
          ADZone: 'pub10',
          userZone: "10",
          extent: "223162.340077418,2427498.61894551,313477.657084031,2593509.84118134"
        },
        text: '十區'
      },
      {
        value: {
          ADZone: 'pub11',
          userZone: "11",
          extent: "173453.975685867,2631329.98188754,217791.440343323,2676898.99469829"
        },
        text: '十一區'
      },
      {
        value: {
          ADZone: 'pub12',
          userZone: "12",
          extent: "281896.392312511,2742589.74119859,303610.082696441,2785088.75529013"
        },
        text: '十二區'
      },
      {
        value: {
          ADZone: 'pub113',
          userZone: "13",
          extent: '183363.626942521,2422004.77310209,240162.160705329,2531612.52415244'
        },
        text: '十三區'
      },
      {
        value: {
          ADZone: 'pub13',
          userZone: '',
          extent: "281896.392312511,2742589.74119859,303610.082696441,2785088.75529013"
        },
        text: '北工處'
      },
      {
        value: {
          ADZone: 'pub14',
          userZone: '',
          extent: "195969.401088417,2592423.99756662,295752.921976107,2706371.14095748"
        },
        text: '中工處'
      },
      {
        value: {
          ADZone: 'pub15',
          userZone: '',
          extent: "77692.0680844401,2422116.126398,255013.950002,2633395.41149565"
        },
        text: '南工處'
      }
      ]
    };
  }
}
</script>

<style scoped>
@media (max-width: 320px) {
  .iconfix {
    margin-right: 0.3rem;
    margin-left: 0.3rem;
  }
}

button,
input,
optgroup,
select,
textarea {
  margin: 0;
  font-family: inherit;
  font-weight: bold;
}

h4,
.h4 {
  font-size: calc(1.275rem + 0.3vw);
}

.login {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-direction: column;
  background-color: #f5f5f5;
}

.fix {
  width: 100%;
  height: 100%;
  display: flex;
  max-width: 330px;
  text-align: center;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}

.form-signin .form-control:focus {
  z-index: 2;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
}

.form-control {
  display: block;
  width: 100%;
  padding: .375rem .75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: .25rem;
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

.mb-3 {
  margin-top: 1rem !important;
  margin-bottom: 1rem !important;
}

.btn-block {
  display: block;
  width: 100%;
}

.selectfix ::v-deep option {
  font-weight: bolder;
}

.fixLoginBtn {
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  height: 48px;
  border-radius: 0.3rem;
  display: block;
  width: 100%;
}

.formifx {
  width: 50%;
}

.iconfix {
  color: #007bff;
  font-size: 120%;
}

.refresh {
  animation: refresh 1s infinite linear;
}

@keyframes refresh {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(359deg);
  }
}
</style>

(function(){"use strict";var e={5853:function(e,t,n){var o=n(6369),r=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},i=[],s=n(1001),a={},u=(0,s.Z)(a,r,i,!1,null,null,null),l=u.exports,d=n(2631),c=function(){var e=this,t=e._self._c;return t("div",{staticClass:"login"},[t("div",{staticClass:"fix"},[t("form",{staticClass:"form-signin"},[t("img",{staticClass:"mb-4",attrs:{src:n(8431),alt:"自來水公司LOGO",width:"72",height:"72"}}),t("h1",{staticClass:"h4 mb-3 font-weight-bold"},[e._v("圖資查詢系統")]),t("h1",{staticClass:"h5 mb-3 font-weight-bold"},[e._v("(行動版)")]),t("b-form-select",{staticClass:"form-control mb-4 font-weight-bold selectfix",attrs:{options:e.options},model:{value:e.selected,callback:function(t){e.selected=t},expression:"selected"}}),t("input",{directives:[{name:"model",rawName:"v-model",value:e.userAccount,expression:"userAccount"}],staticClass:"form-control",attrs:{type:"input",placeholder:"帳號",required:""},domProps:{value:e.userAccount},on:{input:function(t){t.target.composing||(e.userAccount=t.target.value)}}}),t("input",{directives:[{name:"model",rawName:"v-model",value:e.userPassword,expression:"userPassword"}],staticClass:"form-control mt-4",attrs:{type:"password",placeholder:"密碼",autocomplete:"on",required:""},domProps:{value:e.userPassword},on:{input:function(t){t.target.composing||(e.userPassword=t.target.value)}}}),t("div",{staticClass:"d-flex align-items-center justify-content-between mt-4"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.userVerify,expression:"userVerify"}],staticClass:"form-control formifx",attrs:{type:"verify",placeholder:"請輸入驗證碼",required:""},domProps:{value:e.userVerify},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.LoginCheck.apply(null,arguments)},input:function(t){t.target.composing||(e.userVerify=t.target.value)}}}),t("b-icon",{staticClass:"iconfix refresh",attrs:{icon:"arrow-clockwise"},on:{click:e.refreshCode}}),t("IdentifyCode",{staticClass:"d-flex",attrs:{identifyCode:e.identifyCode}})],1),t("b-button",{staticClass:"btn btn-lg btn-block mt-4 fixLoginBtn",attrs:{variant:"primary"},on:{click:e.LoginCheck}},[e._v("登入")])],1)])])},f=[],h=function(){var e=this,t=e._self._c;return t("div",{staticClass:"s-canvas"},[t("canvas",{attrs:{id:"s-canvas",width:e.contentWidth,height:e.contentHeight}})])},m=[],p={name:"IdentifyCode",props:{identifyCode:{type:String,default:"1234"},fontSizeMin:{type:Number,default:35},fontSizeMax:{type:Number,default:35},backgroundColorMin:{type:Number,default:200},backgroundColorMax:{type:Number,default:220},dotColorMin:{type:Number,default:60},dotColorMax:{type:Number,default:120},contentWidth:{type:Number,default:116},contentHeight:{type:Number,default:38}},methods:{randomNum(e,t){return Math.floor(Math.random()*(t-e)+e)},randomColor(e,t){let n=this.randomNum(e,t),o=this.randomNum(e,t),r=this.randomNum(e,t);return"rgb("+n+","+o+","+r+")"},drawPic(){let e=document.getElementById("s-canvas"),t=e.getContext("2d");t.textBaseline="bottom",t.fillStyle=this.randomColor(this.backgroundColorMin,this.backgroundColorMax),t.fillRect(0,0,this.contentWidth,this.contentHeight);for(let n=0;n<this.identifyCode.length;n++)this.drawText(t,this.identifyCode[n],n);this.drawLine(t),this.drawDot(t)},drawText(e,t,n){e.fillStyle=this.randomColor(50,160),e.font="35px Arial";let o=n*(this.contentWidth/this.identifyCode.length),r=38;e.translate(o,r),e.fillText(t,0,0),e.translate(-o,-r)},drawLine(e){for(let t=0;t<0;t++)e.strokeStyle=this.randomColor(100,200),e.beginPath(),e.moveTo(this.randomNum(0,this.contentWidth),this.randomNum(0,this.contentHeight)),e.lineTo(this.randomNum(0,this.contentWidth),this.randomNum(0,this.contentHeight)),e.stroke()},drawDot(e){for(let t=0;t<10;t++)e.fillStyle=this.randomColor(0,255),e.beginPath(),e.arc(this.randomNum(0,this.contentWidth),this.randomNum(0,this.contentHeight),1,0,2*Math.PI),e.fill()}},watch:{identifyCode(){this.drawPic()}},mounted(){this.drawPic()}},b=p,v=(0,s.Z)(b,h,m,!1,null,null,null),g=v.exports,y=n(2492),x=n.n(y);function C(e){new(x())({heightAuto:!1,position:"center",icon:"info",title:e,showConfirmButton:!1,timer:0})}function w(e){new(x())({heightAuto:!1,position:"center",icon:"error",title:e,showConfirmButton:!1,timer:2e3})}function Z(e){new(x())({heightAuto:!1,position:"center",icon:"success",title:e,showConfirmButton:!1,timer:2e3})}var A={name:"LoginPage",components:{IdentifyCode:g},data(){return{userAccount:"guest",userPassword:"guest",userVerify:"",identifyCode:"",identifyCodes:"0123456789",selected:{ADZone:"pubhq",userZone:"",extent:""},options:[{value:{ADZone:"pubhq",userZone:"",extent:""},text:"總處"},{value:{ADZone:"pub01",userZone:"01",extent:"290888.677753005,2729663.74354507,351549.696778188,2799121.57918878"},text:"一區"},{value:{ADZone:"pub02",userZone:"02",extent:"248579.654944045,2720036.38602586,298550.714410571,2781020.78005939"},text:"二區"},{value:{ADZone:"pub03",userZone:"03",extent:"211851.301448155,2687575.52830169,291760.731009999,2759835.296374"},text:"三區"},{value:{ADZone:"pub04",userZone:"04",extent:"195969.401088417,2592423.99756662,295752.921976107,2706371.14095748"},text:"四區"},{value:{ADZone:"pub05",userZone:"05",extent:"147609.631715938,2568124.43338973,245624.384637974,2637704.76620646"},text:"五區"},{value:{ADZone:"pub06",userZone:"06",extent:"150435.32153896,2531723.82415404,214806.517016181,2590177.49098738"},text:"六區"},{value:{ADZone:"pub07",userZone:"07",extent:"77693.3466582598,2485543.08320941,255014.128710709,2634766.4049369"},text:"七區"},{value:{ADZone:"pub08",userZone:"08",extent:"282112.97659785,2689427.92328793,347551.676706314,2764841.14001586"},text:"八區"},{value:{ADZone:"pub09",userZone:"09",extent:"248626.421698634,2555180.75007733,328508.781102712,2696207.25004611"},text:"九區"},{value:{ADZone:"pub10",userZone:"10",extent:"223162.340077418,2427498.61894551,313477.657084031,2593509.84118134"},text:"十區"},{value:{ADZone:"pub11",userZone:"11",extent:"173453.975685867,2631329.98188754,217791.440343323,2676898.99469829"},text:"十一區"},{value:{ADZone:"pub12",userZone:"12",extent:"281896.392312511,2742589.74119859,303610.082696441,2785088.75529013"},text:"十二區"},{value:{ADZone:"pub113",userZone:"13",extent:"183363.626942521,2422004.77310209,240162.160705329,2531612.52415244"},text:"十三區"},{value:{ADZone:"pub13",userZone:"",extent:"281896.392312511,2742589.74119859,303610.082696441,2785088.75529013"},text:"北工處"},{value:{ADZone:"pub14",userZone:"",extent:"195969.401088417,2592423.99756662,295752.921976107,2706371.14095748"},text:"中工處"},{value:{ADZone:"pub15",userZone:"",extent:"77692.0680844401,2422116.126398,255013.950002,2633395.41149565"},text:"南工處"}]}},methods:{randomNum(e,t){return t+=1,Math.floor(Math.random()*(t-e)+e)},refreshCode(){this.identifyCode="",this.makeCode(this.identifyCodes,4)},makeCode(e,t){for(let n=0;n<t;n++)this.identifyCode+=e[this.randomNum(0,e.length-1)]},LoginCheck(){0===this.userAccount.length?(new w("請輸入帳號!"),this.refreshCode()):0===this.userPassword.length?(new w("請輸入密碼!"),this.refreshCode()):0===this.userVerify.length?(new w("請輸入驗證碼!"),this.refreshCode()):this.userVerify.toUpperCase()!==this.identifyCode.toUpperCase()?(new w("您輸入的驗證碼錯誤!"),this.refreshCode()):(new C("AD帳號驗證中，請稍後..."),this.axios.post("api/Authorization",{Domain:this.selected.ADZone,Account:this.userAccount,Password:this.userPassword}).then((e=>{"success"===e.data.tologin?(sessionStorage.setItem("UserZone",this.selected.userZone),sessionStorage.setItem("UserExtent",this.selected.extent),sessionStorage.setItem("UserTraceId",e.data.traceid),new Z("歡迎，"+e.data.cname+"使用圖資查詢系統(行動版)"),this.$router.replace("/olmap")):"ADNoAuthorization"===e.data.tologin?(new w("查無此AD帳號!"),this.refreshCode()):"NoAuthorization"===e.data.tologin?(new w("您無權限進入系統，請洽帳號管理人員!"),this.refreshCode()):"Error"===e.data.tologin&&(new w("帳號或密碼輸入錯誤!"),this.refreshCode())})).catch((function(){new w("連接逾時!請重新操作")})))}},created(){this.refreshCode()}},k=A,P=(0,s.Z)(k,c,f,!1,null,"0ab1ef37",null),N=P.exports;o["default"].use(d.ZP);const D=[{path:"/",name:"login",component:N},{path:"/about",name:"about",component:()=>n.e(443).then(n.bind(n,5399))}],O=new d.ZP({routes:D});var M=O,S=n(3822);o["default"].use(S.ZP);var _=new S.ZP.Store({state:{},getters:{},mutations:{},actions:{},modules:{}}),j=n(6265),T=n.n(j),E=n(6423),L=n(5996),I=n(9425),B=(n(7024),n(6553)),V=n.n(B);o["default"].use(L.XG7),o["default"].use(I.A7),o["default"].use(V()),o["default"].use(E.Z,T()),o["default"].config.productionTip=!1,new o["default"]({router:M,store:_,render:e=>e(l)}).$mount("#app")},8431:function(e,t,n){e.exports=n.p+"img/自來水logo.81572e55.png"}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={id:o,loaded:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.loaded=!0,i.exports}n.m=e,function(){n.amdO={}}(),function(){var e=[];n.O=function(t,o,r,i){if(!o){var s=1/0;for(d=0;d<e.length;d++){o=e[d][0],r=e[d][1],i=e[d][2];for(var a=!0,u=0;u<o.length;u++)(!1&i||s>=i)&&Object.keys(n.O).every((function(e){return n.O[e](o[u])}))?o.splice(u--,1):(a=!1,i<s&&(s=i));if(a){e.splice(d--,1);var l=r();void 0!==l&&(t=l)}}return t}i=i||0;for(var d=e.length;d>0&&e[d-1][2]>i;d--)e[d]=e[d-1];e[d]=[o,r,i]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,o){return n.f[o](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/about.1b28ce4f.js"}}(),function(){n.miniCssF=function(e){}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.hmd=function(e){return e=Object.create(e),e.children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:function(){throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e}}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="watermobile_eslintonly:";n.l=function(o,r,i,s){if(e[o])e[o].push(r);else{var a,u;if(void 0!==i)for(var l=document.getElementsByTagName("script"),d=0;d<l.length;d++){var c=l[d];if(c.getAttribute("src")==o||c.getAttribute("data-webpack")==t+i){a=c;break}}a||(u=!0,a=document.createElement("script"),a.charset="utf-8",a.timeout=120,n.nc&&a.setAttribute("nonce",n.nc),a.setAttribute("data-webpack",t+i),a.src=o),e[o]=[r];var f=function(t,n){a.onerror=a.onload=null,clearTimeout(h);var r=e[o];if(delete e[o],a.parentNode&&a.parentNode.removeChild(a),r&&r.forEach((function(e){return e(n)})),t)return t(n)},h=setTimeout(f.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=f.bind(null,a.onerror),a.onload=f.bind(null,a.onload),u&&document.head.appendChild(a)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p=""}(),function(){var e={143:0};n.f.j=function(t,o){var r=n.o(e,t)?e[t]:void 0;if(0!==r)if(r)o.push(r[2]);else{var i=new Promise((function(n,o){r=e[t]=[n,o]}));o.push(r[2]=i);var s=n.p+n.u(t),a=new Error,u=function(o){if(n.o(e,t)&&(r=e[t],0!==r&&(e[t]=void 0),r)){var i=o&&("load"===o.type?"missing":o.type),s=o&&o.target&&o.target.src;a.message="Loading chunk "+t+" failed.\n("+i+": "+s+")",a.name="ChunkLoadError",a.type=i,a.request=s,r[1](a)}};n.l(s,u,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,o){var r,i,s=o[0],a=o[1],u=o[2],l=0;if(s.some((function(t){return 0!==e[t]}))){for(r in a)n.o(a,r)&&(n.m[r]=a[r]);if(u)var d=u(n)}for(t&&t(o);l<s.length;l++)i=s[l],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(d)},o=self["webpackChunkwatermobile_eslintonly"]=self["webpackChunkwatermobile_eslintonly"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=n.O(void 0,[998],(function(){return n(5853)}));o=n.O(o)})();
//# sourceMappingURL=app.b81108ea.js.map
"use strict";(self["webpackChunkvue_project"]=self["webpackChunkvue_project"]||[]).push([[337],{2337:function(t,e,a){a.r(e),a.d(e,{default:function(){return $}});var s=a(3396),i=a(9242),d=a(7139);const c=t=>((0,s.dD)("data-v-d2410b84"),t=t(),(0,s.Cn)(),t),r=c((()=>(0,s._)("h1",{class:"main-heading"},"PRODUCTS",-1))),o={class:"base-container"},l={class:"main-container"},n={class:"category-container"},u={class:"category-table"},h={class:"category-list"},p=["onClick"],g={class:"cards","data-aos":"fade-up"},y=["src"],_={class:"detail-btn",type:"button"},C=["onClick"],m={class:"card-body"},v={class:"card-title"},b={class:"card-text"},w=["onClick","disabled"],k={key:0,class:"bi bi-cart-check"},L={key:1,class:"bi bi-cart-plus"};function f(t,e,a,c,f,D){const P=(0,s.up)("Loading"),T=(0,s.up)("ToastMessages");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s.Wm)(P,{active:f.isLoading},null,8,["active"]),(0,s.Wm)(T),r,(0,s._)("div",o,[(0,s._)("div",l,[(0,s._)("div",n,[(0,s._)("table",u,[(0,s._)("thead",null,[(0,s._)("th",null,[(0,s.wy)((0,s._)("input",{type:"text",class:"search-input",placeholder:"🔍  PRODUCT NAME","onUpdate:modelValue":e[0]||(e[0]=t=>f.keyword=t),onChange:e[1]||(e[1]=(...e)=>t.searchHandler&&t.searchHandler(...e))},null,544),[[i.nr,f.keyword]])])]),(0,s._)("tbody",h,[(0,s._)("tr",null,[(0,s._)("td",{onClick:e[2]||(e[2]=t=>D.selectedCategory(null))},"All")]),((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(f.categoryList,(t=>((0,s.wg)(),(0,s.iD)("tr",{key:t},[(0,s._)("td",null,[(0,s._)("span",{onClick:e=>D.selectedCategory(t)},(0,d.zw)(t),9,p)])])))),128))])])]),(0,s._)("div",g,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(D.filteredProducts?D.filteredProducts:f.products,(e=>((0,s.wg)(),(0,s.iD)("div",{class:"card",style:{width:"15rem"},key:e.id},[(0,s._)("img",{src:e.imageUrl,class:"card-img-top card-img",alt:"product.title"},null,8,y),(0,s._)("button",_,[(0,s._)("i",{class:"bi bi-three-dots-vertical",onClick:t=>D.getProduct(e.id)},null,8,C)]),(0,s._)("div",m,[(0,s._)("h5",v,(0,d.zw)(e.title),1),(0,s._)("p",b,(0,d.zw)(e.unit),1),(0,s._)("p",null,"$ "+(0,d.zw)(t.$filters.currency(e.price)),1),(0,s._)("button",{class:"addToCart-btn",onClick:t=>D.addToCart(e.id),disabled:f.status.loadingItem===e.id},[f.isAddedToCart&&e.id==f.status.addedItem?((0,s.wg)(),(0,s.iD)("i",k)):((0,s.wg)(),(0,s.iD)("i",L))],8,w)])])))),128))])])])],64)}a(7658);var D={inject:["emitter"],data(){return{products:[],status:{addedItem:""},isLoading:!1,isAddedToCart:!1,cartLength:"",categoryList:[],keyword:"",category:null}},methods:{getProducts(){const t="https://vue3-course-api.hexschool.io/api/lamn0125-vue-api/products/all";this.isLoading=!0,this.$http.get(t).then((t=>{this.isLoading=!1,this.products=t.data.products;const e=t.data.products;let a=e.map((t=>t.category));a.forEach((t=>{-1===this.categoryList.indexOf(t)&&this.categoryList.push(t)}))}))},getProduct(t){this.$router.push(`/product/${t}`)},addToCart(t){this.isLoading=!0;const e="https://vue3-course-api.hexschool.io/api/lamn0125-vue-api/cart";this.status.addedItem=t;const a={product_id:t,qty:1};this.$http.post(e,{data:a}).then((t=>{this.isLoading=!1,this.isAddedToCart=!0,this.getCart()}))},getCart(){const t="https://vue3-course-api.hexschool.io/api/lamn0125-vue-api/cart";this.$http.get(t).then((t=>{this.cartLength=t.data.data.carts.length,this.emitter.emit("sendProduct",this.cartLength)}))},selectedCategory(t){this.category=t}},computed:{filteredProducts(){return""!=this.keyword?this.products.filter((t=>t.content.toLowerCase().match(this.keyword.toLowerCase()))):null!=this.category?this.products.filter((t=>t.category===this.category)):void 0}},created(){this.getProducts()}},P=a(89);const T=(0,P.Z)(D,[["render",f],["__scopeId","data-v-d2410b84"]]);var $=T}}]);
//# sourceMappingURL=337.9661fdbb.js.map
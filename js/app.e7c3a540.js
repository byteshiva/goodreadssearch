(function(t){function e(e){for(var s,o,i=e[0],u=e[1],c=e[2],d=0,p=[];d<i.length;d++)o=i[d],n[o]&&p.push(n[o][0]),n[o]=0;for(s in u)Object.prototype.hasOwnProperty.call(u,s)&&(t[s]=u[s]);l&&l(e);while(p.length)p.shift()();return a.push.apply(a,c||[]),r()}function r(){for(var t,e=0;e<a.length;e++){for(var r=a[e],s=!0,i=1;i<r.length;i++){var u=r[i];0!==n[u]&&(s=!1)}s&&(a.splice(e--,1),t=o(o.s=r[0]))}return t}var s={},n={1:0},a=[];function o(e){if(s[e])return s[e].exports;var r=s[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=t,o.c=s,o.d=function(t,e,r){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)o.d(r,s,function(e){return t[e]}.bind(null,s));return r},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],u=i.push.bind(i);i.push=e,i=i.slice();for(var c=0;c<i.length;c++)e(i[c]);var l=u;a.push([4,0]),r()})({2:function(t,e){},3:function(t,e){},4:function(t,e,r){t.exports=r("Vtdi")},EDI0:function(t,e,r){},Vtdi:function(t,e,r){"use strict";r.r(e);r("VRzm");var s=r("Kw5r"),n=r("vDqi"),a=r.n(n),o={},i=a.a.create(o);i.interceptors.request.use(function(t){return t},function(t){return Promise.reject(t)}),i.interceptors.response.use(function(t){return t},function(t){return Promise.reject(t)}),Plugin.install=function(t){t.axios=i,window.axios=i,Object.defineProperties(t.prototype,{axios:{get:function(){return i}},$axios:{get:function(){return i}}})},s["a"].use(Plugin);Plugin;var u=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"app"}},[r("GoodRead",{attrs:{msg:";Goodreads Search Center;"}})],1)},c=[],l=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"gd"},[r("h1",{staticClass:"display-5"},[t._v(t._s(t.msg))]),r("div",{attrs:{id:"app"}},[r("div",{staticClass:"text-center well well-lg"},[r("div",{staticClass:"container"},[r("div",{staticClass:"input-group mb-2 mr-sm-2 mb-sm-0"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.keyword,expression:"keyword"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Type Book name .. ex. Ender Game"},domProps:{value:t.keyword},on:{input:function(e){e.target.composing||(t.keyword=e.target.value)}}}),r("button",{staticClass:"btn btn-outline-primary",attrs:{id:"btn"},on:{click:t.returnResults}},[t._v("Search!")])])])]),r("ul",t._l(t.results,function(e,s){return r("li",{key:s},[t.show?r("div",{staticClass:"card mx-auto",staticStyle:{width:"20rem"}},[r("img",{staticClass:"card-img-top",staticStyle:{width:"100%"},attrs:{src:"",alt:""}}),r("div",{staticClass:"card-block"},[r("h4",{staticClass:"card-title"},[t._v(t._s(e.best_book[0].title[0]))]),r("h5",{staticClass:"card-text"},[t._v("@"+t._s(e.best_book[0].author[0].name[0]))]),t._m(0,!0),r("p",{staticClass:"card-text"},[t._v(t._s(e.average_rating[0]))])])]):t._e()])})),t.pageshow?r("ul",[t.prevshow?r("li",[r("a",{attrs:{href:t.getPrev(1)}},[t._v("Previous")])]):t._e(),t._l(t.getPagination(1),function(e,s,n){return r("li",{key:n},[r("a",{attrs:{href:e+1},on:{click:t.returnResults}},[t._v(t._s(e+1)+" ")])])}),t.nextshow?r("li",[r("a",{attrs:{href:t.getNext(1)}},[t._v("Next")])]):t._e()],2):t._e()])])},d=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("p",{staticClass:"card-text"},[r("i",{staticClass:"fa fa-map-marker fa-lg"})])}],p=(r("OG14"),r("xfY5"),r("CDzl").parseString),f={name:"GoodReads",props:{msg:String,id:Number},data:function(){return{keyword:"",grkey:Object({NODE_ENV:"production",BASE_URL:"/"}).GOODREAD_KEY?Object({NODE_ENV:"production",BASE_URL:"/"}).GOODREAD_KEY:"0IiCewoZagmavCHQVoVyPQ",page:0,show:!1,pageshow:!1,prevshow:!0,nextshow:!0,results:[],query:[],resultsStart:[],resultsEnd:[],totalResults:[],source:[],queryTimeSeconds:[]}},methods:{returnResults:function(){var t=this;this.show=!0,this.page=t.id?t.id:t.page;var e={headers:{"X-Requested-With":"XMLHttpRequest"}};a.a.get("https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search.xml?key="+this.grkey+"&q="+this.keyword+"&page="+this.page,e).then(function(e){p(e.data,function(e,r){t.results=r.GoodreadsResponse.search[0].results[0].work,t.query=r.GoodreadsResponse.search[0].query[0],t.resultsStart=r.GoodreadsResponse.search[0]["results-start"][0],t.resultsEnd=r.GoodreadsResponse.search[0]["results-end"][0],t.totalResults=r.GoodreadsResponse.search[0]["total-results"][0],t.source=r.GoodreadsResponse.search[0]["source"][0],t.queryTimeSeconds=r.GoodreadsResponse.search[0]["query-time-seconds"][0],t.pageshow=!0,t.fireEvent()})}).catch(function(t){return t})},filteredPage:function(){var t=this,e=parseInt(t.totalResults,10);return parseInt(e/20,10)},fireEvent:function(){var t=1,e=2;this.$emit("myEvent",t,e)},getTotalResults:function(){var t=this;return isNaN(parseInt(t.totalResults,10))?1:parseInt(t.totalResults,10)},getResultsStart:function(){var t=this;return isNaN(parseInt(t.resultsStart,10))?1:parseInt(t.resultsStart,10)},getResultsEnd:function(){var t=this;return isNaN(parseInt(t.resultsEnd,10))?1:parseInt(t.resultsEnd,10)},getPrev:function(t){var e=this,r=e.getStartAndEnd(t);return r.start>0?r.start:(e.prevshow=!1,t)},getNext:function(t){var e=this,r=e.getStartAndEnd(t);return t<=e.getTotalResults()?r.end+1:(e.nextshow=!1,t)},getStartAndEnd:function(t){var e=this,r=e.getTotalResults(),s=e.getResultsEnd()-e.getResultsStart(),n=Array.apply(null,{length:r}).map(Number.call,Number),a=parseInt(t-1,10);if(s-a<20)var o=parseInt(s+a,10);return{start:a,end:o,paginationArr:n}},getPagination:function(t){var e=this,r=e.getStartAndEnd(t);return r.paginationArr.slice(r.start,r.end)}},watch:{},computed:{}},h=f,g=(r("cu6J"),r("KHd+")),v=Object(g["a"])(h,l,d,!1,null,"21fadf78",null),m=v.exports,y={name:"app",components:{GoodRead:m}},w=y,_=(r("ZL7j"),Object(g["a"])(w,u,c,!1,null,null,null)),b=_.exports;s["a"].config.productionTip=!1,new s["a"]({render:function(t){return t(b)}}).$mount("#app")},ZL7j:function(t,e,r){"use strict";var s=r("EDI0"),n=r.n(s);n.a},cu6J:function(t,e,r){"use strict";var s=r("ru27"),n=r.n(s);n.a},ru27:function(t,e,r){}});
//# sourceMappingURL=app.e7c3a540.js.map
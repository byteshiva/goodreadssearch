<template>
  <div class="gd">
    <h1 class="display-5">{{ msg }}</h1>
    <div id="app">
        <div class="text-center well well-lg">
            <div class="container">
                <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                    <input type="text" class="form-control" v-model="keyword" placeholder="Type Book name .. ex. Ender Game">
                    <button id="btn" class="btn btn-outline-primary" @click="returnResults">Search!</button>
                </div>
            </div>
        </div>
        <div class="loader" v-if="loading"></div>
        <ul v-if="clearpage">
            <li v-for="(work, index) in results"  :key="index">
                <div class="card mx-auto" v-if="show" style="width: 20rem;">
                    <img class="card-img-top" src="" alt="" style="width:100%;">
                    <div class="card-block">
                        <h4 class="card-title">{{work.best_book[0].title[0]}}</h4>
                        <h5 class="card-text">@{{work.best_book[0].author[0].name[0]}}</h5>
                        <p class="card-text"><i class="fa fa-map-marker fa-lg"></i> </p>
                        <p class="card-text">{{work.average_rating[0]}}</p>
                    </div>
                </div>
            </li>
        </ul>
         <ul v-if="pageshow">
            <li v-if="prevshow">
                <router-link :to="{ name: 'pager', params: { id: getPrev(), kword: keyword }}">Prev</router-link>
            </li>
                <li v-for="(item, key, index) in getPagination ()"  :key="index">
                <router-link :to="{ name: 'pager', params: { id: item + 1, kword: keyword }}">{{ item + 1}}</router-link>
            </li>
            <li v-if="nextshow" >
                <router-link :to="{ name: 'pager', params: { id: getNext(), kword: keyword }}">Next</router-link>
            </li>
        </ul>
    </div> 
  </div>
</template>

<script>
import axios from 'axios';
var parseString = require('xml2js').parseString;


export default {
    name: 'GoodReads',
    props: {
        msg: {
            type: String,
            default: 'Vue!'
        },
        id: {
            type: Number,
            default: 0
        },
        gdenv: {
            type: String,
            default: 'prod'
        },
        gdrelpath: {
            type: String,
            default: '/goodreadssearch/'
        },
    },
    data: function () {
        return {
            keyword: '',
            loading: false,
            clearpage: true,
            grkey: (process.env.GOODREAD_KEY)?process.env.GOODREAD_KEY:'0IiCewoZagmavCHQVoVyPQ',
            page: 0,
            show: false,
            pageshow: false,
            prevshow: true,
            nextshow: true,
            results: [],
            query: [],
            resultsStart: [],
            resultsEnd: [],
            totalResults: [],
            source: [],
            queryTimeSeconds: [],
            btnclicked: true,
            baseurlgh: '',
        }
    },
    methods: {
        beforeReturnResultFn () {
            var obj = this;
            // Check if the flow is from pagination or from submit button
            if(!obj.btnclicked) {
                obj.btnclicked = true;
            } 
            else  {
                // If button clicked reset the navigation to root,ie., '/'
                this.$router.push({ name: 'home', path: '/' });
            }
            return true;
        },
        postReturnResultFn () {
            // You can any cleanup methods if needed
            return true;
        },
        returnResults: function() {
            var obj = this;
            this.show = true;
            this.page = (obj.$route.params.pd)?(obj.$route.params.pd):obj.page;
            var config = {headers: {"X-Requested-With" : "XMLHttpRequest"}};
            // Run any pre-step calls
            obj.beforeReturnResultFn ();

            obj.keyword = (obj.keyword)?(obj.keyword):obj.$route.params.kw;
            obj.loading = true;
            obj.pageshow = false;
            obj.clearpage = false;
            axios.get("https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search.xml?key="+ this.grkey + "&q=" + this.keyword + '&page=' + this.page, config )
            .then(function(response){
                parseString(response.data, function (err, result) {
                    obj.results = result.GoodreadsResponse.search[0].results[0].work;
                    obj.query = result.GoodreadsResponse.search[0].query[0];
                    obj.resultsStart = result.GoodreadsResponse.search[0]['results-start'][0];
                    obj.resultsEnd = result.GoodreadsResponse.search[0]['results-end'][0];
                    obj.totalResults = result.GoodreadsResponse.search[0]['total-results'][0];
                    obj.source = result.GoodreadsResponse.search[0]['source'][0];
                    obj.queryTimeSeconds = result.GoodreadsResponse.search[0]['query-time-seconds'][0];
                    obj.pageshow = true;
                    obj.clearpage = true;
                    obj.loading = false;
                });        
            }).catch(function(error){
                obj.pageshow = false;
                obj.clearpage = true;
                obj.loading = false;
                return error;
            });
            obj.postReturnResultFn();
        },
        returnPageResults () {
            var obj = this;
            if(obj.btnclicked) {
                obj.btnclicked = false;
            }
            obj.returnResults();
            return true;
        },
        getTotalResults () {
            var obj = this;
            if (isNaN(parseInt(obj.totalResults, 10))) {
                return 1;
            } else {
                return parseInt(obj.totalResults, 10);
            }
        },
        getResultsStart () {
            var obj = this;
            if (isNaN(parseInt(obj.resultsStart, 10))){
                return 1;
            } else {
                return parseInt(obj.resultsStart, 10);
            }
        },
        getResultsEnd () {
            var obj = this;
            if (isNaN(parseInt(obj.resultsEnd, 10))){
                return 1;
            } else {
                return parseInt(obj.resultsEnd, 10);
            }
        },
        getPrev () {
            var obj = this;
            var selectedPage = (obj.$route.params.id != undefined)?(obj.$route.params.id):obj.page+1;
            var retObj = obj.getStartAndEnd(selectedPage);
            if(retObj.start > 0){
                return retObj.start;
            }
            obj.prevshow = false;
            return selectedPage;
        },
        getNext () {
            var obj = this;
            var selectedPage = (obj.$route.params.id != undefined)?(obj.$route.params.id):obj.page+1;
            var retObj = obj.getStartAndEnd(selectedPage);
            if(selectedPage <= obj.getTotalResults()) {
                return retObj.end + 1;
            }
            obj.nextshow = false;
            return selectedPage;
        },
        getStartAndEnd (selectedPage) {
            var obj = this;
            var N = obj.getTotalResults();
            var resultsPerPage = (obj.getResultsEnd() - obj.getResultsStart()); 
            var paginationArr = Array.apply(null, {length: N}).map(Number.call, Number);
            var start =  parseInt((selectedPage - 1), 10);
            if ((resultsPerPage - start) < 20)
            var end = parseInt(resultsPerPage + start, 10);
            if(end > N) {
                var end = N;
            }
            return {start, end, paginationArr};
        }, 
        getPagination () {
            var obj = this;
            var N = obj.getTotalResults();

            var selectedPage = (obj.$route.params.id != undefined)?(obj.$route.params.id):obj.page+1;
            console.log(selectedPage, N);
            if (selectedPage > 1) 
                obj.prevshow = true;
            
            if(selectedPage < N)
                obj.nextshow = true;

            var retObj = obj.getStartAndEnd(selectedPage);
            return retObj.paginationArr.slice(retObj.start, retObj.end);
        },
        getUrl (id, keyword) {
            return "/pd/" + id + "/kw/" + keyword;
        },
        fetchData () {
            // console.log(this.$route.params);
        }
  },
  watch: {
    '$route': 'returnPageResults'
  },
  computed: {

 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loading {
  position: absolute;
  top: 10px;
  right: 10px;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

/* Center the loader */
.loader {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 1;
    width: 150px;
    height: 150px;
    margin: -75px 0 0 -75px;
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid skyblue;
    border-right: 16px solid green;
    border-bottom: 16px solid red;
    border-left: 16px solid pink;
    width: 120px;
    height: 120px;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
}

@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Add animation to "page content" */
.animate-bottom {
  position: relative;
  -webkit-animation-name: animatebottom;
  -webkit-animation-duration: 1s;
  animation-name: animatebottom;
  animation-duration: 1s
}

@-webkit-keyframes animatebottom {
  from { bottom:-100px; opacity:0 } 
  to { bottom:0px; opacity:1 }
}

@keyframes animatebottom { 
  from{ bottom:-100px; opacity:0 } 
  to{ bottom:0; opacity:1 }
}
</style>

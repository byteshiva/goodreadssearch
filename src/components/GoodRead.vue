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
        <ul>
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
            <li v-if="prevshow"><a :href="getPrev(1)">Previous</a></li>
                <li v-for="(item, key, index) in getPagination (1)"  :key="index">
                <a :href="item+1" @click="returnResults" >{{ item + 1}} </a>
            </li>
            <li v-if="nextshow" ><a :href="getNext(1)">Next</a></li>
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
        msg: String,
        id: Number
    },
    data: function () {
        return {
            keyword: '',
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
            queryTimeSeconds: []
        }
    },
    methods: {
        returnResults: function() {
            var obj = this;
            this.show = true;
            this.page = (obj.id)?(obj.id):obj.page;
            var config = {headers: {"X-Requested-With" : "XMLHttpRequest"}};
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
                    obj.fireEvent();
                });        
            }).catch(function(error){
                return error;
            });
    },
    filteredPage () {
      var obj = this;
      var totalres = parseInt(obj.totalResults, 10);
      return parseInt((totalres / 20), 10);
    },
    fireEvent () {
        var eventValueOne=1, eventValueTwo=2;
        this.$emit('myEvent', eventValueOne, eventValueTwo);
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
    getPrev (selectedPage) {
        var obj = this;
        var retObj = obj.getStartAndEnd(selectedPage);
        if(retObj.start > 0){
            return retObj.start;
        }
        obj.prevshow = false;
        return selectedPage;
    },
    getNext (selectedPage) {
        var obj = this;
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
        return {start, end, paginationArr};
    }, 
    getPagination (selectedPage) {
        var obj = this;
        var retObj = obj.getStartAndEnd(selectedPage);
        return retObj.paginationArr.slice(retObj.start, retObj.end);
    }
  },
  watch: {
    
  },
  computed: {

 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>

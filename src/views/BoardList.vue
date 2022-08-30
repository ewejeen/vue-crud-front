<!-- PageHome.vue -->
<template>
  <div class="list">
    <h1>공지사항</h1>
    <table>
      <colgroup>
        <col style="width: 50px;">
        <col>
        <col style="width: 200px;">
        <col style="width: 150px;">
      </colgroup>
      <thead>
        <tr>
          <th scope="col">번호</th>
          <th scope="col">제목</th>
          <th scope="col">작성일</th>
          <th scope="col">작성자</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!list">
          <td colspan="4">게시글이 없습니다.</td>
        </tr>
        <tr v-for="(item, idx) in filteredList" v-bind:key="idx">
          <td>{{item.rnum}}</td>
          <td>{{item.title}}</td>
          <td>{{item.registerDate}}</td>
          <td>{{item.registerName}}</td>
        </tr>
      </tbody>
    </table>

<!--    <div class="paging-box textCenter paging">
      <ui:pagination paginationInfo="${paginationInfo}" type="image" jsFunction="fn_link_page" />
      <form:hidden path="pageIndex" />
      <input type="hidden" id="currentPageNo" name="currentPageNo" />
    </div>-->

    <div id="paging">
      <form>
        <button v-for="i in filteredPaging" :class="{on: i==this.paging.pageNo}" v-bind:key="i">{{i}}</button>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'BoardList',
  components: {
   // HelloWorld
  },
  data() { //변수생성
    return {
      requestBody: {}, //리스트 페이지 데이터전송
      list: [], //리스트 데이터
      paging: {
        totalCount: 0,
        pageNo: 0,
        pageSize: 0,
      },
      pageList: []
    }
  },
  mounted() {
    this.fnGetList()
  },
  methods: {
    fnGetList() {
      this.requestBody = { // 데이터 전송
        //searchKeyword: 'R&D',
        pageNo: this.pageNo
      }

      this.$axios.get("/board/getList", {
        params: this.requestBody,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json; charset = utf-8'
        }
      }).then((res) => {
        this.list = res.data.list;
        this.paging = res.data.paging;

        for(let s=1;s<=res.data.paging.totalCount;s++){
          this.pageList.push(s);
        }
      }).catch((err) => {
        if (err.message.indexOf('Network Error') > -1) {
          alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
        }
      })
    }
  },

  // 리스트 날짜 필터, 페이징 숫자 추가
  computed : {
    filteredList() {
      this.list.map((item, index) => {
        if(item.registerDate){
          const js_date = new Date(item.registerDate);
          let year = js_date.getFullYear();
          let month = js_date.getMonth() + 1;
          let day = js_date.getDate();

          if(month < 10) month = '0' + month;
          if(day < 10) day = '0' + day;
          item.registerDate = year + '-' + month + '-' + day;
        }

        const paging = this.paging;
        item.rnum = paging.totalCount - ((paging.pageNo - 1) * paging.pageSize  + index);
      })

      return this.list;
    },
    filteredPaging(){
      let returnList = [];
      this.pageList.map((item) => {
        if(item >= this.paging.startPageNo && item <= this.paging.endPageNo){
          returnList.push(item);
        }
      })

      return returnList;
    }
  }
}
</script>

<style scoped>
  .list{min-height:700px;}
  table { width: 1000px; margin:0 auto;}
  table th,td{border: 1px solid #aaa; border-collapse: collapse;}

  #paging{margin-top:40px;}
  #paging button{cursor:pointer; margin-right:10px; background: white; border: 1px solid #aaa; border-radius:5px; width:30px; text-align:center}
  #paging button.on{font-weight:bold; background:black; color:white;}
</style>
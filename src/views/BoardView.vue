<!-- PageHome.vue -->
<template>
  <div class="list">
    <h1>공지사항</h1>
    <div id="tableDiv">
      <h2 style="margin-top:10px;">{{item.title}}</h2>
      <table>
        <colgroup>
          <col style="width:20%">
          <col>
          <col style="width:20%">
          <col>
        </colgroup>
        <tr>
          <th>작성자</th>
          <td>{{item.registerName}}</td>
          <th>작성일</th>
          <td>{{item.registerDate}}</td>
        </tr>
        <tr>
          <th>내용</th>
          <td colspan="3">{{item.contents}}</td>
        </tr>
      </table>

    </div>

  </div>
</template>

<script>

export default {
  name: 'BoardView',
  components: {
  },
  data() { //변수생성
    return {
      requestBody: {}, //리스트 페이지 데이터전송
      idxno:0,
      item: {}
    }
  },
  mounted() {
    this.fnGetView(this.rnum)
  },
  methods: {
    fnGetView() {
      this.idxno = this.$route.params.rnum;

      this.requestBody = { // 데이터 전송
        //searchKeyword: 'R&D',
        idxno: this.idxno
      }

      this.$axios.get("/board/getDetail", {
        params: this.requestBody,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json; charset = utf-8'
        }
      }).then((res) => {
        this.item = res.data;

        console.log(res.data)
      }).catch((err) => {
        if (err.message.indexOf('Network Error') > -1) {
          alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
        } else{
          alert('서버 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.')
        }
      })
    }
  },

  computed : {

  }
}
</script>

<style scoped>
  .list{min-height:700px;}
  table { width: 1000px; margin:0 auto; }
  table th,td{border: 1px solid #aaa; border-collapse: collapse;}

  #paging{margin-top:40px;}
  #paging button{cursor:pointer; margin-right:10px; background: white; border: 1px solid #aaa; border-radius:5px; width:30px; text-align:center}
  #paging button.on{font-weight:bold; background:black; color:white;}
</style>
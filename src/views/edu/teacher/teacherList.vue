<template>
  <div>
    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <!--    <el-table-column slot-scope="scope">-->
      <!--      {{ (page - 1) * limit + scope.$index + 1 }}-->
      <!--    </el-table-column>-->

      <el-table-column
        prop="name"
        label="姓名"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        label="头衔"
        header-align="center"
        align="center">
        <template slot-scope="scope">
          {{ scope.row.level === 1 ? '高级讲师' : '首席讲师' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="intro"
        label="资历"
        header-align="center"
        align="center">
      </el-table-column>

      <el-table-column
        prop="gmtCreate"
        label="添加时间"
        header-align="center"
        align="center">
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="text-align: right"
      layout="prev, pager, next"
      @current-change="getTeacherList">
    </el-pagination>
  </div>
</template>

<script>
import teacherApi from '@/api/teacher/teacherApi'

export default {
  data() {
    return {
      page: 1,
      limit: 1,
      total: 0,
      teacherQuery: {},
      list: null
    }
  },
  created() {
    this.getTeacherList()
  },
  methods: {
    /* 讲师列表 */
    getTeacherList(page = 1) {
      this.page = page
      teacherApi.getTeacherListPage(this.page, this.limit, this.teacherQuery)
        /* 请求成功 */
        .then(response => {
          this.list = response.data.rows
          this.total = response.data.total
          console.log(this.list)
        })
        /* 请求失败 */
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

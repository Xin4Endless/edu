<template>
  <div>
    <el-form :inline="true"  class="el-form--inline">
      <el-form-item label="姓名：">
        <el-input v-model="teacherQuery.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacherQuery.level" clearable placeholder="讲师头衔">
          <el-option :value="1" label="高级讲师"></el-option>
          <el-option :value="2" label="首席讲师"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker
          v-model="teacherQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm;:ss"
          default-time="00:00:00">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker
          v-model="teacherQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm;:ss"
          default-time="00:00:00">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <!--      <el-table-column slot-scope="scope">-->
      <!--        {{ (page - 1) * limit + scope.$index + 1 }}-->
      <!--      </el-table-column>-->

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
      limit: 5,
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

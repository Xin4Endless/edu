<template>
  <div>
    <el-form :inline="true" class="el-form-inline" size="medium">
      <el-form-item label="姓名：">
        <el-input v-model="teacherQuery.name" placeholder="姓名" />
      </el-form-item>
      <el-form-item label="讲师头衔：">
        <el-select v-model="teacherQuery.level" clearable placeholder="讲师头衔">
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间：">
        <el-date-picker
          v-model="teacherQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm;:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item label="结束时间：">
        <el-date-picker
          v-model="teacherQuery.end"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm;:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getTeacherList()">查询</el-button>
        <el-button type="default" @click="resetData()">清空</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="list"
      stripe
      style="width: 100%"
    >
      <el-table-column
        prop="name"
        label="姓名"
        header-align="center"
        align="center"
      />
      <el-table-column
        label="头衔"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.level === 1 ? '高级讲师' : '首席讲师' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="intro"
        label="资历"
        header-align="center"
        align="center"
      />

      <el-table-column
        prop="gmtCreate"
        label="添加时间"
        header-align="center"
        align="center"
      />

      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        label="操作"
      >
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/'+scope.row.id">
            <el-button size="small">修改</el-button>
          </router-link>
          <el-button type="danger" size="small" @click="delTeacher(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="text-align: right"
      layout="total, prev, pager, next"
      @current-change="getTeacherList"
    />
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
        })
        /* 请求失败 */
        .catch(error => {
          console.log(error)
        })
    },
    delTeacher(row) {
      this.$confirm('是否删除' + row.name + '讲师', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        teacherApi.delTeacherByid(row.id)
          .then(response => {
            this.getTeacherList()
            this.$message.success(row.name + ',删除成功')
          })
          .catch(error => {
            this.getTeacherList()
            this.$message.error('删除失败，请联系管理员')
          })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    resetData() {
      this.teacherQuery = {}
      this.getTeacherList()
    }
  }
}
</script>

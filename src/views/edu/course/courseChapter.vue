<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px" finish-status="success">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="发布课程" />
    </el-steps>
    <el-form label-width="120px">

      <el-form-item>
        <el-button @click="previous">上一步</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CourseChapter',
  data() {
    return {
      saveBtnDisabled: false,
      courseId: 1,
      courseInfo: {}
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id
      // this.getTeacherByid(id)
    }
  },
  methods: {
    previous() {
      this.$router.push({ path: '/course/courseInfo/' + this.courseId })
    },
    next() {
      this.$router.push({ path: '/course/coursePublish/' + this.courseId })
    }
  }
}
</script>

<style scoped>

</style>

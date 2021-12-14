<template>
  <el-dialog title="修改讲师信息" :visible.sync="dialogFormTeacher.value">
    <el-form label-position="right" label-width="180px">
      <el-form-item label="讲师姓名：">
        <el-input v-model="teacher.name"></el-input>
      </el-form-item>
      <el-form-item label="讲师排序：">
        <el-input-number v-model="teacher.sort" controls-position="right" min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="讲师头衔：">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历：">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="讲师简介：">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"></el-input>
      </el-form-item>
<!--      <el-form-item>-->
<!--        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdateTeacher">保存</el-button>-->
<!--      </el-form-item>-->
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'UpdateTeacherInfo',
  props: {
    dialogFormTeacher: Object
  },
  data() {
    return {
      teacher: {}
    }
  }, created() {
  }, methods: {}
}
</script>

<style scoped>

</style>

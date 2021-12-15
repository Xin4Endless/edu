<template>
  <div class="app-container">
    添加讲师
    <el-form label-position="right" label-width="180px">
      <el-form-item label="讲师姓名：">
        <el-input v-model="teacher.name" />
      </el-form-item>
      <el-form-item label="讲师排序：">
        <el-input-number v-model="teacher.sort" controls-position="right" :min="0" />
      </el-form-item>
      <el-form-item label="讲师头衔：">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历：">
        <el-input v-model="teacher.career" />
      </el-form-item>
      <el-form-item label="讲师简介：">
        <el-input v-model="teacher.intro" :rows="10" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrupdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import teacherApi from '@/api/teacher/teacherApi'

export default {
  data() {
    return {
      teacher: {},
      saveBtnDisabled: false
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id
      this.getTeacherByid(id)
    }
  },
  methods: {
    getTeacherByid(id) {
      teacherApi.getTeacherInfoByid(id).then(response => {
        this.teacher = response.data.teacher
      })
    },
    saveOrupdate() {
      if (this.teacher.id) {
        this.updateTeacherInfo()
      } else {
        this.saveTeacher()
      }
    },
    saveTeacher() {
      teacherApi.saveTeacher(this.teacher).then(response => {
        this.$message.success('添加讲师成功。')
        this.$router.push(
          { path: '/teacher/table' }
        )
      }).catch(error => {
        this.$message.error('添加失败')
      })
    },
    updateTeacherInfo() {
      teacherApi.updateTeacher(this.teacher).then(response => {
        this.$message.success('修改成功。')
        this.$router.push(
          { path: '/teacher/table' }
        )
      }).catch(error => {
        this.$message.error('修改失败。')
      })
    }
  }
}
</script>

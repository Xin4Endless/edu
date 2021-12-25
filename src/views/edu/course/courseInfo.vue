<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px" finish-status="success">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="发布课程" />
    </el-steps>
    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" style="width: 90%" placeholder="输入课程标题" />
      </el-form-item>
      <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="课程分类">
        <el-select v-model="courseInfo.subjectParentId" placeholder="一级分类" @change="getChildSubjcet">
          <el-option
            v-for="subject in subjectList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
        <el-select v-model="courseInfo.subjectId" placeholder="二级分类">
          <el-option
            v-for="child in subjectListChild"
            :key="child.id"
            :label="child.title"
            :value="child.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="总课时">
        <el-input-number
          v-model="courseInfo.lessonNum"
          style="width: 30%"
          controls-position="rigth"
          :min="1"
          placeholder="0"
        />
      </el-form-item>
      <el-form-item label="课程简介">
        <el-input v-model="courseInfo.description" style="width: 90%" :rows="10" type="textarea" placeholder="输入课程简介" />
      </el-form-item>
      <el-form-item label="课程价格">
        <el-input-number
          v-model="courseInfo.price"
          style="width: 30%"
          :precision="2"
          :step="0.1"
          controls-position="rigth"
          :min="1"
          placeholder="0"
        />
        元
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import courseApi from '@/api/course/courseApi'
import teacherApi from '@/api/teacher/teacherApi'
import subjectApi from '@/api/subject/subjectApi'

export default {
  name: 'CourseInfo',
  data() {
    return {
      saveBtnDisabled: false,
      courseInfo: { subjectId: '' },
      teacherList: [],
      subjectList: [],
      subjectListChild: []
    }
  },
  created() {
    this.getTeacher()
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id
      this.getCourseInfo(id)
    } else {
      this.getSubject()
    }
  },
  methods: {
    getChildSubjcet(value) {
      for (const subjectListElement of this.subjectList) {
        if (subjectListElement.id === value) {
          this.subjectListChild = subjectListElement.children
          this.courseInfo.subjectId = null
        }
      }
    },
    getSubject(subjectParentId) {
      subjectApi.getSubjectListTree()
        .then(response => {
          this.subjectList = response.data.list
          // 添加判断如果父类的课程ID不为空的时候，需要手动设置下级数据
          if (subjectParentId != null) {
            for (const subjectListElement of this.subjectList) {
              if (subjectListElement.id === subjectParentId) {
                this.subjectListChild = subjectListElement.children
              }
            }
          }
        }).catch()
    },
    getCourseInfo(id) {
      courseApi.getCourseInfo(id)
        .then(response => {
          this.courseInfo = response.data.info
          this.getSubject(this.courseInfo.subjectParentId)
        }).catch()
    },
    saveOrUpdate() {
      if (this.courseInfo.id) {
        this.updateCourse()
      } else {
        this.addCourse()
      }
    },
    addCourse() {
      courseApi.addCourse(this.courseInfo).then(
        response => {
          this.$message.success('保存成功')
          this.$router.push({ path: '/course/courseChapter/' + response.data.courseid })
        }
      ).catch(
        error => {
          this.$message.error('保存失败')
        }
      )
    },
    updateCourse() {
      courseApi.updateCourseInfo(this.courseInfo)
        .then(response => {
          this.$message.success('修改成功')
          this.$router.push({ path: '/course/courseChapter/' + this.courseInfo.id })
        }).catch()
    },
    getTeacher() {
      teacherApi.getAllTeacher().then(response => {
        this.teacherList = response.data.item
      }
      ).catch()
    }
  }
}
</script>

<style scoped>

</style>

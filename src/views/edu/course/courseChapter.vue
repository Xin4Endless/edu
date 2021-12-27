<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px" finish-status="success">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="发布课程" />
    </el-steps>

    <el-form label-width="120px">
      <ul class="chanpterList">
        <li v-for="chapter in chapterList" :key="chapter.id">
          <p>
            {{ chapter.title }}
            <span class="acts">
              <!--              <el-button type="text">添加课时</el-button>-->
              <el-button style="" type="text" @click="openEditChapter(chapter.id)">编辑</el-button>
              <el-button type="text" @click="deleteChapterByid(chapter.id)">删除</el-button>
            </span>
          </p>
          <ul class="chanpterList childrenList">
            <li v-for="children in chapter.children" :key="children.id">
              <p>
                {{ children.title }}
              </p>
              <span class="acts">
                <el-button type="text">编辑</el-button>
                <el-button type="text">删除</el-button>
              </span>
            </li>
          </ul>
        </li>
      </ul>
      <el-form-item>
        <el-button @click="chapterFormVisble=true">添加章节</el-button>
        <el-button @click="previous">上一步</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="chapterFormVisble" title="添加章节">
      <el-form :model="chapter" label-width="120px">
        <el-form-item label="章节标题">
          <el-input v-model="chapter.title" />
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number v-model="chapter.sort" :min="0" controls-position="right" />
        </el-form-item>
      </el-form>
      <div>
        <el-button @click="chapterFormVisble = false">
          取消
        </el-button>
        <el-button type="primary" @click="saveOrUpdate">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ChapterApi from '@/api/chapter/chapterApi'
import chapterApi from '@/api/chapter/chapterApi'

export default {
  name: 'CourseChapter',
  data() {
    return {
      saveBtnDisabled: false,
      courseId: 1,
      chapterList: [],
      chapter: {},
      chapterFormVisble: false
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id
      this.chapter.courseId = this.courseId
    }
    this.getChapterTree()
  },
  methods: {
    saveOrUpdate() {
      if (JSON.stringify(this.chapter) !== sessionStorage.getItem('chapterInfo')) {
        if (this.chapter.id) {
          this.updateChapter()
        } else {
          this.addChapter()
        }
      } else {
        this.chapterFormVisble = false
        this.$message.warning('数据未发生变化')
      }
    },
    updateChapter() {
      chapterApi.updateChapter(this.chapter).then(reponse => {
        this.$message.success('修改成功')
        this.chapterFormVisble = false
        this.getChapterTree()
      })
    },
    deleteChapterByid(id) {
      this.$confirm('此操作会永久删除章节记录，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        chapterApi.deleteChapterById(id).then(reponse => {
          this.$message.success('删除成功')
          this.getChapterTree()
        }).catch()
      })
    },
    addChapter() {
      chapterApi.addChapter(this.chapter).then(
        response => {
          this.$message.success('添加成功')
          this.chapterFormVisble = false
          this.getChapterTree()
        }
      ).catch()
    },
    openEditChapter(id) {
      this.chapterFormVisble = true
      chapterApi.getChapterInfo(id).then(reponse => {
        this.chapter = reponse.data.chapterInfo
        sessionStorage.setItem('chapterInfo', JSON.stringify(this.chapter))
      })
    },
    getChapterTree() {
      ChapterApi.getChapterList(this.courseId)
        .then(response => {
          this.chapterList = response.data.list
        }).catch()
    },
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
.chanpterList{
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.chanpterList Li{
  position: relative;
}
.chanpterList p{
  float: left;
  position: relative;
  font-size: 15px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #DDD;
}
.chanpterList .acts{
  float: right;
  position: relative;
  z-index: 1;
  font-size: 14px;
}
.childrenList{
  padding-left: 50px;
}
.childrenList p{
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #DDD;
}
</style>

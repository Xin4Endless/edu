<template>
  <el-form>
    <el-form-item label="选择Excel">
      <el-upload
        ref="upload"
        :on-success="fileUploadSuccess"
        :on-error="fileUploadError"
        :disabled="importBtnDisabled"
        :limit="1"
        class="upload-demo"
        :action="BASE_API+`/eduservice/subject/addSubject`"
        :auto-upload="false"
        name="file"
      >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button :loading="loading" style="margin-left: 10px;" size="small" type="success" @click="submitUpload">
          上传到服务器
        </el-button>
      </el-upload>
    </el-form-item>
  </el-form>

</template>

<script>
export default {
  data: function() {
    return {
      BASE_API: process.env.VUE_APP_BASE_API,
      importBtnDisabled: false,
      loading: false
    }
  },
  created() {

  },
  methods: {
    submitUpload() {
      this.importBtnDisabled = true
      this.loading = true
      this.$refs.upload.submit()
    },
    fileUploadSuccess() {
      this.loading = false
      this.$message.success('上传成功')
    },
    fileUploadError() {
      this.loading = false
      this.$message.error('上传失败')
    }
  }
}
</script>

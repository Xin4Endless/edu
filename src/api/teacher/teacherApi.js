import request from '@/utils/request'

export default {
  /* 讲师列表获取（分页带条件）*/
  getTeacherListPage(current, limit, teacherQuery) {
    return request({
      url: `/eduservice/teacher/pageTeacherCondition/${current}/${limit}`,
      method: 'post',
      /* 条件对象 后段使用RequestBody接收 */
      /* data 表示將数据转换为Json对象 */
      data: teacherQuery
    })
  }
}

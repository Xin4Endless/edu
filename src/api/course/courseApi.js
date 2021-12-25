import request from '@/utils/request'

export default {

  addCourse(courseInfo) {
    return request({
      url: `/eduservice/course/addCourse`,
      method: 'post',
      data: courseInfo
    })
  },
  getCourseInfo(id) {
    return request({
      url: `/eduservice/course/getCourseInfo/${id}`,
      method: 'get'
    })
  },
  updateCourseInfo(courseInfo) {
    return request({
      url: `/eduservice/course/updateCourseInfo`,
      method: 'post',
      data: courseInfo
    })
  }
}

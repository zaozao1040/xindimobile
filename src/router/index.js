import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home.vue'
import Introduction from '@/pages/introduction/Introduction.vue'
import Teacher from '@/pages/teacher/Teacher.vue'
import TeacherDetail from '@/pages/teacher/TeacherDetail.vue'
import Works from '@/pages/works/Works.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home/',
      name: 'Home',
      component: Home
    },{
      path: '/introduction/',
      name: 'Introduction',
      component: Introduction
    },{
      path: '/teacher/',
      name: 'Teacher',
      component: Teacher
    },{
      path: '/teacherDetail/',
      name: 'TeacherDetail',
      component: TeacherDetail
    },{
      path: '/works/',
      name: 'Works',
      component: Works
    }
  ]
})

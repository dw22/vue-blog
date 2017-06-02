import Main from './views/main'
import Login from './views/login'
import AddPost from './views/addPost'
import PostList from './views/postList'
import Tags from './views/tags'
import Categorites from './views/categorites'
const routes = [
  {
    path:'/',
    component:Main,
    children:[
      {path:'/',component:AddPost},
      {path:'/addPost',component:AddPost},
      {path:'/editPost',component:AddPost},
      {path:'/postList',component:PostList},
      {path:'/tags',component:Tags},
      {path:'/categorites',component:Categorites}
    ]
  },
  {path:'/login',component:Login},
]
export default routes
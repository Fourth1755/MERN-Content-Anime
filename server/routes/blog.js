const express =require("express")
const router =express.Router()
const {create, getAllBlogs,singleBlog,searchBlog,removeBlog,updateBlog} =require("../controllers/blogController")
const {requireLogin} =require("../controllers/authController")

//router.get('/blog',create)
router.post('/create',requireLogin,create)
router.get('/blogs',getAllBlogs)
router.get('/blog/:slug',singleBlog)
router.get('/search/:key',searchBlog)
router.delete('/blog/:slug',requireLogin,removeBlog)
router.put('/blog/:slug',requireLogin,updateBlog)

module.exports=router
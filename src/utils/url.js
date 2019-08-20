export default{
    //登录
    login:()=>"/user/login",
    //获取帖子列表
    getPostList:()=>"/post?filter=${encodeFilter(postListFilter)}",
    //获取帖子详情
    getPostById:id=>"post?filter=${encodeFilter(postByIdFilter(id))}",
    //新建帖子
    createPost:()=>"/post",
    //修改帖子
    updatePost:id=>"/post/${id}",
    //获取评论列表
    getCommentList:postId=>
        "/comment?filter=${encodeFilter(commentListFilter(postId))}",
    //新建评论
    createComment:()=>"/comment"
}

const postListFilter = {
    fields:["id","title","author","vote","updateAt"],
    limit:10,
    order:"updatedAt DESC",
    include:"authorPointer",
    includefilter:{user:{fields:["id","username"]}}
};

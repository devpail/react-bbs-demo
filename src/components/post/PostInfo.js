//负责获取帖子详情数据、修改帖子、展示和创建帖子的评论
import React from 'react'
import {post, get, put} from "../../utils/request";
import url from "../../utils/url"
import PostEditor from "./PostEditor";
import PostView from "./PostView";
import CommentList from "./comment/CommentList";
import './PostInfo.css'

class PostInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            post:null,
            comments:[],
            editing:false
        }
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
        this.handlePostInfoSave = this.handlePostInfoSave.bind(this);
        this.handlePostCancel = this.handlePostCancel.bind(this);
        this.refreshComments = this.refreshComments.bind(this);
        this.refreshPostInfo = this.refreshPostInfo.bind(this);
    }

    //挂载完组件后Post调用后台API获取帖子详情和帖子的评论数据
    componentDidMount() {
        //获取帖子详情
        this.refreshPostInfo()
        //获取帖子评论数据
        this.refreshComments()
    }

    //获取帖子详情
    refreshPostInfo(){
        const postId = this.props.match.params.id;
        get(url.getPostById(postId)).then(data=>{
            if(!data.error&& data.length===1){
                this.setState({
                    post:data[0]
                })
            }
        })
    }

    //获取评论列表
    refreshComments(){
        const postId = this.props.match.params.id;
        get(url.getCommentList(postId)).then(data=>{
            console.info(data);
            if(!data.error){
                this.setState({
                    comments:data
                })
            }
        })
    }



    //让帖子处于编辑状态
    handleEditClick(){
        console.info(this.state);
        this.setState({
            editing:true
        })

    }

    //取消编辑帖子
    handlePostCancel(){
        console.info(this.state);
        this.setState({
            editing:false
        })

    }

    //PostEditor会调用这个方法提交修改后的帖子信息
    handlePostInfoSave(data){
        console.info(this.props);
        const id = this.props.match.params.id;
        this.savePostInfo(id,data);
    }

    savePostInfo(id,post){
        put(url.updatePost(id),post).then(data=>{
            if(!data.error){
                /*
                * 因为返回的帖子对象只有author的id信息，
                * 所有需要额外把完整的author信息合并到帖子对象中
                * */
                const newPost ={
                    ...data,
                    author:this.state.post.author
                }
                this.setState({
                    post:newPost,
                    editing:false
                })
            }
        })
    }


    //处理子页面的提交评论请求
    handleCommentSubmit(content){
        console.info("handleCommentSubmit");
        const postId = this.props.match.params.id;
        const comment = {
            author: this.props.userId,
            post: postId,
            content: content
        };
        this.saveComment(comment);
    }


    //保存新评论到服务器
    saveComment(comment){
        console.info("saveComment");
        post(url.createComment(),comment).then(data=>{
            if(!data.error){
                this.refreshComments();
            }
        })
    }

    render() {
        const {post, comments, editing} = this.state;
        const {userId} = this.props;
        if(!post) {
            return null;
        }
        const editable = userId === post.author.id;

        return (
            <div className="postinfo">
                {
                    editing ? (
                        <PostEditor
                            post={post}
                            onSave={this.handlePostInfoSave}
                            onCancel={this.handlePostCancel}
                        />
                    ) : (
                        //  PostView负责展示某一个帖子
                        < PostView
                            post={post}
                            editable={editable}
                            onEditClick={this.handleEditClick}
                        />
                    )
                }
                <CommentList
                    comments={comments}
                    editable={Boolean(userId)}
                    onSubmit={this.handleCommentSubmit}
                />

            </div>
        );
    }



}

export default PostInfo
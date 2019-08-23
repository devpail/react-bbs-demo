//负责获取帖子列表数据、保存新建的帖子、控制PostEditor的显示与隐藏
import React from 'react'
import url from '../../utils/url'
import {get,post} from '../../utils/request'
import PostEditor from './PostEditor'
import PostsView from "./PostsView";
import './PostList.css'

class PostList extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            posts:[],       //保存帖子列表数据
            newPost:false   //判断当前是否正在创建新的帖子
        }
    }

    render() {
        const {userId} = this.props
        return (
            <div className="post-list">
                <div>
                    <h2>帖子列表</h2>
                    {/*只有在登录状态才显示发帖按钮*/}
                    {userId ? <button onClick={this.handleNewPost}>发帖</button> : null}
                </div>
                {/*若当前正在创建新帖子，则渲染PostEditor组件*/}
                {
                    this.state.newPost ? (
                        <PostEditor onSave={this.handleSave} onCancel={this.handleCancel}/>
                    ) : null
                }
                {/*PostView显示帖子的列表数据*/}
                <PostsView posts = {this.state.posts} />
            </div>
        );
    }

    //组件挂载后，调用后台API获取列表数据
    componentDidMount() {
        this.refreshPostList();
    }

    //获取帖子列表
    refreshPostList() {
        //调用后台API获取列表
        get(url.getPostList()).then(data=>{
            console.info(data);
            if(!data.error){
                this.setState({
                    posts:data,
                    newPost:false
                })
            }
        })
    }

    //保存帖子
    handleSave(data){
        //当前登录用户的信息和默认的点赞数，同帖子的标题和内同，共同构成最终带保存的帖子对象
        const postData={
            ...data,
            author:this.props.userId,
            vote:0
        }
        post(url.createPost(),postData).then(data=>{
            if(!data.error){
                //保存成功后，刷新帖子列表
                this.refreshPostList()
            }
        })

    }

    //取消新建帖子
    handleCancel(){
        this.setState({
            newPost:false
        })
    }

    //新建帖子
    handleNewPost() {
        this.setState({
            newPost: true
        })
    }
}

export default PostList
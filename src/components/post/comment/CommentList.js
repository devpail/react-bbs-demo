import React from 'react'
import CommentsView from "./CommentView";
import './CommentList.css'

class CommentList extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            // comments:[]
            value:""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    //处理新评论变化
    handleChange(e){
        this.setState({
            value:e.target.value
        })
    }
    //保存新评论
    handleSave(e){
        const content = this.state.value;
        if(content.length>0){
            //将评论提交PostInfo页面的保存方法
            this.props.onSubmit(this.state.value);
            this.setState({
                value:""
            })
        }else{
            alert("评论不能为空！")
        }
    }

    render() {
        const {comments,editable} = this.props
        return (
            <div className="comment-list">
                <div className="title">评论</div>
                {/*只有登录状态才能创建评论*/}
                {
                    editable?(
                        <div className="editor">
                            <textarea
                                placeholder="说说你的看法"
                                value={this.state.value}
                                onChange={this.handleChange}
                            />
                            <button onClick={this.handleSave}>提交</button>
                        </div>
                    ):null
                }
                <CommentsView comments={comments}/>
            </div>
        );
    }


}
export default CommentList
import React from 'react'
class PostEditor extends React.Component{
    constructor(props) {
        super(props);
        const {post} = this.posts
        return (
            <div className="post-editor">
                <input
                    type="text"
                    name="title"
                    placeholder="标题"
                    value={this.state.title}
                    onChange={this.handleChange}
                />
                <textarea
                    name="content"
                    placeholder="内容"
                    value={this.state.content}
                    onChange={this.handleChange}
                />
                <button onClick={this.handleCancel}>取消</button>
                <button onClick={this.handleSave}>保存</button>
            </div>
        );
    }
}
export default PostEditor
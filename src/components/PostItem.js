import React from 'react'
import {getFormatDate} from '../utils/date'
import like from "../images/like.png"

//不负责业务逻辑，只关注组件的渲染，因此使用一个无状态的函数组件实现
function PostItem(props) {
    const {post} = this.props
    return(
        <li className={"postItem"}>
            <div className={"title"}>
                {post.title}
            </div>
            <div>
                创建人：<span>{post.author.username}</span>
            </div>
            <div>
                更新时间：<span>{getFormatDate(post.updateAt)}</span>
            </div>
            <div className={"like"}>
                <span>
                    <img alt={"vote"} src={like} />
                </span>
                <span>{post.vote}</span>
            </div>

        </li>
    )
}

export default PostItem
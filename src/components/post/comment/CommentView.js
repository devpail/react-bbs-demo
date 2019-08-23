import React from 'react'
import {getFormatDate} from "../../../utils/date";
import './CommentsView.css'

function CommentsView(props) {
    const {comments} = props;
    return(
        <ul className="comments-view">
            {comments.map(item=>{
                return(
                    <li key={item.id}>
                        <div>
                            {item.content}
                        </div>
                        <div className="sub">
                            <span>{item.author ==null?'匿名':item.author.username}</span>
                            <span>.</span>
                            <span>{getFormatDate(item.updatedAt)}</span>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}
export default CommentsView
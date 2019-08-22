import React from 'react'
import {getFormatDate} from "../../../utils/date";

function CommentsView(props) {
    const {comments} = this.props;
    return(
        <ul className="CommentsView">
            {comments.map(item=>{
                return(
                    <li key={item.id}>
                        <div>
                            {item.content}
                        </div>
                        <div className="sub">
                            <span>{item.author.username}</span>
                            <span>.</span>
                            <span>{getFormatDate(item.updateAt)}</span>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}
export default CommentsView
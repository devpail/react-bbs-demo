import React from 'react'
import {Link} from "react-router-dom";
import PostItem from './PostItem'

class PostView extends React.Component{
    render() {
        const {posts} = this.props;
        return (
            <ul>
                {posts.map(
                    item=>(
                        //使用Link组件包裹每一个PostItem组件
                        <Link key={item.id} to={`/posts/${item.id}`}>
                            <PostItem post={item}/>
                        </Link>
                    )
                )}
            </ul>
        );
    }
}

export default PostView
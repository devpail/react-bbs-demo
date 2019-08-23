import React from 'react'
import {Route} from "react-router-dom";
import Header from "./Header";
import PostList from "./post/PostList";
import PostInfo from "./post/PostInfo";

class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            userId: sessionStorage.getItem("userId"),
            username: sessionStorage.getItem("username")
        }
        this.handleLogout = this.handleLogout.bind(this);
    }
    handleLogout(){
        //注销用户
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("username");
        this.setState({
            userId: null,
            username: null
        });
    }

    render() {
        const  {match,location} = this.props;
        const {userId,username} =this.state;
        return (
            <div>

                {/*无论是访问帖子列表页面还是详情页面，都会共用相同的Header组件*/}
                <Header
                    username = {username}
                    onLogout={this.handleLogout}
                    location={location}
                />
                {/*帖子列表路由配置*/}
                <Route
                    path={match.url}
                    exact
                    render={props=><PostList username={username}{...props}/>}
                />

                {/*帖子详情路由配置*/}
                <Route
                    path={`${match.url}/:id`}
                    render={props=><PostInfo userId={userId}{...props} />}
                />
            </div>
        )
    }
}

export default Home
import React from 'react'
import {Route,Switch} from "react-router-dom";
import url from "../utils/url";

class Home extends React.Component{
    render() {
        const  {match,location} = this.props;
        const {username} =this.state;
        return (
            <div>

                {/*无论是访问帖子列表页面还是详情页面，都会共用相同的Header组件*/}
                <Header
                    username = {username}
                    onLogout={{this.handleLogout}}
                    location={{location}}
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
                    render={props=><Post username={username}{...props} />}
                />
            </div>
        )
    }
}

export default Home
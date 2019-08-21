import React from 'react'
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

class Header extends React.Component{
    constructor(props) {
        super(props);

    }
    render() {

        const {username,onLogout,location} = this.props
        return (
            <div className={"header"}>
                <div className={"nav"}>
                    <span className={"left-link"}>
                        <Link to={"/"}>首页</Link>
                    </span>
                    {/*用户已经登录，显示登录用户的信息；否则显示登录按钮*/}
                    {
                        this.username && username.length > 0 ? (
                            <span className={"user"}>
                                当前用户：{username}&nbsp;
                                <button onClick={onLogout}>注销</button>
                            </span>
                        ) : (
                            <span className={"right-link"}>
                                {/*to属性的值是一个对象，通过state属性，保存当前页面的地址*/}
                                <Link to={{pathname:"/login",state:{from:location}}}>登录</Link>
                            </span>
                        )
                    }
                </div>
            </div>
        );
    }

}

export default Header
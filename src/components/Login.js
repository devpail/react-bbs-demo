import React from 'react'
import {Redirect} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {post} from "../utils/request";
import url from  "../utils/url"

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:"",
            password:"",
            redirectToReferrer:false //是否重定向到之前的页面
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    render() {
        //from保存跳转到登录页前的页面路径，用于在登录成功后重定向到原来的页面
        const {from} = this.props.location.state||{from:{pathname:"/"}}
        const {redirectToReferrer} = this.state
        //登录成功后，redirectToReferrer为true，使用Redirect组件重定向页面
        if(redirectToReferrer){
            return <Redirect to = {from} />
        }
        return(
            <div className="container">
                <form className="login" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">用户名：</label>
                        <input
                            className="form-control"
                            id="username"
                            name="username"
                            type="text"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">密码：</label>
                        <input
                            className="form-control"
                            id="password"
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">登录</button>
                    <button type="register" className="btn btn-primary">注册</button>
                </form>
            </div>
        )
    }

    handleSubmit(e) {
        e.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        if (username.length === 0 || password.length === 0) {
            alert("用户名或密码不能为空！")
            return
        }
        const params = {
            username,
            password
        }
        post(url.login(),params).then(data=>{
            if(data.error){
                alert(data.error.message||"login failed")
            }else{
                //保存登录信息到sessionStorage
                sessionStorage.setItem("userId",data.userId);
                sessionStorage.setItem("username",username);
                //登录成功后，设置redirectToReferrer为true
                this.state({
                    redirectToReferrer:true
                })
            }
        })
    }

    //处理用户名和密码变化
    handleChange(e) {
        if (e.target.name === "username"){
            this.setState({
                username:e.target.value
            })
        }else if (e.target.name === "password"){
            this.setState({
                password:e.target.value
            })
        }else{
            //do nothing
        }
    }
}

export default Login
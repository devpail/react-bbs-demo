import React from 'react';
//使用Route必须引用react-router-dom模块
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import logo from './logo.svg';
import './App.css';

import Login from './components/Login'
import Home from './components/Login'

function App() {
  return (

      <Router>
          <Switch>
              {/*login和posts属于第一层级的路由，其他层级的路由在具体的页面里*/}
              {/*exact 属性，保证只有当访问根路径时，第一个Route才会匹配成功*/}
              {/*<Route exact path="/" component={Home} />*/}
              <Route path="/" component={Login} />
{/*
              <Route path="/posts" component={Home} />
*/}
          </Switch>
      </Router>


  );
}

export default App;

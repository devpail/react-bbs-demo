import {SHA1} from "./SHA1";

//本地程序调用APICloud的API存在跨域问题，需要利用代理服务器解决这个问题
// 在creat-react-app中使用代理需要在项目的package.json中配置proxy属性，proxy的值是请求要转发到的最终地址
//APICloud 需要如下配置：
//"proxy":"https://d.apicloud.com/mcm/api"


//使用HTML5的fetch方法调用API，封装了get、post、put三个方法
function get(url){
    console.info("get:"+url);
    return fetch(url,{
        method:"GET",
        headers:headers,
    }).then(response=>{
        return handleResponse(url,response);
    }).catch(error=>{
        return handlerError(url,error);
    })
}


function post(url,data ) {
    console.info("post:"+url);
    console.info(data)
    return fetch(url,{
        method:"POST",
        headers:headers,
        body:JSON.stringify(data)
    }).then(response=>{
        return handleResponse(url,response)
    }).catch(error=>{
        return handlerError(url,error);
    })
}


function put(url,data) {
    console.info("put:"+url);
    console.info(data)
    return fetch(url,{
        method:"PUT",
        headers:headers,
        body:JSON.stringify(data)
    }).then(response=>{
        return handleResponse(url,response)
    }).catch(error=>{
        return handlerError(url,error)
    })
}



//APICloud 参数配置
const AppId = "A6053788184630";
const AppKey = "8B3F5860-2646-2C47-DC50-39106919B260";
var now = Date.now();
const secureAppKey = SHA1(AppId+"UZ"+AppKey+"UZ"+now)+"."+now;
const headers = new Headers({
    "X-APICloud-AppId":AppId,
    "X-APICloud-AppKey":secureAppKey,
    "Accept":"application/json",
    "Content-Type":"application/json"
})

//处理响应结果
function handleResponse(url,response){
    if(response.status < 500){
        const data = response.json();
        return data;
    }else {
        console.error(`Request failed. Url = ${url} . Message = ${response.statusText}`);
        return {
            error: {message: "Request failed due to server error "}
        }
    }

}

//处理catch 失败的情况
function handlerError(url,error){
    console.error(`Request failed. Url = ${url} . Message = ${error}`);
    return {error: {message: "Request failed."}}
}


export {get, post, put}
//设置axios的基础样式
axios.defaults.baseURL = 'http://www.liulongbin.top:3007';




//设置所有请求的 token 值
// axios.defaults.headers.common['Authorization'] =localStorage.getItem('token');




// 添加请求拦截器
    //use 方法里面可以传递两个参数
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if(config.url.indexOf('/my') !==-1){
        config.headers.common['Authorization'] =localStorage.getItem('token');
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });


  // 添加响应拦截器  登录拦截 未登录或token 失效会导致服务器返回：身份认证失效！ 
  //   就跳转到登录页面
  axios.interceptors.response.use(function (response) {
    console.log(response.data.message );
     if(response.data.message =='身份认证失效！'){
        //页面跳转
        location.href='./login.html';
        //销毁token 
        localStorage.removeItem('token')
     }
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });
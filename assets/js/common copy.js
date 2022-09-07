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


 

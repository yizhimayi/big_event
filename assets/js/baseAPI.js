//注意：每次调用$.get(), $.post() ,$.ajax()
//都会先调用ajaxPrefilter()
//在这个函数中，可以拿到Ajax提供的对象
$.ajaxPrefilter(function(options){
    options.url='http://www.liulongbin.top:3007'+options.url
    console.log(options.url);
})
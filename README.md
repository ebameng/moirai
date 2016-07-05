### bigpipe
### partial refresh

### mode = 'development' and 'prodcution'
的差别
1. http服务端口不一样
2. everTpl模版更新机制不一样
3. 某些路由规则 5xx，development下不可用 ——为了排查错误


版本说明
nodejs 0.10.38
socket.io 1.3.5 客户初始化时加上优先级，否则出现刷新断开连接
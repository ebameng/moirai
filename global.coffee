
# init constant variable
_CONST_REMOTE_STATUS_CODE_ = 
	#available
	SUCCESS				: 	20000
	# unavailoable
	SYSTEM_ERROR		:	50001 #系统错误
	ILLEGAL_REQUEST		:	50002 #非法请求
	REQUEST_TIME_OUT	:	50003 #请求超时
	SERVICE_UNAVAILABLE	:	50004 #服务暂停
	REMOTE_SERVICE_ERROR:	50005 #error

	
	PERMISSION_DENIED	:	20001
	NOT_LOGIN			:	20004
	REPEAT_SUBMITTED	: 	40002
	MONGO_PAGE_ERROR	: 	40008
	RECORD_DUPLICATE	: 	45454
	
_CONST_NODE_ERROR_CODE_ =
	SUCCESS: 20
	NODE_TIMEOUT: 55
	CONN_REJECTED: 54
	REMOTE_SERVER_ERR: 51
	PARSE_ERR: 44
	FILE_NOT_FOUND: 30
# connom function 

# mount to global
global.GLOBAL_OBJECT = {
	_CONST_REMOTE_STATUS_CODE_
	_CONST_NODE_ERROR_CODE_
}

module.exports = null
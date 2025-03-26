import multiprocessing

# 绑定的IP和端口
bind = "0.0.0.0:8000"

# 工作进程数
workers = multiprocessing.cpu_count() * 2 + 1

# 工作模式
worker_class = "sync"

# 最大请求数，超过此数值后worker将重启
max_requests = 1000
max_requests_jitter = 50

# 超时设置（秒）
timeout = 60
graceful_timeout = 30
keepalive = 2

# 日志设置
errorlog = "/www/wwwroot/ep/EnglishPlans/english_learning_backend/gunicorn-error.log"
accesslog = "/www/wwwroot/ep/EnglishPlans/english_learning_backend/gunicorn-access.log"
loglevel = "info"

# 进程相关设置
daemon = True
pidfile = "/www/wwwroot/ep/EnglishPlans/english_learning_backend/gunicorn.pid"

# 用户和组
user = "www"
group = "www"

# 安全设置
limit_request_line = 4096
limit_request_fields = 100
limit_request_field_size = 8190

# 工作目录
chdir = "/www/wwwroot/ep/EnglishPlans/english_learning_backend"

# Django应用路径
wsgi_app = "english_learning.wsgi:application" 
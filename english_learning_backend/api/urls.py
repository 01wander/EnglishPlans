from django.urls import path
from . import views

urlpatterns = [
    path('', views.api_root, name='api-root'),
    path('csrf/', views.get_csrf_token, name='csrf-token'),
    path('register/', views.register, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('user/info/', views.get_user_info, name='user-info'),
    path('content/', views.learning_content, name='learning-content'),
    path('progress/', views.user_progress, name='user-progress'),
    path('favorites/<str:category>/<str:item_id>', views.manage_favorite, name='manage_favorite'),
    path('progress/<str:category>/<str:item_id>', views.update_progress, name='update_progress'),
] 
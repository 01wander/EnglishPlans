from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.reverse import reverse
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from .models import UserProfile, AudioSettings, LearningContent, Progress
from .serializers import UserSerializer, UserProfileSerializer, AudioSettingsSerializer, LearningContentSerializer, ProgressSerializer
from django.middleware.csrf import get_token

# Create your views here.

@api_view(['GET'])
@permission_classes([AllowAny])
def api_root(request):
    """
    API 根路径，列出所有可用的端点
    """
    return Response({
        'message': '欢迎使用英语学习 API',
        'endpoints': {
            'register': '/api/register/',
            'login': '/api/login/',
            'logout': '/api/logout/',
            'user_info': '/api/user/info/',
            'learning_content': '/api/content/',
            'progress': '/api/progress/',
            'favorites': '/api/favorites/',
            'audio_settings': '/api/settings/audio/',
        }
    })

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    """用户注册"""
    username = request.data.get('username')
    password = request.data.get('password')
    password2 = request.data.get('password2')
    
    if password != password2:
        return Response({'error': '两次输入的密码不匹配'}, status=status.HTTP_400_BAD_REQUEST)
    
    if User.objects.filter(username=username).exists():
        return Response({'error': '用户名已存在'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        # 创建用户
        user = User.objects.create_user(username=username, password=password)
        # 创建用户配置文件
        profile = UserProfile.objects.create(user=user)
        # 创建音频设置
        audio_settings = AudioSettings.objects.create(user=user)
        # 自动登录
        login(request, user)
        return Response({
            'message': '注册成功',
            'user': {
                'username': user.username,
                'profile': UserProfileSerializer(profile).data,
                'audio_settings': AudioSettingsSerializer(audio_settings).data
            }
        }, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
def login_view(request):
    """用户登录"""
    try:
        username = request.data.get('username')
        password = request.data.get('password')
        
        if not username or not password:
            return Response({'error': '请提供用户名和密码'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = authenticate(username=username, password=password)
        if user is None:
            return Response({'error': '用户名或密码错误'}, status=status.HTTP_401_UNAUTHORIZED)
        
        login(request, user)
        
        # 确保用户配置文件存在
        profile, created = UserProfile.objects.get_or_create(user=user)
        
        # 确保音频设置存在
        audio_settings, created = AudioSettings.objects.get_or_create(user=user)
        
        return Response({
            'message': '登录成功',
            'user': {
                'username': user.username,
                'profile': UserProfileSerializer(profile).data,
                'audio_settings': AudioSettingsSerializer(audio_settings).data
            }
        })
    except Exception as e:
        print(f"登录错误: {str(e)}")  # 添加服务器端日志
        return Response({'error': '登录过程中发生错误'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """用户注销"""
    logout(request)
    return Response({'message': '已成功登出'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    """获取用户信息"""
    user = request.user
    profile = UserProfile.objects.get(user=user)
    audio_settings = AudioSettings.objects.get(user=user)
    progress = Progress.objects.filter(user=user)
    
    return Response({
        'username': user.username,
        'profile': UserProfileSerializer(profile).data,
        'audio_settings': AudioSettingsSerializer(audio_settings).data,
        'progress': ProgressSerializer(progress, many=True).data
    })

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def learning_content(request):
    if request.method == 'GET':
        content = LearningContent.objects.all()
        serializer = LearningContentSerializer(content, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = LearningContentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def user_progress(request):
    if request.method == 'GET':
        progress = Progress.objects.filter(user=request.user)
        serializer = ProgressSerializer(progress, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = ProgressSerializer(data={**request.data, 'user': request.user.id})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_csrf_token(request):
    """获取 CSRF token"""
    return Response({'csrfToken': get_token(request)})

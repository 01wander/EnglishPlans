from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, AudioSettings, LearningContent, Progress, Favorite, LearningHistory

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = UserProfile
        fields = ('id', 'user', 'avatar', 'learning_streak', 'last_login_date')

class AudioSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AudioSettings
        fields = ('id', 'volume', 'rate', 'pitch')

class LearningContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearningContent
        fields = ('id', 'category', 'english', 'chinese', 'emoji', 'audio_url', 
                 'example', 'example_translation')

class ProgressSerializer(serializers.ModelSerializer):
    content = LearningContentSerializer(read_only=True)
    
    class Meta:
        model = Progress
        fields = ('id', 'content', 'status', 'last_reviewed')

class FavoriteSerializer(serializers.ModelSerializer):
    content = LearningContentSerializer(read_only=True)
    
    class Meta:
        model = Favorite
        fields = ('id', 'content', 'created_at')

class LearningHistorySerializer(serializers.ModelSerializer):
    content = LearningContentSerializer(read_only=True)
    
    class Meta:
        model = LearningHistory
        fields = ('id', 'content', 'action', 'timestamp') 
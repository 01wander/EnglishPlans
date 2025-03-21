from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    """用户个人信息"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    learning_streak = models.IntegerField(default=0)  # 学习连续天数
    last_login_date = models.DateField(null=True)

    def __str__(self):
        return f"{self.user.username}的个人信息"

class AudioSettings(models.Model):
    """用户音频设置"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='audio_settings')
    volume = models.FloatField(default=1.0)
    rate = models.FloatField(default=1.0)
    pitch = models.FloatField(default=1.0)

    def __str__(self):
        return f"{self.user.username}的音频设置"

class LearningContent(models.Model):
    """学习内容"""
    CATEGORIES = [
        ('bodyParts', '身体部位'),
        ('animals', '动物'),
        ('colors', '颜色'),
        ('numbers', '数字'),
        ('food', '食物'),
    ]
    
    category = models.CharField(max_length=20, choices=CATEGORIES)
    english = models.CharField(max_length=100)
    chinese = models.CharField(max_length=100)
    emoji = models.CharField(max_length=10)
    audio_url = models.URLField(blank=True)
    example = models.CharField(max_length=200, blank=True)
    example_translation = models.CharField(max_length=200, blank=True)
    
    class Meta:
        ordering = ['category', 'english']

    def __str__(self):
        return f"{self.category} - {self.english}"

class Progress(models.Model):
    """学习进度"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='progress')
    content = models.ForeignKey(LearningContent, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, default='not_started')  # not_started, in_progress, completed
    last_reviewed = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['user', 'content']

    def __str__(self):
        return f"{self.user.username} - {self.content.english} - {self.status}"

class Favorite(models.Model):
    """收藏内容"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorites')
    content = models.ForeignKey(LearningContent, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'content']

    def __str__(self):
        return f"{self.user.username} - {self.content.english}"

class LearningHistory(models.Model):
    """学习历史"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='learning_history')
    content = models.ForeignKey(LearningContent, on_delete=models.CASCADE)
    action = models.CharField(max_length=50)  # learned, reviewed, favorited
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.content.english} - {self.action}"

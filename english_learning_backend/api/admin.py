from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from .models import UserProfile, AudioSettings, LearningContent, Progress, Favorite, LearningHistory

class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name = '用户信息'
    verbose_name_plural = '用户信息'

class UserAdmin(BaseUserAdmin):
    inlines = (UserProfileInline,)
    list_display = ('username', 'email', 'get_learning_streak', 'date_joined', 'last_login')
    
    def get_learning_streak(self, obj):
        return obj.profile.learning_streak if hasattr(obj, 'profile') else 0
    get_learning_streak.short_description = '学习连续天数'

admin.site.unregister(User)
admin.site.register(User, UserAdmin)

@admin.register(LearningContent)
class LearningContentAdmin(admin.ModelAdmin):
    list_display = ('english', 'chinese', 'category', 'emoji')
    list_filter = ('category',)
    search_fields = ('english', 'chinese')

@admin.register(Progress)
class ProgressAdmin(admin.ModelAdmin):
    list_display = ('user', 'content', 'status', 'last_reviewed')
    list_filter = ('status', 'last_reviewed', 'user')
    search_fields = ('user__username', 'content__english')
    date_hierarchy = 'last_reviewed'

@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    list_display = ('user', 'content', 'created_at')
    list_filter = ('created_at', 'user')
    search_fields = ('user__username', 'content__english')
    date_hierarchy = 'created_at'

@admin.register(LearningHistory)
class LearningHistoryAdmin(admin.ModelAdmin):
    list_display = ('user', 'content', 'action', 'timestamp')
    list_filter = ('action', 'timestamp', 'user')
    search_fields = ('user__username', 'content__english', 'action')
    date_hierarchy = 'timestamp'

@admin.register(AudioSettings)
class AudioSettingsAdmin(admin.ModelAdmin):
    list_display = ('user', 'volume', 'rate', 'pitch')
    list_filter = ('user',)
    search_fields = ('user__username',)

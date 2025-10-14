from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProfileViewSet, UserRegisterView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'profiles', ProfileViewSet, basename='profile')

urlpatterns = [
    path('register/', UserRegisterView.as_view(), name='user-register'),   # register
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # login with name + password
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),      
    path('', include(router.urls)),
]


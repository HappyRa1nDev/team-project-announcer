from django.urls import path
from . import views
from . import event_views


from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('test/', views.testEndPoint, name='test'),
# event:
    path('events/', event_views.getListEvents, name="list_events"),
    path('events/personal/', event_views.getPersonalEvents, name="pers_events"),
    path('events/personal/<int:pk>/', event_views.updEventDetail, name="upd_event"),
    path('', views.getRoutes)
]

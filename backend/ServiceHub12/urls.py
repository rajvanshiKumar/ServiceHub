from django.contrib import admin
from django.urls    import path, include

urlpatterns = [
    path('admin/',         admin.site.urls),
    path('api/auth/',      include('apps.Users.urls')),
    path('api/dashboard/', include('apps.Orders.urls')),
]
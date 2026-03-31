from django.urls import path
from .views import (
    DashboardStatsView, UserOrdersView,
    PaymentHistoryView, UpdateProfileView, ChangePasswordView,
)

urlpatterns = [
    path('stats/',           DashboardStatsView.as_view(),  name='stats'),
    path('orders/',          UserOrdersView.as_view(),       name='orders'),
    path('payments/',        PaymentHistoryView.as_view(),   name='payments'),
    path('update-profile/',  UpdateProfileView.as_view(),    name='update-profile'),
    path('change-password/', ChangePasswordView.as_view(),   name='change-password'),
]
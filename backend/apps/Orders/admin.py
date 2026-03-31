from django.contrib import admin
from .models import Order, Payment


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display  = ('service_title', 'user', 'price', 'status', 'purchased_at')
    list_filter   = ('status',)
    search_fields = ('service_title', 'user__email')


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display  = ('transaction_id', 'user', 'amount', 'status', 'paid_at')
    list_filter   = ('status',)
    search_fields = ('transaction_id', 'user__email')
from rest_framework import serializers
from .models import Order, Payment


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Payment
        fields = ['id', 'transaction_id', 'amount', 'status', 'paid_at']


class OrderSerializer(serializers.ModelSerializer):
    payment = PaymentSerializer(read_only=True)

    class Meta:
        model  = Order
        fields = [
            'id', 'service_title', 'service_category',
            'service_id', 'price', 'status',
            'purchased_at', 'payment',
        ]


class CreateOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Order
        fields = ['service_title', 'service_category', 'service_id', 'price']
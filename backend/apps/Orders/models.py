from django.db import models
from apps.Users.models import User
import uuid


class Order(models.Model):
    STATUS_CHOICES = (
        ('pending',   'Pending'),
        ('active',    'Active'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    )
    id               = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user             = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    service_title    = models.CharField(max_length=200)
    service_category = models.CharField(max_length=100)
    service_id       = models.IntegerField()
    price            = models.DecimalField(max_digits=10, decimal_places=2)
    status           = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    purchased_at     = models.DateTimeField(auto_now_add=True)
    updated_at       = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-purchased_at']

    def __str__(self):
        return f"{self.user.name} — {self.service_title}"


class Payment(models.Model):
    STATUS_CHOICES = (
        ('success',  'Success'),
        ('pending',  'Pending'),
        ('failed',   'Failed'),
        ('refunded', 'Refunded'),
    )
    id             = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order          = models.OneToOneField(Order, on_delete=models.CASCADE, related_name='payment')
    user           = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payments')
    transaction_id = models.CharField(max_length=100, unique=True)
    amount         = models.DecimalField(max_digits=10, decimal_places=2)
    status         = models.CharField(max_length=20, choices=STATUS_CHOICES, default='success')
    paid_at        = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-paid_at']

    def __str__(self):
        return f"{self.transaction_id} — ₹{self.amount}"
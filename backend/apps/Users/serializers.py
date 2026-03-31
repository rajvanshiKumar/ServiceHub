from rest_framework import serializers
from .models import User
import re


class RegisterSerializer(serializers.Serializer):
    name     = serializers.CharField(min_length=2, max_length=100)
    email    = serializers.EmailField()
    password = serializers.CharField(min_length=8)
    role     = serializers.ChoiceField(
                   choices=['receiver', 'provider'],
                   default='receiver'
               )

    def validate_name(self, value):
        if not re.match(r'^[a-zA-Z\s]+$', value):
            raise serializers.ValidationError(
                'Name must contain only alphabets.'
            )
        return value.strip()

    def validate_email(self, value):
        if User.objects.filter(email=value.lower()).exists():
            raise serializers.ValidationError(
                'An account with this email already exists.'
            )
        return value.lower()

    def validate_password(self, value):
        if not re.search(r'[A-Z]', value):
            raise serializers.ValidationError(
                'Must contain at least one uppercase letter.'
            )
        if not re.search(r'[a-z]', value):
            raise serializers.ValidationError(
                'Must contain at least one lowercase letter.'
            )
        if not re.search(r'[0-9]', value):
            raise serializers.ValidationError(
                'Must contain at least one number.'
            )
        if not re.search(r'[!@#$%^&*(),.?":{}|<>_\-]', value):
            raise serializers.ValidationError(
                'Must contain at least one special character.'
            )
        return value


class LoginSerializer(serializers.Serializer):
    email    = serializers.EmailField()
    password = serializers.CharField()


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model  = User
        fields = ['id', 'name', 'email', 'role', 'created_at']
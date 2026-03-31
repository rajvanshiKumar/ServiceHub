from rest_framework.views       import APIView
from rest_framework.response    import Response
from rest_framework             import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth        import authenticate

from .models      import User
from .serializers import (
    RegisterSerializer,
    LoginSerializer,
    UserProfileSerializer,
)


def get_tokens(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access':  str(refresh.access_token),
    }


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if not serializer.is_valid():
            # Flatten all errors into one readable message
            errors = serializer.errors
            first_msg = ''
            for field, msgs in errors.items():
                first_msg = msgs[0] if isinstance(msgs, list) else str(msgs)
                break
            return Response(
                {'success': False, 'message': first_msg, 'errors': errors},
                status=status.HTTP_400_BAD_REQUEST
            )

        data = serializer.validated_data

        # Create user directly — no OTP
        user = User.objects.create_user(
            email    = data['email'],
            name     = data['name'],
            password = data['password'],
            role     = data.get('role', 'receiver'),
        )

        tokens = get_tokens(user)

        return Response({
            'success': True,
            'message': 'Account created successfully!',
            'tokens':  tokens,
            'user':    UserProfileSerializer(user).data,
        }, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                {'success': False, 'errors': serializer.errors},
                status=status.HTTP_400_BAD_REQUEST
            )

        email    = serializer.validated_data['email']
        password = serializer.validated_data['password']

        user = authenticate(request, username=email, password=password)

        if not user:
            return Response(
                {'success': False, 'message': 'Invalid email or password.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        tokens = get_tokens(user)

        return Response({
            'success': True,
            'message': 'Login successful!',
            'tokens':  tokens,
            'user':    UserProfileSerializer(user).data,
        })


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            'success': True,
            'user': UserProfileSerializer(request.user).data,
        })


class LogoutView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            token = RefreshToken(request.data.get('refresh'))
            token.blacklist()
        except Exception:
            pass
        return Response({'success': True, 'message': 'Logged out.'})
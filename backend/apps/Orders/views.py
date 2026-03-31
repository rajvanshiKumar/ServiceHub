from rest_framework.views       import APIView
from rest_framework.response    import Response
from rest_framework             import status
from rest_framework.permissions import IsAuthenticated
from django.db.models           import Sum
import uuid

from .models      import Order, Payment
from .serializers import OrderSerializer, CreateOrderSerializer
from apps.Users.serializers import UserProfileSerializer


class DashboardStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders      = Order.objects.filter(user=request.user)
        total_spent = orders.aggregate(t=Sum('price'))['t'] or 0
        return Response({
            'success': True,
            'stats': {
                'total_services':  orders.count(),
                'active_services': orders.filter(status='active').count(),
                'completed':       orders.filter(status='completed').count(),
                'total_spent':     float(total_spent),
            },
        })


class UserOrdersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user)
        return Response({
            'success': True,
            'orders':  OrderSerializer(orders, many=True).data,
        })

    def post(self, request):
        s = CreateOrderSerializer(data=request.data)
        if not s.is_valid():
            return Response(
                {'success': False, 'errors': s.errors},
                status=status.HTTP_400_BAD_REQUEST
            )
        order = s.save(user=request.user)

        # ✅ Use transaction_id sent from PhonePe modal, fallback to auto-generated
        txn_id = request.data.get('transaction_id', '').strip().upper()
        if not txn_id:
            txn_id = f"TXN{uuid.uuid4().hex[:12].upper()}"

        # ✅ Reject duplicate transaction IDs
        if Payment.objects.filter(transaction_id=txn_id).exists():
            order.delete()
            return Response(
                {'success': False, 'message': 'This Transaction ID has already been used.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        Payment.objects.create(
            order          = order,
            user           = request.user,
            transaction_id = txn_id,
            amount         = order.price,
            status         = 'success',
        )
        return Response({
            'success': True,
            'message': 'Service purchased successfully!',
            'order':   OrderSerializer(order).data,
        }, status=status.HTTP_201_CREATED)


class PaymentHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        payments = Payment.objects.filter(user=request.user)
        data = [{
            'id':             str(p.id),
            'transaction_id': p.transaction_id,
            'service_name':   p.order.service_title,
            'amount':         float(p.amount),
            'status':         p.status,
            'paid_at':        p.paid_at,
        } for p in payments]
        return Response({'success': True, 'payments': data})


class UpdateProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        name = request.data.get('name', '').strip()
        if not name or len(name) < 2:
            return Response(
                {'success': False, 'message': 'Name must be at least 2 characters.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        request.user.name = name
        request.user.save()
        return Response({
            'success': True,
            'message': 'Profile updated!',
            'user':    UserProfileSerializer(request.user).data,
        })


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        old = request.data.get('old_password', '')
        new = request.data.get('new_password', '')
        if not request.user.check_password(old):
            return Response(
                {'success': False, 'message': 'Current password is incorrect.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        if len(new) < 8:
            return Response(
                {'success': False, 'message': 'New password must be at least 8 characters.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        request.user.set_password(new)
        request.user.save()
        return Response({'success': True, 'message': 'Password changed successfully!'})
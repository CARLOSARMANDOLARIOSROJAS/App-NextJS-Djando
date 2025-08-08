# usuarios/views.py

from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from .serializers import UserSerializer, CustomTokenObtainPairSerializer

class UserViewSet(viewsets.ModelViewSet):   
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['username', 'email']
    
    def get_permissions(self):
        """
        Permitir acceso sin autenticación para ciertos métodos
        """
        if self.action in ['login', 'list', 'retrieve']:
            permission_classes = [AllowAny]
        else:  # create, update, partial_update, destroy
            permission_classes = [IsAuthenticated]
        
        return [permission() for permission in permission_classes]
    
    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def login(self, request):
        """
        Endpoint personalizado para login
        """
        # Usar el serializador personalizado para validar las credenciales
        serializer = CustomTokenObtainPairSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.validated_data['user']
            
            # Generar tokens JWT
            refresh = RefreshToken.for_user(user)
            access_token = refresh.access_token
            
            return Response({
                'access_token': str(access_token),
                'refresh_token': str(refresh),
                'user_id': user.id,
                'user': UserSerializer(user).data
            })
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
            
    @action(detail=False, methods=['get'], permission_classes=[AllowAny])
    def by_age(self, request):
        min_age = request.query_params.get('min')
        max_age = request.query_params.get('max')

        if min_age is None or max_age is None:
            return Response(
                {"error": "Los parámetros 'min' y 'max' son obligatorios."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            min_age = int(min_age)
            max_age = int(max_age)
        except ValueError:
            return Response(
                {"error": "Los parámetros 'min' y 'max' deben ser números enteros."},
                status=status.HTTP_400_BAD_REQUEST
            )
        # greater than or equal // less than or equal
        users = User.objects.filter(age__gte=min_age, age__lte=max_age)
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
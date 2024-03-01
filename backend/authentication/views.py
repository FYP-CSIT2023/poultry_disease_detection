from rest_framework import generics, permissions
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login

from django.contrib.sessions.models import Session
from django.contrib.auth.models import User

from .models import CustomUser
from .serializers import UserSerializer

class RegisterView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        user_data = serializer.data
        user_data['refresh_token'] = str(refresh)
        user_data['access_token'] = str(refresh.access_token)

class LoginView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            user = authenticate(username=request.data['username'], password=request.data['password'])

            if user is None:
                raise TokenError("No active account found with the given credentials")

            # Check if the request is from a browser
            if request.accepted_renderer.format == 'html':
                # If it's a browser, create a JWT for the session
                refresh = RefreshToken.for_user(user)
                user_data = UserSerializer(user).data
                user_data['refresh_token'] = str(refresh)
                user_data['access_token'] = str(refresh.access_token)
                return Response(user_data, status=status.HTTP_200_OK)

            return response

        except TokenError as e:
            return Response({"detail": str(e)}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.data.get("refresh_token")
        token = RefreshToken(refresh_token)
        token.blacklist()

        # Check if the request is from a browser
        if request.accepted_renderer.format == 'html':
            # If it's a browser, perform Django logout and destroy session
            Session.objects.filter(session_key=request.session.session_key).delete()
            return Response({"detail": "Logout successful"}, status=status.HTTP_200_OK)

        return Response({"detail": "Logout successful"}, status=status.HTTP_200_OK)




from django.test import TestCase, Client
from django.urls import reverse
from rest_framework import status
from .models import CustomUser

class SignupViewTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.signup_url = reverse('register')  

    def test_signup_success(self):
        user_data = {
            'email': 'testuser@example.com',
            'password': 'testpassword123',
            're_password': 'testpassword123'
        }
        response = self.client.post(self.signup_url, user_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(CustomUser.objects.count(), 1)
        self.assertEqual(CustomUser.objects.get().email, 'testuser@example.com')
        
class LoginViewTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.login_url = reverse('login')
        self.test_user = CustomUser.objects.create_user(email='testuser@example.com', password='testpassword123')

    def test_login_success(self):
        response = self.client.post(self.login_url, {'email': 'testuser@example.com', 'password': 'testpassword123'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['success'], 'user authenticated and loged in')

    def test_login_fail_incorrect_password(self):
        response = self.client.post(self.login_url, {'email': 'testuser@example.com', 'password': 'wrongpassword'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['error'], 'user not aunthenticated')

    def test_login_fail_non_existent_user(self):
        response = self.client.post(self.login_url, {'email': 'nonexistentuser@example.com', 'password': 'testpassword123'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['error'], 'user not aunthenticated')

class LogoutViewTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.logout_url = reverse('logout')

    def test_logout_success(self):
        response = self.client.post(self.logout_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['success'], 'user loged out')
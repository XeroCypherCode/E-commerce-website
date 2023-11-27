
from django.test import TestCase, Client
from django.urls import reverse
from rest_framework import status
from .models import  Userprofile
from accounts.models import CustomUser


class GetpViewTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.get_user_profile_url = reverse('userprofile')
        self.test_user = CustomUser.objects.create_user(email='testuser@example.com', password='testpassword123')
        self.test_user_profile = Userprofile.objects.create(user=self.test_user, first_name='Test', last_name='User', phone='1234567890', address='Test Address')

    def test_get_user_profile(self):
        self.client.login(email='testuser@example.com', password='testpassword123')
        response = self.client.get(self.get_user_profile_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['profile']['first_name'], 'Test')
        self.assertEqual(response.data['profile']['last_name'], 'User')
        self.assertEqual(response.data['profile']['phone'], '1234567890')
        self.assertEqual(response.data['profile']['address'], 'Test Address')

class UpdatepViewTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.update_user_profile_url = reverse('updateuser')
        self.test_user = CustomUser.objects.create_user(email='testuser@example.com', password='testpassword123')
        self.test_user_profile = Userprofile.objects.create(user=self.test_user, first_name='Test', last_name='User', phone='1234567890', address='Test Address')

    def test_update_user_profile(self):
        self.client.login(email='testuser@example.com', password='testpassword123')
        response = self.client.put(self.update_user_profile_url, {'first_name': 'Updated', 'last_name': 'User', 'phone': '0987654321', 'address': 'Updated Address'}, content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['profile']['first_name'], 'Updated')
        self.assertEqual(response.data['profile']['last_name'], 'User')
        self.assertEqual(response.data['profile']['phone'], '0987654321')
        self.assertEqual(response.data['profile']['address'], 'Updated Address')
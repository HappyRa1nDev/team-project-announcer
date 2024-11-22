import pytest
import requests
import string
import random
import json
from datetime import datetime, timezone
# our models
from api.models import Event
# default user model
from django.contrib.auth.models import User
API_URL = "http://localhost:8000"

username = None
password = None
token = None
added_id = None

# регистрация пользователя
def test_register_user():
    global username
    global password
    letters = string.ascii_lowercase
    username = ''.join(random.choice(letters) for i in range(10))
    password = ''.join(random.choice(letters) for i in range(8))
    payload = {
        "username": username,
        "password": password,
        "password2" : password,
        }
    response = requests.post(f'{API_URL}/api/register/', json=payload)
    assert response.status_code == 201

# получение токена
def test_get_user_token():
    global token
    token = ''
    headers = {'Content-Type': 'application/json'}
    payload = {"username": username, "password": password}
    response = requests.post(f'{API_URL}/api/token/', json=payload)
    json_data = response.json()
    token = json_data['access']
    assert response.status_code == 200

# добавление мероприятия от пользователя
def test_add_user_event():
    global added_id
    text = {
        "title": "Концерт Малежика",
        "description":"Теплый. Ламповый. Твой.",
        "category":"1",
        "location":"2",
        "date":"2023-06-23 16:00",
        "user":"1"
    }
    headers = {'Authorization': f'Bearer {token}', "Content-Type": "application/json"}
    response = requests.post(f'{API_URL}/api/events/personal/', headers=headers, json=text)
    # тут должно возвращать добавленный ид и записывать его в added_id
    json_data = response.json()
    added_id = json_data['id']
    assert response.status_code == 201

# наличие доступа к своему мероприятию (временно не работает)
def test_get_correct_access_event():
    headers = {'Authorization': f'Bearer {token}'}
    response = requests.get(f'{API_URL}/api/events/personal/{added_id}/', headers=headers)
    assert response.status_code == 200

# отсутствие доступа к чужому мероприятию
def test_get_incorrect_access_event():
    headers = {'Authorization': f'Bearer {token}'}
    response = requests.get(f'{API_URL}/api/events/personal/1/', headers=headers)
    assert response.status_code == 404

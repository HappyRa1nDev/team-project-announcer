import pytest
import requests
from datetime import datetime, timezone
# our models
from api.models import Event
# default user model
from django.contrib.auth.models import User

token = None
API_URL = "http://localhost:8000"
# создание пользователя и мероприятия
@pytest.mark.django_db
def test_event_create():
    user_test = User.objects.create_user(username='Username', password='_NadezhniyPar0l_')
    event = Event.objects.create(
        title="Сходка лололошки",
        description="Очень крутая сходка!",
        category="1",
        location="2",
        date=datetime(2023,6,18,17,30, tzinfo=timezone.utc).isoformat(),
        user_id="1"
    )
    assert event.description == "Очень крутая сходка!"
    assert event.user_id == "1"

# cписок выводится
def test_event_list():
    response = requests.get(f"{API_URL}/api/events/")
    assert response.status_code == 200

# тест не запускается даже( должен был предзагруженные данные проверять
# def test_event_list_from_db(cls):
#     response = requests.get(f"{API_URL}/api/events/")
#     json = response.json()
#     assert json[0]["title"] == "Сходка лололошки"


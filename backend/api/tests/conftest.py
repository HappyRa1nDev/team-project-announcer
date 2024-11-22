import pytest
from django.core.management import call_command
from api.models import Event

@pytest.fixture(scope="session")
def init_data(django_db_setup, django_db_blocker):
    with django_db_blocker.unblock(): 
        call_command('loaddata', "init_data.json")
# Django import
#from django.core import paginator
#from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
# REST import
from rest_framework import status, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
# Local Import
from api.serializer import EventSerializer
from api.models import *
# Other import
import json
from django.http import QueryDict
# Get all the products with query
from django.contrib.auth.models import User

@api_view(['GET'])
def getListEvents(request):
    events = Event.objects.all()
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def getPersonalEvents(request):
    if request.method == 'GET':
        queryset = Event.objects.all().filter(user=request.user.id)
        serializer = EventSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST': 
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            t = Event.objects.get(id=serializer.data['id'])
            t.user = User.objects.get(pk=request.user.id)
            t.save() 
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def updEventDetail(request, pk):
    """
    Retrieve, update or delete a code event.
    """
    try:
        event = Event.objects.get(pk=pk, user=request.user.id)
    except Event.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = EventSerializer(event)
        return Response(serializer.data)

    elif request.method == 'PUT':
        if request.data['user'] == 0:
            request.data['user'] = request.user.id
        serializer = EventSerializer(event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        Event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
from django.shortcuts import render
from rest_framework.response  import Response
from rest_framework.decorators import api_view
from .models import note
from .serializers import noteSerializer



# Create your views here.

@api_view(['GET'])
def getroute(request):

    routes = [
       { 'Endpoint':'/note/',
        'method':'GET',
        'body':None,
        'description':'Returns an array of notes'},
         { 'Endpoint':'/note/id',
        'method':'GET',
        'body':None,
        'description':'Returns an single note object'},
        { 'Endpoint':'/note/create/',
        'method':'POST',
        'body':{'body':""},
        'description':'creates a single note object'},
        { 'Endpoint':'/note/id/update',
        'method':'PUT',
        'body':{'body':""},
        'description':'updates a single note object'},
        { 'Endpoint':'/note/id/delete',
        'method':'DELETE',
        'body':None,
        'description':'deletes a single note object'}
    ]
    return Response(routes)


@api_view(['GET'])
def getNotes(request):
    notes = note.objects.all().order_by('-updated')
    serializer = noteSerializer(notes,many=True)
    return Response(serializer.data)
    


@api_view(['GET'])
def getNote(request,pk):
    notes = note.objects.get(id=pk)
    serializer = noteSerializer(notes,many=False)
    return Response(serializer.data)

@api_view(['PUT'])
def updatenote(request,pk):
    data =request.data
    notes =note.objects.get(id=pk)
    serializer = noteSerializer(instance=notes,data=data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['Delete'])
def deletenote(request,pk):
    notes = note.objects.get(id=pk)
    notes.delete()
    return Response("Note deleted")

@api_view(['POST'])
def createnote(request):
    data=request.data
    notes = note.objects.create(
        body=data['body']
    )
    serializer = noteSerializer(note,many=False)
    return Response(serializer.data)
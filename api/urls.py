from django.urls import path
from . import views

urlpatterns = [
    path('',views.getroute,name='route'),
    path('note/',views.getNotes,name='Notes'),
    path('note/create/',views.createnote,name='create'),
    path('note/<str:pk>/update/',views.updatenote,name='update'),
    path('note/<str:pk>/delete/',views.deletenote,name='delete'),
    path('note/<str:pk>/',views.getNote,name='note')
]
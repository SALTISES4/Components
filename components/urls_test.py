from django.urls import path

from . import views_test

app_name = "test_components"

urlpatterns = [
    path("", views_test.index, name="index"),
]

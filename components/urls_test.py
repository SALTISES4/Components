from django.urls import path

from . import views_test

app_name = "test_components"

urlpatterns = [
    path("", views_test.index, name="index"),
    path("search", views_test.search, name="search"),
    path(
        "dashboard/newUser",
        views_test.dashboardNewUser,
        name="dashboardNewUser",
    ),
    path(
        "dashboard/invitedUser",
        views_test.dashboardInvitedUser,
        name="dashboardInvitedUser",
    ),
]

from django.conf.urls.i18n import i18n_patterns
from django.urls import path
from django.views.i18n import JavaScriptCatalog

from . import views_test

app_name = "test_components"

urlpatterns = i18n_patterns(
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
    path(
        "dashboard/student",
        views_test.dashboardStudent,
        name="dashboardStudent",
    ),
    path(
        "createQuestions1",
        views_test.createQuestions1,
        name="createQuestions1",
    ),
    path(
        "createQuestions2",
        views_test.createQuestions2,
        name="createQuestions2",
    ),
    path(
        "rationales",
        views_test.rationales,
        name="rationales",
    ),
    path("jsi18n/", JavaScriptCatalog.as_view(), name="javascript-catalog"),
)

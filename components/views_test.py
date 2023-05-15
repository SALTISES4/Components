from django.shortcuts import render


def index(request):

    template = "components/index.html"
    context = {}
    return render(request, template, context)


def search(request):

    template = "components/search.html"
    context = {}
    return render(request, template, context)


def dashboardNewUser(request):

    template = "components/dashboardNewUser.html"
    context = {}
    return render(request, template, context)


def dashboardInvitedUser(request):

    template = "components/dashboardInvitedUser.html"
    context = {}
    return render(request, template, context)


def dashboardStudent(request):

    template = "components/dashboardStudent.html"
    context = {}
    return render(request, template, context)


def createQuestions1(request):

    template = "components/createQuestions1.html"
    context = {}
    return render(request, template, context)


def createQuestions2(request):

    template = "components/createQuestions2.html"
    context = {}
    return render(request, template, context)


def rationales(request):

    template = "components/rationales.html"
    context = {}
    return render(request, template, context)


def createAssignment(request):

    template = "components/createAssignment.html"
    context = {}
    return render(request, template, context)


def detailedAssignment(request):

    template = "components/detailedAssignment.html"
    context = {}
    return render(request, template, context)

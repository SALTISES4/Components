from django.shortcuts import render


def index(request):

    template = "components/index.html"
    context = {}
    return render(request, template, context)

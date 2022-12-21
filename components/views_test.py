from django.shortcuts import render


def index(request):

    template = "components/index.html"
    context = {}
    return render(request, template, context)


def search(request):

    template = "components/search.html"
    context = {}
    return render(request, template, context)

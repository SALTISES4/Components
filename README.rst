==========
components
==========

SALTISE-components is a simple Django app to build and test a collection of front-end components for myDALITE built with preact and Material UI.

Quick start
-----------

1. Add the Components app to your requirements, then pip install::

    pip install SALTISE-components

2. Add "components" to your INSTALLED_APPS setting like this::

    INSTALLED_APPS = [
        ...
        'components',
        ...
    ]

3. Import minified script to access component library (you can override default styles using global css names)::

    <script src="{% static 'component/js/app.min.js' %}" defer="true"></script>

4. Inject components into the DOM, customizing props as needed.  Assuming django-csp is installed, the Navigation components is injected via::

    <script nonce="{{ request.csp_nonce }}">
        window.addEventListener("load", function () {
            const nav = () => {
                return components.h(components.Navigation, {
                    nonce: "{{ request.csp_nonce }}",
                });
            };
            components.render(
                nav(),
                document.getElementById("navigation-app")
            );
        });
    </script>

Quick start dev
---------------

1. Install node modules::

    npm install

2. Create python 3.8+ virtualenv and nstall pip-tools::

    python -m pip install --upgrade pip
    pip install pip-tools

3. Install requirements::

    pip-sync requirements/requirements.txt

4. Install pre-commit::

    pre-commit install

5. Start the server::

    python components.py runserver

6. Navigate to 'localhost:8000/', to see components in action.

7. Build when you make edits to app.js::

    npx gulp scripts

8. To create translations::

    npx gulp scripts
    python components.py makemessages -d djangojs -l fr -i=node_modules/* -i=venv*
    python components.py compilemessages -l fr -i=venv*

8. If you wish, remake the package::

    tox --recreate

9. To publish, e.g.::

    twine upload .tox/dist/SALTISE_components-0.1.zip --verbose


To do in myDALITE
-----------------

1. Align question difficulty serializer

2. Define assignment difficulty in serializer

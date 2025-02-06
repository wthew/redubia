from .index import app
from .utils.on_start import update_swagger_file


if __name__ == '__main__':
    with app.app_context():
        update_swagger_file(app)

    app.run(debug=True, port=5328)

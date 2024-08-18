from flask import Flask, jsonify, request
from PIL import Image
import time
import asyncio

from convert import convert
from celery import Celery, Task


def celery_init_app(app: Flask) -> Celery:
    class FlaskTask(Task):
        def __call__(self, *args: object, **kwargs: object) -> object:
            with app.app_context():
                return self.run(*args, **kwargs)

    celery_app = Celery(app.name, task_cls=FlaskTask)
    celery_app.config_from_object(app.config["CELERY"])
    celery_app.set_default()
    app.extensions["celery"] = celery_app
    return celery_app


app = Flask(__name__)
app.config.from_mapping(
    CELERY=dict(
        broker_url="redis://default:AYDaAAIjcDE2MmE1NjMxMjA2NmU0YTY0YTE5MjM5NWQyMGYzMjA1NnAxMA@normal-ray-32986.upstash.io:6379",
        result_backend="redis://default:AYDaAAIjcDE2MmE1NjMxMjA2NmU0YTY0YTE5MjM5NWQyMGYzMjA1NnAxMA@normal-ray-32986.upstash.io:6379",
        task_ignore_result=True
    )
)

celery_app = celery_init_app(app)


@app.route('/api/image', methods=['POST'])
def image():
    time.sleep(4)
    return "received " + str(len(request))


# Adds the convert task to the broker?
@app.route('/api/upload', methods=['POST'])
def upload():
    file = request.files['file']

    print(request.headers)


    img = Image.open(file)
    print(img.size)

    # convert(img, 40)
    
    return jsonify({
        "output": file.filename
    })

@app.route('/api/hello', methods=['GET'])
def hello_world():
    return jsonify("Hello, World!")

@app.route('/api/goodbye', methods=['POST'])
def goodbye():
    time.sleep(3)
    return request.form["title"]


def save_image_to_bucket():
    return "" # reference to bucket





if __name__ == '__main__':
    app.run(port=5328)
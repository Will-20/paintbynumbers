from flask import Flask, jsonify, request
from PIL import Image
import time

app = Flask(__name__)

@app.route('/api/hello', methods=['GET'])
def hello_world():
    return jsonify("Hello, World!")


@app.route('/api/goodbye', methods=['POST'])
def goodbye():
    time.sleep(3)
    return request.form["title"]

@app.route('/api/image', methods=['POST'])
def image():
    time.sleep
    return "received " + str(len(request))

if __name__ == '__main__':
    app.run(port=5328)
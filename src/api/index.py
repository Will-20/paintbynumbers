from flask import Flask, jsonify, request
from PIL import Image
import time
import asyncio

from convert import convert

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
    time.sleep(4)
    return "received " + str(len(request))

@app.route('/api/upload', methods=['POST'])
def upload():
    file = request.files['file']
    
    img = Image.open(file)
    print(img.size)

    convert_task = asyncio.create_task(
        convert(img, 40)
    )

    
    return jsonify({
        "output": file.filename
    })

if __name__ == '__main__':
    app.run(port=5328)
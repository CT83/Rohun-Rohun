import os
from threading import Thread

from flask import Flask, request, jsonify

from talker.resemble_api import Resemble

app = Flask(__name__)

url = "https://app.resemble.ai/projects/b861ed59-default/clips/bee57cd3-/edit"
res = Resemble(os.environ['RES_AI_EMAIL'], os.environ['RES_AI_PASS'], proj_url=url)


@app.route("/")
def hello():
    return "Hello World!"


@app.route("/speak", methods=["POST"])
def speak():
    req = request.get_json(force=True)
    print(req)
    if req.get("text"):
        Thread(target=res.speak, args=[req.get("text")]).start()
        return jsonify({"message": req.get("text")})
    else:
        return jsonify({"message": "Text was empty!!"})


if __name__ == "__main__":
    app.run()

import os
from os import environ
import pandas as pd
import numpy as np
import datetime as dt

from flask import Flask, jsonify, render_template



# Create an instance of Flask
app = Flask(__name__)


@app.route("/")
def index():

    # Return template and data
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)

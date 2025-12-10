from flask import Flask,render_template
import json

app = Flask(__name__)

with open("static\media\data.json", "r") as f:
    data = json.load(f)

# Access sections
stack = data["stack"]
links = data["links"]
projects = data["project_data"]

@app.route('/')
def home():
    return render_template('index.html',links=links,projects=projects,stack=stack)

@app.route('/contact')
def contact():
    return render_template('contact.html',links=links)

@app.route('/project_page')
def project_page():
    return render_template('project.html',links=links)

if __name__ == '__main__':
    app.run(debug=True)
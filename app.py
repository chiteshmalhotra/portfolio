from flask import Flask,render_template
import json

app = Flask(__name__)

with open("static\media\data.json", "r") as f:
    data = json.load(f)

# Access sections
stack = data["stack"]
links = data["links"]
skills = data["skills"]
projects_data = data["project_data"]

@app.route('/')
def home():
    return render_template('index.html',links=links,projects_data=projects_data,stack=stack,skills=skills)

@app.route('/contact')
def contact():
    return render_template('contact.html',links=links)

@app.route('/projects')
def projects():
    return render_template('project.html',links=links,projects_data=projects_data)

@app.route('/resume')
def resume():
    return render_template('resume.html',links=links)

if __name__ == '__main__':
    app.run(debug=True)
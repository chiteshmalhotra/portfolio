from flask import Flask,render_template,flash,request
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 's0m3_v3ry_l0ng_4nd_s3cr3t_str!ng_f0r_s3cur!ty'

with open("static\media\data.json", "r") as f:
    data = json.load(f)

# Access sections
stack = data["stack"]
links = data["links"]
skills = data["skills"]
projects_data = data["project_data"]

@app.route('/')
def home():
    if request.args.get("mail_status") == "True":
        flash("<b>Message sent successfully</b>.<br>Thanks for reaching out! <i class='ph ph-smiley fs-5 align-text-bottom'></i>", 'success')
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
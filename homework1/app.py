from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

# Store user data
userIDs = []


@app.route('/api/users', methods=['GET'])
def get_all_users():
    return jsonify({'users': userIDs})

# Add applicant
@app.route('/api/add_applicant', methods=['POST'])
def add_applicant():
    print("Adding applicant")
    data = request.get_json()
    id = data.get('id')
    userIDs.append({'id': id, 'status': 'received'})  
    return jsonify({'message': 'User added successfully'})

# Update applicant status
@app.route('/api/update_status', methods=['POST'])
def update_status():
    data = request.get_json()
    applicantID = data.get('id')
    new_status = data.get('status')
    for user in userIDs:
        if user['id'] == applicantID:
            user['status'] = new_status
            return jsonify({'message': f'Status of {applicantID} successfully changed to {new_status}!'})

    return jsonify({'error': 'Error updating status, make sure applicant ID is correct!'}), 404


@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")

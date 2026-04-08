from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__, static_folder=".")
CORS(app)

# Dummy user
USER = {
    "username": "admin",
    "password": "1234"
}

# Serve frontend
@app.route('/')
def home():
    return send_from_directory('.', 'login.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('.', path)

# LOGIN API
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if username == USER["username"] and password == USER["password"]:
        return jsonify({"success": True, "message": "Login successful"})
    else:
        return jsonify({"success": False, "message": "Invalid credentials"})

# USAGE DATA API
@app.route('/usage', methods=['GET'])
def usage():
    return jsonify({
        "daily": [5, 8, 20, 35, 10, 6],
        "weekly": [30, 45, 5, 60, 25, 40, 35],
        "monthly": [200, 180, 50, 210]
    })

# ALERTS API
@app.route('/alerts', methods=['GET'])
def alerts():
    return jsonify([
        {"user": "House 12", "status": "High Risk", "usage": 5},
        {"user": "House 25", "status": "Medium Risk", "usage": 50}
    ])

if __name__ == '__main__':
    app.run(debug=True)
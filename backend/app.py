from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import time
import random

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///neurocascade.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Portfolio(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(200))

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if username == 'swap' and password == 'zalaechobravo':
        return jsonify({
            'success': True,
            'message': 'Авторизация успешна'
        })
    return jsonify({
        'success': False,
        'message': 'Неверные учетные данные'
    }), 401

@app.route('/api/system-load/<operation>', methods=['GET'])
def system_load(operation):
    def generate_load_simulation():
        time.sleep(0.2)
        return random.randint(50, 100)

    base_logs = []
    if operation == 'search':
        base_logs.append(f"[{time.strftime('%H:%M:%S')}] 🚀 Initializing search system...")
        for i in range(3):
            load = generate_load_simulation()
            base_logs.append(f"[{time.strftime('%H:%M:%S')}] [INFO] CPU Load: {load}% | RAM: {random.randint(40, 90)}%")
            base_logs.append(f"[{time.strftime('%H:%M:%S')}] [SCAN] Processing data block {i+1}/3 >> {random.randint(1000, 5000)} records")
            base_logs.append(f"[{time.strftime('%H:%M:%S')}] [EXEC] ./optimize_indexes.sh --force")
        base_logs.append(f"[{time.strftime('%H:%M:%S')}] ✅ Search completed successfully!")
        
    elif operation == 'analyze':
        base_logs.append(f"[{time.strftime('%H:%M:%S')}] 🔄 Starting analysis module...")
        for i in range(2):
            load = generate_load_simulation()
            base_logs.append(f"[{time.strftime('%H:%M:%S')}] [SYS] System load: {load}%")
            base_logs.append(f"[{time.strftime('%H:%M:%S')}] [ML] Running neural network analysis >> batch_{i+1}")
            base_logs.append(f"[{time.strftime('%H:%M:%S')}] [EXEC] ./train_model.py --batch={i+1} --accuracy={random.randint(85, 99)}")
        base_logs.append(f"[{time.strftime('%H:%M:%S')}] ✅ Analysis completed successfully!")
        
    elif operation == 'aggregate':
        base_logs.append(f"[{time.strftime('%H:%M:%S')}] 📦 Starting data aggregation...")
        for i in range(2):
            load = generate_load_simulation()
            base_logs.append(f"[{time.strftime('%H:%M:%S')}] [SYS] System load: {load}%")
            base_logs.append(f"[{time.strftime('%H:%M:%S')}] [AGG] Aggregating chunk {i+1}/2 >> {random.randint(5000, 10000)} records")
            base_logs.append(f"[{time.strftime('%H:%M:%S')}] [EXEC] ./save_checkpoint.sh --timestamp={time.strftime('%H%M%S')}")
        base_logs.append(f"[{time.strftime('%H:%M:%S')}] ✅ Aggregation completed successfully!")

    return jsonify({'logs': base_logs})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True) 
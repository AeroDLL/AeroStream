import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from datetime import datetime

# --- AYARLAR ---
app = Flask(__name__)
# CORS: Tarayıcının (getinkspired.com) localhost'a veri atmasına izin ver
CORS(app) 

# Logları sessize al (sadece önemli şeyleri gör)
log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

DATA_FILE = "scraped_data.json"

print("🦅 Aero Stream Server Başlatılıyor...")
print("📡 Dinleniyor: http://localhost:5000")

@app.route('/api/status', methods=['GET'])
def status():
    """Bağlantı kontrolü için"""
    return jsonify({"status": "online", "message": "Aero Stream Hazır!"})

@app.route('/api/save', methods=['POST'])
def save_data():
    """Tampermonkey'den gelen veriyi kaydeder"""
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data"}), 400

        # Zaman damgası ekle
        data['timestamp'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        # Konsola bas
        print(f"✅ VERİ GELDİ: {data.get('title', 'Başlık Yok')}")
        
        # Dosyaya ekle (Append modu)
        existing_data = []
        if os.path.exists(DATA_FILE):
            try:
                with open(DATA_FILE, 'r', encoding='utf-8') as f:
                    existing_data = json.load(f)
            except: pass # Dosya bozuksa veya boşsa önemseme

        existing_data.append(data)

        with open(DATA_FILE, 'w', encoding='utf-8') as f:
            json.dump(existing_data, f, ensure_ascii=False, indent=4)

        return jsonify({"status": "success", "saved": True})

    except Exception as e:
        print(f"❌ HATA: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

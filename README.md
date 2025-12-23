# 🦅 Aero Stream: Cloudflare Bridge

![Status](https://img.shields.io/badge/Status-Active-green)
![Python](https://img.shields.io/badge/Backend-Python%20Flask-blue)
![JS](https://img.shields.io/badge/Frontend-Tampermonkey-yellow)

**Aero Stream Bridge**, yüksek güvenlikli (Cloudflare 1020/403 Errors) sitelerden veri çekmek için geliştirilmiş "Melez" (Hybrid) bir otomasyon çözümüdür.

Standart botların aksine, **gerçek bir tarayıcı** (Browser) kullandığı için Cloudflare engellerine takılmaz.

### 🚀 Nasıl Çalışır? (Architecture)
1.  **Frontend (Tarayıcı):** Tampermonkey scripti siteye gerçek bir kullanıcı gibi girer.
2.  **Bypass:** Cloudflare, tarayıcıyı doğruladığı için 1020 hatası vermez.
3.  **Bridge (Köprü):** Script, veriyi alır ve arka planda çalışan Python sunucusuna gönderir.
4.  **Backend (Python):** Gelen veriyi JSON olarak kaydeder.

---

### 🛠️ Kurulum

#### Adım 1: Python Sunucusunu Kur
```bash
# Gerekli paketleri yükle
pip install flask flask-cors

# Sunucuyu başlat
python server.py

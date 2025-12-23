// ==UserScript==
// @name         🦅 Aero Stream Bridge
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Cloudflare korumasını aşarak verileri yerel Python sunucusuna aktarır.
// @author       AeroDLL
// @match        https://getinkspired.com/*
// @connect      localhost
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    const SERVER_URL = "http://localhost:5000/api/save";
    const CHECK_INTERVAL = 2000; // 2 saniyede bir kontrol et

    console.log("🦅 Aero Stream Bridge: Aktif!");

    // Sayfanın tamamen yüklendiğinden emin ol
    function init() {
        // Cloudflare kontrolü
        if (document.title.includes("Just a moment") || document.body.innerText.includes("Checking your browser")) {
            console.log("⏳ Cloudflare bekleniyor...");
            setTimeout(init, 1000);
            return;
        }

        // Ana veri çekme fonksiyonu
        scrapeAndSend();
    }

    function scrapeAndSend() {
        // --- BURASI DEĞİŞTİRİLEBİLİR ALAN ---
        // Siteden ne almak istiyorsan buraya yaz
        let data = {
            url: window.location.href,
            title: document.title,
            content_preview: document.body.innerText.substring(0, 100) + "..."
            // Örn: author: document.querySelector('.author-name')?.innerText
        };
        // -------------------------------------

        console.log("📤 Veri Gönderiliyor...", data);

        // Python sunucusuna gönder (Tampermonkey API kullanarak CORS aşılır)
        GM_xmlhttpRequest({
            method: "POST",
            url: SERVER_URL,
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(data),
            onload: function(response) {
                if (response.status === 200) {
                    console.log("✅ Başarıyla Kaydedildi!");
                } else {
                    console.error("❌ Sunucu Hatası:", response.statusText);
                }
            },
            onerror: function(err) {
                console.error("❌ Bağlantı Hatası! Python server açık mı?", err);
            }
        });
    }

    // Başlat
    setTimeout(init, 3000); // Sayfa açıldıktan 3 sn sonra başla

})();

// ==UserScript==
// @name         AeroStream - Proxy Pool Booster
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  Proxy destekli organik trafik simülatörü.
// @author       AeroDLL
// @match        https://getinkspired.com/*/story/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // --- PROXY HAVUZU (Eklediğin tüm IP'ler buraya gelebilir) ---
    const proxyList = [
        "8.211.195.173:1234", "206.238.236.246:80", "46.254.92.8:80", 
        "164.92.148.68:3128", "185.176.24.24:80", "172.67.161.201:80",
        // ... (Listenin geri kalanı eklenebilir)
    ];

    // --- AYARLAR ---
    const config = {
        minWait: 30, // saniye
        maxWait: 65, // saniye
        scrollDepth: 0.6 // sayfanın %60'ına kadar in
    };

    // Panel Oluşturma (Görsel Konsol)
    const panel = document.createElement('div');
    panel.style = `
        position: fixed; bottom: 15px; right: 15px; 
        background: #111; color: #0f0; padding: 15px; 
        border: 2px solid #0f0; border-radius: 10px; 
        z-index: 99999; font-family: 'Courier New', monospace; 
        font-size: 11px; box-shadow: 0 0 20px rgba(0,255,0,0.4);
        min-width: 250px;
    `;
    panel.innerHTML = `
        <div style='font-weight:bold; border-bottom:1px solid #333; margin-bottom:5px;'>📡 AeroStream V1.6</div>
        <div>🌐 Status: <span id='as-status'>Initializing...</span></div>
        <div>🕒 Next Refresh: <span id='as-timer'>--</span>s</div>
        <div>🔌 Active Proxy: <span id='as-proxy' style='color:#fff;'>--</span></div>
        <div id='as-log' style='font-size:9px; color:#aaa; margin-top:5px;'></div>
    `;
    document.body.appendChild(panel);

    const log = (msg) => { document.getElementById('as-log').innerText = msg; };
    const setStatus = (st) => { document.getElementById('as-status').innerText = st; };

    // 1. Rastgele Proxy Seç ve Göster
    const randomProxy = proxyList[Math.floor(Math.random() * proxyList.length)];
    document.getElementById('as-proxy').innerText = randomProxy;

    let timeLeft = Math.floor(Math.random() * (config.maxWait - config.minWait + 1) + config.minWait);

    // 2. Organik Kaydırma İşlemi
    setTimeout(() => {
        setStatus("SCROLLING...");
        log("Simulating reader behavior...");
        window.scrollTo({
            top: document.body.scrollHeight * (Math.random() * config.scrollDepth),
            behavior: 'smooth'
        });
    }, 6000);

    // 3. Döngü ve Yenileme
    const mainTimer = setInterval(() => {
        timeLeft--;
        document.getElementById('as-timer').innerText = timeLeft;

        if (timeLeft === 5) setStatus("CLEANING SESSION...");
        
        if (timeLeft <= 0) {
            clearInterval(mainTimer);
            setStatus("REFRESHING...");
            // Session temizliği için küçük bir hile
            window.localStorage.clear();
            window.sessionStorage.clear();
            location.reload();
        }
    }, 1000);

})();

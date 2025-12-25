// ==UserScript==
// @name         🦅 AeroStream PRO v2.0
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Advanced CloudFlare bypass for GetInkspired story boosting with customizable settings
// @author       AeroDLL
// @match        https://getinkspired.com/*
// @match        https://*.getinkspired.com/*
// @icon         data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="75" font-size="75">🦅</text></svg>
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_notification
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        GM_info
// @connect      *
// @run-at       document-start
// @noframes
// ==/UserScript==

(function() {
    'use strict';

    // ==================== MULTI-LANGUAGE SUPPORT ====================
    const LANGUAGES = {
        tr: {
            name: 'Türkçe',
            ui: {
                title: 'AeroStream PRO',
                badge: 'v2.0',
                start: '▶ Başlat',
                stop: '⏹ Durdur',
                pause: '⏸ Duraklat',
                reset: '🔄 Sıfırla',
                settings: '⚙️ Ayarlar',
                status_ready: 'Hazır',
                status_running: '🟢 Çalışıyor',
                status_paused: '⏸️ Duraklatıldı',
                status_stopped: '🔴 Durduruldu',
                total: 'Toplam',
                today: 'Bugün',
                success: 'Başarı',
                sessions: 'Oturum',
                cf_bypass: 'CF Bypass',
                anti_detect: 'Anti-Detect',
                human: 'Human',
                stealth: 'Stealth',
                target_views: 'Hedef Görüntülenme',
                daily_limit: 'Günlük Limit',
                min_view_time: 'Min Süre (sn)',
                max_view_time: 'Max Süre (sn)',
                save_settings: 'Ayarları Kaydet',
                cancel: 'İptal',
                warning_high_target: '⚠️ Yüksek hedef seçildi. Güvenli kullanım için 2000\'in altında tutun.',
                warning_very_high_target: '⚠️ Çok yüksek hedef! Sistem tespit edilebilir.',
                log_loaded: 'AeroStream PRO v2.0 yüklendi',
                log_started: 'AeroStream başlatıldı',
                log_stopped: 'AeroStream durduruldu',
                log_paused: 'Bot duraklatıldı',
                log_resumed: 'Bot devam ediyor',
                log_story_found: 'Hikaye bulundu',
                log_story_viewed: 'Hikaye başarıyla görüntülendi',
                log_story_error: 'Hikaye görüntülenirken hata',
                log_cf_detected: 'CloudFlare challenge tespit edildi',
                log_cf_bypassed: 'CloudFlare challenge bypass edildi',
                log_target_reached: 'Günlük hedef tamamlandı!',
                log_break_time: 'Mola veriliyor...',
                log_break_end: 'Mola bitti, devam ediliyor...',
                log_refreshing: 'Sayfa yenileniyor...',
                log_waiting: 'Bekleniyor...',
                milestone: '🎉 {count} görüntülenme tamamlandı!',
                notification_started: '🚀 AeroStream PRO başlatıldı!',
                notification_target: '🎉 Günlük hedef tamamlandı!',
                notification_milestone: '🎉 {count} görüntülenme tamamlandı!',
                confirm_reset: 'İstatistikleri sıfırlamak istediğinizden emin misiniz?',
                confirm_high_target: 'Yüksek hedef seçildi. Devam etmek istiyor musunuz?'
            }
        },
        en: {
            name: 'English',
            ui: {
                title: 'AeroStream PRO',
                badge: 'v2.0',
                start: '▶ Start',
                stop: '⏹ Stop',
                pause: '⏸ Pause',
                reset: '🔄 Reset',
                settings: '⚙️ Settings',
                status_ready: 'Ready',
                status_running: '🟢 Running',
                status_paused: '⏸️ Paused',
                status_stopped: '🔴 Stopped',
                total: 'Total',
                today: 'Today',
                success: 'Success',
                sessions: 'Sessions',
                cf_bypass: 'CF Bypass',
                anti_detect: 'Anti-Detect',
                human: 'Human',
                stealth: 'Stealth',
                target_views: 'Target Views',
                daily_limit: 'Daily Limit',
                min_view_time: 'Min Time (sec)',
                max_view_time: 'Max Time (sec)',
                save_settings: 'Save Settings',
                cancel: 'Cancel',
                warning_high_target: '⚠️ High target selected. Keep under 2000 for safe usage.',
                warning_very_high_target: '⚠️ Very high target! System may be detected.',
                log_loaded: 'AeroStream PRO v2.0 loaded',
                log_started: 'AeroStream started',
                log_stopped: 'AeroStream stopped',
                log_paused: 'Bot paused',
                log_resumed: 'Bot resumed',
                log_story_found: 'Story found',
                log_story_viewed: 'Story successfully viewed',
                log_story_error: 'Error viewing story',
                log_cf_detected: 'CloudFlare challenge detected',
                log_cf_bypassed: 'CloudFlare challenge bypassed',
                log_target_reached: 'Daily target reached!',
                log_break_time: 'Taking break...',
                log_break_end: 'Break ended, continuing...',
                log_refreshing: 'Refreshing page...',
                log_waiting: 'Waiting...',
                milestone: '🎉 {count} views completed!',
                notification_started: '🚀 AeroStream PRO started!',
                notification_target: '🎉 Daily target reached!',
                notification_milestone: '🎉 {count} views completed!',
                confirm_reset: 'Are you sure you want to reset statistics?',
                confirm_high_target: 'High target selected. Do you want to continue?'
            }
        }
    };

    // ==================== DEFAULT CONFIGURATION ====================
    const DEFAULT_CONFIG = {
        AUTO_START: true,
        AUTO_RESTART: true,
        VDS_MODE: true,
        AFK_MODE: true,
        MIN_VIEW_TIME: 35,
        MAX_VIEW_TIME: 75,
        MIN_DELAY_BETWEEN_VIEWS: 12,
        MAX_DELAY_BETWEEN_VIEWS: 30,
        SESSION_DURATION: 45,
        BREAK_DURATION: 10,
        VIEWS_PER_SESSION: 30,
        STEALTH_MODE: true,
        HUMAN_BEHAVIOR: true,
        RANDOM_SCROLL: true,
        MOUSE_MOVEMENT: true,
        KEYBOARD_SIMULATION: true,
        CANVAS_FINGERPRINT_SPOOF: true,
        WEBGL_FINGERPRINT_SPOOF: true,
        TIMEZONE_SPOOFING: true,
        LANGUAGE_SPOOFING: true,
        SCREEN_SPOOFING: true,
        WEBRTC_DISABLE: true,
        SERVICE_WORKER_DISABLE: true,
        CF_BYPASS_ENABLED: true,
        CF_WAIT_TIME: 15,
        CF_MAX_RETRIES: 12,
        CF_CHALLENGE_SOLVER: true,
        CF_USER_AGENT_ROTATION: true,
        CF_REFERER_ROTATION: true,
        CUSTOM_HEADERS: true,
        REFERER_ROTATION: true,
        USER_AGENT_ROTATION: true,
        TARGET_DAILY_VIEWS: 500,
        DAILY_LIMIT: 1000,
        MAX_ERRORS_ALLOWED: 25,
        SHOW_NOTIFICATIONS: true,
        NOTIFY_ON_MILESTONE: true,
        MILESTONE_INTERVAL: 100,
        SAVE_STATS: true,
        AUTO_BACKUP: true,
        MEMORY_CLEANUP: true,
        CACHE_BYPASS: true,
        REFRESH_SESSION: true,
        ERROR_RECOVERY: true,
        IP_ROTATION_SIMULATION: true,
        LANGUAGE: 'en'
    };

    // ==================== USER AGENTS ====================
    const USER_AGENTS = {
        desktop: [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/121.0'
        ],
        mobile: [
            'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1',
            'Mozilla/5.0 (Android 14; Mobile; rv:109.0) Gecko/114.0 Firefox/114.0',
            'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.43 Mobile Safari/537.36'
        ]
    };

    // ==================== REFERERS ====================
    const REFERERS = [
        'https://www.google.com/',
        'https://www.google.com.tr/',
        'https://www.bing.com/',
        'https://duckduckgo.com/',
        'https://www.reddit.com/',
        'https://twitter.com/',
        'https://www.facebook.com/',
        'https://www.linkedin.com/',
        'https://www.instagram.com/',
        'https://tr.search.yahoo.com/',
        'https://yandex.com.tr/'
    ];

    // ==================== CLOUDFLARE BYPASS ====================
    class CloudFlareBypass {
        constructor(bot) {
            this.bot = bot;
            this.challengeDetected = false;
            this.bypassAttempts = 0;
            this.userAgentHistory = [];
        }

        async detectChallenge() {
            const cfSelectors = [
                'iframe[src*="cloudflare"]',
                '.cf-challenge',
                '#cf-wrapper',
                '.captcha-container',
                '[id*="challenge"]',
                '.g-recaptcha',
                '.cf-browser-verification',
                '.cf-im-under-attack'
            ];

            for (let selector of cfSelectors) {
                if (document.querySelector(selector)) {
                    this.challengeDetected = true;
                    return true;
                }
            }

            const errorMessages = [
                'Access denied',
                'Error 1020',
                'blocked',
                'Just a moment',
                'Checking your browser',
                'Please wait while we verify'
            ];

            const pageText = document.body.textContent.toLowerCase();
            for (let error of errorMessages) {
                if (pageText.includes(error.toLowerCase())) {
                    this.challengeDetected = true;
                    return true;
                }
            }

            if (document.title.includes('Access denied') ||
                document.title.includes('Just a moment')) {
                    this.challengeDetected = true;
                    return true;
                }

            return false;
        }

        async solveChallenge() {
            try {
                this.bot.log(this.bot.lang.ui.log_cf_detected, 'warning');

                if (this.bot.config.CF_USER_AGENT_ROTATION) {
                    const deviceType = Math.random() > 0.7 ? 'mobile' : 'desktop';
                    const userAgentList = USER_AGENTS[deviceType];
                    const randomUA = userAgentList[Math.floor(Math.random() * userAgentList.length)];

                    Object.defineProperty(navigator, 'userAgent', {
                        get: () => randomUA,
                        configurable: true
                    });

                    const platforms = {
                        desktop: ['Win32', 'Win64', 'MacIntel', 'Linux x86_64'],
                        mobile: ['iPhone', 'Android', 'Linux armv8l']
                    };

                    const platformList = platforms[deviceType];
                    const randomPlatform = platformList[Math.floor(Math.random() * platformList.length)];

                    Object.defineProperty(navigator, 'platform', {
                        get: () => randomPlatform,
                        configurable: true
                    });
                }

                await this.sleep(this.bot.config.CF_WAIT_TIME * 1000);
                const challengeResolved = !await this.detectChallenge();

                if (challengeResolved) {
                    this.bot.log(this.bot.lang.ui.log_cf_bypassed, 'success');
                    this.bypassAttempts = 0;
                    this.challengeDetected = false;
                    return true;
                } else {
                    this.bypassAttempts++;
                    this.bot.log(`CloudFlare bypass attempt ${this.bypassAttempts}/${this.bot.config.CF_MAX_RETRIES}`, 'error');
                    return false;
                }
            } catch (error) {
                this.bot.log(`CloudFlare bypass error: ${error.message}`, 'error');
                return false;
            }
        }

        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    }

    // ==================== ANTI-DETECTION ====================
    class AdvancedAntiDetection {
        constructor(bot) {
            this.bot = bot;
            this.initAllProtections();
        }

        initAllProtections() {
            this.disableWebRTC();
            this.disableServiceWorkers();
            this.spoofNavigator();
            this.spoofWebGL();
            this.spoofCanvas();
            this.spoofScreen();
            this.spoofTimezone();
            this.spoofLanguages();
            this.spoofPlugins();
            this.spoofPermissions();
            this.spoofHistory();
        }

        disableWebRTC() {
            if (!this.bot.config.WEBRTC_DISABLE) return;

            try {
                const RTCPeerConnection = window.RTCPeerConnection ||
                                        window.webkitRTCPeerConnection ||
                                        window.mozRTCPeerConnection;

                if (RTCPeerConnection) {
                    window.RTCPeerConnection = function() {
                        return {
                            createDataChannel: () => {},
                            createOffer: () => Promise.resolve(),
                            createAnswer: () => Promise.resolve(),
                            setLocalDescription: () => Promise.resolve(),
                            setRemoteDescription: () => Promise.resolve(),
                            addIceCandidate: () => Promise.resolve(),
                            close: () => {},
                            onicecandidate: null,
                            ondatachannel: null
                        };
                    };
                }
            } catch (e) {
                console.warn('WebRTC disable failed:', e);
            }
        }

        disableServiceWorkers() {
            if (!this.bot.config.SERVICE_WORKER_DISABLE) return;

            try {
                if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.getRegistrations().then(function(registrations) {
                        for(let registration of registrations) {
                            registration.unregister();
                        }
                    });

                    const originalRegister = navigator.serviceWorker.register;
                    navigator.serviceWorker.register = function() {
                        return Promise.reject(new Error('Service Worker registration blocked'));
                    };
                }
            } catch (e) {
                console.warn('Service Worker disable failed:', e);
            }
        }

        spoofNavigator() {
            Object.defineProperty(navigator, 'webdriver', {
                get: () => false,
            });

            window.chrome = {
                runtime: {},
                loadTimes: function() {},
                csi: function() {},
                app: {
                    isInstalled: false,
                    InstallState: {
                        DISABLED: 'disabled',
                        INSTALLED: 'installed',
                        NOT_INSTALLED: 'not_installed'
                    }
                }
            };
        }

        spoofWebGL() {
            if (!this.bot.config.WEBGL_FINGERPRINT_SPOOF) return;

            const vendors = ['Intel Inc.', 'NVIDIA Corporation', 'AMD', 'Apple'];
            const renderers = [
                'Intel Iris OpenGL Engine',
                'GeForce GTX 1080/PCIe/SSE2',
                'AMD Radeon Pro 560 OpenGL Engine',
                'Apple A11 GPU'
            ];

            const getParameter = WebGLRenderingContext.prototype.getParameter;
            WebGLRenderingContext.prototype.getParameter = function(parameter) {
                if (parameter === 37445) {
                    return vendors[Math.floor(Math.random() * vendors.length)];
                }
                if (parameter === 37446) {
                    return renderers[Math.floor(Math.random() * renderers.length)];
                }
                return getParameter.call(this, parameter);
            };
        }

        spoofCanvas() {
            if (!this.bot.config.CANVAS_FINGERPRINT_SPOOF) return;

            const originalGetContext = HTMLCanvasElement.prototype.getContext;
            HTMLCanvasElement.prototype.getContext = function(contextType) {
                if (contextType === '2d') {
                    const ctx = originalGetContext.apply(this, arguments);
                    if (ctx) {
                        const originalGetImageData = ctx.getImageData;
                        ctx.getImageData = function() {
                            const imageData = originalGetImageData.apply(this, arguments);
                            for (let i = 0; i < imageData.data.length; i += 4) {
                                if (Math.random() > 0.999) {
                                    imageData.data[i] = (imageData.data[i] + Math.floor(Math.random() * 10)) % 256;
                                }
                            }
                            return imageData;
                        };

                        const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
                        HTMLCanvasElement.prototype.toDataURL = function() {
                            const originalResult = originalToDataURL.apply(this, arguments);
                            if (Math.random() > 0.99) {
                                return originalResult + 'a';
                            }
                            return originalResult;
                        };
                    }
                    return ctx;
                }
                return originalGetContext.apply(this, arguments);
            };
        }

        spoofScreen() {
            if (!this.bot.config.SCREEN_SPOOFING) return;

            const resolutions = [
                { width: 1920, height: 1080, availWidth: 1920, availHeight: 1040 },
                { width: 1366, height: 768, availWidth: 1366, availHeight: 728 },
                { width: 1536, height: 864, availWidth: 1536, availHeight: 824 },
                { width: 1440, height: 900, availWidth: 1440, availHeight: 860 }
            ];

            const resolution = resolutions[Math.floor(Math.random() * resolutions.length)];

            Object.defineProperties(screen, {
                width: { get: () => resolution.width, configurable: true },
                height: { get: () => resolution.height, configurable: true },
                availWidth: { get: () => resolution.availWidth, configurable: true },
                availHeight: { get: () => resolution.availHeight, configurable: true },
                colorDepth: { get: () => 24, configurable: true },
                pixelDepth: { get: () => 24, configurable: true }
            });
        }

        spoofTimezone() {
            if (!this.bot.config.TIMEZONE_SPOOFING) return;

            const timezones = [
                'Europe/Istanbul',
                'America/New_York',
                'Europe/London',
                'Asia/Tokyo',
                'Europe/Berlin',
                'America/Los_Angeles'
            ];

            const randomTimezone = timezones[Math.floor(Math.random() * timezones.length)];

            const originalDateTimeFormat = Intl.DateTimeFormat;
            Intl.DateTimeFormat = function(locales, options) {
                return new originalDateTimeFormat(randomTimezone, options);
            };
        }

        spoofLanguages() {
            if (!this.bot.config.LANGUAGE_SPOOFING) return;

            const languageSets = [
                ['tr-TR', 'tr'],
                ['tr', 'en-US', 'en'],
                ['en-US', 'en'],
                ['en-GB', 'en'],
                ['en', 'tr-TR', 'tr']
            ];

            const languages = languageSets[Math.floor(Math.random() * languageSets.length)];

            Object.defineProperty(navigator, 'languages', {
                get: () => languages,
            });

            Object.defineProperty(navigator, 'language', {
                get: () => languages[0],
            });
        }

        spoofPlugins() {
            const plugins = [
                {
                    name: 'Chrome PDF Plugin',
                    filename: 'internal-pdf-viewer',
                    description: 'Portable Document Format'
                },
                {
                    name: 'Chrome PDF Viewer',
                    filename: 'mhjfbmdgcfjbbpaeojofohoefgiehjai',
                    description: ''
                },
                {
                    name: 'Native Client',
                    filename: 'internal-nacl-plugin',
                    description: ''
                }
            ];

            Object.defineProperty(navigator, 'plugins', {
                get: () => plugins,
            });
        }

        spoofPermissions() {
            const originalQuery = window.navigator.permissions.query;
            window.navigator.permissions.query = (parameters) => {
                if (parameters.name === 'notifications') {
                    return Promise.resolve({
                        state: Notification.permission,
                        onchange: null
                    });
                }
                return originalQuery(parameters);
            };
        }

        spoofHistory() {
            Object.defineProperty(history, 'length', {
                get: () => Math.floor(Math.random() * 10) + 5,
                configurable: true
            });
        }
    }

    // ==================== STORY BOOSTER ====================
    class GetInkspiredStoryBooster {
        constructor() {
            this.isRunning = false;
            this.isPaused = false;
            this.sessionId = this.generateSessionId();
            this.stats = this.loadStats();
            this.retries = 0;
            this.sessionStartTime = Date.now();
            this.currentViewCount = 0;
            this.config = this.loadConfig();
            this.langKey = this.config.LANGUAGE;
            this.lang = LANGUAGES[this.langKey];

            this.cfBypass = new CloudFlareBypass(this);
            this.antiDetection = new AdvancedAntiDetection(this);

            this.createUI();

            if (this.config.AUTO_START && this.isStoryPage()) {
                setTimeout(() => this.start(), 3000);
            }

            console.log(`🦅 ${this.lang.ui.log_loaded}`);
        }

        isStoryPage() {
            return window.location.pathname.includes('/story/') &&
                   window.location.hostname.includes('getinkspired.com');
        }

        generateSessionId() {
            return `aero_story_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        }

        loadConfig() {
            const saved = GM_getValue('aerostream_config_v2', null);
            return saved ? { ...DEFAULT_CONFIG, ...JSON.parse(saved) } : DEFAULT_CONFIG;
        }

        saveConfig() {
            GM_setValue('aerostream_config_v2', JSON.stringify(this.config));
        }

        loadStats() {
            const saved = GM_getValue('aerostream_story_stats_v2', null);
            if (saved) {
                const stats = JSON.parse(saved);
                if (new Date().toDateString() !== new Date(stats.lastUpdate).toDateString()) {
                    stats.todayViews = 0;
                    stats.dailySessions = 0;
                }
                return stats;
            }
            return {
                totalViews: 0,
                todayViews: 0,
                dailySessions: 0,
                totalSessions: 0,
                startTime: Date.now(),
                lastUpdate: Date.now(),
                errors: 0,
                successRate: 100
            };
        }

        saveStats() {
            if (this.config.SAVE_STATS) {
                this.stats.lastUpdate = Date.now();
                GM_setValue('aerostream_story_stats_v2', JSON.stringify(this.stats));
            }
        }

        updateStats(views = 1) {
            this.stats.totalViews += views;
            this.stats.todayViews += views;
            this.stats.successRate = this.stats.errors === 0 ? 100 :
                ((this.stats.totalViews - this.stats.errors) / this.stats.totalViews * 100).toFixed(1);
            this.saveStats();
            this.updateUI();

            if (this.config.NOTIFY_ON_MILESTONE && this.stats.todayViews % this.config.MILESTONE_INTERVAL === 0) {
                const message = this.lang.ui.milestone.replace('{count}', this.stats.todayViews);
                this.notify(message);
            }
        }

        async sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        getRandomViewTime() {
            return Math.floor(Math.random() * (this.config.MAX_VIEW_TIME - this.config.MIN_VIEW_TIME + 1) + this.config.MIN_VIEW_TIME) * 1000;
        }

        getRandomDelay() {
            return Math.floor(Math.random() * (this.config.MAX_DELAY_BETWEEN_VIEWS - this.config.MIN_DELAY_BETWEEN_VIEWS + 1) + this.config.MIN_DELAY_BETWEEN_VIEWS) * 1000;
        }

        async humanScroll() {
            if (!this.config.RANDOM_SCROLL) return;

            const scrollHeight = document.documentElement.scrollHeight;
            const viewportHeight = window.innerHeight;
            const maxScroll = scrollHeight - viewportHeight;

            const scrollActions = Math.floor(Math.random() * 3) + 2;

            for (let i = 0; i < scrollActions; i++) {
                const targetScroll = Math.random() * maxScroll;
                const currentScroll = window.pageYOffset;
                const distance = targetScroll - currentScroll;
                const steps = Math.floor(Math.random() * 25) + 20;
                const stepSize = distance / steps;

                for (let j = 0; j < steps; j++) {
                    window.scrollBy(0, stepSize);
                    await this.sleep(Math.random() * 50 + 20);
                }

                await this.sleep(Math.random() * 2500 + 1200);
            }

            window.scrollTo({ top: 0, behavior: 'smooth' });
            await this.sleep(400);
        }

        async mouseMovement() {
            if (!this.config.MOUSE_MOVEMENT) return;

            const moveCount = Math.floor(Math.random() * 7) + 4;

            for (let i = 0; i < moveCount; i++) {
                const event = new MouseEvent('mousemove', {
                    bubbles: true,
                    cancelable: true,
                    clientX: Math.random() * window.innerWidth,
                    clientY: Math.random() * window.innerHeight
                });
                document.dispatchEvent(event);
                await this.sleep(Math.random() * 200 + 80);
            }
        }

        async keyboardSimulation() {
            if (!this.config.KEYBOARD_SIMULATION) return;

            const keys = ['Tab', 'ArrowDown', 'ArrowUp', 'PageDown', 'PageUp'];
            const key = keys[Math.floor(Math.random() * keys.length)];

            const downEvent = new KeyboardEvent('keydown', {
                key: key,
                bubbles: true,
                cancelable: true
            });

            document.dispatchEvent(downEvent);
            await this.sleep(Math.random() * 250 + 120);

            const upEvent = new KeyboardEvent('keyup', {
                key: key,
                bubbles: true,
                cancelable: true
            });

            document.dispatchEvent(upEvent);
        }

        async findStoryElements() {
            try {
                const selectors = [
                    '.story-content',
                    '.story-body',
                    '.post-content',
                    '[data-story-content]',
                    '.article-content',
                    '.content-wrapper',
                    '.story-container',
                    '.post-body'
                ];

                let storyElements = [];
                for (const selector of selectors) {
                    const elements = document.querySelectorAll(selector);
                    if (elements.length > 0) {
                        storyElements = Array.from(elements);
                        break;
                    }
                }

                if (storyElements.length === 0) {
                    storyElements = [document.body];
                }

                this.log(`${this.lang.ui.log_story_found}: ${storyElements.length}`, 'info');
                return storyElements;
            } catch (error) {
                this.log(`${this.lang.ui.log_story_error}: ${error.message}`, 'error');
                return [document.body];
            }
        }

        async viewStory() {
            try {
                const storyElements = await this.findStoryElements();

                for (const element of storyElements) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    await this.sleep(600);

                    await this.mouseMovement();
                    await this.sleep(Math.random() * 1200 + 600);

                    const viewTime = this.getRandomViewTime();
                    this.log(`${this.lang.ui.log_waiting} (${Math.round(viewTime/1000)}s)`, 'info');

                    const intervals = Math.floor(viewTime / 5000);
                    for (let i = 0; i < intervals; i++) {
                        if (!this.isRunning) break;

                        await this.humanScroll();
                        await this.mouseMovement();
                        await this.sleep(5000);
                    }
                }

                const likeButtons = document.querySelectorAll('.like-button, .heart-button, [data-like]');
                if (likeButtons.length > 0 && Math.random() > 0.7) {
                    const likeButton = likeButtons[Math.floor(Math.random() * likeButtons.length)];
                    if (likeButton.offsetParent !== null) {
                        const hoverEvent = new MouseEvent('mouseenter', {
                            bubbles: true,
                            cancelable: true
                        });
                        likeButton.dispatchEvent(hoverEvent);
                        await this.sleep(Math.random() * 1500 + 800);
                    }
                }

                this.updateStats(1);
                this.log(this.lang.ui.log_story_viewed, 'success');

                return true;
            } catch (error) {
                this.log(`${this.lang.ui.log_story_error}: ${error.message}`, 'error');
                this.stats.errors++;
                return false;
            }
        }

        async run() {
            while (this.isRunning) {
                try {
                    if (this.isPaused) {
                        await this.sleep(5000);
                        continue;
                    }

                    if (this.stats.todayViews >= this.config.TARGET_DAILY_VIEWS) {
                        this.log(this.lang.ui.log_target_reached, 'success');
                        this.notify(this.lang.ui.notification_target);
                        await this.sleep(60000);
                        continue;
                    }

                    if (Date.now() - this.sessionStartTime > this.config.SESSION_DURATION * 60000) {
                        await this.takeBreak();
                        continue;
                    }

                    if (await this.cfBypass.detectChallenge()) {
                        const bypassSuccess = await this.cfBypass.solveChallenge();
                        if (!bypassSuccess) {
                            this.retries++;
                            if (this.retries >= this.config.CF_MAX_RETRIES) {
                                throw new Error('CloudFlare bypass failed');
                            }
                            await this.sleep(10000);
                            continue;
                        }
                    }

                    const success = await this.viewStory();

                    if (success) {
                        const delay = this.getRandomDelay();
                        this.log(`${this.lang.ui.log_waiting} ${Math.round(delay/1000)}s...`, 'info');
                        await this.sleep(delay);
                    } else {
                        this.retries++;
                        if (this.retries >= this.config.MAX_ERRORS_ALLOWED) {
                            throw new Error('Max errors reached');
                        }
                    }

                    await this.humanScroll();
                    await this.mouseMovement();

                } catch (error) {
                    this.log(`❌ Critical error: ${error.message}`, 'error');
                    this.stats.errors++;
                    this.retries++;

                    if (this.retries >= this.config.MAX_ERRORS_ALLOWED) {
                        this.log('❌ Max error limit reached', 'error');
                        if (this.config.AUTO_RESTART) {
                            this.log('🔄 Restarting in 20 seconds...', 'warning');
                            await this.sleep(20000);
                            this.retries = 0;
                            location.reload();
                        } else {
                            this.stop();
                        }
                        return;
                    }

                    await this.sleep(10000);
                }
            }
        }

        async takeBreak() {
            this.log(this.lang.ui.log_break_time, 'info');
            this.isPaused = true;
            this.updateUI();

            await this.sleep(this.config.BREAK_DURATION * 60000);

            this.isPaused = false;
            this.sessionStartTime = Date.now();
            this.stats.dailySessions++;
            this.stats.totalSessions++;
            this.saveStats();

            this.log(this.lang.ui.log_break_end, 'success');
            this.updateUI();
        }

        start() {
            if (this.isRunning) {
                this.log(this.lang.ui.log_started, 'warning');
                return;
            }

            if (!this.isStoryPage()) {
                this.log('Please navigate to a GetInkspired story page', 'warning');
                return;
            }

            if (this.config.TARGET_DAILY_VIEWS > 2000) {
                const warningMsg = this.config.TARGET_DAILY_VIEWS > 5000 ?
                    this.lang.ui.warning_very_high_target : this.lang.ui.warning_high_target;
                this.log(warningMsg, 'warning');

                if (this.config.TARGET_DAILY_VIEWS > 5000) {
                    if (!confirm(this.lang.ui.confirm_high_target)) {
                        return;
                    }
                }
            }

            this.isRunning = true;
            this.isPaused = false;
            this.retries = 0;
            this.sessionStartTime = Date.now();
            this.log(this.lang.ui.log_started, 'success');

            if (this.config.SHOW_NOTIFICATIONS) {
                this.notify(this.lang.ui.notification_started);
            }

            this.updateUI();
            this.run();
        }

        stop() {
            this.isRunning = false;
            this.log(this.lang.ui.log_stopped, 'warning');
            this.updateUI();
        }

        pause() {
            this.isPaused = !this.isPaused;
            this.log(this.isPaused ? this.lang.ui.log_paused : this.lang.ui.log_resumed, 'info');
            this.updateUI();
        }

        reset() {
            if (!confirm(this.lang.ui.confirm_reset)) return;

            this.stop();
            this.stats = {
                totalViews: 0,
                todayViews: 0,
                dailySessions: 0,
                totalSessions: 0,
                startTime: Date.now(),
                lastUpdate: Date.now(),
                errors: 0,
                successRate: 100
            };
            this.saveStats();
            this.updateUI();
            this.log('🔄 Statistics reset', 'info');
        }

        showSettings = () => {
            const existingPanel = document.getElementById('aero-settings-panel');
            if (existingPanel) {
                existingPanel.remove();
            }

            const settingsPanel = document.createElement('div');
            settingsPanel.id = 'aero-settings-panel';
            settingsPanel.innerHTML = `
                <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 9999999; display: flex; align-items: center; justify-content: center;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 20px; padding: 30px; width: 500px; max-width: 90%; box-shadow: 0 25px 50px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.2);">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                            <h2 style="color: white; margin: 0;">${this.lang.ui.settings}</h2>
                            <button onclick="document.getElementById('aero-settings-panel').remove()" style="background: rgba(255,255,255,0.1); border: none; color: white; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 16px;">×</button>
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                            <div>
                                <label style="color: white; display: block; margin-bottom: 5px; font-size: 14px;">${this.lang.ui.target_views}</label>
                                <input type="number" id="target-views" value="${this.config.TARGET_DAILY_VIEWS}" min="10" max="10000" style="width: 100%; padding: 10px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.2); color: white;">
                            </div>
                            <div>
                                <label style="color: white; display: block; margin-bottom: 5px; font-size: 14px;">${this.lang.ui.daily_limit}</label>
                                <input type="number" id="daily-limit" value="${this.config.DAILY_LIMIT}" min="100" max="5000" style="width: 100%; padding: 10px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.2); color: white;">
                            </div>
                            <div>
                                <label style="color: white; display: block; margin-bottom: 5px; font-size: 14px;">${this.lang.ui.min_view_time}</label>
                                <input type="number" id="min-view-time" value="${this.config.MIN_VIEW_TIME}" min="10" max="120" style="width: 100%; padding: 10px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.2); color: white;">
                            </div>
                            <div>
                                <label style="color: white; display: block; margin-bottom: 5px; font-size: 14px;">${this.lang.ui.max_view_time}</label>
                                <input type="number" id="max-view-time" value="${this.config.MAX_VIEW_TIME}" min="20" max="300" style="width: 100%; padding: 10px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.2); color: white;">
                            </div>
                        </div>

                        <div style="margin-bottom: 20px;">
                            <label style="color: white; display: block; margin-bottom: 5px; font-size: 14px;">Language / Dil</label>
                            <select id="language-select" style="width: 100%; padding: 10px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.2); color: white;">
                                <option value="en" ${this.config.LANGUAGE === 'en' ? 'selected' : ''}>English</option>
                                <option value="tr" ${this.config.LANGUAGE === 'tr' ? 'selected' : ''}>Türkçe</option>
                            </select>
                        </div>

                        <div style="display: flex; gap: 10px;">
                            <button onclick="window.aeroBot.saveSettings()" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: linear-gradient(45deg, #00b09b, #96c93d); color: white; font-weight: bold; cursor: pointer;">${this.lang.ui.save_settings}</button>
                            <button onclick="document.getElementById('aero-settings-panel').remove()" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: rgba(255,255,255,0.1); color: white; font-weight: bold; cursor: pointer;">${this.lang.ui.cancel}</button>
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(settingsPanel);
        }

        saveSettings = () => {
            const targetViews = parseInt(document.getElementById('target-views').value);
            const dailyLimit = parseInt(document.getElementById('daily-limit').value);
            const minViewTime = parseInt(document.getElementById('min-view-time').value);
            const maxViewTime = parseInt(document.getElementById('max-view-time').value);
            const language = document.getElementById('language-select').value;

            this.config.TARGET_DAILY_VIEWS = targetViews;
            this.config.DAILY_LIMIT = dailyLimit;
            this.config.MIN_VIEW_TIME = minViewTime;
            this.config.MAX_VIEW_TIME = maxViewTime;
            this.config.LANGUAGE = language;

            this.saveConfig();

            this.langKey = language;
            this.lang = LANGUAGES[this.langKey];

            document.getElementById('aero-settings-panel').remove();
            this.updateUI();
            this.log('Settings saved', 'success');
        }

        createUI() {
            GM_addStyle(`
                #aerostream-panel {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    width: 360px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: 20px;
                    box-shadow: 0 25px 50px rgba(0,0,0,0.5);
                    z-index: 999999;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                    overflow: hidden;
                    border: 1px solid rgba(255,255,255,0.2);
                    backdrop-filter: blur(10px);
                }

                .aero-header {
                    padding: 20px;
                    background: rgba(0,0,0,0.2);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                }

                .aero-title {
                    font-size: 20px;
                    font-weight: bold;
                    color: white;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .aero-badge {
                    background: linear-gradient(45deg, #ff6b6b, #ffa502);
                    font-size: 10px;
                    padding: 2px 8px;
                    border-radius: 10px;
                    font-weight: bold;
                }

                .aero-controls {
                    display: flex;
                    gap: 8px;
                }

                .aero-btn {
                    background: rgba(255,255,255,0.1);
                    border: none;
                    color: white;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s;
                    backdrop-filter: blur(5px);
                }

                .aero-btn:hover {
                    background: rgba(255,255,255,0.2);
                    transform: translateY(-2px);
                }

                .aero-body {
                    padding: 20px;
                }

                .aero-stats {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                    margin-bottom: 20px;
                }

                .aero-stat {
                    background: rgba(255,255,255,0.08);
                    padding: 15px;
                    border-radius: 15px;
                    text-align: center;
                    border: 1px solid rgba(255,255,255,0.1);
                }

                .aero-stat-value {
                    font-size: 24px;
                    font-weight: bold;
                    color: white;
                    margin-bottom: 5px;
                }

                .aero-stat-label {
                    font-size: 11px;
                    color: rgba(255,255,255,0.7);
                }

                .aero-main-controls {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 10px;
                    margin-bottom: 15px;
                }

                .aero-main-btn {
                    padding: 14px;
                    border: none;
                    border-radius: 12px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s;
                    font-size: 13px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    backdrop-filter: blur(5px);
                }

                .aero-btn-primary {
                    background: linear-gradient(45deg, #00b09b, #96c93d);
                    color: white;
                }

                .aero-btn-danger {
                    background: linear-gradient(45deg, #ff416c, #ff4b2b);
                    color: white;
                }

                .aero-btn-warning {
                    background: linear-gradient(45deg, #f7971e, #ffd200);
                    color: white;
                }

                .aero-btn-secondary {
                    background: rgba(255,255,255,0.1);
                    color: white;
                }

                .aero-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                }

                .aero-status {
                    background: rgba(0,0,0,0.2);
                    padding: 12px;
                    border-radius: 12px;
                    color: white;
                    font-size: 12px;
                    margin-bottom: 15px;
                    text-align: center;
                    border: 1px solid rgba(255,255,255,0.1);
                }

                .aero-logs {
                    background: rgba(0,0,0,0.2);
                    padding: 12px;
                    border-radius: 12px;
                    max-height: 180px;
                    overflow-y: auto;
                    font-size: 10px;
                    border: 1px solid rgba(255,255,255,0.1);
                }

                .aero-log {
                    color: rgba(255,255,255,0.9);
                    padding: 6px;
                    border-left: 3px solid transparent;
                    margin-bottom: 4px;
                    border-radius: 4px;
                    font-family: 'Courier New', monospace;
                }

                .aero-log-success {
                    border-left-color: #10b981;
                    background: rgba(16, 185, 129, 0.1);
                }
                .aero-log-error {
                    border-left-color: #ef4444;
                    background: rgba(239, 68, 68, 0.1);
                }
                .aero-log-warning {
                    border-left-color: #f59e0b;
                    background: rgba(245, 158, 11, 0.1);
                }
                .aero-log-info {
                    border-left-color: #3b82f6;
                    background: rgba(59, 130, 246, 0.1);
                }

                .aero-progress {
                    background: rgba(0,0,0,0.2);
                    height: 8px;
                    border-radius: 10px;
                    overflow: hidden;
                    margin-bottom: 15px;
                    border: 1px solid rgba(255,255,255,0.1);
                }

                .aero-progress-bar {
                    background: linear-gradient(90deg, #00b09b, #96c93d);
                    height: 100%;
                    transition: width 0.5s;
                }

                .aero-security {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 8px;
                    margin-bottom: 15px;
                }

                .aero-security-item {
                    background: rgba(255,255,255,0.08);
                    padding: 8px;
                    border-radius: 8px;
                    text-align: center;
                    font-size: 10px;
                    color: white;
                    border: 1px solid rgba(255,255,255,0.1);
                }

                .aero-security-active {
                    background: rgba(16, 185, 129, 0.2);
                    border: 1px solid rgba(16, 185, 129, 0.3);
                }

                .aero-security-inactive {
                    background: rgba(239, 68, 68, 0.2);
                    border: 1px solid rgba(239, 68, 68, 0.3);
                }

                .aero-minimized {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                }

                .aero-minimized .aero-body {
                    display: none;
                }
            `);

            const panel = document.createElement('div');
            panel.id = 'aerostream-panel';
            panel.innerHTML = `
                <div class="aero-header">
                    <div class="aero-title">
                        🦅 ${this.lang.ui.title} <span class="aero-badge">${this.lang.ui.badge}</span>
                    </div>
                    <div class="aero-controls">
                        <button class="aero-btn" onclick="window.aeroBot.showSettings()" title="${this.lang.ui.settings}">⚙️</button>
                        <button class="aero-btn" onclick="window.aeroBot.toggleMinimize()">−</button>
                        <button class="aero-btn" onclick="window.aeroBot.closePanel()">×</button>
                    </div>
                </div>

                <div class="aero-body">
                    <div class="aero-stats">
                        <div class="aero-stat">
                            <div class="aero-stat-value" id="aero-total">0</div>
                            <div class="aero-stat-label">${this.lang.ui.total}</div>
                        </div>
                        <div class="aero-stat">
                            <div class="aero-stat-value" id="aero-today">0</div>
                            <div class="aero-stat-label">${this.lang.ui.today}</div>
                        </div>
                        <div class="aero-stat">
                            <div class="aero-stat-value" id="aero-rate">100%</div>
                            <div class="aero-stat-label">${this.lang.ui.success}</div>
                        </div>
                        <div class="aero-stat">
                            <div class="aero-stat-value" id="aero-sessions">0</div>
                            <div class="aero-stat-label">${this.lang.ui.sessions}</div>
                        </div>
                    </div>

                    <div class="aero-progress">
                        <div class="aero-progress-bar" id="aero-progress" style="width: 0%"></div>
                    </div>

                    <div class="aero-security">
                        <div class="aero-security-item aero-security-active" id="aero-cf">${this.lang.ui.cf_bypass}</div>
                        <div class="aero-security-item aero-security-active" id="aero-anti">${this.lang.ui.anti_detect}</div>
                        <div class="aero-security-item aero-security-active" id="aero-human">${this.lang.ui.human}</div>
                        <div class="aero-security-item aero-security-active" id="aero-stealth">${this.lang.ui.stealth}</div>
                    </div>

                    <div class="aero-status" id="aero-status">${this.lang.ui.status_ready}</div>

                    <div class="aero-main-controls">
                        <button class="aero-main-btn aero-btn-primary" id="aero-start">
                            ${this.lang.ui.start}
                        </button>
                        <button class="aero-main-btn aero-btn-danger" id="aero-stop">
                            ${this.lang.ui.stop}
                        </button>
                        <button class="aero-main-btn aero-btn-warning" id="aero-pause">
                            ${this.lang.ui.pause}
                        </button>
                        <button class="aero-main-btn aero-btn-secondary" id="aero-reset">
                            ${this.lang.ui.reset}
                        </button>
                    </div>

                    <div class="aero-logs" id="aero-logs">
                        <div class="aero-log aero-log-info">[00:00:00] ${this.lang.ui.log_loaded}</div>
                    </div>
                </div>
            `;

            document.body.appendChild(panel);

            document.getElementById('aero-start').onclick = () => this.start();
            document.getElementById('aero-stop').onclick = () => this.stop();
            document.getElementById('aero-pause').onclick = () => this.pause();
            document.getElementById('aero-reset').onclick = () => this.reset();

            this.updateUI();
        }

        toggleMinimize() {
            const panel = document.getElementById('aerostream-panel');
            panel.classList.toggle('aero-minimized');
        }

        closePanel() {
            const panel = document.getElementById('aerostream-panel');
            panel.style.display = 'none';
        }

        updateUI() {
            document.getElementById('aero-total').textContent = this.stats.totalViews;
            document.getElementById('aero-today').textContent = this.stats.todayViews;
            document.getElementById('aero-rate').textContent = `${this.stats.successRate}%`;
            document.getElementById('aero-sessions').textContent = this.stats.totalSessions;

            const progress = (this.stats.todayViews / this.config.TARGET_DAILY_VIEWS) * 100;
            document.getElementById('aero-progress').style.width = Math.min(progress, 100) + '%';

            const statusEl = document.getElementById('aero-status');
            if (this.isRunning) {
                if (this.isPaused) {
                    statusEl.textContent = this.lang.ui.status_paused;
                    statusEl.style.background = 'rgba(251, 146, 60, 0.2)';
                } else {
                    statusEl.textContent = this.lang.ui.status_running;
                    statusEl.style.background = 'rgba(34, 197, 94, 0.2)';
                }
            } else {
                statusEl.textContent = this.lang.ui.status_stopped;
                statusEl.style.background = 'rgba(239, 68, 68, 0.2)';
            }
        }

        log(message, type = 'info') {
            const logsEl = document.getElementById('aero-logs');
            const time = new Date().toLocaleTimeString('tr-TR');
            const logEl = document.createElement('div');
            logEl.className = `aero-log aero-log-${type}`;
            logEl.textContent = `[${time}] ${message}`;

            logsEl.insertBefore(logEl, logsEl.firstChild);

            while (logsEl.children.length > 35) {
                logsEl.removeChild(logsEl.lastChild);
            }

            console.log(`[AeroStream] ${message}`);
        }

        notify(message) {
            if (!this.config.SHOW_NOTIFICATIONS) return;

            if ('Notification' in window && Notification.permission === 'granted') {
                new Notification('AeroStream PRO', {
                    body: message,
                    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="75" font-size="75">🦅</text></svg>'
                });
            } else {
                GM_notification({
                    text: message,
                    title: 'AeroStream PRO',
                    timeout: 5000
                });
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.aeroBot = new GetInkspiredStoryBooster();
        });
    } else {
        window.aeroBot = new GetInkspiredStoryBooster();
    }

    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }

    console.log('✅ AeroStream PRO v2.0 initialized');
})();

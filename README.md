# 🚀 AeroStream V1.6 - High-Performance Story View Booster

AeroStream, hikaye platformlarında (Inkspired vb.) organik trafik simülasyonu yaparak görüntülenme sayılarını optimize etmek için tasarlanmış bir otomasyon scriptidir. Özellikle VDS (Sanal Sunucu) ve Proxy kullanımı için optimize edilmiştir.

## 🌟 Özellikler

- **Organik Okuyucu Simülasyonu:** Rastgele sürelerde bekleme ve yumuşak kaydırma (smooth scrolling) hareketleri ile gerçek kullanıcı davranışı sergiler.
- **Proxy Bilgilendirme Paneli:** Ekranın sağ altında aktif proxy durumunu ve bir sonraki yenileme süresini gösteren şık bir konsol.
- **Oturum Temizleyici:** Her yenileme öncesi `localStorage` ve `sessionStorage` temizliği yaparak platform algoritmalarına yakalanma riskini minimize eder.
- **VDS Dostu:** 7/24 kesintisiz çalışma için hafif ve stabil kod yapısı.

## 🛠️ Kurulum Rehberi

### 1. Scriptin Kurulması
1. Tarayıcınıza **Tampermonkey** eklentisini kurun.
2. Yeni bir script oluşturun ve `AeroStream.js` dosyasındaki kodun tamamını yapıştırıp kaydedin.

### 2. IP Değiştirme ve Proxy Ayarları
JavaScript tarayıcı ağ ayarlarını doğrudan değiştiremediği için, IP döngüsünü sağlamak adına harici bir eklenti kullanmanız gerekir:
1. Tarayıcınıza **Proxy SwitchyOmega** veya **Proxy Switcher and Manager** kurun.
2. Elinizdeki proxy listesini eklentiye aktarın.
3. Eklentiyi "Auto-Switch" moduna alın veya manuel olarak IP değiştirerek scripti çalıştırın.

## ⚠️ Önemli Uyarılar
- Bu araç eğitim ve içerik metrik analizi amaçlıdır.
- Platformların kullanım koşullarını ihlal etmemek için yenileme sürelerini (`minWait`, `maxWait`) gerçekçi tutun.

## 👨‍💻 Geliştirici
**AeroDLL** (Emirhan) tarafından geliştirilmiştir.

import React from 'react';

function Dashboard({ user, onCreateGroup, onViewGroups }) {
  return (
    <div>
      <div className="card" style={{ textAlign: 'center', gridColumn: '1 / -1' }}>
        <h2>👋 Hoş Geldin! {user?.name || 'Kullanıcı'}</h2>
        <p style={{ marginTop: '10px', color: '#666' }}>
          CoSave ile dostlarınız, aileniz veya iş ortaklarınızla birlikte para biriktin.
        </p>
        <div style={{ marginTop: '20px' }}>
          <button className="btn btn-primary" onClick={onCreateGroup}>
            ✨ Yeni Grup Oluştur
          </button>
          <button className="btn btn-secondary" onClick={onViewGroups}>
            👥 Gruplarımı Gör
          </button>
        </div>
      </div>

      <div className="grid" style={{ marginTop: '30px' }}>
        <div className="card">
          <h3>💡 CoSave Nedir?</h3>
          <p>
            Ortak hedeflere yönelik grup bazlı dijital kumbara sistemi. 
            Arkadaş grupları, aile üyeleri veya iş ortakları birlikte para birikitirebilir.
          </p>
        </div>

        <div className="card">
          <h3>🔒 Güvenli & Şeffaf</h3>
          <p>
            Tüm para çekmeleri tüm grup üyelerinin onayını gerektirir. 
            Hiç kimse tek başına ortak parayı çekemez.
          </p>
        </div>

        <div className="card">
          <h3>🎯 Hedef Odaklı</h3>
          <p>
            Spesifik hedefler belirleyin: tatil, ev alımı, etkinlik. 
            Hedef tamamlandığında yeni hedef başlatabilirsiniz.
          </p>
        </div>

        <div className="card">
          <h3>💱 Çok Para Birimi</h3>
          <p>
            TL, USD, EUR, GBP ve daha fazlasıyla katkı yapın. 
            Sistem otomatik olarak kur dönüştürür.
          </p>
        </div>

        <div className="card">
          <h3>📈 Artan Kazanç</h3>
          <p>
            1. hedef: %10 kazanç, 2. hedef: %12 kazanç. 
            Sadakatinizi ödüllendirir ve sürekliliği teşvik ederiz.
          </p>
        </div>

        <div className="card">
          <h3>🏆 Gamifikasyon</h3>
          <p>
            Hedeflere yaklaştıkça rozetler, indirimler ve avantajlar kazanın. 
            Sürece eğlence ve motivasyon katılır.
          </p>
        </div>
      </div>

      <div style={{ 
        background: 'white', 
        borderRadius: '10px', 
        padding: '20px', 
        marginTop: '30px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ color: '#667eea', marginBottom: '10px' }}>📊 İstatistikler</h3>
        <div className="grid">
          <div className="stat">
            <div className="stat-value">∞</div>
            <div className="stat-label">Sınırsız Grup</div>
          </div>
          <div className="stat">
            <div className="stat-value">2-6</div>
            <div className="stat-label">Üye Limiti</div>
          </div>
          <div className="stat">
            <div className="stat-value">100%</div>
            <div className="stat-label">Şeffaf</div>
          </div>
          <div className="stat">
            <div className="stat-value">24/7</div>
            <div className="stat-label">Erişim</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

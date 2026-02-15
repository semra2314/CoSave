import React from 'react';

function GroupList({ groups, onSelectGroup, onBack }) {
  return (
    <div>
      <button className="btn btn-secondary" onClick={onBack}>
        ← Geri Dön
      </button>

      <h2 style={{ color: 'white', marginTop: '20px', marginBottom: '20px' }}>
        👥 Gruplarım ({groups.length || 0})
      </h2>

      {groups.length === 0 ? (
        <div className="card" style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
          <p style={{ color: '#666', fontSize: '16px' }}>
            Henüz grup oluşturmadınız. Yeni bir grup oluşturarak başlayın! 🚀
          </p>
        </div>
      ) : (
        <div className="grid">
          {groups.map((group) => (
            <div 
              key={group.id} 
              className="card"
              onClick={() => onSelectGroup(group)}
              style={{ cursor: 'pointer' }}
            >
              <h3>{group.name}</h3>
              <p>{group.description}</p>
              <button className="btn btn-primary">
                Detay →
              </button>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: '30px', background: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)' }}>
        <h3 style={{ color: '#667eea', marginBottom: '15px' }}>📝 Grup Haklığınız Nedir?</h3>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div>
            <h4 style={{ color: '#333', marginBottom: '5px' }}>Admin</h4>
            <p style={{ color: '#666', fontSize: '14px' }}>Grup ayarlarını düzenle, üye ekle/çıkar</p>
          </div>
          <div>
            <h4 style={{ color: '#333', marginBottom: '5px' }}>Üye</h4>
            <p style={{ color: '#666', fontSize: '14px' }}>Para ekle, hedefleri gör, çekim onayla</p>
          </div>
          <div>
            <h4 style={{ color: '#333', marginBottom: '5px' }}>Çekim</h4>
            <p style={{ color: '#666', fontSize: '14px' }}>Tüm üyelerin onayı gerekir</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupList;

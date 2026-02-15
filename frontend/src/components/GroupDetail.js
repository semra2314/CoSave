import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

function GroupDetail({ group, user, onBack }) {
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    target_amount: '',
    currency: 'TRY'
  });
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    loadGoals();
  }, [group]);

  const loadGoals = async () => {
    try {
      setLoading(true);
      // Demo veriler
      const demoGoals = [
        {
          id: '1',
          title: 'Tatil',
          target_amount: 5000,
          current_amount: 2300,
          currency: 'TRY',
          status: 'active',
          interest_rate: 10
        },
        {
          id: '2',
          title: 'Ev Alımı',
          target_amount: 50000,
          current_amount: 12500,
          currency: 'TRY',
          status: 'active',
          interest_rate: 10
        }
      ];
      setGoals(demoGoals);
      setSelectedGoal(demoGoals[0]);
    } catch (error) {
      console.error('Hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGoal = async (e) => {
    e.preventDefault();
    try {
      const newGoal = {
        id: Math.random().toString(36).substr(2, 9),
        title: formData.title,
        target_amount: parseFloat(formData.target_amount),
        current_amount: 0,
        currency: formData.currency,
        status: 'active',
        interest_rate: 10
      };
      setGoals([...goals, newGoal]);
      setFormData({ title: '', target_amount: '', currency: 'TRY' });
      alert('✅ Hedef başarıyla oluşturuldu!');
    } catch (error) {
      alert('❌ Hata oluştu');
    }
  };

  const handleAddTransaction = async () => {
    if (!selectedGoal) {
      alert('Önce bir hedef seçin');
      return;
    }

    const amount = prompt('Katkı miktarını girin:');
    if (amount) {
      try {
        // Oyunlaştırma: hedefe %80'e geldi mi kontrol et
        const newAmount = selectedGoal.current_amount + parseFloat(amount);
        const percentage = (newAmount / selectedGoal.target_amount) * 100;

        // Hedefi güncelle (demo)
        const updatedGoals = goals.map(g => 
          g.id === selectedGoal.id 
            ? { ...g, current_amount: newAmount }
            : g
        );
        setGoals(updatedGoals);
        setSelectedGoal({ ...selectedGoal, current_amount: newAmount });

        if (percentage >= 80) {
          alert('🎉 Harika! Hedefinize %80\'e ulaştınız! |🏆| rozeti kazandınız!');
        }
        alert(`✅ ${amount} ${selectedGoal.currency} katkı yapıldı!`);
      } catch (error) {
        alert('❌ Işlem başarısız');
      }
    }
  };

  const getProgressPercentage = () => {
    if (!selectedGoal) return 0;
    return (selectedGoal.current_amount / selectedGoal.target_amount) * 100;
  };

  return (
    <div>
      <button className="btn btn-secondary" onClick={onBack}>
        ← Geri Dön
      </button>

      <h2 style={{ color: 'white', marginTop: '20px', marginBottom: '20px' }}>
        📊 {group.name}
      </h2>

      <div className="grid">
        {/* Hedef Oluşturma */}
        <div className="card" style={{ gridColumn: '1 / -1' }}>
          <h3>✨ Yeni Hedef Oluştur</h3>
          <form onSubmit={handleCreateGoal} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px', alignItems: 'end' }}>
            <input
              type="text"
              placeholder="Hedef başlığı"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Hedef tutar"
              value={formData.target_amount}
              onChange={(e) => setFormData({ ...formData, target_amount: e.target.value })}
              required
            />
            <select
              value={formData.currency}
              onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
            >
              <option value="TRY">TRY</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
            <button type="submit" className="btn btn-primary">Hedef Oluştur</button>
          </form>
        </div>

        {/* Hedefler Listesi */}
        {goals.map((goal) => (
          <div 
            key={goal.id}
            className="card"
            onClick={() => setSelectedGoal(goal)}
            style={{ 
              cursor: 'pointer',
              border: selectedGoal?.id === goal.id ? '3px solid #667eea' : 'none'
            }}
          >
            <h3>{goal.title}</h3>
            <div style={{ marginTop: '10px' }}>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>
                İlerleme: {Math.round(goal.current_amount)}/{goal.target_amount} {goal.currency}
              </div>
              <div className="progress-bar">
                <div 
                  className="progress"
                  style={{ width: `${Math.min(100, (goal.current_amount / goal.target_amount) * 100)}%` }}
                />
              </div>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#667eea', marginTop: '5px' }}>
                {Math.round((goal.current_amount / goal.target_amount) * 100)}% Tamamlandı
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Seçili Hedef Detayları */}
      {selectedGoal && (
        <div className="card" style={{ marginTop: '20px', gridColumn: '1 / -1' }}>
          <h3>{selectedGoal.title} - Detaylar</h3>
          
          <div className="grid" style={{ marginTop: '15px', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
            <div className="stat">
              <div className="stat-value">{Math.round(selectedGoal.current_amount)}</div>
              <div className="stat-label">Mevcut Tutar</div>
            </div>
            <div className="stat">
              <div className="stat-value">{selectedGoal.target_amount}</div>
              <div className="stat-label">Hedef Tutar</div>
            </div>
            <div className="stat">
              <div className="stat-value">{selectedGoal.interest_rate}%</div>
              <div className="stat-label">Kazanç Oranı</div>
            </div>
            <div className="stat">
              <div className="stat-value">{Math.round(getProgressPercentage())}</div>
              <div className="stat-label">İlerleme %</div>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <button 
              className="btn btn-primary"
              onClick={handleAddTransaction}
            >
              💰 Katkı Yap
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => alert('Çekim isteklerini görmek için admin onayı gereklidir')}
            >
              🏦 Çekim İste
            </button>
          </div>

          {/* Birkaç demo işlem */}
          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#333', marginBottom: '10px' }}>📝 Son İşlemler</h4>
            <div className="transaction-item">
              <div className="name">Dilanur Bal</div>
              <div className="amount">+ 500 ₺</div>
              <div style={{ fontSize: '12px', color: '#999' }}>13 Şubat 2026 - 14:30</div>
            </div>
            <div className="transaction-item">
              <div className="name">Ali Yıldız</div>
              <div className="amount">+ 1000 ₺</div>
              <div style={{ fontSize: '12px', color: '#999' }}>12 Şubat 2026 - 10:15</div>
            </div>
          </div>
        </div>
      )}

      {/* Grup Üyeleri */}
      <div className="card" style={{ marginTop: '20px', gridColumn: '1 / -1' }}>
        <h3>👥 Grup Üyeleri (2-6)</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
          <div style={{ background: '#e3f2fd', padding: '10px 15px', borderRadius: '20px', fontSize: '14px' }}>
            👤 Dilanur Bal (Admin)
          </div>
          <div style={{ background: '#f3e5f5', padding: '10px 15px', borderRadius: '20px', fontSize: '14px' }}>
            👤 Ali Yıldız (Üye)
          </div>
        </div>
        <button className="btn btn-primary" style={{ marginTop: '15px' }}>
          ➕ Üye Ekle
        </button>
      </div>

      {/* Oyunlaştırma */}
      <div className="card" style={{ marginTop: '20px', gridColumn: '1 / -1' }}>
        <h3>🏆 Oyunlaştırma & Rozetler</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
          <div className="badge">🥇 İlk Hedef Tamamlandı</div>
          <div className="badge">🔥 7 Gün Disiplini</div>
          <div className="badge">💪 Köklü Tasarrufçu</div>
          <div className="badge">🌟 Ekip Oyuncusu</div>
        </div>
      </div>
    </div>
  );
}

export default GroupDetail;

import React, { useState } from 'react';
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

function CreateGroup({ user, onGroupCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await API.post('/groups', {
        name: formData.name,
        description: formData.description,
        created_by: user.id
      });

      alert('✅ Grup başarıyla oluşturuldu!');
      onGroupCreated(response.data);
    } catch (error) {
      console.error('Hata:', error);
      alert('❌ Grup oluşturmada hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ color: '#667eea', marginBottom: '20px' }}>✨ Yeni Grup Oluştur</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Grup Adı *</label>
          <input
            type="text"
            name="name"
            placeholder="örn: Tatil Kumbarası"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Açıklama</label>
          <textarea
            name="description"
            placeholder="Grup hakkında açıklama yapın..."
            value={formData.description}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? '⏳ Oluşturuluyor...' : '✅ Grubu Oluştur'}
        </button>
      </form>

      <div style={{ marginTop: '20px', padding: '15px', background: '#f0f0f0', borderRadius: '5px' }}>
        <h4 style={{ color: '#333', marginBottom: '10px' }}>💡 İpuçları:</h4>
        <ul style={{ marginLeft: '20px', color: '#666', lineHeight: '1.8' }}>
          <li>Grup adını açık ve kolay hatırlanabilir yapın</li>
          <li>Grup üyelerini sonradan ekleyebilirsiniz</li>
          <li>Her grupta en fazla 6 kişi olabilir</li>
          <li>Siz grup yaratıcısı ve admin olacaksınız</li>
        </ul>
      </div>
    </div>
  );
}

export default CreateGroup;

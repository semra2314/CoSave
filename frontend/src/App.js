import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import GroupList from './components/GroupList';
import GroupDetail from './components/GroupDetail';
import CreateGroup from './components/CreateGroup';
import Dashboard from './components/Dashboard';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

function App() {
  const [page, setPage] = useState('dashboard');
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Demo kullanıcı oluştur
    const createDemoUser = async () => {
      try {
        const response = await API.post('/users', {
          name: 'Dilanur Bal',
          email: 'dilanur@cosave.com'
        });
        setUser(response.data);
        localStorage.setItem('userId', response.data.id);
      } catch (error) {
        // Kullanıcı zaten varsa localStoragedan al
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
          setUser({ id: storedUserId });
        }
      }
    };
    createDemoUser();
  }, []);

  const handleViewGroups = async () => {
    setLoading(true);
    try {
      // Test için demo grupları oluştur
      const response = await API.get('/groups/test');
      setGroups(response.data);
      setPage('groups');
    } catch (error) {
      console.log('Grupları getirme işlemi başarısız, demo veriler gösteriliyor');
      setPage('groups');
    }
    setLoading(false);
  };

  const handleGroupCreated = (newGroup) => {
    setGroups([...groups, newGroup]);
    setPage('groups');
  };

  const handleSelectGroup = (group) => {
    setSelectedGroup(group);
    setPage('groupDetail');
  };

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return (
          <Dashboard 
            user={user} 
            onCreateGroup={() => setPage('createGroup')}
            onViewGroups={handleViewGroups}
          />
        );
      case 'createGroup':
        return <CreateGroup user={user} onGroupCreated={handleGroupCreated} />;
      case 'groups':
        return (
          <GroupList 
            groups={groups} 
            onSelectGroup={handleSelectGroup}
            onBack={() => setPage('dashboard')}
          />
        );
      case 'groupDetail':
        return (
          <GroupDetail 
            group={selectedGroup} 
            user={user}
            onBack={() => setPage('groups')}
          />
        );
      default:
        return <Dashboard user={user} />;
    }
  };

  return (
    <div className="app">
      <nav className="navbar">
        <h1 onClick={() => setPage('dashboard')} style={{ cursor: 'pointer' }}>
          💰 CoSave - Ortak Dijital Kumbara
        </h1>
        <p style={{ fontSize: '12px', marginTop: '5px', color: '#666' }}>
          Garanti BBVA Sürdürülebilir Bankacılık Projesi
        </p>
      </nav>
      
      <div className="container">
        {loading && <div className="loading">Yükleniyor...</div>}
        {!loading && renderPage()}
      </div>
    </div>
  );
}

export default App;

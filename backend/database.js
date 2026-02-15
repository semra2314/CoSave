const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, 'cosave.db');

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Veritabanı bağlantı hatası:', err);
  } else {
    console.log('SQLite veritabanına bağlandı:', DB_PATH);
    initializeDatabase();
  }
});

function initializeDatabase() {
  db.serialize(() => {
    // Kullanıcılar tablosu
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Gruplar tablosu
    db.run(`
      CREATE TABLE IF NOT EXISTS groups (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        created_by TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users(id)
      )
    `);

    // Grup üyeleri
    db.run(`
      CREATE TABLE IF NOT EXISTS group_members (
        id TEXT PRIMARY KEY,
        group_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        is_admin BOOLEAN DEFAULT 0,
        FOREIGN KEY (group_id) REFERENCES groups(id),
        FOREIGN KEY (user_id) REFERENCES users(id),
        UNIQUE(group_id, user_id)
      )
    `);

    // Hedefler
    db.run(`
      CREATE TABLE IF NOT EXISTS goals (
        id TEXT PRIMARY KEY,
        group_id TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        target_amount REAL NOT NULL,
        current_amount REAL DEFAULT 0,
        currency TEXT DEFAULT 'TRY',
        status TEXT DEFAULT 'active',
        interest_rate REAL DEFAULT 10,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        target_date DATETIME,
        completed_at DATETIME,
        FOREIGN KEY (group_id) REFERENCES groups(id)
      )
    `);

    // İşlemler
    db.run(`
      CREATE TABLE IF NOT EXISTS transactions (
        id TEXT PRIMARY KEY,
        goal_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        amount REAL NOT NULL,
        currency TEXT DEFAULT 'TRY',
        converted_amount REAL NOT NULL,
        exchange_rate REAL DEFAULT 1,
        type TEXT NOT NULL,
        status TEXT DEFAULT 'completed',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (goal_id) REFERENCES goals(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    // Çekim istekleri
    db.run(`
      CREATE TABLE IF NOT EXISTS withdrawal_requests (
        id TEXT PRIMARY KEY,
        goal_id TEXT NOT NULL,
        requested_by TEXT NOT NULL,
        requested_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        status TEXT DEFAULT 'pending',
        FOREIGN KEY (goal_id) REFERENCES goals(id),
        FOREIGN KEY (requested_by) REFERENCES users(id)
      )
    `);

    // Çekim onayları
    db.run(`
      CREATE TABLE IF NOT EXISTS withdrawal_approvals (
        id TEXT PRIMARY KEY,
        withdrawal_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        approved BOOLEAN,
        approved_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (withdrawal_id) REFERENCES withdrawal_requests(id),
        FOREIGN KEY (user_id) REFERENCES users(id),
        UNIQUE(withdrawal_id, user_id)
      )
    `);

    // Oyunlaştırma rozetleri
    db.run(`
      CREATE TABLE IF NOT EXISTS badges (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        icon TEXT,
        requirement_type TEXT,
        requirement_value REAL
      )
    `);

    // Kullanıcı rozetleri
    db.run(`
      CREATE TABLE IF NOT EXISTS user_badges (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        badge_id TEXT NOT NULL,
        earned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (badge_id) REFERENCES badges(id),
        UNIQUE(user_id, badge_id)
      )
    `);

    console.log('Veritabanı tabloları başarıyla oluşturuldu');
  });
}

module.exports = db;

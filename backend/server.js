const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// =============== USERS API ===============
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  const id = uuidv4();

  db.run(
    'INSERT INTO users (id, name, email) VALUES (?, ?, ?)',
    [id, name, email],
    function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.json({ id, name, email });
    }
  );
});

app.get('/api/users/:id', (req, res) => {
  db.get('SELECT * FROM users WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(row);
  });
});

// =============== GROUPS API ===============
app.post('/api/groups', (req, res) => {
  const { name, description, created_by } = req.body;
  const id = uuidv4();

  db.run(
    'INSERT INTO groups (id, name, description, created_by) VALUES (?, ?, ?, ?)',
    [id, name, description, created_by],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });

      // Grup yaratıcısını otomatik olarak admin üye yap
      const memberId = uuidv4();
      db.run(
        'INSERT INTO group_members (id, group_id, user_id, is_admin) VALUES (?, ?, ?, 1)',
        [memberId, id, created_by],
        (err) => {
          if (err) return res.status(400).json({ error: err.message });
          res.json({ id, name, description, created_by });
        }
      );
    }
  );
});

app.get('/api/groups/:id', (req, res) => {
  db.get(
    'SELECT * FROM groups WHERE id = ?',
    [req.params.id],
    (err, group) => {
      if (err) return res.status(400).json({ error: err.message });

      // Grup üyelerini getir
      db.all(
        'SELECT u.*, m.is_admin FROM users u JOIN group_members m ON u.id = m.user_id WHERE m.group_id = ?',
        [req.params.id],
        (err, members) => {
          if (err) return res.status(400).json({ error: err.message });
          res.json({ ...group, members });
        }
      );
    }
  );
});

app.post('/api/groups/:id/members', (req, res) => {
  const { user_id } = req.body;
  const group_id = req.params.id;
  const memberId = uuidv4();

  db.run(
    'INSERT INTO group_members (id, group_id, user_id) VALUES (?, ?, ?)',
    [memberId, group_id, user_id],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ memberId, group_id, user_id });
    }
  );
});

// =============== GOALS API ===============
app.post('/api/goals', (req, res) => {
  const { group_id, title, description, target_amount, currency, target_date } = req.body;
  const id = uuidv4();

  db.run(
    'INSERT INTO goals (id, group_id, title, description, target_amount, currency, target_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [id, group_id, title, description, target_amount, currency, target_date],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ id, group_id, title, description, target_amount, currency });
    }
  );
});

app.get('/api/groups/:id/goals', (req, res) => {
  db.all('SELECT * FROM goals WHERE group_id = ? ORDER BY created_at DESC', 
    [req.params.id],
    (err, rows) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json(rows);
    }
  );
});

app.get('/api/goals/:id', (req, res) => {
  db.get('SELECT * FROM goals WHERE id = ?', [req.params.id], (err, goal) => {
    if (err) return res.status(400).json({ error: err.message });
    
    // Işlemleri getir
    db.all(
      'SELECT * FROM transactions WHERE goal_id = ? AND status = "completed" ORDER BY created_at DESC',
      [req.params.id],
      (err, transactions) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ ...goal, transactions });
      }
    );
  });
});

// =============== TRANSACTIONS API ===============
app.post('/api/transactions', (req, res) => {
  const { goal_id, user_id, amount, currency } = req.body;
  const id = uuidv4();

  // Simple kur dönüştürme (gerçek uygulamada API kullanıl)
  const exchangeRates = {
    'TRY': 1,
    'USD': 31,
    'EUR': 34,
    'GBP': 39
  };

  const exchangeRate = exchangeRates[currency] || 1;
  const convertedAmount = amount * exchangeRate;

  db.run(
    'INSERT INTO transactions (id, goal_id, user_id, amount, currency, converted_amount, exchange_rate, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [id, goal_id, user_id, amount, currency, convertedAmount, exchangeRate, 'contribution'],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });

      // Hedef tutarını güncelle
      db.run(
        'UPDATE goals SET current_amount = current_amount + ? WHERE id = ?',
        [convertedAmount, goal_id],
        (err) => {
          if (err) return res.status(400).json({ error: err.message });
          res.json({ id, goal_id, user_id, amount, currency, convertedAmount });
        }
      );
    }
  );
});

app.get('/api/goals/:id/transactions', (req, res) => {
  db.all(
    'SELECT t.*, u.name FROM transactions t JOIN users u ON t.user_id = u.id WHERE t.goal_id = ? ORDER BY t.created_at DESC',
    [req.params.id],
    (err, rows) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json(rows);
    }
  );
});

// =============== WITHDRAWAL API ===============
app.post('/api/withdrawals', (req, res) => {
  const { goal_id, requested_by } = req.body;
  const id = uuidv4();

  db.run(
    'INSERT INTO withdrawal_requests (id, goal_id, requested_by) VALUES (?, ?, ?)',
    [id, goal_id, requested_by],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ id, goal_id, requested_by, status: 'pending' });
    }
  );
});

app.post('/api/withdrawals/:id/approve', (req, res) => {
  const { user_id, approved } = req.body;
  const withdrawal_id = req.params.id;
  const id = uuidv4();

  db.run(
    'INSERT INTO withdrawal_approvals (id, withdrawal_id, user_id, approved) VALUES (?, ?, ?, ?)',
    [id, withdrawal_id, user_id, approved ? 1 : 0],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });

      // Tüm üyelerin onayını kontrol et
      db.get(
        `SELECT COUNT(*) as total FROM group_members WHERE group_id = (
          SELECT group_id FROM goals WHERE id = (
            SELECT goal_id FROM withdrawal_requests WHERE id = ?
          )
        )`,
        [withdrawal_id],
        (err, { total }) => {
          db.get(
            'SELECT COUNT(*) as approved FROM withdrawal_approvals WHERE withdrawal_id = ? AND approved = 1',
            [withdrawal_id],
            (err, { approved: approvedCount }) => {
              if (approvedCount === total) {
                // Tüm onaylar tamam - çekim işlemi gerçekleştir
                db.run(
                  'UPDATE withdrawal_requests SET status = "approved" WHERE id = ?',
                  [withdrawal_id]
                );
              }
              res.json({ success: true, message: 'Onay kaydedildi' });
            }
          );
        }
      );
    }
  );
});

// =============== BADGES API ===============
app.get('/api/users/:id/badges', (req, res) => {
  db.all(
    'SELECT b.*, ub.earned_at FROM badges b JOIN user_badges ub ON b.id = ub.badge_id WHERE ub.user_id = ?',
    [req.params.id],
    (err, rows) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json(rows || []);
    }
  );
});

// =============== EXCHANGE RATES (basit mock) ===============
app.get('/api/exchange-rates', (req, res) => {
  res.json({
    TRY: 1,
    USD: 31,
    EUR: 34,
    GBP: 39
  });
});

// =============== HEALTH CHECK ===============
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 CoSave Backend sunucu ${PORT} portunda çalışıyor...`);
});

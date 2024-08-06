const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;
const uri = "NOPE";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize session middleware
app.use(session({
  secret: 'NOPE',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: uri })
}));

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}
run().catch(console.dir);

const redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.sendStatus(401);
  } else {
    next();
  }
};

app.get('/', (req, res) => {
  if (req.session.userId) {
    res.redirect('/dashboard');
  } else {
    res.render('layout', { content: 'home', loggedIn: !!req.session.userId, expenses: [], categoryColors: {} });
  }
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const database = client.db("financialApp");
    const users = database.collection("users");
  
    const existingUser = await users.findOne({ username });
    if (existingUser) {
      return res.sendStatus(409); // Conflict, user already exists
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword };
    await users.insertOne(newUser);
    res.sendStatus(201); // Created
  });

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const database = client.db("financialApp");
  const users = database.collection("users");
  const user = await users.findOne({ username });

  if (user && await bcrypt.compare(password, user.password)) {
    req.session.userId = user._id;
    res.redirect('/dashboard');
  } else {
    res.sendStatus(401);
  }
});

app.post('/logout', redirectLogin, (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.error('Session destruction error:', err);
        return res.redirect('/dashboard');
      }
      res.clearCookie('connect.sid');
      res.redirect('/');
    });
});

app.get('/dashboard', redirectLogin, async (req, res) => {
  const database = client.db("financialApp");
  const expenses = database.collection("expenses");
  const categories = database.collection("categories");
  
  const userExpenses = await expenses.find({ userId: req.session.userId }).toArray();
  const userCategories = await categories.find({ }).toArray();

  const categoryColors = userCategories.reduce((acc, category) => {
    acc[category.name] = category.color;
    return acc;
  }, {});

  res.render('layout', { content: 'home', expenses: userExpenses, categoryColors, loggedIn: true });
});

app.post('/add-expense', redirectLogin, async (req, res) => {
    const { category, location, description, amount, date, color } = req.body;
    const userId = req.session.userId;
    const database = client.db("financialApp");
    const expenses = database.collection("expenses");
    const categories = database.collection("categories");
  
    let categoryDoc = await categories.findOne({ name: category });
  
    if (!categoryDoc) {
      categoryDoc = { name: category, color };
      await categories.insertOne(categoryDoc);
    }
  
    const expense = { userId, category, location, description, amount, date: new Date(date) };
    await expenses.insertOne(expense);
    res.sendStatus(201); // Created
});

app.delete('/remove-expense', redirectLogin, async (req, res) => {
    const { expenseId } = req.body;
    const userId = req.session.userId;
    const database = client.db("financialApp");
    const expenses = database.collection("expenses");
  
    const result = await expenses.deleteOne({ _id: new ObjectId(expenseId), userId });
    if (result.deletedCount === 1) {
      res.sendStatus(200); // OK
    } else {
      res.sendStatus(404); // Not Found
    }
});

app.put('/update-expense', redirectLogin, async (req, res) => {
    const { expenseId, category, location, description, amount, date } = req.body;
    const userId = req.session.userId;
    const database = client.db("financialApp");
    const expenses = database.collection("expenses");

    const result = await expenses.updateOne(
        { _id: new ObjectId(expenseId), userId: userId },
        { $set: { category, location, description, amount, date: new Date(date) } }
    );

    if (result.modifiedCount === 1) {
        res.sendStatus(200); // OK
    } else {
        res.sendStatus(404); // Not Found
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
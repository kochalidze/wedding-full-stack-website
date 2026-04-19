const Database = require('better-sqlite3');
const path = require('path');

// database.db src ფოლდერში იქნება
const dbPath = path.join(__dirname, '..', 'database.db');

const db = new Database(dbPath);

//* Create users table
const createUsersTable = `
	CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		last_name TEXT NOT NULL,
		email TEXT NOT NULL UNIQUE,
		password TEXT NOT NULL,
		role TEXT NOT NULL DEFAULT 'user',
		status TEXT DEFAULT 'active',
		created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
	);
`;
db.exec(createUsersTable);

// Backward-compatible migration for existing databases
const hasCreatedAt = db
	.prepare("SELECT 1 FROM pragma_table_info('users') WHERE name = 'created_at'")
	.get();

if (!hasCreatedAt) {
	db.exec('ALTER TABLE users ADD COLUMN created_at TEXT');
	db.exec("UPDATE users SET created_at = CURRENT_TIMESTAMP WHERE created_at IS NULL");
}

//* Create dresses table
const createDressTable = `
	CREATE TABLE IF NOT EXISTS dresses (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		description TEXT,
		price REAL NOT NULL,
		size TEXT NOT NULL,
		color TEXT NOT NULL,
		category TEXT NOT NULL,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME,
		image_url TEXT
	);
`;
db.exec(createDressTable);

//* Create Decorations table
const createDecorationsTable = `
	CREATE TABLE IF NOT EXISTS decorations (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		description TEXT NOT NULL,
		price REAL NOT NULL,
		image_url TEXT
	);
`;
db.exec(createDecorationsTable);

//* Create bookings table
const createBookingsTable = `
	CREATE TABLE IF NOT EXISTS bookings (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		user_id INTEGER NOT NULL,
		dress_id INTEGER NOT NULL,
		decoration_id INTEGER,
		booking_date DATE NOT NULL,
		status TEXT DEFAULT 'pending',
		FOREIGN KEY (user_id) REFERENCES users(id),
		FOREIGN KEY (decoration_id) REFERENCES decorations(id),
		FOREIGN KEY (dress_id) REFERENCES dresses(id)
	);	
`;
db.exec(createBookingsTable);

const usersComentsTable = `
	CREATE TABLE IF NOT EXISTS user_comments (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		user_id INTEGER,
		comment_author_name TEXT,
		comment_author_email TEXT,
		comment TEXT NOT NULL,
		rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY (user_id) REFERENCES users(id)
	);
`;
db.exec(usersComentsTable);

// Migration: Add missing columns to user_comments if they don't exist
const hasCommentAuthorName = db
	.prepare("SELECT 1 FROM pragma_table_info('user_comments') WHERE name = 'comment_author_name'")
	.get();

if (!hasCommentAuthorName) {
	try {
		db.exec('ALTER TABLE user_comments ADD COLUMN comment_author_name TEXT');
		db.exec('ALTER TABLE user_comments ADD COLUMN comment_author_email TEXT');
		console.log('✓ Added comment_author_name and comment_author_email columns to user_comments');
	} catch (error) {
		console.log('Columns already exist or migration skipped:', error.message);
	}
}

const userIdColumnInfo = db
	.prepare("PRAGMA table_info('user_comments')")
	.all()
	.find((column) => column.name === 'user_id');

if (userIdColumnInfo && userIdColumnInfo.notnull === 1) {
	console.log('Rebuilding user_comments table to allow nullable user_id');
	db.exec(`
		CREATE TABLE IF NOT EXISTS user_comments_new (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			user_id INTEGER,
			comment_author_name TEXT,
			comment_author_email TEXT,
			comment TEXT NOT NULL,
			rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (user_id) REFERENCES users(id)
		);
	`);
	db.exec(`
		INSERT INTO user_comments_new (id, user_id, comment_author_name, comment_author_email, comment, rating, created_at)
		SELECT id, user_id, comment_author_name, comment_author_email, comment, rating, created_at FROM user_comments;
	`);
	db.exec('DROP TABLE user_comments;');
	db.exec('ALTER TABLE user_comments_new RENAME TO user_comments;');
	console.log('Rebuilt user_comments table with nullable user_id');
}


//* create Packages table
const createPackagesTable = `
	CREATE TABLE IF NOT EXISTS packages (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		description TEXT,
		price REAL NOT NULL,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME
	);
`;
db.exec(createPackagesTable);

const createGalleryTable = `
	CREATE TABLE IF NOT EXISTS gallery (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		image_url TEXT NOT NULL,
		description TEXT,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP
	);
`;
db.exec(createGalleryTable);

module.exports = db;

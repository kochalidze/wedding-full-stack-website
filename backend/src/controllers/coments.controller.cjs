const db = require('../config/db.cjs');

const getComments = (req, res) => {
	try {
		const stmt = db.prepare(`
			SELECT c.id, c.comment, c.rating, c.created_at, 
				COALESCE(u.name, c.comment_author_name, 'აგზომელი') AS user_name
			FROM user_comments c
			LEFT JOIN users u ON c.user_id = u.id
			ORDER BY c.created_at DESC LIMIT 10
		`);
		const comments = stmt.all();
		res.json({ comments });
	}catch (error) {
		res.status(500).json({ error: 'Failed to fetch comments' });
	}
};

const addComment = (req, res) => {
	const { userId, comment, rating, name, email } = req.body;
	try {
		const stmt = db.prepare(`
			INSERT INTO user_comments (user_id, comment_author_name, comment_author_email, comment, rating, created_at) 
			VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
		`);
		const info = stmt.run(userId || null, name, email, comment, rating);
		const newComment = db.prepare(`
			SELECT c.id, c.comment, c.rating, c.created_at, 
				COALESCE(u.name, c.comment_author_name, 'აგზომელი') AS user_name
			FROM user_comments c
			LEFT JOIN users u ON c.user_id = u.id
			WHERE c.id = ?
		`).get(info.lastInsertRowid);
		res.status(201).json(newComment);
	}catch (error) {
		console.error('Error adding comment:', error);
		res.status(500).json({ error: 'Failed to add comment' });
	}
}

const deleteComment = (req, res) => {
	const { commentId } = req.params;
	try {
		const stmt = db.prepare('DELETE FROM user_comments WHERE id = ?');
		stmt.run(commentId);
		res.json({ message: 'Comment deleted successfully' });
	}catch (error) {
		res.status(500).json({ error: 'Failed to delete comment' });
	}
}


module.exports = {
	getComments,
	addComment,
	deleteComment
};
const db = require('../config/db.cjs');

// Get all dresses
const getAllDresses = (req, res) => {
	try {
		const stmt = db.prepare('SELECT * FROM dresses');
		const dresses = stmt.all();
		res.json(dresses);
	} catch (error) {
		res.status(500).json({ error: 'Failed to retrieve dresses' });
	}
}

const getDressById = (req, res) => {
    const { id } = req.params;
    try {
        const stmt = db.prepare("SELECT * FROM dresses WHERE id = ?");
        const dress = stmt.get(id);

        if (!dress) {
            return res.status(404).json({ error: "კაბა ვერ მოიძებნა" });
        }

        res.json(dress);
    } catch (error) {
        res.status(500).json({ error: "სერვერის შეცდომა" });
    }
};

const addDress = (req, res) => {
    const { name, description, price, size, color, category, image_url } = req.body;

    try {
        const stmt = db.prepare(`
            INSERT INTO dresses (name, description, price, size, color, category, image_url)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `);

        const info = stmt.run(name, description, price, size, color, category, image_url);

        res.status(201).json({
            id: info.lastInsertRowid,
            ...req.body
        });

    } catch (error) {
        // !!! ეს არის ყველაზე მნიშვნელოვანი ხაზი !!!
        console.error("ბაზის შეცდომა:", error.message); 
        
        // აქ დავამატოთ details, რომ ბრაუზერშიც გამოჩნდეს მიზეზი
        res.status(500).json({ 
            error: 'Failed to add dress', 
            details: error.message 
        });
    }
};

const updateDress = (req,res) => {
    const id = req.params.id;
    const { name, description, price, size, color, category, image_url } = req.body;
    try {
        const stmt = db.prepare(`
            UPDATE dresses
            SET name = ?, description = ?, price = ?, size = ?, color = ?, category = ?, image_url = ?
            WHERE id = ?
            `);
            const result = stmt.run(name, description, price, size, color, category, image_url, id);
             if (result.changes === 0) {
                return res.status(404).json({ message: "Dress not found" });
            }

            res.json({
                message: "Dress updated successfully",
                dress: { id, name, price, size, image_url }
            });

    }catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// delete dress
const deleteDress = (req, res) => {
	const dressId = req.params.id;
	try {
		const stmt = db.prepare('DELETE FROM dresses WHERE id = ?');
		const info = stmt.run(dressId);
		if (info.changes === 0) {
			return res.status(404).json({ error: 'Dress not found' });
		}
		res.json({ message: 'Dress deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Failed to delete dress' });
	}
}

module.exports = {
	getAllDresses,
	getDressById,
	addDress,
    updateDress,
	deleteDress
};
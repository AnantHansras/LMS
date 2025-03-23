const searchBookByName = async (req, res) => {
    try {
        const { title } = req.query;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: 'Book title is required',
            });
        }

        // Search for books with matching title (case-insensitive)
        const books = await Book.find({ title: { $regex: new RegExp(title, 'i') } });

        // if (books.length === 0) {
        //     return res.status(404).json({
        //         success: false,
        //         message: 'No books found',
        //     });
        // }

        return res.status(200).json({
            success: true,
            message: 'Books retrieved successfully',
            books,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

const searchBookByGenre = async (req, res) => {
    try {
        const { genre } = req.query;

        if (!genre) {
            return res.status(400).json({
                success: false,
                message: 'Book genre is required',
            });
        }

        // Search for books with matching genre (case-insensitive)
        const books = await Book.find({ genre: { $regex: new RegExp(genre, 'i') } });

        // if (books.length === 0) {
        //     return res.status(404).json({
        //         success: false,
        //         message: 'No books found',
        //     });
        // }

        return res.status(200).json({
            success: true,
            message: 'Books retrieved successfully',
            books,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

const searchBookByAuthor = async (req, res) => {
    try {
        const { author } = req.query;

        // Validate input field
        if (!author) {
            return res.status(400).json({
                success: false,
                message: 'Book author is required',
            });
        }

        // Search for books with matching author (case-insensitive)
        const books = await Book.find({ author: { $regex: new RegExp(author, 'i') } });

        // if (books.length === 0) {
        //     return res.status(404).json({
        //         success: false,
        //         message: 'No books found',
        //     });
        // }

        return res.status(200).json({
            success: true,
            message: 'Books retrieved successfully',
            books,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

//


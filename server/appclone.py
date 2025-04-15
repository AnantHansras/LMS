from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from pymongo import MongoClient
from thefuzz import process

app = Flask(__name__)
CORS(app)

# MongoDB connection
client = MongoClient('mongodb+srv://anant_7:nBsediXMYtrKtL61@cluster0.tsx9r.mongodb.net/')
db = client['lms2']
books_collection = db['books']
transaction_collection = db['Transaction']  # Assuming this is your issued books collection


def fetch_books():
    books = list(books_collection.find({}, {
        '_id': 1,
        'title': 1,
        'author': 1,
        'genre': 1,
        'publishedYear': 1,
        'keywords': 1,
        'imageUrl': 1
    }))
    return pd.DataFrame(books)


def fetch_issued_book_ids(user_id):
    # Fetch transactions where status is 'issued' for this user
    issued_transactions = list(transaction_collection.find({
        'userId': user_id,
        'status': 'issued'
    }, {'bookId': 1}))

    # Extract and return set of issued book IDs (as strings)
    return {str(tx['bookId']) for tx in issued_transactions if 'bookId' in tx}


def preprocess_text(text):
    return text.lower().replace(" ", " ") if isinstance(text, str) else ""


def process_keywords(keywords):
    return ' '.join(keywords).lower().replace(" ", " ") if isinstance(keywords, list) else ""


@app.route('/recommend_py', methods=['POST'])
def recommend_books():
    data = request.json
    book_query = str(data.get('bookQuery', "")).lower().strip()
    user_id = str(data.get('userId', "")).strip()

    if not book_query:
        book_query = 'dbms'

    df = fetch_books()
    if df.empty:
        return jsonify({"message": "No books found in the database"}), 404

    # Get issued book IDs for this user
    issued_book_ids = fetch_issued_book_ids(user_id)

    # Clean and combine text features
    df.dropna(inplace=True)
    df['keywords'] = df['keywords'].apply(process_keywords)
    df['combined_features'] = df['title'] + ' ' + df['author'] + ' ' + df['genre'] + ' ' + df['keywords']
    df['combined_features'] = df['combined_features'].apply(preprocess_text)

    df = df[['title', 'genre', 'author', 'combined_features', '_id', 'publishedYear', 'keywords', 'imageUrl']]

    # Text vectorization
    cv = CountVectorizer(stop_words='english')
    vector = cv.fit_transform(df['combined_features']).toarray()

    # Compute similarity
    similarity = cosine_similarity(vector)

    # Fuzzy match to find the closest book title
    match = process.extractOne(book_query, df['title'])
    if not match:
        return jsonify({"message": "No matching book found"}), 404

    best_match = match[0]
    index = df[df['title'] == best_match].index[0]

    distances = sorted(list(enumerate(similarity[index])), reverse=True, key=lambda x: x[1])

    # Prepare recommendations
    recommendations = []
    for i in distances:
        book = df.iloc[i[0]]
        if str(book['_id']) not in issued_book_ids:
            recommendations.append({
                "title": book.title,
                "author": book.author,
                "genre": book.genre,
                "imageUrl": book.imageUrl,
                "publishedYear": int(book.publishedYear),
                "keywords": book.keywords
            })
        if len(recommendations) >= 4:
            break

    return jsonify({"recommendations": recommendations})


if __name__ == '__main__':
    app.run(port=5002)

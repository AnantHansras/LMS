from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from thefuzz import process
from pymongo import MongoClient
import pandas as pd

app = Flask(__name__)
CORS(app)

# MongoDB connection
client = MongoClient('mongodb+srv://anant_7:nBsediXMYtrKtL61@cluster0.tsx9r.mongodb.net/')
db = client['lms2']
collection = db['books']

# Fetch books from MongoDB
def fetch_books():
    books = list(collection.find({}, {'_id': 1, 'title': 1, 'author': 1, 'genre': 1, 'publishedYear': 1, 'keywords': 1}))
    return pd.DataFrame(books)

# Preprocess text
def preprocess_text(text):
    return text.lower().replace(" ", " ") if isinstance(text, str) else ""

# Process keywords
def process_keywords(keywords):
    return ' '.join(keywords).lower().replace(" ", " ") if isinstance(keywords, list) else ""

# Book recommendation logic
@app.route('/recommend_py', methods=['POST'])
def recommend_books():
    data = request.json
    book_query = data.get('bookQuery', "").strip()

    if not book_query:
        return jsonify({"message": "No book query provided"}), 400

    # Fetch books from MongoDB
    df = fetch_books()

    if df.empty:
        return jsonify({"message": "No books found in the database"}), 404

    df.dropna(inplace=True)
    df['keywords'] = df['keywords'].apply(process_keywords)
    df['combined_features'] = (
        df['title'] + ' ' + df['author'] + ' ' + df['genre'] + ' ' +
        df['publishedYear'].astype(str) + ' ' + df['keywords']
    )
    df['combined_features'] = df['combined_features'].apply(preprocess_text)

    # Convert text to vectors
    cv = CountVectorizer(stop_words='english')
    vector = cv.fit_transform(df['combined_features']).toarray()

    # Compute similarity
    similarity = cosine_similarity(vector)

    # Find the best matching book
    match = process.extractOne(book_query, df['title'].tolist())
    if not match:
        match = process.extractOne(book_query, df['author'].tolist())
        if not match:
            match = process.extractOne(book_query, df['genre'].tolist())
            if not match:
                return jsonify({"message": "No matching Book, Author, or Genre found."}), 404

    best_match = match[0]
    index_list = df[df['title'] == best_match].index.tolist() or df[df['author'] == best_match].index.tolist()

    if not index_list:
        return jsonify({"message": "Matched book not found in dataset"}), 404

    index = index_list[0]  

    distances = sorted(enumerate(similarity[index]), key=lambda x: x[1], reverse=True)

    
    recommendations = []
    for i in distances[0:4]:  
        recommendations.append({
            "title": df.iloc[i[0]].title,
            "author": df.iloc[i[0]].author,
            "genre": df.iloc[i[0]].genre,
            "publishedYear": int(df.iloc[i[0]].publishedYear),
            "keywords": df.iloc[i[0]].keywords
        })

    return jsonify({"recommendations": recommendations})


if __name__ == '__main__':
    app.run(port=5002)

from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from pymongo import MongoClient
from thefuzz import process

app = Flask(__name__)
CORS(app)

client = MongoClient('mongodb+srv://anant_7:nBsediXMYtrKtL61@cluster0.tsx9r.mongodb.net/')
db = client['lms2']
collection = db['books']


def fetch_books():
    books = list(collection.find({}, {'_id': 1, 'title': 1, 'author': 1, 'genre': 1, 'publishedYear': 1, 'keywords': 1,'imageUrl': 1}))
    return pd.DataFrame(books)

def preprocess_text(text):
    return text.lower().replace(" ", " ") if isinstance(text, str) else ""

def process_keywords(keywords):
    return ' '.join(keywords).lower().replace(" ", " ") if isinstance(keywords, list) else ""

@app.route('/recommend_py', methods=['POST'])
def recommend_books():
    data = request.json
    book_query = str(data.get('bookQuery', "")).lower().strip()
    if not book_query:
        book_query = 'dbms'
    df = fetch_books()
    print(book_query,flush=True)
    
    if df.empty:
        return jsonify({"message": "No books found in the database"}), 404

    # Process book data
    df.dropna(inplace=True)
    df['keywords'] = df['keywords'].apply(process_keywords)
    df['combined_features'] = df['title'] + ' ' + df['author'] + ' ' + df['genre']  + ' ' + df['keywords']
    df['combined_features'] = df['combined_features'].apply(preprocess_text)

    df = df[['title','genre','author','combined_features','_id','publishedYear','keywords','imageUrl']]
    # Convert text to vector
    cv = CountVectorizer(stop_words='english')
    vector = cv.fit_transform(df['combined_features']).toarray()

    # Compute similarity
    similarity = cosine_similarity(vector)

    match = process.extractOne(book_query, df['title'])
    
    best_match = match[0]
    index = df[df['title'] == best_match].index[0]
    
    print(f"Showing recommendations for: {best_match}\n", flush=True)
    distances = sorted(list(enumerate(similarity[index])), reverse=True, key=lambda x: x[1])
    for i in distances[0:4]:
        print(df.iloc[i[0]].title,flush=True)
    
    recommendations = []
    for i in distances[0:4]:  
        recommendations.append({
            "title": df.iloc[i[0]].title,
            "author": df.iloc[i[0]].author,
            "genre": df.iloc[i[0]].genre,
            "imageUrl": df.iloc[i[0]].imageUrl,
            "publishedYear": int(df.iloc[i[0]].publishedYear),
            "keywords": df.iloc[i[0]].keywords
        })

    return jsonify({"recommendations": recommendations})


if __name__ == '__main__':
    app.run(port=5002)

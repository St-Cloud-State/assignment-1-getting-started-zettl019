from flask import Flask, jsonify, render_template, request

app = Flask(__name__)
books = ["book1"];



@app.route('/api/books', methods=['GET'])
def get_all_books_v2():
    return jsonify({'list of books':books})


# API to add a book to the database
@app.route('/api/add_book', methods=['POST'])
def add_book():
    print("adding book")
    data = request.get_json()
    title = data.get('title')
    books.append(title);
    return jsonify({'message': 'Book added successfully'})
 
# Route to render the index.html page
@app.route('/')
def index():
    return render_template('index.html')
    
if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")

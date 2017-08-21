from flask import Flask, render_template, request
from passlib.hash import sha256_crypt
#"""from passlib.handlers.sha2_crypt import sha256_crypt"""﻿
from python_db_controller import *

app = Flask(__name__)

@app.route('/')
@app.route('/home_page')
def home_page():
    return render_template('home_page.html')

@app.route('/book_display')
def book_display():
    list_of_books = retrieve_books_from_database()
    if not list_of_books:
        print("Error getting books")
    elif (list_of_books):
        return render_template('books_display.html', list_of_books=list_of_books)
    return render_template('books_display.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/validate_log_in', methods=['GET', 'POST'])
def validate_login():
    if request.method == 'POST':
        username = request.form['inputUsername']
        passwordinput = request.form['inputPassword']
        print("Retrieving details for: " + username)

        userDetails = retrieve_userdetails_from_database(username)
        if not userDetails:
            print("User does not exist")
            return render_template('login.html', validation_message="doesnotexist")
        elif(userDetails):
            if(sha256_crypt.verify(passwordinput, userDetails[0][3])):
                print("Logged in")
                list_of_books = retrieve_books_from_database()
                if not list_of_books:
                    print("Error getting books")
                elif(list_of_books):
                    return render_template('books_display.html', list_of_books=list_of_books, username=userDetails[0][1], userimage = userDetails[0][5])
            else:
                print("Invalid password")
                return render_template('login.html', validation_message="invalid")
                #return "<h1>INVALID PASSWORD!!!</h1>"
    else:
        return render_template('login.html')

@app.route('/check_username/<inputUserName>')
def checkIfUsernameExists(inputUserName):
    doesUsernameExist = retrieve_userdetails_from_database(inputUserName)

    if not doesUsernameExist:
        responseText = "does not exists"

    elif (doesUsernameExist):
        responseText = "exists"
    return responseText, 200, {'Content-Type': 'text/plain'}

@app.route('/submitSignUpForm', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['inputName']
        useremail = request.form['inputEmail']
        userpassword = request.form['inputPassword']
        encryptedpwd = sha256_crypt.encrypt(userpassword)
        print(username);
        age = request.form['age']
        imageToStore = request.form['hiddenImageToStore']
        print(imageToStore);

        doesUsernameExist = retrieve_userdetails_from_database(username)

        if(doesUsernameExist):
            return render_template('login.html')
        elif not doesUsernameExist:
            if(create_user(username, useremail, encryptedpwd, age, imageToStore)):
                return render_template('login.html', validation_message="created")
            else:
                return render_template('signup.html')
    else:
        return render_template('signup.html')

@app.route('/signup')
def home():
    return render_template('signup.html')

@app.route('/book_details/<bookID>')
def displayDetailsOfSelectedBook(bookID):
    bookDetails_array = retrieve_bookdetails_from_database(bookID)
    print(bookDetails_array)
    print(bookDetails_array[0][2])

    if bookDetails_array:
        bookDetails = "<h3>About The Book:</h3><br><b>Name: </b>" + bookDetails_array[0][1] + "<br><br><b>Serial Number: </b>" + \
                      bookDetails_array[0][2] + "<br><br>";
    else:
        bookDetails = "Unable to retrieve book details.";

    if not bookDetails_array:
        bookDetails = "Unable to retrieve book details.";


    return bookDetails, 200, {'Content-Type': 'text/plain'}


if __name__ == "__main__":
    app.run()

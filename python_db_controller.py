from mysql.connector import MySQLConnection, Error, errorcode
from read_db_config import read_db_config

#Retrieve all books
def retrieve_books_from_database():
    try:
        dbconfig = read_db_config()
        conn = MySQLConnection(**dbconfig)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM books")

        row = cursor.fetchone()
        resultList = []
        while row is not None:
            #print(row)
            resultList.append(row)
            row = cursor.fetchone()

        #print(len(resultList))
        #print(resultList)
        #print(resultList[0][1])
        return resultList
    except Error as e:
        print(e)

    finally:
        cursor.close()
        conn.close()

# Retrieve book details based on book id
def retrieve_bookdetails_from_database(bookID):
    try:
        dbconfig = read_db_config()
        conn = MySQLConnection(**dbconfig)
        cursor = conn.cursor()
        query = "SELECT * FROM books WHERE id = %s"
        data = ((bookID),)
        cursor.execute(query, data)
        row = cursor.fetchone()
        resultList = []
        while row is not None:
            #print(row)
            resultList.append(row)
            row = cursor.fetchone()
        #print(resultList)
        return resultList
    except Error as e:
        print(e)
    finally:
        cursor.close()
        conn.close()





# Retrieve user details based on username
def retrieve_userdetails_from_database(username):
    try:
        dbconfig = read_db_config()
        conn = MySQLConnection(**dbconfig)
        cursor = conn.cursor()
        query = "SELECT * FROM user_profile WHERE username = %s"
        data = ((username),)
        cursor.execute(query, data)
        row = cursor.fetchone()
        resultList = []
        while row is not None:
            #print(row)
            resultList.append(row)
            row = cursor.fetchone()
        #print(resultList)
        return resultList
    except Error as e:
        print(e)

    finally:
        cursor.close()
        conn.close()

#Create New User
def create_user(username, email, encryptedpassword, age, userimage):


    #Create a function to check if username exists


    query = "INSERT INTO user_profile(username, useremail, userpassword, age, userimage) " \
            "VALUES(%s,%s,%s,%s,%s)"
    args = (username, email, encryptedpassword, age,userimage)

    try:
        db_config = read_db_config()
        conn = MySQLConnection(**db_config)

        cursor = conn.cursor()
        cursor.execute(query, args)

        print(cursor)
        if cursor.lastrowid:
            print('last insert id', cursor.lastrowid)
        else:
            print('last insert id not found')

        conn.commit()
        return True
    except Error as e:
        print(e)

    finally:
        cursor.close()
        conn.close()
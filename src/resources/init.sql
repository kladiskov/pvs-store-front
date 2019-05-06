DROP DATABASE if exists pvs_store;
CREATE DATABASE if not exists pvs_store;
use pvs_store;

SET FOREIGN_KEY_CHECKS=0;
drop table if exists payment_info;
drop table if exists genre;
drop table if exists book;
drop table if exists cart_entry;
drop table if exists cart;
drop table if exists address;
drop table if exists user;
drop table if exists user_order;
drop table if exists user_address;
drop table if exists user_paymentinfo;
drop table if exists cart_entries;
drop table if exists user_orders;
SET FOREIGN_KEY_CHECKS=1;

CREATE TABLE IF NOT EXISTS payment_info
(
	payment_id BIGINT (20) PRIMARY KEY AUTO_INCREMENT,
    card_no VARCHAR (255),
    provider VARCHAR (255),
    holder_name VARCHAR (255)
);

CREATE TABLE IF NOT EXISTS genre
(
    genre_id BIGINT (20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    genre_name VARCHAR (255),
    genre_type VARCHAR (255)
);

CREATE TABLE IF NOT EXISTS author
(
	author_id BIGINT (20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    author_name VARCHAR (255)
);

CREATE TABLE IF NOT EXISTS book
(
    book_id BIGINT (20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    genre_id BIGINT (20) NOT NULL,
    title VARCHAR (255),
    author VARCHAR (255),
    rating DECIMAL (10,2), 
	publish_date DATETIME,
    stock INT (5),
    price DECIMAL (10,2),
    active BOOLEAN,
    isbn VARCHAR(255),
    description VARCHAR(1000),
    pages INT(5),
    FOREIGN KEY (genre_id) REFERENCES genre (genre_id)
);


CREATE TABLE IF NOT EXISTS cart_entry
(
	entry_id BIGINT (20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    book_id BIGINT (20) NOT NULL,
    quantity INT (5),
    total_price DECIMAL (10,2),
    FOREIGN KEY (book_id) REFERENCES book (book_id)
);

CREATE TABLE IF NOT EXISTS cart
(
    cart_id BIGINT (20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    grand_total DECIMAL (10,2)
);

CREATE TABLE IF NOT EXISTS address
(
    address_id BIGINT (20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR (255),
    last_name VARCHAR (255),
    building VARCHAR (255),
    street VARCHAR (255),
    city VARCHAR (255),
    state VARCHAR (255),
    country VARCHAR (255),
    pincode INT (6),
    mobile VARCHAR (255)
);

CREATE TABLE IF NOT EXISTS user (
    user_id BIGINT (20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR (255),
    last_name VARCHAR (255),
    user_email VARCHAR (255),
    user_mobile VARCHAR (255),
    cart_id BIGINT,
    wish_list BIGINT,
    admin BOOLEAN,
    active BOOLEAN,
    created_on DATETIME,
    FOREIGN KEY (cart_id) REFERENCES cart (cart_id) ,
    FOREIGN KEY (wish_list) REFERENCES cart (cart_id)
);

CREATE TABLE IF NOT EXISTS credential (
	credential_id BIGINT (20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    user_name VARCHAR (255),
    password VARCHAR (255),
    user_role VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES user (user_id)
);

CREATE TABLE IF NOT EXISTS order_details
(
	order_id BIGINT (20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT (20) NOT NULL,
    cart_id BIGINT (20) NOT NULL,
    order_status VARCHAR (20),
    order_date DATETIME,
    FOREIGN KEY (cart_id) REFERENCES cart (cart_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(user_id) REFERENCES user (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS user_address
(
	user_id BIGINT (20) NOT NULL PRIMARY KEY,
    address_id BIGINT (20),
    FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(address_id) REFERENCES address(address_id)
);

CREATE TABLE IF NOT EXISTS user_paymentinfo
(
	user_id BIGINT (20) NOT NULL PRIMARY KEY,
    payment_id BIGINT (20),
    FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(payment_id) REFERENCES payment_info(payment_id)
);

CREATE TABLE IF NOT EXISTS cart_entries
(
	cart_id BIGINT (20) NOT NULL PRIMARY KEY,
    entry_id BIGINT (20),
    FOREIGN KEY (cart_id) REFERENCES cart (cart_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(entry_id) REFERENCES cart_entry(entry_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS author_books
(
	author_id BIGINT (20) NOT NULL PRIMARY KEY,
    book_id BIGINT (20) NOT NULL,
    FOREIGN KEY (book_id) REFERENCES book (book_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(author_id) REFERENCES author(author_id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO genre(genre_id,genre_name,genre_type) VALUES
    (1, "Romantic", "Fiction"),
    (2, "Fiction", "Fiction"),
    (3, "Thriller", "Fiction"),
    (4, "Memoir", "Non Fiction"),
    (5, "Autobiography", "Non Fiction"),
    (6, "Suspense", "Fiction"),
    (7, "Mystery", "Fiction"),
    (8, "Travelogue", "Non Fiction"),
    (9, "Self Help", "Non Fiction");
    
INSERT INTO book(book_id,genre_id,title,author, rating, publish_date, stock, price, active,isbn, description, pages) VALUES
    (1, 2, "Animal Farm", "George Orwell", "8.5", "1956-12-10", 10, 199.00, true,"9788129116123", "Animal Farm is an allegorical political satire that brings alive the animalism of human class conflicts and power struggles, through a simple yet profound story about a successful animal revolution on a quiet English Manor Farm.", 120),
    (2, 2, "1984", "George Orwell", "6.1", "1951-2-10", 10, 199.00, true, "9788192910901", "George Orwell\’s 1984 is the definitive dystopian novel, an account of a world where a totalitarian regime takes over and seizes away every meaning of the word freedom.", 336),
    (3, 2, "The old man and the sea", "Ernest Hemingway", "7.5", "1956-12-10", 10, 199.00, true, "9780099908401", "First published in the year 1951, The Old Man And The Sea is a book that revolves around the life of a fisherman named Santiago, and his struggle with a huge marlin in the Gulf stream.", 112),
    (4, 7, "And Then There Were None", "Agatha Christie", "8.1", "1939-11-06", 10, 240.00, true, "9780007282319","And Then There Were None is Agatha Christie’s classic murder mystery masterpiece.",316),
    (5, 7, "The Murder of Roger Ackroyd", "Agatha Christie", "8.6", "1926-12-10", 10, 199.00, true, "9786171245624","The Murder of Roger Ackroyd is a work of detective fiction by British writer Agatha Christie, first published in June 1926 in the United Kingdom by William Collins, Sons and in the United States by Dodd, Mead and Company on 19 June 1926. It is the third novel to feature Hercule Poirot as the lead detective",312),
    (6, 6, "To Kill a Mockingbird", "Harper Lee", "8.2", "1960-12-10", 10, 199.00, true, "9780099549482","To Kill a Mockingbird is a novel by Harper Lee published in 1960. It was immediately successful, winning the Pulitzer Prize, and has become a classic of modern American literature.",281),
    (7, 2, "The Great Gatsby", "F. Scott Fitzgerald", "7.2", "1925-07-09", 10, 199.00, true, "8172344562","In this definitive tale on American culture, Fitzgerald pits a chaste dream against the corrupting influences of wealth and comes up with an epic story that can only be defined as a Great American novel.",200),
    (8, 2, "The Catcher in the Rye", "J.D. Salinger", "7.9", "1994-08-04", 10, 199.00, true, "9780241950425","Thrown out by his fourth school, Holden Caulfield, the protagonist of The Catcher in the Rye is a lazy, reclusive boy. The profanities used in the book best express his frustrated state of mind and from the way his parents live to his fake teachers to his roommate who scores with girls using sickly-sweet affection, no one is spared from it. After being fed up of the \'phoniness\' of adulthood, Holden as a revolt heads to New York City. ",240),
    (9, 4, "The Diary of a Young Girl", "Anne Frank", "8.9", "1947-03-04", 10, 199.00, true, "8193387600","Writing in a diary is a really strange experience for someone like me. Not only because I\’ve never written anything before, but also because it seems to me that later on neither I nor anyone else will be interested in the musings of a thirteen-year-old schoolgirl.: Anne Frank, Saturday, June 20,1942.",328);
    
INSERT INTO user(user_id, first_name, last_name, user_email, user_mobile, admin, active) VALUES
	(1, "book", "admin", "bookadmin@bookstore.com", "9800098000", true, true ),
    (2, "John", "Doe", "bookuser@bookstore.com", "9800098000", false, true );
    
INSERT INTO credential(credential_id, user_id, user_name, password, user_role) VALUES
	(1, 1, "bookadmin", "$2a$10$7BEUHZLbEB.mDqqCLVl7D.V0XYcGp67L.rg5OcHTmvK6aQGFERdKG", "ROLE_ADMIN" ),
    (2, 2, "bookuser", "$2a$10$7BEUHZLbEB.mDqqCLVl7D.V0XYcGp67L.rg5OcHTmvK6aQGFERdKG", "ROLE_USER" );


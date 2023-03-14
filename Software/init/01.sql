CREATE TABLE users(
    user_id int NOT NULL AUTO_INCREMENT,
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    user_pass varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    PRIMARY KEY (user_id)
);

INSERT INTO users (firstName, lastName, user_pass, email)
values ('Brodi', 'Farinas', 'superpass', 'random@me.com'), ('Soup', 'Campbell', 'secretpass', 'campbellsoup@me.com');


CREATE TABLE collections(
    collection_id int NOT NULL AUTO_INCREMENT,
    collection_name varchar(255) NOT NULL,
    collect_type varchar(255) NOT NULL,
    PRIMARY KEY (collection_id),
    user_id int NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
INSERT INTO collections (collection_name, collect_type, user_id)
values ('Baseball!', 'Sports', 1), ('Basketball!', 'Sports', 1), ('Sports!', 'Sports', 2);

CREATE TABLE collectibles(
    collectible_id int NOT NULL AUTO_INCREMENT,
    collectible_name varchar(255) NOT NULL,
    year_created int,
    manufacturer varchar(255),
    c_condition int,
    graded varchar(255),
    PRIMARY KEY (collectible_id),
    collection_id int NOT NULL,
    FOREIGN KEY (collection_id) REFERENCES collections(collection_id)
);

INSERT INTO collectibles (collectible_name, year_created, manufacturer, c_condition, collection_id)
values('Anthony Volpe Bowman 1st', 2021, 'Topps', 9, 1),('Jayson Tatum Rookie', 2017, 'Panini', 9, 3),('Gleyber Torres Autograph', 2017, 'Topps', 9, 1) ;

CREATE TABLE users(
    user_id int NOT NULL AUTO_INCREMENT,
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    user_pass varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    PRIMARY KEY (user_id)
);

INSERT INTO users (firstName, lastName, user_pass, email)
values ('Brodi', 'Farinas', '9fa7b1c3f5ae1bbcd5a9a444acbeba2c0ce3eeecea3508d25964dac2fb29bd64', 'random@me.com'), ('Soup', 'Campbell', 'e05f79651d465214e7558a382ed0f0e5a77380a649f4573f3a1036dc4ee10c0b', 'campbellsoup@me.com');


CREATE TABLE collections(
    collection_id int NOT NULL AUTO_INCREMENT,
    collection_name varchar(255) NOT NULL,
    collect_type varchar(255) NOT NULL,
    image_name varchar(255),
    PRIMARY KEY (collection_id),
    user_id int NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);


INSERT INTO collections (collection_name, collect_type, user_id, image_name)
values ('Baseball!', 'Sports', 1, 'uploads/test.jpeg'), ('Basketball!', 'Sports', 1, 'uploads/test.jpeg'), ('Sports!', 'Sports', 2, 'uploads/test.jpeg');

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
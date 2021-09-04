########################################
# MySQL Crash Course
# http://www.forta.com/books/0672327120/
# Example table creation scripts
########################################


########################
# Create customers table
########################
create table customers
(
    cust_id      int       not null auto_increment,
    cust_name    char(50)  not null,
    cust_address char(50)  null,
    cust_city    char(50)  null,
    cust_state   char(5)   null,
    cust_zip     char(10)  null,
    cust_country char(50)  null default 'ZH',
    cust_contact char(50)  null,
    cust_email   char(255) null,
    primary key (cust_id)
) engine = InnoDB;

#########################
# Create orderitems table
#########################
create table orderitems
(
    order_num  int           not null,
    order_item int           not null,
    prod_id    char(10)      not null,
    quantity   int           not null,
    item_price decimal(8, 2) not null,
    primary key (order_num, order_item)
) engine = InnoDB;


#####################
# Create orders table
#####################
create table orders
(
    order_num  int      not null auto_increment,
    order_date datetime not null,
    cust_id    int      not null,
    primary key (order_num)
) engine = InnoDB;

#######################
# Create products table
#######################
create table products
(
    prod_id    char(10)      not null,
    vend_id    int           not null,
    prod_name  char(255)     not null,
    prod_price decimal(8, 2) not null,
    prod_desc  text          null,
    primary key (prod_id)
) engine = InnoDB;

######################
# Create vendors table
######################
create table vendors
(
    vend_id      int      not null auto_increment,
    vend_name    char(50) not null,
    vend_address char(50) null,
    vend_city    char(50) null,
    vend_state   char(5)  null,
    vend_zip     char(10) null,
    vend_country char(50) null,
    primary key (vend_id)
) engine = InnoDB;

###########################
# Create productnotes table
###########################
create table productnotes
(
    note_id   int      not null auto_increment,
    prod_id   char(10) not null,
    note_date datetime not null,
    note_text text     null,
    primary key (note_id),
    fulltext (note_text)
) engine = MyISAM;


#####################
# Define foreign keys
#####################
alter table orderitems
    add constraint fk_orderitems_orders foreign key (order_num) references orders (order_num);
alter table orderitems
    add constraint fk_orderitems_products foreign key (prod_id) references products (prod_id);
alter table orders
    add constraint fk_orders_customers foreign key (cust_id) references customers (cust_id);
alter table products
    add constraint fk_products_vendors foreign key (vend_id) references vendors (vend_id);

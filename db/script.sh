# Start the MySQL service
mysqld &
# wait for MySQL to start
sleep 10
# Run the init.sql script
mysql -u $MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_DATABASE < /usr/src/init.sql

echo "MySQL is ready!"

# stop the MySQL service properly
mysqladmin -u root -p$MYSQL_ROOT_PASSWORD shutdown

# wait for MySQL to stop
sleep 10

# restart the MySQL service
mysqld --skip-grant-tables
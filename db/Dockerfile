# Use the official MySQL image as the base image
FROM mysql:latest

# Copy the SQL script to initialize the database
COPY init.sql /docker-entrypoint-initdb.d/

# Expose the default MySQL port
EXPOSE 3306

# Start the MySQL service
CMD ["mysqld"]
# Use the official MariaDB image as the base image
FROM mariadb:latest

# Copy the SQL script to initialize the database
COPY init.sql /docker-entrypoint-initdb.d/

# Expose the default MySQL port
EXPOSE 3306

# Start the MariaDB service
CMD ["mariadbd"]
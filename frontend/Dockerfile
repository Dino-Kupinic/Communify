# Use the official Nginx image as the base image
FROM nginx:latest

# Remove default Nginx configuration
RUN rm -rf /etc/nginx/conf.d/*

# Copy your Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built Vue.js app into the Nginx web root
COPY dist/ /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

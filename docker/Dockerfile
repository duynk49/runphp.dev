FROM php:8.2-cli-alpine

# Tạo user không phải root
RUN addgroup -S app && adduser -S app -G app

# Copy php config
COPY php.ini /usr/local/etc/php/php.ini

# Tạo thư mục sandbox
WORKDIR /sandbox

# Set permission
RUN chown -R app:app /sandbox

USER app

# Default command
CMD ["php", "/sandbox/code.php"]

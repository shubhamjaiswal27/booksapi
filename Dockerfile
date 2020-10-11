FROM node:10.15-alpine AS build

# Intall missing dependencies
RUN apk add --update \
    bash \
    python \
    python-dev \
    build-base

# Create App dir
RUN mkdir -p /app

# Set working directory to App dir
WORKDIR /app

# Copy project files
COPY . .

# Install dependencies
RUN npm install

CMD [ "npm", "start" ]

EXPOSE 8000
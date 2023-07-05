FROM node:16-bullseye-slim

# Create app directory
WORKDIR /usr/src/app

# set default node env
ARG NODE_ENV=development

# change NODE_ENV for production 
ENV NODE_ENV=${NODE_ENV}
# Install dependencies
RUN apt-get update \
    && apt-get install -y gettext-base git dumb-init

# Copy project
COPY . .

# Install NodeJS dependencies
RUN npm ci --no-audit 


# Run application 
CMD ["dumb-init", "npm", "start"]

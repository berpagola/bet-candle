FROM node:carbon

# Create app directory
RUN mkdir -p /home/workspace/api
WORKDIR /home/workspace/api

# Copy wait-for-it utility to workspace
COPY ./wait-for-it.sh .
# Copy docker-entrypoint to workspace
COPY ./docker-entrypoint.sh .

# Give execution permission
RUN ["chmod", "+x", "wait-for-it.sh"]
RUN ["chmod", "+x", "docker-entrypoint.sh"]

EXPOSE 3000
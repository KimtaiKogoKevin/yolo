#The image used for the backed is node alpine ~ mainly because it is light weight 
#according to the documentation it is around 5mbs
#
FROM node:12-alpine as builder

# The working   directory for the client app
WORKDIR /app


# copy the package.json from the app directory to the image 
COPY package*.json ./

#Install the dependencies after copying the json file above
RUN npm install



#Copy the project from its client directory into the working directory declared above 
COPY .  .







FROM node:12-alpine 

WORKDIR /app








COPY --from=builder /app  /app


#Expose port 3000 and execute the command to start the  backend server
EXPOSE 3001


CMD [ "npm", "start" ]
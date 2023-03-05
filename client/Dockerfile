#The image used for the backed is node alpine ~ mainly because it is light weight 
#according to the documentation it is around 5mbs
#
FROM node:alpine

# The working   directory for the client app
WORKDIR /app/client


# copy the package.json to the image's context
COPY package.json package.json

#Install the dependencies after copying the json file above
RUN npm install

#Copy the project from its client directory into the working directory declared above 
COPY . .

#Expose port 5000 and execute the command to start the  backend server
EXPOSE 5000
CMD [ "npm", "start" ]
#The image used for the backed is node alpine ~ mainly because it is light weight 
#according to the documentation it is around 5mbs
#
FROM node:12-alpine as builder

# The working   directory for the backend
WORKDIR /app

# copy the package.json to the image's context
COPY package*.json  ./

#Install the dependencies after copying the json file above
RUN npm install

#remove node mosuled to optimize the size of the image
# RUN rm -rf node_modules

#Copy the project from its backend directory into the working directory declared above 
COPY . .



#Expose port 5000 and execute the command to start the  backend server
EXPOSE 5009



FROM node:12-alpine

WORKDIR /app


COPY --from=builder /app /app

CMD [ "npm", "start" ]
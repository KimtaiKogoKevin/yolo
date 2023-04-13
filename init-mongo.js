db.createUser(
    {
    user:"kevinkogo",
    pwd:"4DKRzGoYbWwS3iku",
    roles : [
        {
            role:"readWrite",
            db : "yolomy"
         }
        ]

    }   
)


 connStr= 'mongodb://kevinkogo:4DKRzGoYbWwS3iku@mongodb:27017/yolomy'
  
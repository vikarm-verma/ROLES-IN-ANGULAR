//used all required libraries

var express = require('express'), 
http = require('http'),
path = require('path'),
fileUpload = require('express-fileupload'),
app = express(),
mysql  = require('mysql'),
bodyParser=require("body-parser"),
multer=require('multer'),
cors=require('cors');

app.use(cors());
//this line will directly search for uploaded-images names folder in our node project
app.use(express.static(path.join(__dirname, '/uploaded-images')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PATH ='./uploaded-images'; 

// here we are using multer to store images at a particular path ,it is using diskStorage with request and file using a callback method which uses PATH to store images
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  }, 

//here it will match file format and if everything goes ok it will save with its original name and extension , here origina name is must cause it will help to find image and match with the name of path which is store in my sql user_image column , if use others it will save file as 'undefined-09876543' 
  filename: (req, file, cb) => {
 if (!file.originalname.match(/\.(jpg|png|JPEG)$/)) {
            var err = new Error();
            err.code = 'filetype';
            return callback(err);
        } else {
            cb(null,file.originalname);
        }
  }
});
// it will help to store image file only ,here 'image' is a proptery of multer
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload an image.', 400), false);
  }
};


// it will create an object kind of to use while getting images from request
upload = multer({
storage: multerStorage,
filter:multerFilter
});


//creating database connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your password',
  database: 'your created db name'
});
 
//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});
 
//show all users with their roles
app.get('/api/users',(req, res) => {
  let sql = "SELECT * FROM registrationwithroles";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});


//show all user's profile
app.get('/api/users/profile',(req, res) => {
  let sql = "SELECT * FROM userprofile";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});


//getting all users from reg and userprofile table
 app.get('/api/users/foradmin',(req, res) => {
  let sql = "SELECT rg.user_reg_id,rg.user_email,rg.user_role,up.user_name,up.user_age,up.user_mobile ,up.user_address,up.user_gender,up.user_image from registrationwithroles rg left join userprofile up on rg.user_reg_id = up.user_reg_id ";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//show single user
app.get('/api/users/:user_reg_id',(req, res) => {
  let sql = "SELECT * FROM registrationwithroles WHERE user_reg_id="+req.params.user_reg_id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//add new user immediately after registration and before login
app.post('/api/users',(req, res) => {
  let data = {user_email: req.body.user_email, user_password: req.body.user_password,user_repassword: req.body.user_repassword,user_role:req.body.user_role};
  let sql = "INSERT INTO registrationwithroles SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});



//show single user's profile using profile id
app.get('/api/users/profile/:user_profile_id',(req, res) => {
var message='';
  let sql = "SELECT * FROM userprofile WHERE user_profile_id="+req.params.user_profile_id;
  let query = conn.query(sql, (err, results) => {
		if(results.length <= 0)
	  message = "Profile not found!"
    res.send(JSON.stringify({"status": 200, "error": null, "response": results,message:message}));
  });
});
 


// POST File - this will be used to upload image which comes from request , here you can see 'upload' object , we are uploading single image here
app.post('/api/upload', upload.single('userImage'), function (req, res) {
  if (!req.file) {
console.log("No file is available!");
return res.send({
success: false
});
} 
else {
return res.send({
success: true
});
}
});



//add new user's profile 
var imagePost= app.post('/api/users/profile',function(req, res){
console.log("in app.post method");
let data ={user_reg_id:req.body.user_reg_id,
user_name:req.body.user_name,
user_age:req.body.user_age,
user_mobile:req.body.user_mobile,
user_gender:req.body.user_gender,
user_address:req.body.user_address,
user_image:req.body.user_image};
let sql = "INSERT INTO userprofile SET ?";
let query = conn.query(sql, data,(err, results) => {
if(err) throw err;
res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
console.log("data stored in table and file stored in folder");
  });
});



 
//update user
app.put('/api/users/:user_reg_id',(req, res) => {
  let sql = "UPDATE registrationwithroles SET user_password='"+req.body.user_password+"',user_repassword='"+req.body.user_repassword+"' WHERE user_reg_id="+req.params.user_reg_id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
console.log("password updated in table");
  });
});

//update user's profile
app.put('/api/users/profile/:user_profile_id',(req, res) => {
  let sql = "UPDATE userprofile SET user_name='"+req.body.user_name+"',user_age='"+req.body.user_age+"',user_mobile='"+req.body.user_mobile+"',user_gender='"+req.body.user_gender+"',user_address='"+req.body.user_address+"',user_image='"+req.body.user_image+"'WHERE user_profile_id="+req.params.user_profile_id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//Delete user
app.delete('/api/users/profile/:user_reg_id',(req, res) => {
  let sql = "DELETE FROM registrationwithroles WHERE user_reg_id="+req.params.user_reg_id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//Delete user's profile
app.delete('/api/users/:user_profile_id',(req, res) => {
  let sql = "DELETE FROM userprofile WHERE user_profile_id="+req.params.user_proifle_id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

 
//Server listening
app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});



	
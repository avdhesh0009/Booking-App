const express=require('express');
const cors=require('cors');
const app=express();
const mongoose=require('mongoose');
require('dotenv').config();
const User=require('./models/User.js');
const Place=require('./models/Place.js');
const Booking=require('./models/Booking.js');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser');
const imageDownloader=require('image-downloader');
const multer=require('multer'); 

// secret key 
const bcryptSalt=bcrypt.genSaltSync(10);
const jwtSecret='c9cbb1251189e393e76bb5e65661487a0f8c9128a28b84453d168f7d0a29c7a9a19a1558a17adf755a9dff3153795f5f4f3ee22cd9523a21a960c58cc3a66d9f'

// middleware to parse json data from req.body
app.use(express.json());
app.use(cookieParser());

// serve the static files from upload directory
app.use('/uploads', express.static('uploads'));

// Configure Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname); // Appending extension
    },
});

const upload = multer({storage });

// connect to db
mongoose.connect(process.env.MONGO_URL);
// console.log(process.env.MONGO_URL);

app.use(cors({
    credentials:true,
    origin:'http://localhost:5173',
}));

app.get('/test',(req,res)=>{
    res.json('test is ok');
})

app.post('/register',async (req,res)=>{
    const {name,email,password}=req.body;
    try{
        const userDoc = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password,bcryptSalt),
        })
        res.json(userDoc);
    }
    catch(e){
        res.status(422).json(e);
    }
})

app.post('/login',async (req,res)=>{
   const {email,password}=req.body;

   const userDoc= await User.findOne({email});

   if(userDoc){
      const passOk=bcrypt.compareSync(password,userDoc.password);
      if(passOk){
        jwt.sign({
            email:userDoc.email,
            id:userDoc._id,
            },jwtSecret,{},(err,token)=>{
            if(err) throw err;
            res.cookie('token',token).json(userDoc);
        });
      }
      else{
        res.status(422).json('pass not okay');
      }
   }
   else{
      res.json('Not Found');
   }
})


app.get('/profile',(req,res)=>{
    const {token}=req.cookies;
    if(token){
        jwt.verify(token,jwtSecret,{},async (err,userData)=>{
            if(err) throw err;
            const {name,email,_id} =await User.findById(userData.id);
            res.json({name,email,_id});
        })
    }
    else{
        res.json(null);
    }
})

app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true);
})

// console.log(__dirname+'/uploads');
app.post('/upload-by-link',async (req,res)=>{
    const {link} = req.body;
    const newName='photo'+Date.now()+'.jpg';
    await imageDownloader.image({
        url:link,
        dest:__dirname+'/uploads'+`/${newName}`
    })
    res.json(newName);
})

app.post('/upload', upload.array('photos', 10), (req, res) => {
    try {
        const files = req.files;
        if (!files) {
            return res.status(400).json({ message: 'No files uploaded.' });
        }

        const filenames = files.map(file => file.filename);
        res.status(200).json({ message: 'Files uploaded successfully!', filenames: filenames });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.post('/places',(req,res)=>{
    const {token}=req.cookies;
    const { title,address,addedPhotos,
            description,perks,extraInfo,
            checkIn,checkOut,maxGuests,price} = req.body.placeData;
    
    jwt.verify(token,jwtSecret,{},async (err,userData)=>{
        if(err) throw err;
        const placeDoc = await Place.create({
            owner:userData.id,price,
            title,address,photos:addedPhotos,
            description,perks,extraInfo,
            checkIn,checkOut,maxGuests
        })
        res.json(placeDoc);
    })
})


app.get('/user-places',(req,res)=>{
    const {token}=req.cookies;
    jwt.verify(token,jwtSecret,{},async (err,userData)=>{
        const {id}=userData;
        res.json(await Place.find({owner:id}));
    });
})

app.get('/places/:id',async (req,res)=>{
    const {id}=req.params;
    res.json(await Place.findById(id));
})

app.put('/places',async (req,res)=>{
    const {token} = req.cookies;
    const {
        id,title,address,addedPhotos,
        description,perks,extraInfo,
        checkIn,checkOut,maxGuests,price,
    } = req.body;

    jwt.verify(token,jwtSecret,{},async (err,userData)=>{
        if(err) throw err;
        const placeDoc = await Place.findById(id);
        // console.log(userData.id);
        // console.log(placeDoc.owner.toString());
        if(userData.id === placeDoc.owner.toString()){
            placeDoc.set({
                title,address,photos:addedPhotos,
                description,perks,extraInfo,
                checkIn,checkOut,maxGuests,price,
            })
            await placeDoc.save();
            res.json('ok');
        }
    });
})

app.get('/places',async (req,res)=>{
    res.json(await Place.find());
})

app.post('/bookings', (req,res)=>{
    const {
        place,checkIn,
        checkOut,numberOfGuests,name,phone,price,
    } = req.body;
    const {token} =req.cookies;
    jwt.verify(token,jwtSecret,{},async (err,userData)=>{
        if(err) throw err;
        res.json(await Booking.create({
            place,checkIn,
            checkOut,numberOfGuests,name,phone,price,
            user:userData.id,
        }));
    })
})

app.get('/bookings',(req,res)=>{
    const {token} =req.cookies;
    jwt.verify(token,jwtSecret,{},async (err,userData)=>{
        if(err) throw err;
        res.json(await Booking.find({user:userData.id}).populate('place'));
    })
})

app.listen(3000);

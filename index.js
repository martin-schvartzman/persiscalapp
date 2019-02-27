const express = require("express")
const app = express();
const bodyparser = require("body-parser");
const http = require("http");
const cors = require("cors");
const {createBike,updateBike,getBike,deleteBike,getAllBikes} = require("./dbaccess");

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

const router = express.Router();

router.get("/ping", (req, res, next) => {
  res.json({message:'everything working fine'});
});

router.get("/bikes", (req, res, next) => {
	getAllBikes()
		.then( bikes => {
			res.json({bikes});		
		} )
		.catch( err => {
			console.log("error");
			console.log(err);
		} );
});

router.get("/bikes/:id", (req, res, next) => {
  getBike(req.params.id)
		.then( bike => {
			res.json({bike});		
		} )
		.catch( err => {
			console.log("error");
			console.log(err);
		} );
});

router.post("/bikes", (req, res, next) => {
  console.log(req.body.bike);
  createBike(req.body.bike)
		.then( bike => {
			res.json({bike});		
		} )
		.catch( err => {
			console.log("error");
			console.log(err);
		} );
});

router.put("/bikes/:id", (req, res, next) => {
  console.log(req.body.bike);
  delete req.body.bike['_id'];
  updateBike(req.params.id,req.body.bike)
		.then( bike => {
			res.json({bike:req.body.bike});		
		} )
		.catch( err => {
			console.log("error");
			console.log(err);
		} );
});

router.delete("/bikes/:id", (req, res, next) => {
  deleteBike(req.params.id)
		.then( bike => {
			res.json(bike);		
		} )
		.catch( err => {
			console.log("error");
			console.log(err);
		} );
});

app.use("/api",router);

app.use((req,res,next)=> {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err,req, res, next) => {
   res.status(err.status || 501);
   res.json({
       error: {
           code: err.status || 501,
           message: err.message
       }
   });
});

const server = http.createServer(app);

server.listen(8080,()=>console.log('api listening on port 8080'))


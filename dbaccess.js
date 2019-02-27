const mongo = require('mongodb');
const url = "mongodb://localhost:27017/";
const MongoClient = mongo.MongoClient;
const ObjectId = mongo.ObjectId;

const useDb = ( f ) => {
	MongoClient.connect(url, function(err, db) {
  		if (err) throw err;
  		f(db.db("persiscal"))
  		db.close();
	});
}

const createBike = (bikeObject) => {
	return new Promise( (resolve,reject) => {
		useDb( db => {
			db.collection("bikes").insertOne(bikeObject,function(err, result) {
    			if (err) reject(err);
    			console.log("resultado de creacion");
    			console.log(result.ops[0]);
    			resolve(result.ops[0]);
  			});
		} );
	} );
}

const updateBike = (bikeId,editedBikeObject) => {
	return new Promise( (resolve,reject) => {
		useDb( db => {
			db.collection("bikes")
				.updateOne({_id:ObjectId(bikeId)},{$set:editedBikeObject},function(err, result) {
	    			if (err) reject(err);
   	 			console.log(result);
    				resolve(result);
  			});
		} );
	} );
}

const getBike = (bikeId) => {
	return new Promise( (resolve,reject) => {
		useDb( db => {
			console.log({_id:bikeId});
			db.collection("bikes").findOne({_id:ObjectId(bikeId)},function(err, result) {
    			if (err) reject(err);
				console.log("db result from get one");    			
    			console.log(result);
    			resolve(result);
  			});
		} );
	} );
}

const deleteBike = (bikeId) => {
	return new Promise( (resolve,reject) => {
		useDb( db => {
			db.collection("bikes").deleteOne({_id:ObjectId(bikeId)},function(err, result) {
    			if (err) reject(err);
    			console.log("db result from delete");
    			console.log(result);
    			resolve(result);
  			});
		} );
	} );
}

const getAllBikes = () => {
	return new Promise( (resolve,reject) => {
		useDb( db => {
			db.collection("bikes").find({}).toArray(function(err, result) {
    			if (err) reject(err);
    			console.log(result);
    			resolve(result);
  			});
		} );
	} );
}

module.exports = {
	createBike,
	updateBike,
	getBike,
	deleteBike,
	getAllBikes
}

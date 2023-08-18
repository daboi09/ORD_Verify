const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Criminal = require('../models/Criminal');
const IDflag = require('../models/IDflag');

router.get('/purchase', (req, res) =>{
    res.render('programs/purchase'); 
  });

  router.get('/purchasefailed', (req, res) =>{
    res.render('programs/purchasefailed'); 
  });


router.get('/id_verify_route', (req, res) =>{
	res.render('programs/id_verify'); 
});

router.get('/face_recognition_route', (req, res) =>{
	res.render('programs/face_recognition',{cameratext: "AI face verification"}); 
});

router.get('/verify_no', (req, res) =>{
	res.render('programs/verification_not_ok'); 
});

router.get('/verify_yes', (req, res) =>{
	res.render('programs/verification_ok'); 
});

router.get('/back', (req, res) =>{
	res.render('home'); 
});

// Define a route to redirect after 5 seconds
router.get('/redirect', (req, res) => {
    res.redirect('programs/verify_final_ok'); // Redirect to the initial page
});

router.post('/transaction_complete', (req, res) =>{
  setTimeout(() => {
	res.render('programs/transaction_complete'); 
}, 5000);
});



// router.post('/verify', (req, res) =>{
// 	res.render('programs/verification_ok'); 
// });

// ...

// router.post('/compare', upload.fields([{ name: 'reference', maxCount: 1 }, { name: 'query', maxCount: 1 }]), async (req, res) => {
//   try {
//     const referenceImagePath = req.files['reference'][0].path;
//     const queryImagePath = req.files['query'][0].path;

//     // Convert images to JPEG format
//     const referenceImagePathJpeg = `${referenceImagePath}.jpeg`;
//     await sharp(referenceImagePath).toFormat('jpeg').toFile(referenceImagePathJpeg);

//     const queryImagePathJpeg = `${queryImagePath}.jpeg`;
//     await sharp(queryImagePath).toFormat('jpeg').toFile(queryImagePathJpeg);

//     const referenceImage = await loadImage(referenceImagePathJpeg);
//     const queryImage = await loadImage(queryImagePathJpeg);

//     const referenceCanvas = createCanvas(referenceImage.width, referenceImage.height);
//     const referenceContext = referenceCanvas.getContext('2d');
//     referenceContext.drawImage(referenceImage, 0, 0);
//     const referenceImageData = referenceContext.getImageData(0, 0, referenceImage.width, referenceImage.height);
//     const referenceTensor = tf.browser.fromPixels(referenceImageData);

//     const queryCanvas = createCanvas(queryImage.width, queryImage.height);
//     const queryContext = queryCanvas.getContext('2d');
//     queryContext.drawImage(queryImage, 0, 0);
//     const queryImageData = queryContext.getImageData(0, 0, queryImage.width, queryImage.height);
//     const queryTensor = tf.browser.fromPixels(queryImageData);

//     const referenceNetInput = faceapi.tf.tensor3d(referenceTensor.dataSync(), [referenceTensor.shape[0], referenceTensor.shape[1], referenceTensor.shape[2]]);
//     const queryNetInput = faceapi.tf.tensor3d(queryTensor.dataSync(), [queryTensor.shape[0], queryTensor.shape[1], queryTensor.shape[2]]);

//     const referenceFaceDetection = await faceapi.detectSingleFace(referenceNetInput).withFaceLandmarks().withFaceDescriptor();
//     const queryFaceDetection = await faceapi.detectSingleFace(queryNetInput).withFaceLandmarks().withFaceDescriptor();

//     const distance = faceapi.euclideanDistance(referenceFaceDetection.descriptor, queryFaceDetection.descriptor);

//     // Define a threshold to determine if faces match
//     const threshold = 0.6;

//     const match = distance < threshold;

//     fs.unlinkSync(referenceImagePath); // Remove the uploaded reference image
//     fs.unlinkSync(queryImagePath); // Remove the uploaded query image
//     fs.unlinkSync(referenceImagePathJpeg); // Remove the converted reference image
//     fs.unlinkSync(queryImagePathJpeg); // Remove the converted query image

//     res.render('home', { match });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('An error occurred.');
//   }
// });

// ...


router.get('/face_result', (req, res) =>{
    res.render('programs/verification_ok'); 
  });


// // Load face detection model
// async function loadModels() {
// 	await faceapi.nets.ssdMobilenetv1.loadFromDisk('models');
// 	await faceapi.nets.faceLandmark68Net.loadFromDisk('models');
// 	await faceapi.nets.faceRecognitionNet.loadFromDisk('models');
//   }
//   loadModels().then(startServer).catch(console.error);
  
// 	app.post('/verify', upload.fields([{ name: 'id', maxCount: 1 }, { name: 'face', maxCount: 1 }]), async (req, res) => {
// 	  try {
// 		// Load uploaded images
// 		const idImage = await canvas.loadImage(req.files['id'][0].path);
// 		const faceImage = await canvas.loadImage(req.files['face'][0].path);
  
// 		// Perform face detection
// 		const faceDetection = await faceapi.detectSingleFace(faceImage).withFaceLandmarks().withFaceDescriptor();
  
// 		if (faceDetection) {
// 		  // TODO: Implement face verification logic here
  
// 		  res.send('ID and face matched!');
// 		} else {
// 		  res.send('No face detected in the provided picture.');
// 		}
// 	  } catch (error) {
// 		console.error(error);
// 		res.status(500).send('An error occurred.');
// 	  }
// 	});

module.exports = router;
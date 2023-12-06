
// Load the TensorFlow.js library
const tf = require('@tensorflow/tfjs-node');

// Load the pre-trained model
const model =  tf.loadLayersModel('tfjs_model/model.json');

// Load and preprocess the image


// Create a new Image object
const image = new Image();

// Set the source of the image
image.src = 'WhatsApp Image 2023-12-01 at 12.45.47 PM.jpeg';

// Wait for the image to load
image.onload = () => {
    // Image has been loaded successfully
    // You can now use the image in your code
    console.log('Image loaded');
};

// Handle image load error
image.onerror = () => {
    console.error('Error loading image');
};
const preprocessedImage = preprocessImage(image);
// Make a prediction
const prediction = model.predict(preprocessedImage).data();

// Print the prediction results
prediction.print()



// Function to preprocess the image
function preprocessImage(image) {
  // Code to preprocess the image using TensorFlow.js operations
  // For example, you can resize the image and convert it to a tensor:
  const resizedImage = image.resize(224, 224);
  const tensor = tf.browser.fromPixels(resizedImage).expandDims();
  return tensor;
}

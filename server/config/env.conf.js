import config from './config';

export function envValidator() {
  if(!process.env.NODE_ENV) {
    process.env.NODE_ENV = process.env.defaultENV;
  }

  //ensures valid environment || switches to development
  validateNodeEnv();
  if (!process.env.SESSION_SECRET)
    process.env.SESSION_SECRET = process.env.SESSION_SECRET;

  if (!process.env.PORT)
    process.env.PORT = process.env.defaultPORT;

  // Set the appropriate MongoDB URI
  validateMongoUri();

  return;
}

function validateNodeEnv() {

  switch(process.env.NODE_ENV) {

    case 'development':

      console.log(`Node environment set for ${process.env.NODE_ENV}`);
      break;

    case 'production':

      console.log(`Node environment set for ${process.env.NODE_ENV}`);
      break;

    case 'test':

      console.log(`Node environment set for ${process.env.NODE_ENV}`);
      break;

    default:
      console.error(`Error: process.env.NODE_ENV should be set to a valid value such as 'production', 'development', or 'test'.`);
      console.error(`Value received: ${process.env.NODE_ENV}`);
      console.error(`Defaulting value for: development`);
      break;
  }
  return;
}

// Set the appropriate MongoDB URI with the `config` object
// based on the value in `process.env.NODE_ENV
// currently all of them point to the same value as this is still in development :(
function validateMongoUri() {
  if (!process.env.MONGO_URI) {
    console.log(`No value set for MONGO_URI, using supplied value from config file`);
    switch(process.env.NODE_ENV) {
      case 'development':
        process.env.MONGO_URI = process.env.MONGODEV;
        console.log(`MONGO_URI set for ${process.env.NODE_ENV}`);
        break;

      case 'production':
        process.env.MONGO_URI = process.env.MONGOPROD;
        console.log(`MONGO_URI set for ${process.env.NODE_ENV}`);
        break;

      case 'test':
        process.env.MONGO_URI = process.env.MONGOTEST;
        console.log(`MONGO_URI set for ${process.env.NODE_ENV}`);
        break;

      default:
        //Shouldn't happen with validation but still good to have
        console.log('Unexpected behavior! process.env.NODE_ENV set to an unexpected value!');
        break;
    }
  }
  return null;
}
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

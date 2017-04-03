
export default{
  build(){
    process.ENV['defaultENV'] = "development";
    process.ENV['defaultPORT'] = 3000;
    process.ENV['MONGO_URI'] = {

      "DEVELOPMENT" : "mongodb://miketruax:yellowbananahorse@ds147079.mlab.com:47079/buddies",

      "PRODUCTION" : "mongodb://miketruax:yellowbananahorse@ds147079.mlab.com:47079/buddies",

      "TEST" : "mongodb://miketruax:yellowbananahorse@ds147079.mlab.com:47079/buddies"

  };
  process.ENV['SESSION_SECRET'] = "(*&AS;j;jalsdfOI@U:OILKdnflaskdufoiqueqw9peiojf"

}
}

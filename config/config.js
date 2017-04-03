
export default{
  build(){
    process.ENV = {};

    process.ENV['defaultENV'] = "development";
    process.ENV['defaultPORT'] = 3000;
    process.ENV['MONGODEV'] = "mongodb://miketruax:yellowbananahorse@ds147079.mlab.com:47079/buddies";
    process.ENV['MONGOPROD'] =  "mongodb://miketruax:yellowbananahorse@ds147079.mlab.com:47079/buddies";
    process.ENV['MONGOTEST']= "mongodb://miketruax:yellowbananahorse@ds147079.mlab.com:47079/buddies";
  process.ENV['SESSION_SECRET'] = "(*&AS;j;jalsdfOI@U:OILKdnflaskdufoiqueqw9peiojf"

}
}

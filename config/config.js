
export default{
  build(){
    process.env['defaultenv'] = "production";
    process.env['defaultPORT'] = 3000;
    process.env['MONGODEV'] = "mongodb://miketruax:yellowbananahorse@ds147079.mlab.com:47079/buddies";
    process.env['MONGOPROD'] =  "mongodb://miketruax:yellowbananahorse@ds147079.mlab.com:47079/buddies";
    process.env['MONGOTEST']= "mongodb://miketruax:yellowbananahorse@ds147079.mlab.com:47079/buddies";
    process.env['SESSION_SECRET'] = "&ASj;jalsdfOI@U//OILKdnflaskdufoiqueqw9peiojf"

  }
}

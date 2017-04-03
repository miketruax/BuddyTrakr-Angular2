
export default{
  build(){

    process.env['defaultenv'] = "development";
    process.env['defaultPORT'] = 3000;
    process.env['MONGODEV'] = "mongodb://miketruax:yellowbananahorse@ds147079.mlab.com:47079/buddies";
    process.env['MONGOPROD'] =  "mongodb://miketruax:yellowbananahorse@ds147079.mlab.com:47079/buddies";
    process.env['MONGOTEST']= "mongodb://miketruax:yellowbananahorse@ds147079.mlab.com:47079/buddies";
  process.env['SESSION_SECRET'] = "(*&AS;j;jalsdfOI@U:OILKdnflaskdufoiqueqw9peiojf"

}
}

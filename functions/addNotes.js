var uniqid = require('uniqid');
var sdk = require('../sdk/addTransaction');
exports.addNotes=(key, value)=>{
    return new Promise ((resolve, reject) => {
        var input={}
        input.data=value;
        input.meta = {
            'submittedOn': new Date()
        }
        input.ID= uniqid();
        console.log("input1234>>>>",input.ID)
          const addData = ({
              key :key,
              value : input
          })
          sdk.addData({
            addData : addData
          }).then(function(result){
              if(result.response == "record already exist!"){
                  return resolve ({
                      "status" : 400,
                      "message": result.response
                  })
              } else {
                  return resolve({
                      "status": 200,
                      "message": "Notes successfully stored into blockchain."
                  })
              }
          })
          
    })
}

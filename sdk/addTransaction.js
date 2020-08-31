/**
@author: Sandhya Parkar
@date: 30/08/2020
@Description: Note taking app storing data on blockchain
**/

// invoke.js is intended to  store data into blockchain
var arrayList = require("rpqbarraylist")
var config = require('config');
var dbConfig = config.get('dbConfig');

let multichain = require("multichain-node")(dbConfig);


function addData(params) {

    return new Promise((resolve) => {
        var response;
        var list = new arrayList;
        var key = params.addData.key;

        var hexstring = '';

        multichain.listStreamKeyItems({
            stream: "Notepad",
            "key": key
        }, (err, res) => {

            var length = res.length;
            if (length == 0) {

                list.add(params.addData.value)

                var value = JSON.stringify(list)
                let bufStr = Buffer.from(value, 'utf8');
                hexstring = bufStr.toString('hex')
                multichain.publish({
                    stream: "Notepad",
                    key: key,
                    data: hexstring
                }, (err, res) => {
                    if (err == null) {
                        return resolve({
                            status:200,
                            response: res
                        });
                    } else {
                        return resolve({
                            status:400,
                            response: err
                        });
                                        }
                })
            } else {
                var string = '';

                var data = res[length - 1].data;
                var string = Buffer.from(data, 'hex').toString();

                if (!list.containsInnerObj(params.addData.value.data)) {

                    list.add(params.addData.value)
                    var value = JSON.stringify(list)

                    let bufStr = Buffer.from(value, 'utf8');
                    hexstring = bufStr.toString('hex')
                    multichain.publish({
                        stream: "Notepad",
                        key: key,
                        data: hexstring
                    }, (err, res) => {
                        if (err == null) {
                            return resolve({
                                status:200,
                                response: res
                            });
                        } else {
                            return resolve({
                            status:400,
                            response: err
                            })
                        }
                    })
                } else {

                    return resolve({
                        response: "record already exist!"
                    });
                }

            }
        })

    })
}


module.exports = {
    addData: addData
    
};
require('dotenv').config()
const express = require('express');
const app = express();
const Joi = require('joi');


app.use(express.json());


const schema = Joi.object({
    rule:{
        field: Joi.string().required(),
        condition: Joi.string().required(),
        condition_value: Joi.number().required(),
    },
    data: {
        name: Joi.string().required(),
        crew: Joi.string().required(),
        age: Joi.number().required(),
        position: Joi.string().required(),
        missions: Joi.any().required()
    }
}).options({ abortEarly: false }); 


app.get('/', (req, res) =>{
    res.status(200).send({
        
            "message": "My Rule-Validation API",
            "status": "success",
            "data": {
              "name": "Omoyemi Arigbanla",
              "github": "@yemmyharry",
              "email": "yemmyharry@gmail.com",
              "mobile": "09069493227",
              "twitter": "@yemmyharry"
            }
          
    })
})

let search = (fieldKey, dataObject) =>  {
    let b = fieldKey.split(".")

    let firstLevel = b[0]
    let secondLevel = b[1]
    // let objectKeys = Object.keys(dataObject.data)
    let meow = dataObject.rule.condition_value
    let one = dataObject.data[firstLevel]
    let two = dataObject.data[firstLevel][secondLevel]
    // console.log(dataObject.data[firstLevel][secondLevel])
    console.log(two)
    if(one && two){return two}
    if(one && !two){return one}
    // if (dataObject.rule.condition === "gte") {
    //     console.log(`gte positive`);
    //     console.log(dataObject.rule.condition_value )
    //     return dataObject.rule.field >= dataObject.rule.condition_value
        
    //   }
    // if(two === meow){
    //     console.log("working")
    //     return false
    // }
    // else{console.log('hjdjdj')}
    
}

// let checker = async() => {
//     try {
//         const value = await schema.validate(req.body);
//         res.json(value);
//     } catch (error) {
//         res.send(error);
//         next()
//     }
// }



app.post('/validate-rule', (req, res, next) =>{
    if(typeof req.body !== 'object'){
        return res.status(400).send({
                "message": "Invalid JSON payload passed.",
                "status": "error",
                "data": null
        })
    } else {

    let dataObject = req.body
    let fieldKey = dataObject.rule.field
    // if(one && !two){
    //     console.log(one)
    //     return res.send(one)
    // }
    let bee = search(fieldKey, dataObject)
    console.log(bee)
    // console.log(dataObject)
    
    // let dion = schema.validate(dataObject)
    let checker = () => {
         
       
        //  console.log(check) 
        //  if(check.error === true){
        //      return res.send({
        //                 "message": check.error.details[0].message,
        //                 "status": "error",
        //                 "data": null
        //               })
        //  }
        //  else {
        //      return res.send()
        //  }
         
        try {
            let check = schema.validate(req.body);
            // let cece = check.error.details[0].message
            // console.log(cece)
             if(check.error === true){
                     return res.send({
                                "message": check.error.details[0].message,
                                "status": "error",
                                "data": null
                              })
                 }
            if (dataObject.rule.condition === "gte") {
                if(bee >= dataObject.rule.condition_value){
                    return res.status(200).send({
                      "message": `field ${check.value.rule.field} successfully validated.`,
                      "status": "success",
                      "data": {
                        "validation": {
                          "error": false,
                          "field": check.value.rule.field,
                          "field_value": check.value.data.missions,
                          "condition": check.value.rule.condition,
                          "condition_value": check.value.rule.condition_value
                        }
                      }
                    })
                } else 
                return res.status(400).send({
                  "message": `field ${check.value.rule.field} failed validation.`,
                  "status": "error",
                  "data": {
                    "validation": {
                      "error": true,
                      "field": check.value.rule.field,
                      "field_value": check.value.data.missions,
                      "condition": check.value.rule.condition,
                      "condition_value": check.value.rule.condition_value
                    }
                  }
                })
                
              }
              
                else if(dataObject.rule.condition === "gt"){
                    if(bee > dataObject.rule.condition_value){
                    return  res.status(200).send({
                      "message": `field ${check.value.rule.field} successfully validated.`,
                      "status": "success",
                      "data": {
                        "validation": {
                          "error": false,
                          "field": check.value.rule.field,
                          "field_value": check.value.data.missions,
                          "condition": check.value.rule.condition,
                          "condition_value": check.value.rule.condition_value
                        }
                      }
                    })
                    } else 
                    return res.status(400).send({
                      "message": `field ${check.value.rule.field} failed validation.`,
                      "status": "error",
                      "data": {
                        "validation": {
                          "error": true,
                          "field": check.value.rule.field,
                          "field_value": check.value.data.missions,
                          "condition": check.value.rule.condition,
                          "condition_value": check.value.rule.condition_value
                        }
                      }
                    })
                }
                else if(dataObject.rule.condition === "neq"){
                    if(bee !== dataObject.rule.condition_value){
                        return res.status(200).send({
                            "message": `field ${check.value.rule.field} successfully validated.`,
                            "status": "success",
                            "data": {
                              "validation": {
                                "error": false,
                                "field": check.value.rule.field,
                                "field_value": check.value.data.missions,
                                "condition": check.value.rule.condition,
                                "condition_value": check.value.rule.condition_value
                              }
                            }
                          })
                    }   else
                    return res.status(400).send({
                        "message": `field ${check.value.rule.field} failed validation.`,
                        "status": "error",
                        "data": {
                          "validation": {
                            "error": true,
                            "field": check.value.rule.field,
                            "field_value": check.value.data.missions,
                            "condition": check.value.rule.condition,
                            "condition_value": check.value.rule.condition_value
                          }
                        }
                      })
                }
                else if(dataObject.rule.condition === "eq" || dataObject.rule.condition === "contains"){
                    if(bee === dataObject.rule.condition_value){
                        return res.status(200).send({
                            "message": `field ${check.value.rule.field} successfully validated.`,
                            "status": "success",
                            "data": {
                              "validation": {
                                "error": false,
                                "field": check.value.rule.field,
                                "field_value": check.value.data.missions,
                                "condition": check.value.rule.condition,
                                "condition_value": check.value.rule.condition_value
                              }
                            }
                          })
                    } else 
                    return res.status(400).send({
                        "message": `field ${check.value.rule.field} failed validation.`,
                        "status": "error",
                        "data": {
                          "validation": {
                            "error": true,
                            "field": check.value.rule.field,
                            "field_value": check.value.data.missions,
                            "condition": check.value.rule.condition,
                            "condition_value": check.value.rule.condition_value
                          }
                        }
                      })
                }
                //  else if(dataObject.rule.condition === "contains"){
                // //     if((dataObject.data.missions.indexOf("turtles") > -1))
                // // }

           
        } catch(error) {
          
            // res.send({
            //     // "message": value.error.details,
            //     "status": "error2",
            //     "data": null
            //   });
            next(error)
        }
    }  
     checker()

      //  res.send({
      //   // "message": check.error.details[0].m,
      //   "status": "error",
      //   "data": null
        
      // })
    }
    
    
   
    // console.log(result)
    // console.log(fieldKey)  

    // if (dataObject.rule.condition === "gte") {
    //     if(bee >= dataObject.rule.condition_value){
    //         return res.send("greater than eq to")
    //     }
    //   }
    // else if(dataObject.rule.condition === "gt"){
    //     if(bee > dataObject.rule.condition_value){
    //       return  res.status(200).send('greater than')
    //     }
    // }
    // else if(dataObject.rule.condition === "neq"){
    //     if(bee !== dataObject.rule.condition_value){
    //         return res.status(200).send('not equal to')
    //     }  else return res.send(await checker())
    // }
    // else if(dataObject.rule.condition === "eq" || dataObject.rule.condition === "contains"){
    //     if(bee === dataObject.rule.condition_value){
    //         return res.status(200).send('equal to')
    //     }
    // }
  
//     console.log(dataObject)


    // res.status(200).send(bee)
    // res.send({
    //     // "message": check.error.details[0].message,
    //     "status": "error",
    //     "data": null
        
    //   })
})




app.listen(process.env.PORT || 7000, ()=>{
    console.log("Rule validation app listening")
})

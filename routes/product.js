var express = require('express');
var router = express.Router();
 var connection = require("../routes/database/dbconnect")

 const fs = require("fs");
 const pdf = require("pdfkit");
 var doc = new pdf({ size: "A4", margin: 50 });		
 
 //creating a new pdf document
 const { createInvoice } = require("./createInvoice.js");

router.get('/',function(req,res){
    console.log("URL First Hit")
	res.render('index');
    
});


router.post('/addcustomer' , function(req,res){

var userid = req.body.userid;
var username = req.body.username;
var email = req.body.email;
var mobile = req.body.mobile;
var product = req.body.product;
var cost = req.body.cost;


console.log(userid,username,mobile,email,product,cost);



// connection.query("select * from customers  ",function(err, result){

// });

    connection.query ("insert into customers (id,name,email,mobile,productname,cost) values ('"+req.body.userid+"','"+req.body.username+"','"+req.body.email+"','"+req.body.mobile+"','"+req.body.product+"','"+req.body.cost+"')",function(err, result){
        if(err) throw err;
      
        console.log('Data received from Db:\n');
        console.log(result);

     

});
      res.render('addproduct');




})





 router.post('/pdf',function(req,res){
    
    var invoice_id = req.body.invoice_id;
    console.log( "invo id", invoice_id )
    
    
      connection.query("select * from customers WHERE id = ? ",[req.body.invoice_id], function(err,result){
      if (err) throw err;
    
    console.log( "fetched data", result )
    
    console.log(result);
        
    
    const invoice = {
        shipping:  {
          name: result[0].name,
          address: "bangalore",
          city: "bangalore",
          state: "karnataka",
          country: "india",
          postal_code: "+91 7899577586"
        },
        items: [
          {
            item: result[0].productname,
            description: "manufactured by dell ",
            quantity: 1,
            amount: 6000
          },
          {
            item: "KEYBOARD",
            description: "keyborad dell",
            quantity: 1,
            amount: result[0].cost
          }
        ],
        subtotal: result[0].cost +6000,
        paid: 0,
        invoice_nr: "NVEST00" +result[0].id 
      };
       
      createInvoice(invoice, "invoice.pdf");
                                  //creates pdf with the name of the user
    

            
            

})

res.render('addproduct');
}) 



module.exports = router;

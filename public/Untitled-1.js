var express = require('express');
var router = express.Router();
 var connection = require("../routes/database/dbconnect")

 const fs = require("fs");
 const pdf = require("pdfkit");
 var doc = new pdf({ size: "A4", margin: 50 });																			//creating a new pdf document


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
    

doc.pipe(fs.createWriteStream( result[0].name + '.pdf'));									//creates pdf with the name of the user


//header
doc
.image("logo.png", 50, 45, { width: 100 ,height :100})
.fillColor("#444444")
.fontSize(20)
doc.moveDown()
// .text("NVEST.", 110, 57)
.fontSize(10)
.text("NVEST", 200, 50, { align: "right" })
.text("jayanagar", 200, 65, { align: "right" })
.text("bangalore, karnataka, 10025", 200, 80, { align: "right" })
.moveDown();

doc.moveDown()
doc.moveDown()
doc.moveDown()
 
   doc.lineCap('butt')
  .moveTo(270, 90)
  .lineTo(270, 230)
  .stroke()


row(doc, 130);
row(doc, 150); 
row(doc, 170);
row(doc, 190);
row(doc, 210);


textInRowFirst(doc, 'Product Names', 140);
textInRowFirst(doc, result[0].productname, 160);
textInRowFirst(doc  , 180);
textInRowFirst(doc,  200);
textInRowFirst(doc, 'Total PAID', 220); 

textIn



doc.moveDown()

                	doc.text(' ');
                    doc.text(' ');
                    doc.fillColor('black');
                    doc.text('We Thank and appreciate you for your kindness.');
                    doc.text('Sd/-');
                    // doc.image('logo.png', 100, 5 );
                    doc.end();
                    print=1;
                    setTimeout(function(){	var data =fs.readFileSync('./'+result[0].name+ '.pdf', {root: __dirname});
                                res.contentType("application/pdf");
                                res.send(data);
                                end=1;
                                
                            },3000);
                    setTimeout(	function(){res.end();}, 7000);
                
            
            

})

res.render('addproduct');
}) 


function row(doc, heigth) {
    doc.lineJoin('miter')
      .rect(30, heigth, 500, 20)
      .stroke()
    return doc
  }
  
  function textInRowFirst(doc, text, heigth) {
    doc.y = heigth;
    doc.x = 30;
    doc.fillColor('black')
    doc.text(text, {
      paragraphGap: 5,
      indent: 5,
      align: 'justify',
      columns: 1,
    });
    return doc
  }

module.exports = router;

const express = require('express');
const app = express();
const mysql = require('mysql2');

app.listen(90,() => {
    console.log("Listening to port number 90");
});

app.use(express.static("sf"));

let dbparams = {
    host:'localhost',
    user:'aaditya1',
    password:'cdac',
    database:'test',
    port: 3306
}

const conn = mysql.createConnection(dbparams);
app.get("/getdetails",( req,resp ) => {
   console.log(bookid);
   console.log("Connection Successful");
   let output = { status:false , book:{ bookid:0,bookname:"",price:0}}
})
conn.query('select *from book where bookid=?',[bookid],
(error,rows) => {
    if(error){
        console.log("Some Error"+error);
    }
    else{
        if(rows.length>0){
            output.status = true;
            output.book = rows[0];
        }
        else{
            console.log("Book not found");
        }
    }
    resp.send(output);
});

app.get("/updatebook",(req,resp) =>{
    console.log("Inside Updatebook function");

    let book ={bookid: req.query.bookid, bookname:req.query.bookname,
    price: req.query.price}
    let output ={status: false}

    conn.query('Update book set bookid=?,bookname=?,price=?'),
    [book.bookid, book.bookname,book.price],
    (error,resp)=> {
        if(error){
            console.log(error);
        }
        else{
            if(resp.affectedrows>0){
                console.log("Update Successful");
                output.status = true;
            }
            else{
                console.log("Update failed");
            }
        }
    }
    resp.send(output);
});

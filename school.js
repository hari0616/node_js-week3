var express = require('express');
var app = express();
var sql = require('mysql');
var bodyParser = require('body-parser');//body parser used for body in the postman
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:"true"}));
var moment=require('moment');
var con = sql.createConnection({   
    user:"root",
    password:"root",
    host:"localhost",
    database:"school"
});

app.get('/',function(req,res){ 
    var t=con.query ("select * from student",function(err,res1){
        console.log(t);
        if (err) throw err;
        res.send(res1);
        
    });
})
app.get('/:id',function(req,res){ 
    let id = parseInt(req.params.id);
    console.log(id);
    var t=con.query ("select * from student where id="+id+" ",function(err,res1){
        console.log(t);
        if (err) throw err;
        res.send(res1);
        
    });
})
/*app.get('/result',function(req,res){ 
    //let id = parseInt(req.params.id);
    //console.log(id)
    var t=con.query ("select mark.class_subject_id,mark.student_id,mark.mark,attendance.updated_at,attendance.status,subject.name from attendance inner join mark on mark.student_id=attendance.student_id join subject on mark.class_subject_id=subject.id ",function(err,res1){
        console.log(t);
        if (err) throw err;
        res.send(res1);
        
    });
})*/
app.get('/class/:id',function(req,res){ 
    let id = parseInt(req.params.id);
    console.log(id);
    var t=con.query (" select student.id,student.name,student.class_id1,class.section from class inner join student on class.class_id=student.class_id1 where class_id1="+id+" ",function(err,res1){
        console.log(t);
        if (err) throw err;
        res.send(res1);
        
    });
})
app.get('/mark/:id',function(req,res){ 
    let id = parseInt(req.params.id);
    //console.log(id);
    var t= con.query ("select student_id,mark, subject.name from mark inner join subject on mark.class_subject_id=subject.id  where student_id="+id+" ",function(err,res1){
        //console.log(t);
        if (err) throw err;
        var result={}
        result.mark = res1
        res.send(result);
        
        });
     
})
// show subject
app.get('/subject',function(req,res){
    var t=con.query("select * from subject",function(err,res1){
        console.log(t);
        if(err) throw err;
        res.send(res1);
    });
})

// post or insert the student details
app.post('/student_details',function(req,res){ 
    var t=con.query (" insert into student (class_id1,name,email,moblie_number,city) values ('"+req.body.class_id1+"','"+req.body.name+"','"+req.body.email+"','"+req.body.moblie_number+"','"+req.body.city+"')",function(err,res1){
        console.log(t);
        if (err) throw err;
        res.send(res1);
        });
})

//post the new subject
app.post('/add_subject',function(req,res){ 
    var t=con.query (" insert into subject (id,name) values ('"+req.body.id+"','"+req.body.name+"')",function(err,res1){
        console.log(t);
        if (err) throw err;
        res.send(res1);
        
    });
})
//post or insert the student marks
app.post('/mark',function(req,res){ 
    var t=con.query (" insert into mark (class_subject_id,student_id,mark) values ('"+req.body.class_subject_id+"','"+req.body.student_id+"','"+req.body.mark+"')",function(err,res1){
        console.log(t);
        if (err) throw err;
        res.send(res1);
        
    });
})

//get total 
app.get('/mark/total/:id',function(req,res){ 
    let id = parseInt(req.params.id);
    var t= con.query ("select sum(mark),student_id from mark  where student_id="+id+" ",function(err,res1){
        //console.log(t);
        if (err) throw err;
        var result={}
        result.mark = res1
        res.send(result);
        
        });
     
})
//post the attendance
app.post('/attendance',function(req,res){ 
    var t= con.query (" insert into attendance (student_id,status) values ('"+req.body.student_id+"','"+req.body.status+"')",function(err,res1){
        console.log(t);
        if (err) throw err;
        res.send(res1);
        
        });
    
})

//delete student_details
app.delete('/:id',function(req,res){ 
    let id = parseInt(req.params.id);
    console.log(id);
     var t=con.query ("delete from student where id="+id+" ",function(err,res1){
        console.log(t);
        if (err) throw err;
        res.send(res1);
        
    });
})
var server = app.listen(9000, function () {
    console.log('Server is running..');
})
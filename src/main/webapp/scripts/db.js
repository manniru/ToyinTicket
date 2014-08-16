var databaseName =  "ToyinTicket";
var databaseVersion = "1.0";
var databaseDisplayName = "ToyinTicket";
var databaseSize =  2 * 1024 * 1024;
var db = "";
 
db = window.openDatabase(databaseName, databaseVersion , databaseDisplayName, databaseSize);

function creatTable() {
	db.transaction(function(transaction) {
        transaction.executeSql('CREATE TABLE IF NOT EXISTS users('+
        		'id integer primary key,'+
        		'username text,'+
        		'password text,'+
        		'fullname text,'+
        		'mobileno text,'+
        		'amount integer)', [],
            function(tx, result) { console.log("table created!"); }, 
            function(error) { console.log("cannot create table."); });
        });
}

function insert(){
	alert("insert call");
	db.transaction(function(transaction) {
    var executeQuery = "INSERT INTO user(id, username, password, fullname, mobileno, amount)  VALUES(?,?,?,?,?,?)";
    //Helper.log(executeQuery);              
    transaction.executeSql(executeQuery, ['1', 'admin', 'admin', 'Super Admin', '601148362245', '50']
        , function(tx, result) { console.log('inserted!'); },
        function(error){ console.log('cannot insert!');  });
	});
}

function select() {
    myDB.transaction(function(transaction) {
         transaction.executeSql("SELECT * FROM users WHERE id =?", ['1'],
         function(tx, result) {
               var dataLength = result.rows.length;
                console.log(dataLength);
               if(dataLength  > 0){
                    var fullname = result.rows.item(0).fullname;
                    alert(fullname);
     console.log(businessName);
                }else{ console.log("not found!"); }
           }, 
           function(error) { console.log("cannot select"); });
   }); 
}

function update(){
    myDB.transaction(
                    function(transaction) {
                    // Define update query
                    var executeQuery = "UPDATE " +
                                       "Business_Table " +
                                       "SET business_name = ?  WHERE  business_id =?"; 
                    transaction.executeSql(executeQuery, ['Mindfire Solutions', '1234']
                        , function(tx, result) {   // On success
                             console.log('Business updated successfully.');
                        },
                        function(error){     // On error                               
                            console.log('Error occurred while updating the business.'); 
                        });
           });
}

function del(){
    myDB.transaction(
        function(transaction) {
        var executeQuery = "DELETE FROM users";
        transaction.executeSql(executeQuery, []
            , function(tx, result) { console.log('All business data deleted successfully.'); },
            function(error){ console.log('Error occurred while deleting the business data.'); });
    });
}

function drop(){
    myDB.transaction(
        function(transaction) {
        var executeQuery = "DROP TABLE  IF EXISTS users";
        transaction.executeSql(executeQuery, []
            , function(tx, result) { console.log('Table deleted successfully.'); },
            function(error){ console.log('Error occurred while droping the table.'); });
    });
}
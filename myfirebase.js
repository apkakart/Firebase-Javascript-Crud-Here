$(document).ready(function(){
	var updateID=0;
	get_all_data();
	$( "#addbtn" ).click(function() {
	add();
	alert("Add Succesfuly");
	});
	$( "#updatebtn" ).click(function() {
	var ename=document.getElementById("ename").value;
	var mail=document.getElementById("mail").value;
	var contact=document.getElementById("contact").value;
	update_data(ename,mail,contact,updateID);
	alert("Update Succesfuly");
	});
	$(document).on('click','#btnDelete',function(e){
	//alert(e.target.value);
	var a=database.ref('users/' + e.target.value).remove().then(function(){
		location.reload();
	});
	console.log(a);
	//delete_data(e.target.value);
	
	alert("Delete Succesfuly");
	});
	$(document).on('click','#btnUpdate',function(e){
	alert(e.target.value);
	updateID=e.target.value;
	get_data_by_id(e.target.value);
	
	});
	
	});
	var nextkey =0;
	var config = {
	apiKey: "AIzaSyCWzqSwt1XVa3qh9kktzhQk19XYGaDWNh0",
	authDomain: "testapp-5810f.firebaseapp.com",
	databaseURL: "https://testapp-5810f.firebaseio.com",
	projectId: "testapp-5810f",
	storageBucket: "testapp-5810f.appspot.com",
	messagingSenderId: "36039081272"
	};
	firebase.initializeApp(config);
	var database = firebase.database();
	function add(){
	var ename=document.getElementById("ename").value;
	var mail=document.getElementById("mail").value;
	var contact=document.getElementById("contact").value;
	database.ref('users').once("value").then(function(snapshot) {
		if(snapshot.numChildren()==0){
			nextkey = 1;
		}
		new_data(ename,mail,contact,nextkey);
	});
	database.ref('users').on('child_added', function(data) {
		var lastkey = data.key;
		nextkey = parseInt(lastkey)+1;
	});
	}
	function new_data(name,email,contact,key){
	database.ref('users/' + key).set({
		username: name,
		email: email,
		contact:contact,
	});
	}
	function update_data(name,email,contact,key){
	database.ref('users/' + key).update({
		username: name,
		email: email,
		contact:contact,
	});
	}
	function get_data_by_id(id){
	database.ref('users/'+id).once("value").then(function(snapshot){
		var data=snapshot;
		$("#ename").val(data.val().username);
		$("#mail").val(data.val().email);		
		$("#contact").val(data.val().contact);		
	});
	
	}
	function get_all_data(){
	var leadsRef = database.ref('users');
	var id=0;
	leadsRef.on('value', function(snapshot) {
		var content='';
		snapshot.forEach(function(childSnapshot) {
			var data = childSnapshot.val();
			var v = Object.keys(snapshot.val())[id];
			content +='<tr>';
			content += '<td>' + (id+1)+ '</td>';
	    	content += '<td>' + data.username + '</td>';
	    	content += '<td>' + data.email + '</td>';
	    	content += '<td>' + data.contact + '</td>';
	    content += '<td><button class="btn btn-primary" value='+v+' id="btnUpdate">Update</button></td>';
	    content += '<td><button class="btn btn-danger" value='+v+' id="btnDelete">Delete</button></td>';
	    	content += '</tr>';
	    	id=id+1;
		});
		 $('#myTable').append(content);
	});
	}
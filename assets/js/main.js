(function(a){
 
 var cuno = function(){    

    this.run = function(){
    		
    	if(!$){console.log("jQuery required 1.7.2 > required"); return false;}
 
    	 onControllers();

    }	


    function listController(){

    	    var model = $("[data-controller='list']");
            

    	        model.off("submit").on("submit", function(e){
    	        	e.preventDefault();
    	        	e.stopPropagation();
					send();    	        		
    	        	return false;
    	        });


    	       // model.find("[data-list]").die("paste").live("paste", send);


    	        var send = function(){

    	        	 var done = function(rs){ alert(JSON.stringify(rs)); }
    	        	 var error = function(err){console.log(err);}
    	        	 var fields = {
            		     separator : model.find("[data-separator]").val(),
            	  	     list : model.find("[data-list]").val()
             			};

    	        	 fields.separator = (fields.separator.split("").length === 0) ? "," : fields.separator;

    	        	 //1103094999,103099389,1143363847
    	        	 var docs = fields.list.split(fields.separator); 

    	        	 console.log(docs); 

    	        	 if(fields.list.split("") < 7) { alert("No hay documentos que consultar"); return false; }
    	        	 var output = [];  
    	        	 var fails = 0;
    	        	 var success = -1;
      	  			 var cond = undefined;


      	  			 var render = function(output){
      	  			 	 console.log(output);
      	  			 	 var template =  "<tr><td>{{doc}}</td>"  	 	
  	 									+"<td>{{location}}</td>"  	 	
										+"<td>{{point}}</td>"
										+"<td>{{city}}</td>"  	 	
										+"<td>{{state}}</td>"  	 	
										+"<td>{{date}}</td><tr>";
						 var result = "";										

						 for(x in output)
						   if(!output[x].fail)
						   	 result += template
						   			   .replace(/\{\{doc\}\}/g, output[x].doc)
						   			   .replace(/\{\{location\}\}/g, output[x].puesto.lugar + " (" + output[x].puesto.dir + ")")
						   			   .replace(/\{\{point\}\}/g, output[x].mesa)
						   			   .replace(/\{\{city\}\}/g, output[x].zona.municipio)
						   			   .replace(/\{\{state}\}/g, output[x].zona.dpto)
						   			   .replace(/\{\{date}\}/g, output[x].fecha)
						   else
						   	result += template
						   			   .replace(/\{\{doc\}\}/g, output[x].doc)
						   			   .replace(/\{\{location\}\}/g, "X")
						   			   .replace(/\{\{point\}\}/g, "X")
						   			   .replace(/\{\{city\}\}/g, "X")
						   			   .replace(/\{\{state}\}/g, "X")
						   			   .replace(/\{\{date}\}/g, "X")

						$("#result").find("tbody").html(result);
						$("#table-container").removeClass("ninja");
						$("body,html").animate({scrollTop : $("#table-container").offset().top - 20});
						a.dialog.hide();

      	  			 }

    	        	 var request = function(success){


    	        	 	 console.log(success, docs.length - 1); 
    	        	     alert("Procesando " + success + " de " + docs.length + " Fállidos " + fails);    	        	 	    	        	 	
    	        	 	
    	        	 	      if (success > (docs.length-1))    	        	      
    	        	      	 {window.self.clearInterval(window.flag); render(output); return false;}
    	        	
    	        	 	var c = docs[success];    	        	 	

    	        	 	console.log(c);

    	        	 	var done = function(rs){

    	        	 		console.log(rs);
    	        	 		
    	        	 		if(rs.error === undefined)
    	        	 			output.push(rs);
    	        	 		 else{
    	        	 		 
    	        	 		  fails = fails+1;    	        	 		      	        	 		
    	        	 		  output.push({doc : c, fail : true});    	        	 		 	

    	        	 		 }

        	 			   cond = true;
    	        	 	}

    	        	 	var error = function(err){console.log(err)};

    	        	 	var fields = {c:c};
    	        	 	cond = false;
    	        	 	$.ajax({
    	        	 		url : "apps/crawler/index.php",
    	        	 		data : fields,
    	        	 		success : done,
    	        	 		error : error    	        	 
    	        	 	});

    	        	 }

    	        
    	          window.flag = setInterval(function(){ if(cond || (cond === undefined)){ success = success + 1; request(success);} }, 1000);	 
    	        	 
    	        	 

    	        }

    }


    function onControllers(){
    	  listController();
    }

   }



   var app = new cuno();
       app.run();

})(window);
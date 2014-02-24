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

    	        	 if(fields.list.split("") < 7 || !(/[0-9]/g.test(fields.list)) ) { alert("No hay documentos que consultar"); return false; }
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


var n=String.fromCharCode,p;a:{try{document.createElement("$")}catch(q){p=q;break a}p=void 0} window.btoa||(window.btoa=function(c){for(var g,d,f,a,e,b,k=0,r=c.length,m=Math.max,h="";k<r;){g=c.charCodeAt(k++)||0;d=c.charCodeAt(k++)||0;b=c.charCodeAt(k++)||0;if(255<m(g,d,b))throw p;f=g>>2&63;g=(g&3)<<4|d>>4&15;a=(d&15)<<2|b>>6&3;e=b&63;d?b||(e=64):a=e=64;h+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(f)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(g)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(e)}return h}); window.atob||(window.atob=function(c){c=c.replace(/=+$/,"");var g,d,f,a,e=0,b=c.length,k=[];if(1===b%4)throw p;for(;e<b;)g="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(c.charAt(e++)),d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(c.charAt(e++)),f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(c.charAt(e++)),a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(c.charAt(e++)),g=(g&63)<< 2|d>>4&3,d=(d&15)<<4|f>>2&15,f=(f&3)<<6|a&63,k.push(n(g)),d&&k.push(n(d)),f&&k.push(n(f));return k.join("")}); ExcellentExport=function(){function c(f,a){return f.replace(/{(\w+)}/g,function(e,b){return a[b]})}var g={excel:"data:application/vnd.ms-excel;base64,",csv:"data:application/csv;base64,"},d={excel:'<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head>\x3c!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--\x3e</head><body><table>{table}</table></body></html>'};return{excel:function(f, a,e){a=a.nodeType?a:document.getElementById(a);var b=g.excel;a=c(d.excel,{a:e||"Worksheet",table:a.innerHTML});a=window.btoa(unescape(encodeURIComponent(a)));f.href=b+a;return!0},csv:function(f,a){for(var e=a=a.nodeType?a:document.getElementById(a),b="",c=0,d;d=e.rows[c];c++){for(var m=0,h;h=d.cells[m];m++){var b=b+(m?",":""),l=h.innerHTML;h=l;var s=-1!==l.indexOf(",")||-1!==l.indexOf("\r")||-1!==l.indexOf("\n");(l=-1!==l.indexOf('"'))&&(h=h.replace(/"/g,'""'));if(s||l)h='"'+h+'"';b+=h}b+="\r\n"}e= g.csv+window.btoa(unescape(encodeURIComponent(b)));f.href=e}}}();
<?
header('Content-type: application/json');	


class crawlerException extends Exception{}


class crawler{

  function __construct(){

  }


  function run(){

       $this->consult(strip_tags($_GET["c"]));

  }

  protected function error($err){throw new crawlerException($err);}

  protected function consult(){

	
  include(dirname(__FILE__) . "/lib/simple.dom.php");
  
     
  $cedula = trim(strip_tags($_GET['c']));


  $html = file_get_html("http://www3.registraduria.gov.co/censo/_censoresultado.php?nCedula={$cedula}");

  $celdas = $html->find('table tr td') or die($this->error($cedula));
 
   $coun = 1;
   $info = array(); 
	 
  foreach($celdas as $element){
    
	if($coun % 2 == 0){

	  switch ($coun){  
		
		  case 2 :
		    $info["dpto"] = str_replace("  ","",$element->plaintext);
		   break;
		  case 4 : 
		    $info["ciudad"] =  str_replace("  ","",$element->plaintext);
		   break;
		  case 6 :
		   $info["puesto"] =  str_replace("  ","",$element->plaintext);
		    break;
	      case 8:
		   $info["dir"] =  str_replace("  ","",$element->plaintext);
		   break;
		  case 10:
		   $info["fecha"] =  str_replace("  ","",$element->plaintext);
		   break;
		  case 12:
		    $info["mesa"] =  str_replace("  ","",$element->plaintext);
			
	  }
	}
	 
	 $coun++; 
   }
   
   echo json_encode(
       array(
           "zona" => array("dpto" => trim($info["dpto"]) , "municipio"=> trim($info["ciudad"])),
           "puesto" => array("lugar" => trim($info["puesto"]) , "dir" => trim($info["dir"])),
           "fecha" => trim($info["fecha"]),
           "mesa" => trim($info["mesa"]),
           "doc" => $cedula
       )
   );
   
 
  
  }


}



try{
	  $app = new crawler();
	  $app->run();
}
catch(crawlerException $e){
	 echo json_encode(array("error" => $e->getMessage()));
}
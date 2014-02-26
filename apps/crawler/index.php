<?
header('Content-type: application/json');	

define("url", "http://www3.registraduria.gov.co/censo/_censoresultado.php?nCedula=");

class crawlerException extends Exception{}

class crawler{
 


  function __construct(){

  }


  function run(){


       $this->consult();

  }

  protected function error($err){throw new crawlerException($err);}

  protected function consult(){

	
  include_once(dirname(__FILE__) . "/lib/simple.dom.php");
  
     
  $cedula = trim(strip_tags($_GET['c']));
   
  if(!is_numeric($cedula))
  	$this->error("Documento no válido");

  $html = file_get_html( url . "{$cedula}");

  $celdas = $html->find('table tr td') or die($this->error($cedula));
 
   $coun = 1;
   $info = array(); 
	 
  foreach($celdas as $element){
    
	if($coun % 2 == 0){

	  switch ($coun){  
		
		  case 2 :
		    $info["dpto"] = $element->plaintext;
		   break;
		  case 4 : 
		    $info["ciudad"] =  $element->plaintext;
		   break;
		  case 6 :
		   $info["puesto"] =  $element->plaintext;
		    break;
	      case 8:
		   $info["dir"] =  $element->plaintext;
		   break;
		  case 10:
		   $info["fecha"] =  $element->plaintext;
		   break;
		  case 12:
		    $info["mesa"] =  $element->plaintext;
			
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
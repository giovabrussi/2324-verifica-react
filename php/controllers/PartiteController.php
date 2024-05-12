<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class PartiteController
{
  public function create(Request $request, Response $response, $args){
    sleep(1);
    $conn = new mysqli("my_mariadb", "root", "ciccio", "indovina_numero");
    $id = substr(str_shuffle(str_repeat($x='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil(10/strlen($x)) )),1,10);
    $body = json_decode($request->getbody()->getcontents(), true);    
    $nome = $body["nome"];
    $numero = rand(0, 100);
    $raw_query = "INSERT INTO partita(id, numero, nome, tentativi) VALUES('$id', $numero, '$nome', 0)";
    $result = $conn->query($raw_query);
    $raw_query = "SELECT * FROM partita WHERE id ='$id'";
    $result = $conn->query($raw_query);
    $results = $result->fetch_assoc();
    // unset($results['numero']);
    $response->getBody()->write(json_encode($results));
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }

  public function update(Request $request, Response $response, $args){
    sleep(1);
    $conn = new mysqli("my_mariadb", "root", "ciccio", "indovina_numero");
    $id = $args["id"];
    $body = json_decode($request->getBody()->getContents(), true);    
    $numero = $body["numero"];

    $raw_query = "SELECT * FROM partita WHERE id ='$id'";
    $result = $conn->query($raw_query);
    $results = $result->fetch_assoc();
    if($result->num_rows == 1){
      $tentativi = $results["tentativi"] + 1 ;
      $raw_query = "UPDATE partita SET tentativi = $tentativi WHERE id = '$id'";
      $result = $conn->query($raw_query);
      if($numero < $results["numero"]){
        $risultato = -1;
      }else if($numero > $results["numero"]){
        $risultato = 1;
      }else{
        $risultato = 0;
      }
      $response->getBody()->write(json_encode(array("id" => $id, "risultato" => $risultato, "tentativi" => $tentativi)));
      return $response->withHeader("Content-type", "application/json")->withStatus(200);
    }else{
      return $response->withHeader("Content-type", "application/json")->withStatus(404);
    }
  }
}

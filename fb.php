<?php error_reporting(E_ALL || ~E_NOTICE);?>
<?php
    // function getData($request){
    //     $response=$fb->getClient()->sendRequest($request);
    //     $res=$response->getDecodedBody();
    //     $data=$res["data"];
    //     return $data
    // }
require_once __DIR__ . '/php-graph-sdk-5.0.0/src/Facebook/autoload.php';

    $keyword=$_GET["keyword"];
    $lat=$_GET["lat"];
    $lng=$_GET["long"];
    $fields='id,name,picture.width(700).height(700),albums,posts';
    
    $accessToken="EAAaKv7Esg68BAKvdA2GOIHxfutua0dL6qZBZAZCLSgB0Fz1dXidLTmOBJOjDb2Bda9d70v1vFnMnvZBEgAum52iGVBJkjlzI0EdU7ZAcjhFZCeFfjyFMV1SyLxMdGHnq3sPao63VYfEOutfmAXtUk71zllLxhpS7QZD";
    $fb = new Facebook\Facebook([
        'app_id' => '1841405776135087',
        'app_secret' => 'a9147fbfbddecc707678b9c25533d6b0',
        'default_graph_version' => 'v2.8',
    ]);
    $fb->setDefaultAccessToken($accessToken);
    $userData=[];
    $pageData=[];
    $eventData=[];
    $groupData=[];
    $placeData=[];
    $userRes="";
    $pageRes="";
    $eventRes="";
    $groupRes="";
    $placeRes="";
// user
    $request = $fb->request('GET','/search',['q'=>$keyword,'type'=>'user','fields'=>$fields]);
    $response=$fb->getClient()->sendRequest($request);
    $res=$response->getDecodedBody();
    $data=$res["data"];
    $userData=$data;
    $userRes=$res;
//page 
    $request = $fb->request('GET','/search',['q'=>$keyword,'type'=>'page','fields'=>$fields]);
    $response=$fb->getClient()->sendRequest($request);
    $res=$response->getDecodedBody();
    $data=$res["data"];
    $pageData=$data;
    $pageRes=$res;
// event
    $request = $fb->request('GET','/search',['q'=>$keyword,'type'=>'event','fields'=>$fields.',place']);
    $response=$fb->getClient()->sendRequest($request);
    $res=$response->getDecodedBody();
    $data=$res["data"];
    $eventData=$data;
    $eventRes=$res;
// group
    $request = $fb->request('GET','/search',['q'=>$keyword,'type'=>'group','fields'=>$fields]);
    $response=$fb->getClient()->sendRequest($request);
    $res=$response->getDecodedBody();
    $data=$res["data"];
    $groupData=$data;
    $groupRes=$res;
// place
    $request = $fb->request('GET','/search',['q'=>$keyword,'type'=>'place','center'=>sprintf("%f", $lat).','.sprintf("%f", $lng),'fields'=>$fields]);
    $response=$fb->getClient()->sendRequest($request);
    $res=$response->getDecodedBody();
    $data=$res["data"];
    $placeData=$data;
    $placeRes=$res;

    $combineRes->user=$userRes;
    $combineRes->event=$eventRes;
    $combineRes->group=$groupRes;
    $combineRes->page=$pageRes;
    $combineRes->place=$placeRes;
    echo json_encode($combineRes);

//        case 'places':
//            // $request = $fb->request('GET','/search',['q'=>$keyword,'type'=>'event','fields'=>$fields]);
//            $content=file_get_contents("https://maps.googleapis.com/maps/api/geocode/json?address=".$location."&key=AIzaSyCm9AMkzgUPh7kfxRIk5KQooZKN-b3lcBY");
//            $content=json_decode($content,true);
//            $lat=$content["results"][0]["geometry"]["location"]["lat"];
//            $lng=$content["results"][0]["geometry"]["location"]["lng"];
//            // echo $lat.$lng;
//            //***TODO: consider not exists
           // $request = $fb->request('GET','/search',['q'=>$keyword,'type'=>'place','center'=>$lat.','.$lng,'distance'=>$distance,'fields'=>$fields]);
//            break;


?>
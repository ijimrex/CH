/**
 * Created by leijin on 3/31/17.
 */
var app = angular.module('myApp', []);
app.controller('fbController', function($scope,$http) {
    navigator.geolocation.getCurrentPosition(function(position) {
        $scope.lat=position.coords.latitude;
        $scope.long=position.coords.longitude;;
    });

    $scope.keyword ="";
//        $scope.urls='fb.php?keyword='+$scope.keyword+'&lat='+$scope.lat+'&long='+$scope.long;
    $scope.users=""
    $scope.pages=""
    $scope.events=""
    $scope.groups=""
    $scope.places=""
    $scope.userpage=""
    $scope.pagepage=""
    $scope.eventpage=""
    $scope.grouppage=""
    $scope.placepage=""
    $scope.reset=function (){
        $scope.keyword =""
    }
    $scope.favstorage=new Array()
    $scope.fall=""


    getall()
    // console.log($scope.favstorage)



    function show(id){
        document.getElementById(id).style.display='block'

    }
    function hide(id){
        document.getElementById(id).style.display='none'

    }

    function parseData(data) {
//            console.log(data)
        var temp=Array()
        var len=data.length;
        for (var i=0;i<len;i++){
            temp.push({
                num: i+1,
                id: data[i]['id'],
                name: data[i]['name'],
                picurl: data[i]['picture']['data']['url'],
            })
        }
        return temp
    }

    function parseData2(data) {
           // console.log(data)
        var temp=Array()
        var len=data.length;
        for (var i=0;i<len;i++){
            temp.push({
                num: i+1,
                id: data[i]['all']['id'],
                name: data[i]['all']['name'],
                type: data[i]['type'],
                picurl: data[i]['all']['picurl'],
            })
        }
        return temp
    }

    $scope.search=function () {
        hide('tc')
        show('progressbar')
        $http({
            method: 'GET',
            url: 'fb.php?&keyword='+$scope.keyword+'&lat='+$scope.lat+'&long='+$scope.long
        }).then(function successCallback(response) {
//                console.log(response['data']['user']['data'])
            $scope.users=parseData(response['data']['user']['data'])
            $scope.events=parseData(response['data']['event']['data'])
            $scope.pages=parseData(response['data']['page']['data'])
            $scope.places=parseData(response['data']['place']['data'])
            $scope.groups=parseData(response['data']['group']['data'])

            $scope.userpage={next:response['data']['user']['paging']['next'],pre:false,nex:true}
            $scope.eventpage={next:response['data']['event']['paging']['next'],pre:false,nex:true}
            $scope.pagepage={next:response['data']['page']['paging']['next'],pre:false,nex:true}
            $scope.placepage={next:response['data']['place']['paging']['next'],pre:false,nex:true}
            $scope.grouppage ={next:response['data']['group']['paging']['next'],pre:false,nex:true}

            hide('progressbar')
            show('tc')
        }, function errorCallback(response) {
            console.log('http error')
        });
    }
//user
    $scope.usernextpage=function () {
        $http({
            method: 'GET',
            url: $scope.userpage['next']
        }).then(function successCallback(response) {
            $scope.users=parseData(response['data']['data'])
            if (response['data']['paging']!=undefined&&response['data']['paging']['next']!=undefined && response['data']['paging']['next']!='')
            { $scope.userpage={next:response['data']['paging']['next'],previous:response['data']['paging']['previous'],nex:true,pre:true}}
            else{
                $scope.userpage={next:"",previous:response['data']['paging']['previous'],nex:false,pre:true}
            }
        }, function errorCallback(response) {
            console.log('http error')
        });
    }
    $scope.userpreviouspage=function () {
        $http({
            method: 'GET',
            url: $scope.userpage['previous']
        }).then(function successCallback(response) {
            console.log(response['data']['paging'])
            $scope.users=parseData(response['data']['data'])
            if (response['data']['paging']!=undefined&&response['data']['paging']['previous']!=undefined && response['data']['paging']['previous']!='')
            { $scope.userpage={next:response['data']['paging']['next'],previous:response['data']['paging']['previous'],nex:true,pre:true}}
            else{
                $scope.userpage={next:response['data']['paging']['next'],previous:"1",nex:true,pre:false}
            }
        }, function errorCallback(response) {
            console.log('http error')
        });
    }
//page
    $scope.pagenextpage=function () {
        $http({
            method: 'GET',
            url: $scope.pagepage['next']
        }).then(function successCallback(response) {
            $scope.pages=parseData(response['data']['data'])
            if (response['data']['paging']!=undefined&&response['data']['paging']['next']!=undefined && response['data']['paging']['next']!='')
            { $scope.pagepage={next:response['data']['paging']['next'],previous:response['data']['paging']['previous'],nex:true,pre:true}}
            else{
                $scope.pagepage={next:"",previous:response['data']['paging']['previous'],nex:false,pre:true}
            }
        }, function errorCallback(response) {
            console.log('http error')
        });
    }
    $scope.pagepreviouspage=function () {
        $http({
            method: 'GET',
            url: $scope.pagepage['previous']
        }).then(function successCallback(response) {
            $scope.pages=parseData(response['data']['data'])
            if (response['data']['paging']!=undefined&&response['data']['paging']['previous']!=undefined && response['data']['paging']['previous']!='')
            { $scope.pagepage={next:response['data']['paging']['next'],previous:response['data']['paging']['previous'],nex:true,pre:true}}
            else{
                $scope.pagepage={next:response['data']['paging']['next'],previous:"",nex:true,pre:false}
            }
        }, function errorCallback(response) {
            console.log('http error')
        });
    }
//group
    $scope.groupnextpage=function () {
        $http({
            method: 'GET',
            url: $scope.grouppage['next']
        }).then(function successCallback(response) {
            $scope.groups=parseData(response['data']['data'])
            if (response['data']['paging']!=undefined&&response['data']['paging']['next']!=undefined && response['data']['paging']['next']!='')
            { $scope.grouppage={next:response['data']['paging']['next'],previous:response['data']['paging']['previous'],nex:true,pre:true}}
            else{
                $scope.grouppage={next:"",previous:response['data']['paging']['previous'],nex:false,pre:true}
            }
        }, function errorCallback(response) {
            console.log('http error')
        });
    }
    $scope.grouppreviouspage=function () {
        $http({
            method: 'GET',
            url: $scope.grouppage['previous']
        }).then(function successCallback(response) {
            $scope.groups=parseData(response['data']['data'])
            if (response['data']['paging']!=undefined&&response['data']['paging']['previous']!=undefined && response['data']['paging']['previous']!='')
            { $scope.grouppage={next:response['data']['paging']['next'],previous:response['data']['paging']['previous'],nex:true,pre:true}}
            else{
                $scope.grouppage={next:response['data']['paging']['next'],previous:"",nex:true,pre:false}
            }
        }, function errorCallback(response) {
            console.log('http error')
        });
    }
    //event
    $scope.eventnextpage=function () {
        $http({
            method: 'GET',
            url: $scope.eventpage['next']
        }).then(function successCallback(response) {
            $scope.events=parseData(response['data']['data'])
            console.log(response['data']['paging'])
            if (response['data'].hasOwnProperty('paging')&& response['data']['paging']['next']!=undefined && response['data']['paging']['next']!='')
            { $scope.eventpage={next:response['data']['paging']['next'],nex:true,pre:false}}
            else{
                $scope.eventpage={next:"",nex:false,pre:false}
            }
        }, function errorCallback(response) {
            console.log('http error')
        });
    }
//        $scope.eventpreviouspage=function () {
//            $http({
//                method: 'GET',
//                url: $scope.eventpage['previous']
//            }).then(function successCallback(response) {
//                $scope.events=parseData(response['data']['data'])
//                if (response['data'].hasOwnProperty('paging')&&response['data']['paging']['previous']!=undefined && response['data']['paging']['previous']!='')
//                { $scope.eventpage={next:response['data']['paging']['next'],previous:response['data']['paging']['previous'],nex:true,pre:true}}
//                else{
//                    $scope.eventpage={next:response['data']['paging']['next'],previous:"",nex:true,pre:false}
//                }
//            }, function errorCallback(response) {
//                console.log('http error')
//            });
//        }
//place
    $scope.placenextpage=function () {
        $http({
            method: 'GET',
            url: $scope.placepage['next']
        }).then(function successCallback(response) {
            $scope.places=parseData(response['data']['data'])
            if (response['data']['paging']!=undefined&&response['data']['paging']['next']!=undefined && response['data']['paging']['next']!='')
            { $scope.placepage={next:response['data']['paging']['next'],previous:response['data']['paging']['previous'],nex:true,pre:true}}
            else{
                $scope.placepage={next:"",nex:false,pre:false}
            }
        }, function errorCallback(response) {
            console.log('http error')
        });
    }

    function getall() {
        $scope.fid=new Array()
        if (localStorage.getItem('item')!=null){
            $scope.favstorage=JSON.parse(localStorage.getItem('item'))
            for (var i=0;i< $scope.favstorage.length;i++){
                $scope.fid.push($scope.favstorage[i]['id'])
            }
            $scope.fall=parseData2($scope.favstorage)
            // console.log(  $scope.fall)
        }
        // console.log(  $scope.favstorage )
    }

    $scope.storage=function(ids,type,all){
        getall()
        var temp={id:ids,type:type,all:all}
            // console.log('stor'+temp)
        if ($scope.fid.indexOf(ids)==-1){
            $scope.favstorage.push(temp)
            $scope.fall=parseData2($scope.favstorage)
            var tojson=JSON.stringify( $scope.favstorage );
            // console.log(tojson)
            localStorage.item=tojson;

            console.log($scope.fall)
            document.getElementById(ids).className='glyphicon glyphicon-star'
            document.getElementById(ids).style.color='gold'
            
        }
        else {
            // alert('in')
            var index=$scope.fid.indexOf(ids)
            // console.log($scope.fid)
            // console.log(index)
            $scope.favstorage.splice(index,1)
            $scope.fid.splice(index,1)
            $scope.fall=parseData2($scope.favstorage)
            var tojson=JSON.stringify( $scope.favstorage );
            // console.log(tojson)
            console.log($scope.fall)
            localStorage.item=tojson;
            document.getElementById(ids).className='glyphicon glyphicon-star-empty'
            document.getElementById(ids).style.color='black'

        }

    }
    $scope.showfav=function () {
       document.getElementById('tc').style.display='block'
    }

    $scope.jg=function (id) {

        for (var i=0;i<$scope.fid.length;i++){
            if ($scope.fid[i]==id){
                return true
            }

        }
        return false
    }
    // console.log($scope.fid)
    // localStorage.clear();
//        $scope.placepreviouspage=function () {
//            $http({
//                method: 'GET',
//                url: $scope.placepage['previous']
//            }).then(function successCallback(response) {
//                console.log(response)
//                $scope.places=parseData(response['data']['data'])
//                if (response['data']['paging']!=undefined&&response['data']['paging']['previous']!=undefined && response['data']['paging']['previous']!='')
//                { $scope.placepage={next:response['data']['paging']['next'],previous:response['data']['paging']['previous'],nex:true,pre:true}}
//                else{
//                    $scope.placepage={next:response['data']['paging']['next'],previous:"",nex:true,pre:false}
//                }
//            }, function errorCallback(response) {
//                console.log('http error')
//            });
//        }
});
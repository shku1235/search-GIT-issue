var a = window.location.href;
console.log(a);
var x = a.split('&');
var ne = x[1];
console.log(ne);

var html='';

$.ajax({
    url: 'https://api.github.com/users/'+ne+'',
    crossDomain: true,
    dataType: 'json',
    header: {'User-Agent': 'Mozilla/5.0 (Windows NT 6.3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'}
    }).done(function (data) { 
        console.log('name',data.name);
        html+="<h2>"+data.name+"</h2>";
        console.log(data.avatar_url);
        html+="<div id:'imgid'><img id='userimg' src="+data.avatar_url+"></div>";
        console.log(data.html_url);
        html+='<a href=""+data.html_url+""><p>User Git url</p></a>';
    
        $('#userinfo').html(html);
    });
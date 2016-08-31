var a = window.location.href;
console.log(a);
var x = a.split('&');
var num = x[1];
var title = x[2];
console.log(num);
console.log(title);
var html='';

console.log("https://api.github.com/repos/"+title+"/issues/"+num+"");

$.ajax({
    url: 'https://api.github.com/repos/'+title+'/issues/'+num+'',
    crossDomain: true,
    dataType: 'json',
    header: {'User-Agent': 'Mozilla/5.0 (Windows NT 6.3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'}
    }).done(function (data) { 
        console.log(data.title);
        html+="<h3>Title: <br>"+data.title+"</h3>";
        console.log(data.body);
        html+="<p>Description: <br> "+data.body+"</p>";
        console.log(data.avatar_url);
        html+="<a href='/user.html?&"+data.user.login+"' class:'issueclick'><img id='userimg' src="+data.user.avatar_url+" >";
        $('#issueid').html(html);
    });
    
  
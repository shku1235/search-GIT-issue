
var rtitle =[ ];
var content = '';
var d = new Date();
var day = d.getDate();
var oldissue='';
var selectitem = '';
var resname = ' ';





function up(){
    $('#result').empty();
    $('#oldissue').empty();
    content += '<h1 >current day issues</h1>';  
    oldissue='<h1 >Old issues</h1>' ;   
    $.ajax({
        url: 'https://api.github.com/repos/'+resname+'/issues',
        crossDomain: true,
        dataType: 'json',
        header: {'User-Agent': 'Mozilla/5.0 (Windows NT 6.3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'}
        }).done(function (data) { 
         
        $.each(data,function(i,data) {
            console.log(data.title);
            console.log(data.url);
            $('#oldissue').html();
            console.log(data.created_at);
            a=data.created_at
            x=a.split('-')[2];
            y=x.split('T')[0];
            console.log(y,day);
            console.log(data.full_name);

            if(y == day ){
                content +='<a id:"issueclick"  href="/issuepage.html?&'+data.number+'&'+resname+'" ><div id:"issueline">'+data.number+" : "+data.title+'</div></a>';
            }
            else{
                oldissue += '<a id:"issueclick"  href="/issuepage.html?&'+data.number+'&'+resname+'"><div id:"issueline">'+data.number+" : "+data.title+'</div></a>';
            }


    });
        console.log('json done ');
        if(content===""){

            $('#result').html('<div>NO issues for current date</div>');
            }
        else {
                $('#result').html(content);
            }
        $('#oldissue').html(oldissue);


        });
}

$('#search').click (function() {
    resname = $('#qinput').val();
    up();
    console.log("by submit",resname);
    
});

$( function() {    
    $('#qinput').keyup(function(){
        var a = $(this).val();
        if($(this).val().length >= 3){           
            rtitle.empty;
            $.ajax({
                
                url: 'https://api.github.com/search/repositories?q='+a+'&sort=stars&order=desc',
                crossDomain: true,
                dataType: 'json'
            }).done(function (data) {                 
                $.each(data.items, function(i, item) {
                    
                    rtitle.push(data.items[i].full_name);
                });
					
        });
    };
    
});
});

$( "#qinput" ).autocomplete({
    source: rtitle,
    select: function (e, ui) {
        console.log(ui.item.label);
        resname=ui.item.label;
        up();
    }
});
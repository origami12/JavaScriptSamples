$( function(){
	
	var source   = $('#box1').html();
	var template = Handlebars.compile(source);
	var content = {
		title:'<p>にゃー</p>',
		text:'<p>うーにゃー</p>'
	}
	var html = template(content);
	console.log(html);
	$('#output').html(html);
	
});
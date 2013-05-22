$(function(){
	
	$('#fm').validate({
		rules :{
			'distance' : {
				required : true,
				min      : 0,
			},
			'minute'   : {
				required : true,
				min      : 0,
			},
			'time'     : {
				required : true,
				min      : 0,
				max      : 23,
			}
		},
		messages : {
			'distance' : {
				required : '乗車距離は必須です',
				min      : '0以上の値を入力してください',
			},
			'minute'   : {
				required : '乗車時間は必須です',
				min      : '0以上の値を入力してください',
			},
			'time'     : {
				required : '乗車時刻は必須です',
				min      : '0~23までの数値を入力してください',
				max      : '0~23までの数値を入力してください',
			}
		},
		errorClass   : 'error',
		errorPlacement: function(error,element){
			//errorの内容を指定されたid (ここでは id_err)のコンテンツの末尾に追加する
			error.appendTo($('#'+element.attr('id')+'_err'));
		}
	})
	
	$('#calc').click(function(){
		
		var distance = $('#distance').val();
		var minute   = $('#minute').val();
		var time     = $('#time').val();
		
		//初乗り料金の計算と 加算料金計算
		if(distance <= 0.8){
			var firstCalc    = 320;
			var distanceCalc = parseInt((distance-0.8)/0.213)*50;
		}else if(distance <= 1.2){
			var firstCalc    = 410;
			var distanceCalc = parseInt((distance-1.2)/0.213)*50;
		}else{
			var firstCalc    = 500;
			var distanceCalc = parseInt((distance-1.6)/0.213)*50;
		}
		var minuteCalc     = parseInt(minute*60/80)*50;
		
		//深夜・早朝割増の計算
		var nightCalc      = parseInt((firstCalc+distanceCalc+minuteCalc)*0.1);
		
		//遠距離割引計算
		if(firstCalc+distanceCalc+nightCalc > 2500){
			var longdisCalc    = parseInt((firstCalc+distanceCalc+minuteCalc+nightCalc-2500)*0.1) * (-1);
		}
		
		var sum    = firstCalc + distanceCalc + minuteCalc + nightCalc + longdisCalc;
		var sumtax = parseInt(sum * 1.05 / 10) * 10;
		
		var values = {
			'firstCalc'   : firstCalc,
			'addCalc'     : distanceCalc+minuteCalc,
			'nightCalc'   : nightCalc,
			'longdisCalc' : longdisCalc,
			'sum'         : sum,
			'sumtax'      : sumtax 
		}
		
		var template = Handlebars.compile($('#box').html());
		$('#result').html(template(values));
		
	});
	
});

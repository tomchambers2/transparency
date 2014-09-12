window.onload = function() {
	document.getElementById('heartbeat-video').playbackRate = 3;

	$('.video-button').click(function() {
		$('.video').css('display','block');		
		$('.heartbeat').css('display','none');
		$('.location').css('display','none');
	});	
	$('.location-button').click(function() {
		$('.heartbeat').css('display','none');
		$('.video').css('display','none');
		$('.location').css('display','block');
	});
	$('.heartbeat-button').click(function() {
		$('.heartbeat').css('display','block');
		$('.video').css('display','none');
		$('.location').css('display','none');
	});

	$('.day-button').click(function() {
		$('.day').css('display','block');
		$('.week').css('display','none');
	});
	$('.week-button').click(function() {
		$('.day').css('display','none');
		$('.week').css('display','block');
	});	
	$('#heartbeat-video').playbackRate = 10;
	console.log($('#heartbeat-video').playbackRate);
	var beats = 50;

	function Oscillator(low, high, increment) {
		if (low > high || increment < 0) {
			return function() { return NaN; };
		};

		var curr = low
		return function() {
			var ret = curr;
			curr += increment;

			if (curr + increment > high || curr + increment < low)
				increment = -increment;

			return ret;
		};
	};

	var oscillator = Oscillator(78,92,2);

	setInterval(function() {
		var beat = oscillator();
		rate = beat / 60;
		console.log(beat);
		document.getElementById('heartbeat-video').playbackRate = rate;
		$('.bpm').text(beat+' bpm');
	},2000);

	function getLocation() {
		var url = 'http://0.0.0.0:8080';
		$.get(url, function(data) {
			console.log(JSON.parse(data));
			var location = JSON.parse(data);
			new Maplace({
			    locations: [location,location],
			    controls_on_map: false,
			    map_options: {
			    	zoom: 14
			    }
			}).Load();			

		});
	};
	getLocation();
};
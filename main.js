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

	var oscillator = Oscillator(78,160,10);

	setInterval(function() {
		var beat = oscillator();
		rate = beat / 60;
		console.log(beat);
		document.getElementById('heartbeat-video').playbackRate = rate;
		$('.bpm').text(beat+' bpm');
	},2000);

	var newCards = [
		'<div class="card"><span class="top"><i class="fa fa-foursquare"></i> Checked in (Foursquare)</span> Went to <strong>The Old Tavern, Loughborough</strong> with Jim Hardcastle and Harry Sands</div>',
		'<div class="card"><span class="top"><i class="fa fa-bus"></i> Transport (Moves)</span> Journey on <strong>bus</strong> from <strong>Loughborough</strong> to <strong>Castle Donington</strong></div>',
		'<div class="card"><span class="top"><i class="fa fa-smile-o"></i> Mood logged (iMoodJournal)</span> Currently very happy - 9/10</div>',
		'<div class="card"><span class="top"><i class="fa fa-google"></i> 00:13 Searched for \'planet of apes ending\'</span> Visited <a href="http://en.wikipedia.org/wiki/Planet_of_the_Apes_(1968_film)">Planet of the Apes (1968 film)</a> on Wikipedia</div>',		
		'<div class="card"><span class="top"><i class="fa fa-home"></i> 01:31 Sleep logged (SleepCycle)</span> Began sleep</div>',
		'<div class="card"><span class="top"><i class="fa fa-google"></i> 02:31 Searched for \'what to do can\'t sleep\'</span> No results visited</div>',
		'<div class="card"><span class="top"><i class="fa fa-google"></i> 03:40 Searched for \'armpit lump cancer\'</span> Visited <a href="http://www.nhs.uk/conditions/lumps-swellings/Pages/Introduction.aspx">nhs.uk</a></div>',		
	]
	var cardIncrement = 0;

	setInterval(function() {
		if (cardIncrement < newCards.length) {
			$(newCards[cardIncrement]).prependTo($('.weather.rain')).hide().slideDown('fast');
			cardIncrement++;
		};
	},5000);

	function getLocation() {
		var url = 'http://transparency-moves-proxy.herokuapp.com/';
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
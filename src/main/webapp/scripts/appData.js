var AppData = function() {
	var _endpoints,
    	_initialCards,
    	_announcements,
        _private;

	_endpoints = {
		starbucksLocs: {path:"http://www.starbucks.com/api/location.ashx?&features=&lat={LAT}&long={LONG}&limit={MAX}", verb:"GET"},
		starbucksTest: {path:"scripts/testData/starbucksTest.json", verb:"GET"}
	};
    
	_initialCards = [
		{
			"cardNumber":"461253932",
			"amount":20,
			"bonusPoints":60,
			"expireDate":"2013/12/06"
		},{
			"cardNumber":"723128745",
			"amount":76,
			"bonusPoints":22,
			"expireDate":"2014/10/16"
		},{
			"cardNumber":"912472185",
			"amount":104,
			"bonusPoints":56,
			"expireDate":"2014/11/24"
		}
	];
    
	_announcements = [
		{ title: "Spider Man 2", description: "Enjoy your favorite holiday drinks, like Pumpkin Spice Lattes.", url: "images/spiderman2.png" },
		{ title: "Robocop 2014" , url: "images/robocop.png", description: "In 2028 Detroit, when Alex Murphy - a loving husband, father and good cop - is critically injured in the line of duty, the multinational conglomerate OmniCorp sees their chance for a part-man, part-robot police officer."},
		{ title: "Divergent", url: "images/divergent.png", description: "In a world divided by factions based on virtues, Tris learns she's Divergent and won't fit in. When she discovers a plot to destroy Divergents, Tris and the mysterious Four must find out what makes Divergents dangerous before it's too late."},
		{ title: "Harry Potter", url: "images/harrypotter.png", description: "Harry Potter is a series of seven epic fantasy novels written by the British author J. K. Rowling. The series, named after the titular character, chronicles the adventures of a young wizard, Harry"},
		{ title: "Hobbit", url: "images/hobbit.png", description: "THE HOBBIT: THE BATTLE OF THE FIVE ARMIES - brings to an epic conclusion the adventures of Bilbo Baggins"},
	];
    
	_private = {
		load: function(route, options) {
			var path = route.path,
    			verb = route.verb,
    			dfd = new $.Deferred();

			console.log("GETTING", path, verb, options);

			//Return cached data if available (and fresh)
			if (verb === "GET" && _private.checkCache(path) === true) {
				//Return cached data
				dfd.resolve(_private.getCache(path));
			}
			else {
				//Get fresh data
				$.ajax({
					type: verb,
					url: path,
					data: options,
					dataType: "json"
				}).success(function (data, code, xhr) {
					_private.setCache(path, {
						data: data,
						expires: new Date(new Date().getTime() + (15 * 60000)) //+15min
					});
					dfd.resolve(data, code, xhr);
				}).error(function (e, r, m) {
					console.log("ERROR", e, r, m);
					dfd.reject(m);
				});
			}

			return dfd.promise();
		},
        
		checkCache: function(path) {
			var data,
			path = JSON.stringify(path);

			try {
				data = JSON.parse(localStorage.getItem(path));
                
				if (data === null || data.expires <= new Date().getTime()) {
					console.log("CACHE EMPTY", path);
					return false;
				}
			}
			catch (err) {
				console.log("CACHE CHECK ERROR", err);
				return false;
			}

			console.log("CACHE CHECK", true, path);
			return true;
		},
        
		setCache: function(path, data, expires) {
			var cache = {
				data: data,
				expires: expires
			},
			path = JSON.stringify(path);

			//TODO: Serialize JSON object to string
			localStorage.setItem(path, JSON.stringify(cache));

			console.log("CACHE SET", cache, new Date(expires), path);
		},
        
		getCache: function(path) {
			var path = JSON.stringify(path),
			cache = JSON.parse(localStorage.getItem(path));

			console.log("LOADING FROM CACHE", cache, path);

			//TODO: Deserialize JSON string
			return cache.data.data;
		}
	};

	return {
		getStarbucksLocations: function(lat, lng, max) {
			var route = $.extend({}, _endpoints.starbucksLocs);

			route.path = route.path.replace(/{LAT}/g, lat);
			route.path = route.path.replace(/{LONG}/g, lng);
			route.path = route.path.replace(/{MAX}/g, max || 10);

			if (document.location.hostname === "coffee") {
				//Test environment (localhost) - fake response
				route = $.extend({}, _endpoints.starbucksTest);
			}

			return _private.load(route, {});
		},
        
		getInitialCards: function() {
			return JSON.stringify(_initialCards);
		},
        
		getAnnouncements: function() {
			return _announcements;
		}
	};
}
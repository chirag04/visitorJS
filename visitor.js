/*

visitor.js
MIT License

Copyright (c) Chirag Jain

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

This product includes GeoLite data created by MaxMind, available from http://maxmind.com/.

*/

var visitor = {};
(function() {
		var BrowserDetect ={
                            init: function () {
                                this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
                                this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
                                this.OS = this.searchString(this.dataOS) || "an unknown OS"
                            },
                            searchString: function (data) {
                                for (var i = 0; i < data.length; i++) {
                                    var dataString = data[i].string;
                                    var dataProp = data[i].prop;
                                    this.versionSearchString = data[i].versionSearch || data[i].identity;
                                    if (dataString) {
                                        if (dataString.indexOf(data[i].subString) != -1) {
                                            return data[i].identity
                                        }
                                    } else {
                                        if (dataProp) {
                                            return data[i].identity
                                        }
                                    }
                                }
                            },
                            searchVersion: function (dataString) {
                                var index = dataString.indexOf(this.versionSearchString);
                                if (index == -1) {
                                    return
                                }
                                return parseFloat(dataString.substring(index + this.versionSearchString.length + 1))
                            },
                            dataBrowser: [{
                                string: navigator.userAgent,
                                subString: "Chrome",
                                identity: "Chrome"
                            }, {
                                string: navigator.userAgent,
                                subString: "OmniWeb",
                                versionSearch: "OmniWeb/",
                                identity: "OmniWeb"
                            }, {
                                string: navigator.vendor,
                                subString: "Apple",
                                identity: "Safari",
                                versionSearch: "Version"
                            }, {
                                prop: window.opera,
                                identity: "Opera"
                            }, {
                                string: navigator.vendor,
                                subString: "iCab",
                                identity: "iCab"
                            }, {
                                string: navigator.vendor,
                                subString: "KDE",
                                identity: "Konqueror"
                            }, {
                                string: navigator.userAgent,
                                subString: "Firefox",
                                identity: "Firefox"
                            }, {
                                string: navigator.vendor,
                                subString: "Camino",
                                identity: "Camino"
                            }, {
                                string: navigator.userAgent,
                                subString: "Netscape",
                                identity: "Netscape"
                            }, {
                                string: navigator.userAgent,
                                subString: "MSIE",
                                identity: "Explorer",
                                versionSearch: "MSIE"
                            }, {
                                string: navigator.userAgent,
                                subString: "Gecko",
                                identity: "Mozilla",
                                versionSearch: "rv"
                            }, {
                                string: navigator.userAgent,
                                subString: "Mozilla",
                                identity: "Netscape",
                                versionSearch: "Mozilla"
                            }],
                            dataOS: [{
                                string: navigator.platform,
                                subString: "Win",
                                identity: "Windows"
                            }, {
                                string: navigator.platform,
                                subString: "Mac",
                                identity: "Mac"
                            }, {
                                string: navigator.userAgent,
                                subString: "iPhone",
                                identity: "iPhone/iPod"
                            }, {
                                string: navigator.userAgent,
                                subString: "Android",
                                identity: "Android"
                            }, {
                                string: navigator.platform,
                                subString: "Linux",
                                identity: "Linux"
                            }]
		};  // end of browser detect
		BrowserDetect.init();
		var loadscript = function(url,callback) {    
			var script = document.createElement('script');
			script.type = 'text/javascript';
			if(script.readyState) { //IE
			    script.onreadystatechange = function() {
			        if(script.readyState == 'loaded' || script.readyState == 'complete') {
			            script.onreadystatechange = null;
			            callback();
			        }
			    };
			} else { //Others
			    script.onload = function() {
			        callback();
				};
			}
			script.src = url;
			document.getElementsByTagName('head')[0].appendChild(script);
    		}; //end of loadscript

    		/* load geoip script and expose data through visitor object */
		loadscript('http://j.maxmind.com/app/geoip.js', function(){
			/* browser data */
			visitor.browser_name = BrowserDetect.browser;
	    		visitor.browser_version = BrowserDetect.version;
	    		visitor.browser_engine = navigator.product;
	    		visitor.os = BrowserDetect.OS;
			visitor.screen_resolution = screen.width+'x'+screen.height;
			visitor.screen_width = screen.width;
			visitor.screen_height = screen.height;
			visitor.referrer = document.referrer;
			visitor.url = window.location.href;
			visitor.language = navigator.language; 
			/* Geo data */
			visitor.country_code = geoip_country_code();
			visitor.country_name = geoip_country_name();
			visitor.city = geoip_city();
			visitor.region = geoip_region();
			visitor.region_name = geoip_region_name();
			visitor.latitude = geoip_latitude();
			visitor.longitude = geoip_longitude();
			visitor.postal_code = geoip_postal_code();
		});	
}) ();

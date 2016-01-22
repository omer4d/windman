$(function() {
	var inputField = $("#input-field");
	var consoleLog = $("#console-log");

	function format() {
		var rx = /%[0-9]+/gi;
		var args = arguments;

		return args[0].replace(rx, function(match) {
			return args[parseInt(match.substring(1)) + 1];
		});
	}

	function consoleLine(text, cls) {
		var pre = format('<pre class="%0"></pre>', cls);
		consoleLog.append($(pre).html(text));
	}
	
	inputField.keypress(function(event) {
		if (event.keyCode == 13 && !event.shiftKey) {
			consoleLine(">>" + inputField.html(), "console-log-line");
			
			var data = {};
			data.code = inputField.text();
					
			$.ajax({
				type: 'POST',
				data: JSON.stringify(data),
				contentType: 'application/json',
                url: 'http://localhost:1337/eval',						
                success: function(data) {
					if("result" in data)
						consoleLine(data.result, "console-log-line");
					else if("error" in data)
						consoleLine(data.error, "console-error-line");
				}
			});
			
			inputField.html("");
		}
	});
});

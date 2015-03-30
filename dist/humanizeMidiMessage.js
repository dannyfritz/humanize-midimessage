(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.humanizeMidiMessage = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

module.exports = require("./src/humanizeMidiMessage.js");

},{"./src/humanizeMidiMessage.js":2}],2:[function(require,module,exports){
"use strict";

var MAX_MIDI_VALUE = 127;
var scaleMaps = require("./scaleMaps.js");

function midiEventType(data) {
	if (data[0] >= 128 && data[0] <= 143) {
		return "Note Off";
	}
	if (data[0] >= 144 && data[0] <= 159) {
		return "Note On";
	}
	if (data[0] === 185) {
		if (data[1] === 11) {
			return "Expression";
		}
		if (data[1] === 64) {
			return "Sustain";
		}
	}
	if (data[0] === 185 && data[1] === 11) {
		return "Expression";
	}
}

function getVelocity(data) {
	if (data[0] >= 128 && data[0] <= 159) {
		return data[2] / MAX_MIDI_VALUE;
	}
}

function getNote(data) {
	if (data[0] >= 128 && data[0] <= 159) {
		return data[1];
	}
}

function getLetter(data, scale) {
	var scaleMap = scaleMaps.cMajor;
	scaleMap = scaleMaps[scale] || scaleMap;
	if (data[0] >= 128 && data[0] <= 159) {
		return scaleMap[data[1] % 12];
	}
}

function getOctave(data, scale) {
	var scaleMap = scaleMaps.cMajor;
	scaleMap = scaleMaps[scale] || scaleMap;
	if (data[0] >= 128 && data[0] <= 159) {
		return Math.floor(data[1] / 12);
	}
}

module.exports = function humanizeMidiMessageEvent(event) {
	var humanEvent = {
		raw: event.data,
		type: null,
		//TODO: channel: null,
		note: null,
		letter: null,
		octave: null,
		velocity: null
	};
	var data = event.data;
	if (data) {
		humanEvent.type = midiEventType(data);
		humanEvent.velocity = getVelocity(data);
		humanEvent.note = getNote(data);
		humanEvent.letter = getLetter(data);
		humanEvent.octave = getOctave(data);
	}
	return humanEvent;
};

},{"./scaleMaps.js":3}],3:[function(require,module,exports){
"use strict";

module.exports = {
	cMajor: ["C", "C#/D♭", "D", "D#/E♭", "E", "F", "F#/G♭", "G", "G#/A♭", "A", "A#/B♭", "B"]
};

},{}]},{},[1])(1)
});


//# sourceMappingURL=humanizeMidiMessage.js.map
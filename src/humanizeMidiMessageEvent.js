'use strict';

var MAX_MIDI_VALUE = 127;
var scaleMaps = require('./scaleMaps.js');

function midiEventType (data) {
	if (data[0] >= 128 && data[0] <= 143) {
		return 'Note Off';
	}
	if (data[0] >= 144 && data[0] <= 159) {
		return 'Note On';
	}
}

function getVelocity (data) {
	if (data[0] >= 128 && data[0] <= 159) {
		return data[2] / MAX_MIDI_VALUE;
	}
}

function getNote (data) {
	if (data[0] >= 128 && data[0] <= 159) {
		return data[1];
	}
}

function getLetter (data, scale) {
	var scaleMap = scaleMaps.cMajor;
	scaleMap = scaleMaps[scale] || scaleMap;
	if (data[0] >= 128 && data[0] <= 159) {
		return scaleMap[data[1] % 12];
	}
}

function getOctave (data, scale) {
	var scaleMap = scaleMaps.cMajor;
	scaleMap = scaleMaps[scale] || scaleMap;
	if (data[0] >= 128 && data[0] <= 159) {
		return Math.floor(data[1] / 12);
	}
}

module.exports = function humanizeMidiMessageEvent (event) {
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

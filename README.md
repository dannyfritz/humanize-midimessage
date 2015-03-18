# humanizeMidiMessageEvent

[MIDIMessageEvent](http://www.w3.org/TR/webmidi/#midimessageevent-interface)
is how your browser communicates signals from your MIDI devices.
The event contains 3 bytes that correspond to various things in [this table](http://www.midi.org/techspecs/midimessages.php)

## Installation

```bash
$ npm install humanizeMidiMessageEvent
```

## Usage
In your HTML:
```html
<script src="humanizeMidiMessageEvent.js"></script>
<script>
	navigator.requestMIDIAccess()
	.then(function (midiAccess) {
		midiAccess.inputs.forEach(function (port, key) {
			port.onmidimessage = function (event) {
				console.log(humanizeMidiMessageEvent(event));
			}
		});
	})
</script>
```

## API

### humanizeMidiMessageEvent(MIDIMessageEvent)

Takes a [MIDIMessageEvent](http://www.w3.org/TR/webmidi/#midimessageevent-interface)
and returns a humanized object with this shape:
```js
{
	raw: [128, 0, 77],
	type: "Note On",
	note: 0,
	letter: "C",
	octave: 0,
	velocity: 0.30708661417322836
};
```

## Browser Support

### Chrome
[Chrome](https://www.chromestatus.com/feature/4923613069180928)

Hidden behind the [Enable Web MIDI API](chrome://flags/#enable-web-midi) flag.

### Firefox
[Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=836897)

### IE
[IE](https://status.modern.ie/webmidiapi)

[![MIT](https://img.shields.io/npm/l/humanize-midimessage.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![npm](https://img.shields.io/npm/v/humanize-midimessage.svg?style=flat-square)](https://www.npmjs.com/package/humanize-midimessage)

# humanize-midimessage

[MIDIMessageEvent](http://www.w3.org/TR/webmidi/#midimessageevent-interface)
is how your browser communicates signals from your MIDI devices.
The event contains 3 bytes that correspond to various things in [this table](http://www.midi.org/techspecs/midimessages.php)

That table isn't very readable by people like me so this library makes it
readable for people like me.

## Installation

```bash
$ npm install humanize-midimessage
```

## Usage
In your HTML:
```html
<script src="humanizeMidiMessage.js"></script>
<script>
	navigator.requestMIDIAccess()
	.then(function (midiAccess) {
		midiAccess.inputs.forEach(function (port, key) {
			port.onmidimessage = function (event) {
				console.log(humanizeMidiMessage(event));
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
}
```

## Example

[example](https://rawgit.com/dannyfritz/humanize-midimessage/master/example/index.html)

## Browser Support

### Chrome
[Status](https://www.chromestatus.com/feature/4923613069180928)

Hidden behind the *Enable Web MIDI API* (*#enable-web-midi*) flag in `chrome://flags`.

### Firefox
[Status](https://bugzilla.mozilla.org/show_bug.cgi?id=836897)

### IE
[Status](https://status.modern.ie/webmidiapi)

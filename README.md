# Handsfree for website

Turn on voice control in your website.

Handsfree for website allows users to interact with the web page just by speaking voice commands. Hundreds of voice commands are supported out of the box. e.g. "click", "select", "search text", "scroll up", "play" and "reload".

Check out this [demo page](https://sljavi.github.io/handsfree-for-website/dist/index.html) to see how the voice control works.

## Features

Voice commands for HTML elements
 - Links
 - Buttons
 - Texts
 - Pictures
 - Video and music players
 - Form elements

Voice commands for the website
 - Scrolling
 - Navigation
 - Text searching

Speech recognition 
 - Turn on/off microphone
 - Display voice's volume

Multiple languages are supported
 - English
 - Spanish
 - Portuguese
 - Chinese (under development)

Custom voice commands
 - Build your own set of voice commands

Check out [demo](https://sljavi.github.io/handsfree-for-website/dist/index.html) to see the full list of voice commands

## Requirements

Web Speech Recognition services are **not** supported by all the browsers.
Here you can check the browser support
[https://caniuse.com/#feat=speech-recognition](https://caniuse.com/#feat=speech-recognition)

## Usage

#### Using NPM and ES6

Add handsfree for website as dependency

```shell
npm install handsfree-for-website
```

Initialize and run the tool

```javascript
import hansfreeForWebsite from 'handsfree-for-website';

const handsfree = hansfreeForWebsite.init();
handsfree.turnOn();
```

#### Using a CDN

Add the following script tag at the end of the `<body>`.

```html
<script src="https://unpkg.com/handsfree-for-website/dist/handsfree-for-website.js" crossorigin></script>
```

Initialize and run the tool

```javascript
var handsfree = window.hansfreeForWebsite.init();
handsfree.turnOn();
```

## API
Requiring the module or the global variable gives you an object that defines one primary function.

### init(settings)
Useful to initialize the speech recognition service. 

##### Arguments

`(Object)`: An object with the following properties:
 * `lang (String)`:  Language code (ISO 639-1). Default to browser language. i.e. "en-US"
 * `turnedOn (Bool)`: Automatically start when calling the `init` function. Default to `false`.
 * `continuesRecognition (Bool)`: When continues recognition mode is turned on, the service will be continuously listening and returning transcriptions for what was received. If the continues recognition mode is turned off, the service will start listening only after pressing the `Ctrl` key and will stop as soon as a voice command has been recognized. Default to `true`.
 * `modules (Array)`: List of voice command modules. Default to modules implemented by [Handsfree for website modules](https://github.com/sljavi/handsfree-for-website-modules)).

##### Returns
`(Object)`: Handsfree for website client.

### Handsfree for website client API

As result of executing the `init` function an object with the following methods is given to interact with the tool.

#### turnOn()
It makes the mic start listening for voice commands

#### turnOff()
It finishes the speech recogntion service and makes the mic stop listening

#### turnOnContinuesRecognition()
It switches the speech recognition to a continues mode.

#### turnOffContinuesRecognition()
It switches off the continues speech recognition. The user will need to press the `Ctrl` key before say any voice command.

#### getModules()
It returns the list of voice commands modules.

#### addModules(Modules<Array>)
It adds voice commands modules to the previously configured.

#### setModules(Modules<Array>)
It replaces the list of voice commands modules with the provided ones.

#### changeLanguage('lang-code')
It changes the language. A language code format (ISO 639-1) is expected. i.e. "en-US"

#### getLanguage()
It returns the current language.

## Custom voice commands

In order to support custom voice commands useful to allow the users tu execute website specific functionality it is required to add a module.

Here a simple module.

```javascript
const myModule = {
  name: 'Module name',
  description: 'My first module',
  contexts: [{
    context: 'root',
    commands: [{
      name: 'say hi',
      action: () => {
        alert('hello master')
      }
    }]
  }]
}
handsfree.addModules([myModule]);
```
Much more complex modules can be implemented check out the [docs](https://github.com/sljavi/handsfree-for-website-modules) to know how to do it.
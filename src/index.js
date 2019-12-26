import _ from 'lodash';
import $ from 'jquery';
import WebSpeechRecognizer from 'web-speech-recognizer';
import HandsfreeForWebsiteModules from 'handsfree-for-website-modules';
import HandsfreeCore from 'handsfree-core';

let handsfreeCore;

const languages = {
  en: 'en-US',
  es: 'es-AR',
  pt: 'pt-BR',
  zh: 'zh-HK',
};

function getSelectedLang() {
  let lang = navigator.languages[0] || navigator.language || languages.en;
  if (languages[lang]) {
    return lang;
  }
  lang = languages[lang.split('-')[0]];
  return lang || languages.en;
}

let speechRecognition;
let settings = {
  continuesRecognition: true,
  lang: getSelectedLang(),
  turnedOn: true,
  modules: HandsfreeForWebsiteModules,
};

function initWebSpeechRecognizer(settings) {
  speechRecognition = WebSpeechRecognizer.init({
    continuesRecognition: settings.continuesRecognition,
    lang: settings.lang,
    onUserSpeech: handsfreeCore.updateUserSpeechState,
    onUserSpeak: handsfreeCore.updateUserSpeakState,
  });
}

const listenForDocumentEvents = _.once(() => {
  $(document).keydown((event) => {
    if (settings.turnedOn && event.keyCode === 17) {
      speechRecognition.start();
    }
  });
});

function turnOn() {
  settings.turnedOn = true;
  if (settings.continuesRecognition) {
    speechRecognition.start();
  }
  handsfreeCore.turnOn();
}

function safeTurnOn() {
  if (!settings.turnedOn) {
    turnOn();
  }
}

function turnOff() {
  settings.turnedOn = false;
  speechRecognition.stop();
  handsfreeCore.turnOff();
}

function safeTurnOff() {
  if (settings.turnedOn) {
    turnOff();
  }
}

function turnOnContinuesRecognition() {
  settings.continuesRecognition = true;
  speechRecognition.stop();
  setTimeout(() => {
    initWebSpeechRecognizer(settings);
    if (settings.turnedOn) {
      speechRecognition.start();
    }
  }, 500);
}

function turnOffContinuesRecognition() {
  settings.continuesRecognition = false;
  speechRecognition.stop();
  setTimeout(() => {
    initWebSpeechRecognizer(settings);
  }, 500);
}

function addModules(modules) {
  const moduleList = [
    ...settings.modules,
    ...modules,
  ];
  setModules(moduleList);
}

function changeLanguage(lang) {
  const turnedOn = settings.turnedOn;
  speechRecognition.stop();
  setTimeout(() => {
    handsfreeCore.changeLanguage(lang);
    settings.lang = lang;
    initWebSpeechRecognizer(settings);
    if (turnedOn && settings.continuesRecognition) {
      speechRecognition.start();
    }
  }, 500);
}

function getLanguage() {
  return settings.lang;
}

function getModules() {
  return settings.modules;
}

function setModules(moduleList) {
  settings.modules = moduleList;
  handsfreeCore.addModules(moduleList);
}

export function init(userSettings = {}) {
  settings = {
    ...settings,
    ...userSettings,
  };
  handsfreeCore = HandsfreeCore.init(settings);
  handsfreeCore.turnOn();
  initWebSpeechRecognizer(settings);
  if (settings.turnedOn && settings.continuesRecognition) {
    speechRecognition.start();
  }
  listenForDocumentEvents();
  return {
    turnOn: safeTurnOn,
    turnOff: safeTurnOff,
    turnOnContinuesRecognition,
    turnOffContinuesRecognition,
    getModules,
    addModules,
    setModules,
    changeLanguage,
    getLanguage,
  };
}

export default {
  init,
};

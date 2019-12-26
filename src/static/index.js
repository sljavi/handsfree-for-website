const handsfree = window.handsfreeForWebsite.init();
const $ = window.jQuery;

let lang = handsfree.getLanguage().split('-')[0];

function setDefaultLanguage() {
  $(`#lang-${lang.split('-')[0]}`).attr('checked', 'checked');
}

function listenForControlChanges() {
  $('.speech-recognition input').on('change', (ev) => {
    if (ev.target.checked) {
      handsfree.turnOn();
    } else {
      handsfree.turnOff();
    }
  });
  $('.speech-recognition-mode input').on('change', (ev) => {
    if (ev.target.checked) {
      handsfree.turnOnContinuesRecognition();
    } else {
      handsfree.turnOffContinuesRecognition();
    }
  });
}

function getTranslation(key = '', scope) {
  if (key.indexOf('i18n-') === 0) {
    const updatedKey = key.replace('i18n-', '');
    const translations = (scope && scope.i18n && scope.i18n[lang]) || {};
    return translations[updatedKey] || key;
  }
  return key;
}

function getSortedModules() {
  const modules = handsfree.getModules();
  return modules
    .sort((moduleA, moduleB) => {
      const nameA = getTranslation(moduleA.name, moduleA);
      const nameB = getTranslation(moduleB.name, moduleB);
      if (nameA > nameB) {
        return 1;
      }
      if (nameA < nameB) {
        return -1;
      }
      return 0;
    });
}

function getContextCommands(context) {
  if (context.commands) {
    const rows = context.commands.map((command) => {
      return `
        <tr>
          <td>${getTranslation(command.name, context)}</td>
          <td>${getTranslation(command.group, context)}</td>
          <td>${getTranslation(command.help, context)}</td>
        </tr>
      `;
    });
    return `
      <table class="bordered striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Group</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          ${rows.join('')}
        </tbody>
      </table>
    `;
  }
  return '';
}

function getContextTest(context) {
  if (context.htmlExample) {
    return `
      <blockquote>
        <h3>Test voice commands</h3>
        ${getTranslation(context.htmlExample, context)}
      </blockquote>
    `;
  }
  return '';
}

function getModuleContext(context) {
  const name = getTranslation(context.name || context.context, context);
  return `
    <h3>${name} <span class='context-id'>${context.context}</span></h3>
    ${getContextCommands(context)}
    ${getContextTest(context)}
  `;
}

function generateModules() {
  $('ul.modules li').remove();
  getSortedModules()
    .forEach((module) => {
      const name = getTranslation(module.name, module);
      const contexts = (module.contexts || []).map(getModuleContext);
      const moduleEl = `
        <li>
          <div class="collapsible-header" role="button"><i class="${module.icon}"></i>${name}</div>
          <div class="collapsible-body">
            <p>${getTranslation(module.description, module)}</p>
            ${contexts.join('')}
          </div>
        </li>
      `;
      $('ul.modules').append($(moduleEl));
    });
}

window.changeLanguage = (updatedLang) => {
  lang = updatedLang;
  handsfree.changeLanguage(updatedLang);
  generateModules();
};

setDefaultLanguage();
listenForControlChanges();
generateModules();

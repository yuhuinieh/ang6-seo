import {APP_BASE_HREF} from '@angular/common';
import {CompilerOptions, LOCALE_ID, TRANSLATIONS, TRANSLATIONS_FORMAT} from '@angular/core';
import { resolve } from 'q';
import { Routes, RouterModule } from '@angular/router';


export function getTranslationProviders(): any{
  // let locale = getLang();
  let locale = 'en-US';
  const noProviders: Object[] = [];
//   const PROVIDERS = [{provide: LOCALE_ID, useValue: locale}];

  // if (locale) {
  //   document.querySelector('base').href = `/${locale}`;
  // }

  if (!locale || locale === 'en-US') {
    return Promise.resolve(noProviders);
    // locale === 'en-US';
  }

  return getTranslateWithImports(locale).then((translations: string) => [
              {provide: TRANSLATIONS, useValue: translations},
              {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'},
              // {provide: APP_BASE_HREF, useValue: `/${locale}`},
              {provide: LOCALE_ID, useValue: locale}
        ]).catch(() => noProviders);  // ignore if file not found
}

/**
 * Returns the current lang for the application
 * using the existing base path
 * or the browser lang if there is no base path
 * @returns {string}
 */
function getLang(): string|null {
  if (typeof window === 'undefined' ||
      typeof window.navigator === 'undefined') {
    return null;
  }

  const DEFAULT_LANG = 'en-US';

  const LANGUAGE_MAPPING = {
    'en-US': 'en-US',
    'zh-TW': 'zh-TW',
  };

  const basePath = window.location.pathname.replace('/', '').split('/');
  // console.log(window.location.pathname);
  let lang: string = basePath.length ? basePath[0] : '';

  // deal with auto redirect
  if (!lang) {
    lang = window.navigator['languages'] ? window.navigator['languages'][0] : null;
    lang = lang || window.navigator.language
                || window.navigator['browserLanguage']
                || window.navigator['userLanguage'];

    // do mapping language. TODO
    lang = LANGUAGE_MAPPING[lang] || 'en-PH';
    location.href = '/' + lang + window.location.pathname;

  } else if(LANGUAGE_MAPPING[lang] === undefined) {

    location.href = '/' + DEFAULT_LANG + '/' + basePath[1];

  }

  return lang;
}

// function getTranslationsWithSystemJs(locale: string) {
//   return System.import(
//       `raw-loader!./locale/messages.${locale}.xlf`);  // relies on text plugin
// }

function getTranslateWithImports(locale: string){
  const translationFile = `/src/locale/messages.${locale}.xlf`;
  const util = new Utility();
  return util.getFile(translationFile);
}

export class Utility {
  public getFile(filePath: string): Promise<string> {
    const promise = new Promise<string>((resolve, reject) => {
      // call ajax to get i18n file
      const xhr = new XMLHttpRequest();
      xhr.open('GET', filePath + '?v=' + Math.random(), true);
      xhr.setRequestHeader('Content-Type','application/json');
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 && xhr.status === 200) {
          resolve(xhr.responseText);
        }else {
          if(xhr.readyState === 4) {
            resolve();
          }
        }
      };
      xhr.send();
    })
    return promise;
  }
}

import { Component } from '@angular/core';
import { EventBus, Registry } from '../../../util/event-bus';
import { ILanguageOperation, LANGUAGE_OPERATION, LANGUAGE_OPERATION_RESULT } from '../../../util/constants';

@Component({
  selector: 'editor-language-tab',
  templateUrl: './language-tab.component.html',
  styleUrl: './language-tab.component.scss',
})
export class LanguageTabComponent {
  // uploadListener!: Registry;

  ngOnInit() {
    console.log('EditorToolbarComponent initialized');
    // this.uploadListener = EventBus.getInstance().register('RequestLanguagesResponse', (data: any) => {
    //   console.log('response event received: ', data);
    // });
  }
  ngOnDestroy() {
    console.log('EditorToolbarComponent destroyed');
    // if (this.uploadListener) {
    //   this.uploadListener.unregister();
    // }
  }
  requestLanguages() {
    EventBus.getInstance().dispatch('RequestLanguages', {});
  }
  addLanguage(language: string) {
    if (!language) {
      return;
    }

    const eventBus = EventBus.getInstance();

    const requestLanguagesListener = eventBus.register(LANGUAGE_OPERATION_RESULT, (op: ILanguageOperation) => {
      if (op.type === 'REQUEST_LANGUAGES') {
        let data = op.data;
        if (Array.isArray(data)) {
          if (data.includes(language)) {
            console.log('Language already exists:', language);
          } else {
            console.log('Language to Add:', language);
            eventBus.dispatch(LANGUAGE_OPERATION, { type: 'REQUEST_LANGUAGES', data: {} });
          }
        } else {
          console.log('wtf no languages');
        }

        // Process the response data here
      }

      requestLanguagesListener.unregister();
    });

    eventBus.dispatch(LANGUAGE_OPERATION, { type: 'REQUEST_LANGUAGES', data: {} });
  }
}

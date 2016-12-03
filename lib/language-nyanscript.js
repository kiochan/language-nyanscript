'use babel';

import LanguageNyanscriptView from './language-nyanscript-view';
import { CompositeDisposable } from 'atom';

export default {

  languageNyanscriptView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.languageNyanscriptView = new LanguageNyanscriptView(state.languageNyanscriptViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.languageNyanscriptView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-nyanscript:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.languageNyanscriptView.destroy();
  },

  serialize() {
    return {
      languageNyanscriptViewState: this.languageNyanscriptView.serialize()
    };
  },

  toggle() {
    console.log('LanguageNyanscript was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};

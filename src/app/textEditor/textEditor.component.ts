import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'text-editor',
  templateUrl: './textEditor.component.html',
  styleUrls: ['./textEditor.component.scss']
})
export class TextEditor implements OnInit {

  inputText: string = '';

  cardText: string = '';

  cardTextArray: Array<string> = [];

  ngOnInit() { }

  appendClickHandler() {
    if (this.inputText) {
      this.cardTextArray.push(this.inputText);

      this.setCardText();

      this.inputText = null;
    }
  }

  undoClickHandler() {
    if (this.cardTextArray?.length) {
      this.cardTextArray.pop();

      this.setCardText();
    }
  }

  setCardText() {
    this.cardText = this.cardTextArray.join(' ');
  }
}
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TextEditor} from './textEditor.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
let Bluebird = require('bluebird');
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('TextEditor', () => {
  let component: TextEditor;
  let fixture: ComponentFixture<TextEditor>;
  let compiled;
  let appInput;
  let appOutput;
  let appendButton;
  let undoButton;

  const pushValue = async (value) => {
    appInput.value = value;
    appInput.dispatchEvent(new Event('change'));
    appInput.dispatchEvent(new Event('input'));
    appendButton.click();
    await fixture.whenStable();
    await fixture.detectChanges();
  };

  const getByTestId = (testId: string) => {
    return compiled.querySelector(`[data-test-id="${testId}"]`);
  };


  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          RouterTestingModule,
          FormsModule
        ],
        declarations: [TextEditor],
        schemas : [CUSTOM_ELEMENTS_SCHEMA]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextEditor);
    fixture.autoDetectChanges(true);
    compiled = fixture.debugElement.nativeElement;
    component = fixture.componentInstance;
    appInput = getByTestId('app-input');
    appendButton = getByTestId('append-button');
    undoButton = getByTestId('undo-button');
    fixture.detectChanges();
  });

  it('Clicking on append should add the text to the output', async (done) => {
    const words = ["foo", "Bar", "bAz"];
    const expectedOutput = ['foo', 'foo Bar', 'foo Bar bAz']
    Bluebird.each(words, async (word, index) => {
      await pushValue(word);
      appOutput = getByTestId('output-field');
      expect(appOutput.innerHTML).toEqual(expectedOutput[index]);
    }).then(() => {
      done();
    });
  });

  it('After appending data, input field should have no text', async (done) => {
    const words = ["foo", "Bar", "bAz"];
    const expectedOutput = ['foo', 'foo Bar', 'foo Bar bAz']
    Bluebird.each(words, async (word, index) => {
      await pushValue(word);
      appOutput = getByTestId('output-field');
      expect(appOutput.innerHTML).toEqual(expectedOutput[index]);
      expect(appInput.value).toBeFalsy();
    }).then(() => {
      done();
    });
  });

  it('Nothing should happen when input is empty and append is clicked', async (done) => {
    const words = ["foo", '', '', "Bar", '', '', "bAz"];
    const expectedOutput = ['foo', 'foo', 'foo', 'foo Bar', 'foo Bar', 'foo Bar', 'foo Bar bAz']
    Bluebird.each(words, async (word, index) => {
      await pushValue(word);
      appOutput = getByTestId('output-field');
      expect(appOutput.innerHTML).toEqual(expectedOutput[index]);
      expect(appInput.value).toBeFalsy();
    }).then(() => {
      done();
    });
  });

  it('Undo works', async (done) => {
    const words = ["foo", "Bar", "bAz"];
    Bluebird.each(words, async (word) => {
      await pushValue(word);
    }).then(async () => {
      undoButton.click();
      await fixture.detectChanges();
      appOutput = getByTestId('output-field');
      expect(appOutput.innerHTML).toEqual('foo Bar');
      done();
    })
  });

  it('Multiple click on undo works till output becomes empty', async (done) => {
    const words = ["foo", "Bar", "bAz"];
    Bluebird.each(words, async (word) => {
      await pushValue(word);
    }).then(async () => {
      undoButton.click();
      await fixture.detectChanges();
      appOutput = getByTestId('output-field');
      expect(appOutput.innerHTML).toEqual('foo Bar');
      undoButton.click();
      await fixture.detectChanges();
      appOutput = getByTestId('output-field');
      expect(appOutput.innerHTML).toEqual('foo');
      undoButton.click();
      await fixture.detectChanges();
      appOutput = getByTestId('output-field');
      expect(appOutput.innerHTML).toBeFalsy();
      undoButton.click();
      await fixture.detectChanges();
      appOutput = getByTestId('output-field');
      expect(appOutput.innerHTML).toBeFalsy();
      done();
    })
  });

  it('Appending after undo appends correctly', async (done) => {
    const words = ["foo", "Bar", "bAz"];
    Bluebird.each(words, async (word) => {
      await pushValue(word);
    }).then(async () => {
      undoButton.click();
      await fixture.detectChanges();
      undoButton.click();
      await fixture.detectChanges();
      appOutput = getByTestId('output-field');
      expect(appOutput.innerHTML).toEqual('foo');
      await pushValue('John');
      appOutput = getByTestId('output-field');
      expect(appOutput.innerHTML).toEqual('foo John');
      done();
    })
  });
});

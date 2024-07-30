# Text Editor

## Environment 

- Angular CLI Version: 10.0.4
- Angular Core Version: 10.0.4
- Node Version: 12.18.3
- Default Port: 8000

## Application Demo:

![](https://hrcdn.net/s3_pub/istreet-assets/zNPvzgZioRrQu_b5wo_kXA/text-editor.gif)

## Functionality Requirements

- The input should initially be empty. The user can type any text into this input field to append to the output text.

- Clicking on the 'Append' button should extract the text typed in the input field and append it to the output text at the end, joined by a single space character.

- If the input is empty, clicking on 'Append' should do nothing.

- After every append operation, the input should become empty again.

- Clicking on the 'Undo' button should undo the last append operation (i.e., remove the last added text from the output, along with the space character preceding the text). Multiple undo operations are possible until the output becomes empty. When the output is empty, clicking on the 'Undo' button should do nothing.

## Testing Requirements

- Input should have the data-test-id attribute 'app-input'.
- Output should have the data-test-id attribute 'output-field'.
- Append button should have the data-test-id attribute 'append-button'.
- Undo button should have the data-test-id attribute 'undo-button'.

## Project Specifications

**Read Only Files**
- src/app/textEditor/textEditor.component.spec.ts
- src/app/app.component.spec.ts
- src/app/app.component.ts
- src/app/app.module.ts

**Commands**
- run: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm start
```
- install: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm install
```
- test: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm test
```

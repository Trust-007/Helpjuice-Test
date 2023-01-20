const textContainer = document.getElementById('text-container');

// logic to know when to delete block
export const detectChange = (e) => {
  const child = e.target.parentElement;
  if (e.target.innerHTML === '' && e.key === 'Backspace') {
    if (child.parentElement.childElementCount === 1) {
      child.parentElement.firstChild.focus();
    }
    if (child === child.parentElement.firstChild) {
      child.nextSibling.firstChild.focus();
      child.remove();
    } else {
      child.previousSibling.firstChild.focus();
      child.remove();
    }
  } else {
    e.target.nextSibling.style.display = 'none';
  }
};

// logic to show options modal
export const showOptions = (e) => {
  const element = e.target.nextSibling;
  if (e.target.innerHTML.includes('/1')) {
    element.style.display = 'block';
    element.childNodes[3].focus();
  }
};

// onclick heading logic
export const makeHeadingOne = (e) => {
  const element = e.target.parentElement.parentElement;
  if (element.parentElement.previousSibling.innerHTML.indexOf('/1') === 0) {
    element.parentElement.previousSibling.innerHTML = '';
  } else {
    const index = element.parentElement.previousSibling.innerHTML.indexOf('/1');
    const newString = element.parentElement.previousSibling.innerHTML.slice(
      0,
      index,
    );
    element.parentElement.previousSibling.innerHTML = newString;
  }
  if (
    e.target.focus
    && element.parentElement.previousSibling.getAttribute('placeholder')
      === "Type '/' + '1' for heading"
  ) {
    element.childNodes[1].firstChild.innerHTML = 'Text';
    element.parentElement.previousSibling.focus();
    element.parentElement.previousSibling.setAttribute(
      'placeholder',
      'Heading 1',
    );
    element.parentElement.style.display = 'none';
    element.parentElement.previousSibling.style.fontWeight = '800';
    element.parentElement.previousSibling.style.fontSize = '24px';
  } else if (
    e.target.focus
    && element.parentElement.previousSibling.getAttribute('placeholder')
      === 'Heading 1'
  ) {
    element.childNodes[1].firstChild.innerHTML = 'Heading 1';
    element.parentElement.previousSibling.focus();
    element.parentElement.previousSibling.style.fontSize = '17px';
    element.parentElement.previousSibling.style.fontWeight = '400';
    element.parentElement.previousSibling.setAttribute(
      'placeholder',
      "Type '/' + '1' for heading",
    );
    element.parentElement.style.display = 'none';
  }
};

// onkeydown heading logic
export const makeHeading = (e) => {
  const element = e.target.parentElement;
  if (element.previousSibling.innerHTML.indexOf('/1') === 0) {
    element.previousSibling.innerHTML = '';
  } else {
    const index = element.previousSibling.innerHTML.indexOf('/1');
    const newString = element.previousSibling.innerHTML.slice(0, index);
    element.previousSibling.innerHTML = newString;
  }
  if (
    e.target.focus
    && element.parentElement.firstChild.getAttribute('placeholder')
      === "Type '/' + '1' for heading"
  ) {
    element.childNodes[3].childNodes[1].firstChild.innerHTML = 'Text';
    element.previousSibling.focus();
    element.previousSibling.setAttribute('placeholder', 'Heading 1');
    element.style.display = 'none';
    element.previousSibling.style.fontSize = '24px';
    element.previousSibling.style.fontWeight = '800';
  } else if (
    e.target.focus
    && element.parentElement.firstChild.getAttribute('placeholder') === 'Heading 1'
  ) {
    element.childNodes[3].childNodes[1].firstChild.innerHTML = 'Heading 1';
    element.previousSibling.focus();
    element.previousSibling.style.fontSize = '17px';
    element.previousSibling.style.fontWeight = '400';
    element.previousSibling.setAttribute(
      'placeholder',
      "Type '/' + '1' for heading",
    );
    element.style.display = 'none';
  }
};

// logic for creating text blocks
export const createBlock = () => {
  const blockContainer = document.createElement('div');
  const id = new Date();
  blockContainer.id = id;
  blockContainer.className = 'container';
  const newBlock = document.createElement('div');
  newBlock.className = 'block';
  newBlock.contentEditable = true;
  newBlock.setAttribute('placeholder', "Type '/' + '1' for heading");
  newBlock.spellcheck = true;
  window.setTimeout(() => newBlock.focus(), 0);
  newBlock.onkeydown = detectChange;
  newBlock.onkeyup = showOptions;
  blockContainer.appendChild(newBlock);

  const options = document.createElement('div');
  options.style.display = 'none';
  options.className = 'options';
  const heading4 = document.createElement('h4');
  heading4.innerHTML = 'Add blocks';
  options.appendChild(heading4);
  const directions = document.createElement('p');
  directions.innerHTML = 'Keep typing to filter, or escape to exit';
  options.appendChild(directions);
  const heading5 = document.createElement('h5');
  heading5.innerHTML = 'Filtering keyword <span>1</span>';
  options.appendChild(heading5);

  const list = document.createElement('button');
  const logo = document.createElement('img');
  logo.src = 'https://cdn-icons-png.flaticon.com/128/0/99.png';
  logo.className = 'logo';
  list.appendChild(logo);

  const mainOption = document.createElement('div');
  mainOption.className = 'main-option';
  const heading6 = document.createElement('h6');
  heading6.innerHTML = 'Heading 1';
  mainOption.appendChild(heading6);
  const shortcut = document.createElement('p');
  shortcut.innerHTML = 'Shortcut: type # + space';
  mainOption.appendChild(shortcut);
  list.appendChild(mainOption);
  list.onclick = makeHeadingOne;
  list.onkeydown = makeHeading;
  options.appendChild(list);
  blockContainer.appendChild(options);

  textContainer.appendChild(blockContainer);
};

// initialize with empty text block
window.addEventListener('load', () => {
  createBlock();
});

// function to handle keydown event
textContainer.onkeydown = (event) => {
  if (event.key === 'Enter' && event.target.tagName === 'BUTTON') {
    event.preventDefault();
    event.target.parentElement.style.display = 'none';
    event.target.parentElement.previousSibling.focus();
  } else if (event.key === 'Enter' && event.target.tagName === 'DIV') {
    event.preventDefault();
    createBlock();
  }
};

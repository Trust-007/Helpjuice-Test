//import { createBlock } from "../index.js"

test("Check if div block is empty", () => {
  document.body.innerHTML = `
    <div id='text-container'>
      <div id='text-block'></div>
    </div>
  `;
  const container = document.getElementById("text-container");
  const block = document.getElementById("text-block");
  block.click();
  expect(container.childElementCount).toEqual(2);
});

// Node modules for loading frontent code into jest environment
const fs = require("fs");
const path = require("path");

describe("addColor unit test", () => {
  let sendMock;

  beforeAll(() => {
    // Load frontend script
    // Simulate browser behavior
    const codePath = path.join(__dirname, "../../public/js/code.js");
    const code = fs.readFileSync(codePath, "utf8");
    window.eval(code);
  });

  beforeEach(() => {
    document.body.innerHTML = `
      <input id="colorText" value="blue" />
      <div id="colorAddResult"></div>
    `;

    // Mock XMLHttpRequest
    sendMock = jest.fn(function () {
      this.readyState = 4;
      this.status = 200;
      this.onreadystatechange();
    });

    // Replace browser's XMLHttpRequest with mock version
    window.XMLHttpRequest = jest.fn(() => ({
      open: jest.fn(),
      setRequestHeader: jest.fn(),
      send: sendMock,
      onreadystatechange: jest.fn()
    }));
  });

  test("displays confirmation message and sends correct payload when color is added", () => {
    // Call function to test
    window.addColor();

    // Verify UI update
    const result = document.getElementById("colorAddResult").innerHTML;
    expect(result).toBe("Color has been added");

    // Verify correct request payload
    expect(sendMock).toHaveBeenCalledWith(
      JSON.stringify({ color: "blue", userId: 0 })
    );
  });
});
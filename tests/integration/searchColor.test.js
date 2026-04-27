// Node modules for loading frontent code into jest environment
const fs = require("fs");
const path = require("path");

describe("searchColor integration test", () => {
  let sendMock;

  beforeAll(() => {
    // Load frontend script
    // Simulate browser behavior
    const codePath = path.join(__dirname, "../../public/js/code.js");
    const code = fs.readFileSync(codePath, "utf8");
    window.eval(code);
  });

  beforeEach(() => {
    // Simulate DOM elements needed for searchColor() function
    document.body.innerHTML = `
      <input id="searchText" value="blue" />
      <div id="colorSearchResult"></div>
      <p></p>
    `;

    // Mock XMLHttpRequest to simulate API response for search
    sendMock = jest.fn(function () {
      this.readyState = 4;
      this.status = 200;
      this.responseText = JSON.stringify({
        results: ["blue", "lightblue"]
      });
      this.onreadystatechange();
    });

    // Replace browser's XMLHttpRequest with mock version
    window.XMLHttpRequest = jest.fn(() => ({
      open: jest.fn(),
      setRequestHeader: jest.fn(),
      send: sendMock,
      onreadystatechange: jest.fn(),
      responseText: ""
    }));
  });

  test("displays color results returned from search API", () => {
    // Call function to test
    window.searchColor();

    // Verify confirmation message displays
    expect(document.getElementById("colorSearchResult").innerHTML)
      .toBe("Color(s) has been retrieved");

    // Verify colors are formatted and displayed correctly
    expect(document.getElementsByTagName("p")[0].innerHTML)
      .toBe("blue<br>\nlightblue");

    // Verify correct request payload
    expect(sendMock).toHaveBeenCalledWith(
      JSON.stringify({ search: "blue", userId: 0 })
    );
  });
});
const { notFoundError } = require("./error");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Given a notFoundError function", () => {
  describe("When it gets a request", () => {
    test("Then it should respond with a message Endpoint not found... and a status 404", () => {
      const res = mockResponse();

      const expectedError = { error: "Endpoint not found..." };
      const req = {};

      notFoundError(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(expectedError);
    });
  });
});

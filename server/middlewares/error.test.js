const { ValidationError } = require("express-validation");
const { notFoundError, generalError } = require("./error");

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

describe("Given a generalError function", () => {
  describe("When it gets a request and an error but no error code", () => {
    test("Then it should respond with a message 'All broken' and a status code of 500", () => {
      const error = { error: "All broken" };
      const res = mockResponse();
      const req = {};
      const next = () => {};

      generalError(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(error);
    });
  });
  describe("When it gets a request and a ValidationError", () => {
    test("Then it should respond with a message 'Sorry, bad request' and a status code of 400", () => {
      const res = mockResponse();

      const error = new ValidationError("details", {
        error: new Error(),
        statusCode: 400,
      });

      const req = {};
      const next = () => {};

      generalError(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Sorry, bad request" });
    });
  });
});

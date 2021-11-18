const { getTuits, createTuit, deleteTuit } = require("./tuitsController");
const Tuit = require("../../database/models/tuit");

jest.mock("../../database/models/tuit");
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Given the getTuis function ", () => {
  describe("When its called", () => {
    test("Then it should summon the res.json with all the tuits", async () => {
      const tuits = [];
      const req = {
        body: {
          tuits,
        },
      };
      Tuit.find = jest.fn().mockResolvedValue(tuits);
      const res = {
        json: jest.fn().mockResolvedValue(),
      };

      await getTuits(req, res);

      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("When its called wrong", () => {
    test("Then it should summon with and error and code 400 ", async () => {
      const req = {
        body: {},
      };
      Tuit.find = jest.fn().mockResolvedValue(null);
      const next = jest.fn();
      const expectedError = new Error("Can't find the tuits");
      expectedError.code = 400;

      await getTuits(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        "Can't find the tuits"
      );
      expect(next.mock.calls[0][0]).toHaveProperty("code", 400);
    });
  });
});

describe("Given the createTuit function", () => {
  describe("When it receives a resolve", () => {
    test("Then it should create the new tuit", async () => {
      const req = {
        id: 2,
        text: "illo",
      };
      const result = {
        id: 2,
        text: "illo",
      };

      const res = mockResponse();

      Tuit.create = jest.fn().mockResolvedValue(result);
      await createTuit(req, res, () => {});

      expect(res.json).toHaveBeenCalledWith(result);
    });
  });

  describe("When it receives a rejected promise", () => {
    test("Then it should summon the method next with a error", async () => {
      const req = {
        id: "1",
        text: "jajaja",
      };

      Tuit.create = jest.fn().mockRejectedValue({});
      const next = jest.fn();

      const res = mockResponse();
      await createTuit(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a deleteTuit function", () => {
  describe("When it receives a request with an id 1, a response and a next function", () => {
    test("Then it should call the Robot.findByIdAndDelete with a 1", async () => {
      const idTuit = 1;
      const req = {
        params: {
          idTuit,
        },
      };
      const res = {
        json: () => {},
      };
      const next = () => {};
      Tuit.findByIdAndDelete = jest.fn().mockResolvedValue({});

      await deleteTuit(req, res, next);
      expect(Tuit.findByIdAndDelete).toHaveBeenCalledWith(idTuit);
    });
  });

  describe("When Tuit.findByIdAndDelete returns undefined", () => {
    test("Then it should call next with an error", async () => {
      const error = new Error("Tuit not found");
      Tuit.findByIdAndDelete = jest.fn().mockResolvedValue(null);
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {};
      const next = jest.fn();

      await deleteTuit(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When Tuit.findByIdAndDelete rejects", () => {
    test("Then it should call next with an error with 400", async () => {
      const error = {};
      Tuit.findByIdAndDelete = jest.fn().mockRejectedValue(error);
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {};
      const next = jest.fn();

      await deleteTuit(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(error).toHaveProperty("code");
      expect(error.code).toBe(400);
    });
  });
});

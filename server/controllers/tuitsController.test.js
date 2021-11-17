const { getTuits } = require("./tuitsController");
const Tuit = require("../../database/models/tuit");

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

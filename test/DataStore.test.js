const { DataStore } = require("../src/index.js");

/**
 * @type {DataStore}
 */
let apples;
const ids = {};

test("can create and list items", async () => {
  apples = new DataStore("apples");
  ids.a = await apples.create({ variety: "Akane", weight: 101 });
  ids.b = await apples.create({ variety: "Braeburn", weight: 102 });
  ids.c = await apples.create({ variety: "Cox", weight: 103 });

  expect(apples.list()).toEqual([
    { id: ids.a, variety: "Akane", weight: 101 },
    { id: ids.b, variety: "Braeburn", weight: 102 },
    { id: ids.c, variety: "Cox", weight: 103 },
  ]);
});

test("creations are persisted", async () => {
  await apples.load();
  expect(apples.list()).toEqual([
    { id: ids.a, variety: "Akane", weight: 101 },
    { id: ids.b, variety: "Braeburn", weight: 102 },
    { id: ids.c, variety: "Cox", weight: 103 },
  ]);
});

test("can get an item by its id", async () => {
  expect(await apples.get(ids.c)).toEqual({
    id: ids.c,
    variety: "Cox",
    weight: 103,
  });
});

test("can update an item", async () => {
  await apples.update({ id: ids.b, variety: "Barry", weight: 112 });
  expect(await apples.get(ids.b)).toEqual({
    id: ids.b,
    variety: "Barry",
    weight: 112,
  });
});

test("updates are persisted", async () => {
  await apples.load();
  expect(await apples.get(ids.b)).toEqual({
    id: ids.b,
    variety: "Barry",
    weight: 112,
  });
});

test("can delete an item", async () => {
  await apples.delete(ids.b);
  expect(await apples.list()).toEqual([
    { id: ids.a, variety: "Akane", weight: 101 },
    { id: ids.c, variety: "Cox", weight: 103 },
  ]);
});

test("deletions are persisted", async () => {
  await apples.load();
  expect(await apples.list()).toEqual([
    { id: ids.a, variety: "Akane", weight: 101 },
    { id: ids.c, variety: "Cox", weight: 103 },
  ]);
});

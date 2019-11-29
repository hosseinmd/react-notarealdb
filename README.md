# Not a Real DB

A "fake" database for reactjs react-native that stores data in local storage, for sample applications.

## Usage

Create a `DataStore` instance specifying by name to store the data. then run load for get old data

```js
const { DataStore } = require("notarealdb");

const apples = new DataStore("apples");
const oranges = new DataStore("oranges");
await apples.load();
await oranges.load();
```

You can then manipulate each collection using the following CRUD operations:

```js
// create a new item; returns a generated id
const id = await apples.create({ variety: "Gala", weight: 133 }); // => 'BJ4E9mQOG'

// list all items in a collection
apples.list(); // => [{id: 'BJ4E9mQOG', variety: 'Gala', weight: 133}]

// get a single item
apples.get("BJ4E9mQOG"); // => {id: 'BJ4E9mQOG', variety: 'Gala', weight: 133}

// update an item
await apples.update({ id: "BJ4E9mQOG", variety: "Braeburn", weight: 133 });

// delete an item
await apples.delete("BJ4E9mQOG");
```

That's it. few operations are asynchronous.

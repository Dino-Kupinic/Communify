/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "8h54njha3yto6fi",
    "created": "2024-01-06 18:48:41.750Z",
    "updated": "2024-01-06 18:48:41.750Z",
    "name": "topics",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "omxzqfsp",
        "name": "text",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 1,
          "max": 25,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "o7oepmrx",
        "name": "color",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 6,
          "max": 6,
          "pattern": ""
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_goJ0JtX` ON `topics` (\n  `text`,\n  `color`\n)"
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("8h54njha3yto6fi");

  return dao.deleteCollection(collection);
})

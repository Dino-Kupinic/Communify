/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "msrvqhmt2s9r0sr",
    "created": "2024-01-06 18:51:01.793Z",
    "updated": "2024-01-06 18:51:01.793Z",
    "name": "topics_rooms",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "8kct5psy",
        "name": "topic_id",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "8h54njha3yto6fi",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "w0ms3c6w",
        "name": "room_id",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "gs0rw3q8778xnnn",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
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
  const collection = dao.findCollectionByNameOrId("msrvqhmt2s9r0sr");

  return dao.deleteCollection(collection);
})

/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("rgj7pzmyu7p9wsg");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "rgj7pzmyu7p9wsg",
    "created": "2024-01-27 20:28:32.994Z",
    "updated": "2024-01-27 20:28:32.994Z",
    "name": "users_duplicate",
    "type": "auth",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "bwicfpmi",
        "name": "age",
        "type": "number",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 18,
          "max": 150,
          "noDecimal": true
        }
      },
      {
        "system": false,
        "id": "nivpb1i4",
        "name": "biography",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": 1000,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "id = @request.auth.id",
    "deleteRule": "id = @request.auth.id",
    "options": {
      "allowEmailAuth": true,
      "allowOAuth2Auth": true,
      "allowUsernameAuth": true,
      "exceptEmailDomains": null,
      "manageRule": null,
      "minPasswordLength": 8,
      "onlyEmailDomains": null,
      "onlyVerified": false,
      "requireEmail": true
    }
  });

  return Dao(db).saveCollection(collection);
})

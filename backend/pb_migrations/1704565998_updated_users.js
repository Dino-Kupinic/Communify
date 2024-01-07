/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // remove
  collection.schema.removeField("fv7zfch2")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9avtacpa",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fv7zfch2",
    "name": "member_since",
    "type": "date",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "2024-01-06 12:00:00.000Z",
      "max": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9avtacpa",
    "name": "user_age",
    "type": "number",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 18,
      "max": 150,
      "noDecimal": true
    }
  }))

  return dao.saveCollection(collection)
})

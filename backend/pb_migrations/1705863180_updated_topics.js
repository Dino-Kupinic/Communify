/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8h54njha3yto6fi")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "o7oepmrx",
    "name": "color",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 3,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8h54njha3yto6fi")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "o7oepmrx",
    "name": "color",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 7,
      "max": 7,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})

/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gs0rw3q8778xnnn")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cx2iuqwn",
    "name": "topic_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "8h54njha3yto6fi",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 7,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gs0rw3q8778xnnn")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cx2iuqwn",
    "name": "topic_id",
    "type": "relation",
    "required": false,
    "presentable": true,
    "unique": false,
    "options": {
      "collectionId": "8h54njha3yto6fi",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 7,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})

/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("msrvqhmt2s9r0sr")

  // update
  collection.schema.addField(new SchemaField({
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
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("msrvqhmt2s9r0sr")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})

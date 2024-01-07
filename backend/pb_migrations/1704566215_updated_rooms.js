/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gs0rw3q8778xnnn")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "t1qh0ude",
    "name": "creator_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gs0rw3q8778xnnn")

  // remove
  collection.schema.removeField("t1qh0ude")

  return dao.saveCollection(collection)
})

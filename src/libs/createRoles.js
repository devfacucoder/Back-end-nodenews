import roleModel from '../models/roles.model.js'

export const createRoles = async () => {
  try {
    const coutsRoles = await roleModel.estimatedDocumentCount()

    if(coutsRoles > 0) return;
    const values = await Promise.all([
      new roleModel({name:"user"}).save(),
      new roleModel({name:"admin"}).save(),
      new roleModel({name:"moderator"}).save(),
      new roleModel({name:"journalist"}).save()
    ])
    console.log(values)
  } catch (error) {
    console.log(error)
  }
}
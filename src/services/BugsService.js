import { dbContext } from "../db/DbContext.js"

class BugsService {


  async createBug(bugData) {
    const createdBug = await dbContext.Bugs.create(bugData)
    await createdBug.populate('creator')
    return createdBug

  }
  async getAllBugs() {
    const bugs = await dbContext.Bugs.find()
    return bugs
  }
  async getBugById(bugId) {
    const bug = (await dbContext.Bugs.findById(bugId)).populate('creator')
    return bug
  }
  async updateBugById(bugId, bugData) {
    const bugToUpdate = await this.getBugById(bugId)
    bugToUpdate.updateOne(bugData)
    bugToUpdate.title = bugData.title ?? bugToUpdate.title
    bugToUpdate.description = bugData.description ?? bugToUpdate.description
    await bugToUpdate.save()
    return bugToUpdate
  }
  async deleteBug(bugId) {
    const bugToDelete = await this.getBugById(bugId)
    await bugToDelete.deleteOne()
    return `${bugToDelete.title} was deleted`
  }
}

export const bugsService = new BugsService()
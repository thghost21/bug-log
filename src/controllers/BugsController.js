import auth0provider, { Auth0Provider } from "@bcwdev/auth0provider";
import { bugsService } from "../services/BugsService.js";
import BaseController from "../utils/BaseController.js";

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBug)
      .get('', this.getAllBugs)
      .get('/:bugId', this.getBugById)
      .put('/:bugId', this.updateBugById)
      .delete('/:bugId', this.deleteBug)
  }

  async createBug(request, response, next) {
    try {
      const bugData = request.body
      const userInfo = request.userInfo
      bugData.creatorId = userInfo.id
      const createdBug = await bugsService.createBug(bugData)
      response.send(createdBug)
    } catch (error) {
      next(error)
    }
  }
  async getAllBugs(request, response, next) {
    try {
      const bugs = await bugsService.getAllBugs()
      response.send(bugs)
    } catch (error) {
      next(error)
    }
  }
  async getBugById(request, response, next) {
    try {
      const bugId = request.params.bugId
      const bug = await bugsService.getBugById(bugId)
      response.send(bug)
    } catch (error) {
      next(error)
    }
  }
  async updateBugById(request, response, next) {
    try {
      const bugId = request.params.bugId
      const bugData = request.body
      const updatedBug = await bugsService.updateBugById(bugId, bugData)
      response.send(updatedBug)

    } catch (error) {
      next(error)
    }
  }
  async deleteBug(request, response, next) {
    try {
      const bugId = request.params.bugId
      const deletedBug = await bugsService.deleteBug(bugId)
      response.send(deletedBug)
    } catch (error) {
      next(error)
    }
  }



}
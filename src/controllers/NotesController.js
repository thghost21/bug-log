import { Auth0Provider } from "@bcwdev/auth0provider";
import { notesService } from "../services/NotesService.js";
import BaseController from "../utils/BaseController.js";

export class NotesController extends BaseController {
  constructor() {
    super(`api/notes`)
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post(``, this.createNote)
  }


  async createNote(request, response, next) {
    try {
      const noteData = request.body
      const userInfo = request.userInfo
      // test
      noteData.creatorId = userInfo.id
      const note = await notesService.createNote(noteData)
      response.send(note)
    } catch (error) {
      next(error)

    }
  }
}
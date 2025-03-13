import { dbContext } from "../db/DbContext.js"

class NotesService {


  async createNote(noteData) {
    const note = await dbContext.Notes.create(noteData)
    return note

  }
}
export const notesService = new NotesService()
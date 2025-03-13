import { dbContext } from "../db/DbContext.js"

class NotesService {
  async deleteNote(noteId) {
    const noteToDelete = await dbContext.Notes.findById(noteId)
    await noteToDelete.deleteOne()
    return `${noteToDelete.body} was deleted`
  }
  async getNotesByBugId(bugId) {
    const notes = await dbContext.Notes.find({ bugId: bugId }).populate('creator')
    return notes
  }


  async createNote(noteData) {
    const note = await dbContext.Notes.create(noteData)
    await note.populate('creator')
    return note

  }
}
export const notesService = new NotesService()
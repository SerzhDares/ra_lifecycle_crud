import { FormProps } from "./Form";

interface NotesProps {
    notes: FormProps[],
    noteDelete: (id?: number) => void
}

export const Notes = ({notes, noteDelete}: NotesProps) => {

  return (
    <div className="notes">
        {notes.map(note => (
            <div className="note" key={note.id}>
                <button className="note_close" onClick={() => noteDelete(note.id)}>✘</button>
                <p className="note_content">{note.content}</p>
            </div>
        ))}
    </div>
  )
}

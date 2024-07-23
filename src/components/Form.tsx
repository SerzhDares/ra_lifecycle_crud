import { useState, useEffect } from "react";
import { Notes } from "./Notes";

const url = "http://localhost:7070/notes";

export interface FormProps {
    id?: number,
    content: string,
}

export const Form = () => {

    const [form, setForm] = useState<FormProps>({content: ''});
    const [notes, setNotes] = useState<FormProps[]>([]);

    const getNotes = async () => {
        const response = await fetch(url);
        const result = await response.json();
        setNotes(result);
        console.log(result);
    }

    useEffect(() => {
        getNotes();
    }, []);

    const dataChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setForm(prevForm => ({
            ...prevForm, [name]: value
        }))
    }

    const dataSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(form.content == "") {
            return;
        }

        const response = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({...form})
        })

        if(response) {
            getNotes();
            setForm({content: ""});
        }
    }

    const deleteNote = async (id?: number) => {

        const response = await fetch(`${url}/${id}`, {
            method: "DELETE"
        });

        if(response) {
            getNotes();
        }
    }

    return (
        <div className="container">
            <div className="notes_header">
                <h1 className="notes_title">Notes</h1>
                <button className="button refresh_button" onClick={getNotes}>Refresh</button>
            </div>
            <Notes notes={notes} noteDelete={deleteNote}/>
            <form className="form" onSubmit={dataSubmit}>
                <textarea name="content" className="textarea" value={form.content} onChange={dataChangeHandler}/>
                <button type="submit" className="button add_button">Add</button>
            </form>
        </div>
    )
}

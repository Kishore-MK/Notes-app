import React, { useState, useEffect } from 'react';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const NotePage = ({ history }) => {
    const { id: noteId } = useParams();
    const [note, setNote] = useState(null);
    let navigate = useNavigate();
    useEffect(() => {
        getNote();
    }, [noteId]);

    const getNote = async () => {
        if (noteId === 'new') return;

        try {
            const response = await fetch(`/api/note/${noteId}/`);
            const data = await response.json();
            setNote(data);
        } catch (error) {
            console.error('Error fetching note:', error);
        }
    };

    const createNote = async () => {
        try {
            await fetch(`/api/note/create/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(note),
            });
        } catch (error) {
            console.error('Error creating note:', error);
        }
    };

    const updateNote = async () => {
        try {
            await fetch(`/api/note/${noteId}/update/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(note),
            });
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    const deleteNote = async () => {
        try {
            await fetch(`/api/note/${noteId}/delete/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            navigate('/');
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    const handleSubmit = () => {
        console.log('NOTE:', note);
        if (noteId !== 'new' && note.body == '') {
            deleteNote();
        } else if (noteId !== 'new') {
            updateNote();
        } else if (noteId === 'new' && note.body !== null) {
            createNote();
        }
        navigate('/');
    };

    const handleChange = (value) => {
        setNote((prevNote) => ({ ...prevNote, body: value }));
        console.log('Handle Change:', note);
    };

    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <ArrowLeft onClick={handleSubmit} />
                </h3>
                {noteId !== 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ) : (
                    <button onClick={handleSubmit}>Done</button>
                )}
            </div>
            <textarea onChange={(e) => handleChange(e.target.value)} value={note?.body}></textarea>
        </div>
    );
};

export default NotePage;

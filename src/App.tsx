import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CreateNote from "./components/Form/CreateNote";
import EditNote from "./components/Form/EditNote";
import { Note, NoteData, RawNote, Tag } from "./types";
import { v4 } from "uuid";
import { useLocalStorage } from "./utils/useLocaleStorage";
import MainPage from "./components/MainPage";
import { useMemo } from "react";
import DetailPage from "./components/DetailPage";
import Layout from "./components/Layout";

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("notes", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("tags", []);

  const noteWithTags = useMemo(
    () =>
      notes.map((note) => ({
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.value)),
      })),
    [notes, tags]
  );

  // yeni note oluştur
  const addNote = ({ tags, ...data }: NoteData) => {
    const newNote = {
      ...data,
      id: v4(),
      tagIds: tags.map((tag) => tag.value),
    };

    // state'e yeni not eklendi
    setNotes((prevNote) => [...prevNote, newNote]);
  };

  // yeni etiket oluştur
  const createTag = (tag: Tag) => {
    setTags((prevTags) => [...prevTags, tag]);
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const updateNote = (id: string, { tags, ...data }: NoteData) => {
    const updated = notes.map((note) => (note.id === id ? {
      ...note,
      ...data,
      tagIds:tags.map((tag) => tag.value)
    } : note));

    setNotes(updated);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainPage availableTags={tags} notes={noteWithTags} />}
        />
        <Route
          path="/new"
          element={
            <CreateNote
              availableTags={tags}
              createTag={createTag}
              onSubmit={addNote}
            />
          }
        />
        <Route path="/:id" element={<Layout notes={noteWithTags} />}>
          <Route index element={<DetailPage deleteNote={deleteNote} />} />
          <Route path="edit" element={<EditNote availableTags={tags} createTag={createTag} onSubmit={updateNote} />} />
        </Route>

        <Route path="*" element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

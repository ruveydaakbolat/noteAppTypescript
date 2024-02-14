import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateNote from "./components/Form/CreateNote";
import EditNote from "./components/Form/EditNote";
import { NoteData, RawNote, Tag } from "./types";
import { v4 } from "uuid";
import { useLocalStorage } from "./utils/useLocaleStorage";
import MainPage from "./components/MainPage";

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("notes", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("tags", []);

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
    setTags((prevTags) => [...prevTags, tag])
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
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
        <Route path="/:id">
          <Route index element={<h1>Detay Sayfası</h1>} />
          <Route path="edit" element={<EditNote />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

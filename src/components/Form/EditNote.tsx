import { useOutletContext } from "react-router-dom";
import NoteForm from "./NoteForm";
import { Note, NoteData, Tag } from "../../types";

type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
  createTag: (tag: Tag) => void;
  availableTags: Tag[];
};

const EditNote = ({ onSubmit, createTag, availableTags }: EditNoteProps) => {
  const data: Note = useOutletContext();
  return (
    <div className="container py-5">
      <h2>Note'u Düzenle</h2>
      <NoteForm
        onSubmit={(updatedNote) => onSubmit(data.id, updatedNote)}
        createTag={createTag}
        availableTags={availableTags}
        title={data.title}
        tags={data.tags}
        markdown={data.markdown}
      />
    </div>
  );
};

export default EditNote;

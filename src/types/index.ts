// note data nın tiplerini miras al ve üzerine id ekle
export type Note = {
    id: string;
} & NoteData;
 
export type NoteData = {
    title: string;
    markdown: string;
    tags: Tag[];
}

export type Tag = {
    label: string;
    value: string;
}

// verileri local de tutarken etiketlerin sadece id'sini tutacağız
export type RawNote = {
    id: string;
} & RawNoteData;
 
export type RawNoteData = {
    title: string;
    markdown: string;
    tagIds: string[]; //note ların id lerini local de saklayacağız
}
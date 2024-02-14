import React, { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select/creatable";
import { Tag } from "../../types";
import { CreateNoteProps } from "./CreateNote";
import { v4 } from "uuid";

const NoteForm = ({ onSubmit, availableTags, createTag }: CreateNoteProps) => {
  const navigate = useNavigate();

  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  // form gönderilir
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // yeni note oluştur
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-5">
      <Stack>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Başlık</Form.Label>
              <Form.Control ref={titleRef} required className="shadow" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Etiketler</Form.Label>
              <ReactSelect
                value={selectedTags}

                // elemanlar silindiğinde state i günceller
                // @ts-ignore
                onChange={(all_tags) => setSelectedTags(all_tags)}

                onCreateOption={(text) => {
                  const newTag: Tag = { label: text, value: v4() };
                  // local'e yeni etiketi kaydet
                  createTag(newTag)
                  // State i güncelle
                  setSelectedTags([...selectedTags, newTag]);
                }}
                isMulti
                className="shadow"
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="markdown" className="my-4">
          <Form.Label>İçerik</Form.Label>
          <Form.Control
            as={"textarea"}
            ref={markdownRef}
            required
            className="shadow"
            style={{ minHeight: "300px", maxHeight: "500px" }}
          />
        </Form.Group>

        <Stack
          direction="horizontal"
          className="justify-content-end mt-5"
          gap={4}
        >
          <Button type="submit">Kaydet</Button>
          <Button
            onClick={() => navigate(-1)}
            type="button"
            variant="secondary"
          >
            Geri
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
};

export default NoteForm;

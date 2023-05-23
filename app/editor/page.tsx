"use client";
import React from "react";
import { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { QuillBinding } from "y-quill";
import { WebrtcProvider } from "y-webrtc";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";
import "./editor.css";

type Props = {};

const CustomToolbar = () => (
  <div id="toolbar" className="flex gap-4 bg-slate-100 rounded-lg">
    <select className="ql-font">
      <option value="arial" selected>
        Arial
      </option>
      <option value="comic-sans">Comic Sans</option>
      <option value="courier-new">Courier New</option>
      <option value="georgia">Georgia</option>
      <option value="helvetica">Helvetica</option>
      <option value="lucida">Lucida</option>
    </select>
    <select className="ql-size">
      <option value="extra-small">Size 1</option>
      <option value="small">Size 2</option>
      <option value="medium" selected>
        Size 3
      </option>
      <option value="large">Size 4</option>
    </select>
    <select className="ql-align" />
    <select className="ql-color" />
    <select className="ql-background" />
    {/* <button className="ql-clean" /> */}
  </div>
);

const Editor = () => {
  //   const navigate = useNavigate();
  //   const { id } = useParams();

  let quillRef: any = null;
  let reactQuillRef: any = null;

  //   console.log(id);

  // useEffect(() => {
  //   if (!id) {
  //     navigate({
  //       pathname: '/editor',
  //       search: '?id=123',
  //     });
  //   }
  // }, []);

  const attachQuillRefs = () => {
    if (typeof reactQuillRef.getEditor !== "function") return;
    quillRef = reactQuillRef.getEditor();
  };

  useEffect(() => {
    attachQuillRefs();

    // Quill.register("modules/cursors", QuillCursors);
    // https://github.com/yjs/yjs/blob/master/README.md

    // if (!id) return;

    const ydoc = new Y.Doc();
    const provider = new WebrtcProvider("1000000", ydoc);
    // const provider = new WebrtcProvider("your-room-name", ydoc, {
    //   signaling: ["wss://y-webrtc-ckynwnzncc.now.sh", "ws://localhost:1234"],
    // });

    // Sync clients with the y-websocket provider
    // new WebsocketProvider("ws://localhost:1234", "1000000", ydoc);

    const ytext = ydoc.getText("quill");

    new QuillBinding(ytext, quillRef, provider.awareness);
    // const binding = new QuillBinding(ytext, quillRef, provider.awareness);
    // console.log(binding);
  }, []);

  // const modulesRef = {
  //   toolbar: [
  //     [{ header: [1, 2, false] }],
  //     ["bold", "italic", "underline", "strike", "blockquote"],
  //     [
  //       { list: "ordered" },
  //       { list: "bullet" },
  //       { indent: "-1" },
  //       { indent: "+1" },
  //     ],
  //     ["link", "image"],
  //     ["clean"],
  //   ],
  // };

  const modules = {
    toolbar: {
      container: "#toolbar",
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
  ];

  return (
    <>
      <div className="h-[15vh] flex flex-col justify-between p-4">
        <h4 className="text-lg">Docs</h4>
        <CustomToolbar />
      </div>
      <div className="bg-slate-100 flex p-6 gap-6 justify-center">
        <ReactQuill
          ref={(el: any) => {
            reactQuillRef = el;
          }}
          // value={html}
          // onChange={handleChange}
          modules={modules}
          formats={formats}
          style={{
            minHeight: "calc(85vh - 48px)",
            width: "50%",
            background: "#fff",
            border: "0px !important",
            borderRadius: "6px",
          }}
        />
        <div className="flex flex-col gap-6 w-[20%]">
          <div className="h-[50%] w-[100%] bg-white rounded-md"></div>
          <div className="h-[50%] w-[100%] bg-white rounded-md"></div>
        </div>
      </div>
    </>
  );
};

export default Editor;

import { useContext, useState, createContext, useEffect } from 'react';
import { UserContext } from '../App';
import { Navigate } from 'react-router-dom';
import VideoEditor from '../components/blog-editor.component';
import PublishForm from '../components/publish-form.component';
import Loader from '../components/loader.component';
import { useParams } from 'react-router-dom';

const blogStructure = {
  title: '',
  banner: '',
  content: [],
  tags: [],
  des: '',
  published: { personal_info: {} },
};

export const EditorContext = createContext({});

const Editor = () => {
  let { blog_id } = useParams();

  const [blog, setBlog] = useState(blogStructure);
  const [editorState, setEditorState] = useState('editor');
  const [textEditor, setTextEditor] = useState({ isReady: false });
  const [loading, setLoading] = useState(false);

  let {
    userAuth: { access_token },
  } = useContext(UserContext);

  return (
    <EditorContext.Provider
      value={{ blog, setBlog, setEditorState, textEditor, setTextEditor }}
    >
      {access_token == null ? (
        <Navigate to='/signin' />
      ) : loading ? (
        <Loader />
      ) : editorState == 'editor' ? (
        <VideoEditor />
      ) : (
        <PublishForm />
      )}
    </EditorContext.Provider>
  );
};

export default Editor;

import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BlogEditor = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSave = async () => {
        console.log('content', content);

        // const response = await fetch('/api/blogs', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ title, content }),
        // });
        // const data = await response.json();
        // if (data.success) {
        //     alert('Blog saved successfully!');
        // }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: '100%', padding: '10px', fontSize: '18px' }}
            />
            <ReactQuill value={content} onChange={setContent} />
            <button onClick={handleSave}>Save Blog</button>
            <div>
                <h1>{title}</h1>
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </div>
    );
};

export default BlogEditor;

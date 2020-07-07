import React from 'react';
import { useDropzone } from 'react-dropzone';

export default function Upload(props) {
    const { acceptedFiles, rejectedFiles, getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpeg, image/png'
    });

    const acceptedFilesItems = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    const rejectedFilesItems = rejectedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <section className=" form-group">
            <label htmlFor="titulo">Foto de destaque</label>
            <div {...getRootProps({ className: 'dropzone form-control' })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside>
                <h5>Accepted files</h5>
                <ul>
                    {acceptedFilesItems}
                </ul>
                <h5>Rejected files</h5>
                <ul>
                    {rejectedFilesItems}
                </ul>
            </aside>
        </section>
    );
}


import React from "react"
// const fs = require('fs');
// const path = require('path');
// import fs from "fs";
// import path from "path";

const FileUpload = () => {
    const [file, setFile] = React.useState(null)
    const [error, setError] = React.useState(null)

    console.log("fileState", file)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("handleSubmit file", file)
        if (file) {
            uploadFile(file)
        }
    }
    const uploadFile = async (file) => {
        console.log("uploadFile file", file)
        const query = `
        mutation($file: Upload!) {
            upload(file: $file) {
                data {
                    attributes {
                        name
                    }
                }
            }
        }
    `;
        const operation = {
            query,
            variables: {
              file: file
            }
          };

        const map = {
            '0': ['variables.file']
          };

        const body = new FormData();
        body.append('operations', JSON.stringify(operation));
        body.append('map', JSON.stringify(map));
        body.append(0, file);

        body.forEach((value, key) => {
            console.log("body value", value)
            console.log("body key", key)
        })
        const opts = {
            method: 'POST',
            body
          };
        
       
        try {
            const uploadSingleFile = await fetch("http://localhost:1337/graphql", opts)

            const res = await uploadSingleFile.json()
            console.log("res", res)
        } catch (err) {
            console.log("err", err)
        }
    }


    const handleChange = (e) => {
        console.log("handleChange[0]", e.target.files[0])
        if (e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="file">Choose a file</label>
                    <input onChange={handleChange} type="file" name="file" id="file" />

                    <button type="submit">Upload</button>
                </form>
            </div>
        </div>
    )
}

export default FileUpload

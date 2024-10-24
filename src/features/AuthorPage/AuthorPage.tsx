import React, { useEffect, useState } from 'react';
import './authorPage.css';
import axios from 'axios';
import { useSpeech } from 'react-text-to-speech';
import Speech from "react-text-to-speech";
import { AgGridReact } from 'ag-grid-react';
import * as aggrid from 'ag-grid-community';


export const AuthorPage: React.FC = () => {
    interface authorArrayStructure {
        name: String, 
        numberOfPoems: Number
    }

    const [authorData, setAuthorData] = useState<Array<authorArrayStructure>>([]);
    const gridRef = React.useRef<AgGridReact>(null);


    const authorTableColumnDefs: aggrid.ColDef[] = [
        {field: 'name', headerName: 'Author', flex: 1},
        {field: 'numberOfPoems', headerName: 'Number of Poems', flex: 0.5}
    ]

    const defaultAuthorTableColDef = React.useMemo(
        () => ({
            sortable: true,
            filter: true,
            supressMovable: true,
            autoHeight: true,
            wrapText: true
        }), []
    )

    const onFirstDataRendered = React.useCallback(() => {
        gridRef.current!.api.sizeColumnsToFit();
    }, []);

    const handleClick = (id: string) => {
        console.log("hgeres the id: ", id);
    }

    useEffect(() => {
        axios.get('https://poetrydb.org/author')
            .then(response => {
                response.data.authors.forEach(author => {
                    axios.get(`https://poetrydb.org/author/${author}`)
                        .then(secondResponse => {
                            let currentAuthorArray = authorData;
                            currentAuthorArray.push({name: author, numberOfPoems: secondResponse.data.length});
                            setAuthorData(currentAuthorArray);
                        })
                })
                // setAuthorData(response.data.authors);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const {
        Text, // Component that returns the modified text property
        speechStatus, // String that stores current speech status
        isInQueue, // Boolean that stores whether a speech utterance is either being spoken or present in queue
        start, // Function to start the speech or put it in queue
        pause, // Function to pause the speech
        stop, // Function to stop the speech or remove it from queue
      } = useSpeech({ text: "This library is awesome!" });

    console.log("test endpoint call: ", authorData);


    return (
        <div>
            <AgGridReact
                ref={gridRef}
                animateRows={true}
                rowData={authorData}
                columnDefs={authorTableColumnDefs}
                defaultColDef={defaultAuthorTableColDef}
                onFirstDataRendered={onFirstDataRendered}
                onRowClicked={e => handleClick(e.data.id)}
                suppressCellFocus={true}
            />
        </div>

        // <div>It worked! 


        //     <Speech text={authors.toString()} />
        //      {authors.map(author => (
        //         <li>{author}</li>
        //      ))}
        //     <div style={{ display: "flex", columnGap: "0.5rem" }}>
        //         {speechStatus !== "started" ? <button onClick={start}>Start</button> : <button onClick={pause}>Pause</button>}
        //         <button onClick={stop}>Stop</button>
        //     </div>
        // </div>
        
    )
}

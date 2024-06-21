import React from 'react';
import {
  CodeComponent,
  readonlyAdjustableHeightCodeOptions
} from 'react-quiz-ui';

export const YjsNormalizedContent: React.FC<null> = () => {
  return (
    <>
      <p>
        Our Jupyter notebook extension leverages Yjs (CRDT) for collaborative
        editing. To optimize data updates, we employ a normalized data
        structure. This flat, database-like approach benefits Yjs applications
        with nested or relational data by enhancing consistency and simplicity.
      </p>
      <div className="mt-4">
        Example structure:
        <CodeComponent
          src='{
    "cells":{
        "byId":{
            "cellA":{
                "id":"cellA",
                "fieldId":"fieldB"
            },
        },
        "allIds":["cellA"]
    },
    "fields":{
        "byId":{
            "fieldB":{
                "id":"def"
            }
        },
        "allIds":["fieldB"]
    }
}'
          language="json"
          config={{
            options: {
              ...readonlyAdjustableHeightCodeOptions,
              contextmenu: false
            }
          }}
        ></CodeComponent>
      </div>
      <p className="mt-4">
        The library offers helper classes for efficiently working with
        normalized data structures within a yjs application, including
        manipulation and change observation.
      </p>
    </>
  );
};

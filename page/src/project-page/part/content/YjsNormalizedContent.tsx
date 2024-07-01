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
      <div className="mt-4 flex flex-row items-start">
        <div className="flex-1">
          Not normalized structure:
          <CodeComponent
            src='{
    "cells":{
        "cellA":{
          "id":"cellA",
          "field":{
            "id":"fieldB"
          }
        },
        "cellB":{
          "id":"cellB",
          "field":{
            "id":"fieldB"
          }
        }
    },
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
        <p className="text-xl p-2 self-center">→</p>
        <div className="flex-1">
          Normalized structure:
          <CodeComponent
            src='{
    "cells":{
        "byId":{
            "cellA":{
                "id":"cellA",
                "fieldId":"fieldB"
            },
            "cellB":{
                "id":"cellB",
                "fieldId":"fieldB"
            }
        },
        "allIds":["cellA","cellB"]
    },
    "fields":{
        "byId":{
            "fieldB":{
                "id":"fieldB"
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
      </div>
      <p className="mt-4">
        The library offers helper classes for efficiently working with
        normalized data structures within a yjs application, including
        manipulation and change observation.
      </p>
    </>
  );
};

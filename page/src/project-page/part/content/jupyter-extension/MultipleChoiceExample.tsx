import React, { useState } from 'react';
import {
  CellDescription,
  Content,
  ContentBody,
  MultipleChoiceInstructor,
  MultipleChoiceInstructorConfigContainer,
  MultipleChoiceInstructorConfigItem,
  MultipleChoiceInstructorItem,
  MultipleChoiceStudent,
  Toolbar,
  ToolbarToggle
} from '../../../../../../src/ui';
import { IMultipleChoiceItem } from 'react-quiz-ui';

export const MultipleChoiceExample: React.FC = () => {
  const [random, setRandom] = useState<boolean>(false);
  const [multi, setMulti] = useState<boolean>(true);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [submit, setSubmit] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string[]>([]);
  const [isInstructor, setIsInstructor] = useState<boolean>(true);
  const [cellDescription, setCellDescription] = useState<string>(
    'Multiple Choice Example'
  );
  const [selected, setSelected] = useState<string[]>(['1']);
  const [items, setItems] = useState<IMultipleChoiceItem[]>([
    { id: '0', src: 'Item 0' },
    { id: '1', src: 'Item 1' }
  ]);
  const [id, setId] = useState<number>(2);
  const getNextId = () => {
    setId(id + 1);
    return id;
  };
  const onItemContentChange = (index: number, content: string) => {
    const newItems = [...items];
    newItems[index].src = content;
    setItems(newItems);
  };
  const MultipleChoiceItems = items.map((item, index) => (
    <MultipleChoiceInstructorItem
      content={item.src}
      index={index}
      maxIndex={items.length - 1}
      onItemContentChange={(value: string) => onItemContentChange(index, value)}
      onSelectionChange={(optionId: string, value: boolean) => {
        const newSelected = [...selected];
        if (value) {
          newSelected.push(String(optionId));
        } else {
          newSelected.splice(newSelected.indexOf(String(optionId)), 1);
        }
        setSelected(newSelected);
      }}
      optionId={String(item.id)}
      options={{ multi: multi, randomOrder: random }}
      parentId="multiple-choice-example"
      selected={selected.includes(String(item.id))}
      remove={() => {
        setItems(items.filter((_, i) => i !== index));
      }}
      swapPosition={(index, newIndex) =>
        setItems(
          items.map((item, i) =>
            i === index ? items[newIndex] : i === newIndex ? items[index] : item
          )
        )
      }
    />
  ));
  return (
    <Content>
      <Toolbar>
        {isInstructor && (
          <ToolbarToggle
            checked={showSolution}
            label={'Show Solution'}
            onChange={value => setShowSolution(value)}
          ></ToolbarToggle>
        )}
        <ToolbarToggle
          checked={isInstructor}
          label={'Instructor'}
          onChange={value => setIsInstructor(value)}
        ></ToolbarToggle>
      </Toolbar>
      <ContentBody>
        <CellDescription
          isInstructor={isInstructor}
          src={cellDescription}
          onChange={setCellDescription}
        />
        {isInstructor ? (
          <>
            <MultipleChoiceInstructorConfigContainer label="Config">
              <MultipleChoiceInstructorConfigItem
                label="Multiple Select"
                value={multi}
                onChange={value => {
                  if (selected.length > 0) {
                    setSelected([selected[0]]);
                  }
                  console.log(selected);
                  setMulti(value);
                }}
              />
              <MultipleChoiceInstructorConfigItem
                label="Random Order"
                value={random}
                onChange={setRandom}
              />
            </MultipleChoiceInstructorConfigContainer>
            <MultipleChoiceInstructor
              addMultipleChoiceOption={() => {
                setItems([...items, { id: String(getNextId()), src: '' }]);
              }}
            >
              {MultipleChoiceItems}
            </MultipleChoiceInstructor>
          </>
        ) : (
          <MultipleChoiceStudent
            answer={answer}
            items={items}
            onAnswerChanges={change => setAnswer(change.answer)}
            options={{
              multi: multi,
              random: random,
              showSolution: showSolution,
              submitted: submit
            }}
            setSubmit={value => setSubmit(value)}
            solutionOptions={selected}
          ></MultipleChoiceStudent>
        )}
      </ContentBody>
    </Content>
  );
};

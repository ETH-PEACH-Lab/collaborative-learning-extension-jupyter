# React Quiz UI Library (WIP)

This library offers several quiz react components. To see them in action visit the Storybook:
[Storybook](https://eth-peach-lab.github.io/react-quiz-ui/)

## Installation

```
npm install -S react-quiz-ui
```

## Setup

Adapt your tailwind.config.js as follows to have the necessary css included:

```
module.exports = {
    ...
    content: ['...',./node_modules/react-quiz-ui/src/**/*.{js,jsx,ts,tsx}'],
    ...
  }
```

## Exercise elements

Each exercise elements represents a specific type of exercise or a part of an exercise. Each type is discussed in this section.

They take an initial answer as an input and pass back any changes made to the answer.

### Multiple choice exercise

In this exercise, the user is asked to select 1 or m from n elements (with m <= n).

#### Features:

- Randomized order of the items
- Disable any User Input
- Show evaluation
- Radio button (1 out of n) vs checkbox (m out of n)

[Storybook Reference](https://eth-peach-lab.github.io/react-quiz-ui/?path=/docs/exercise-elements-multiple-choice-multiplechoice--docs)

### Coding exercise

In this exercise, the user is asked to solve a coding problem.

#### Features:

- Provide starting Code
- Tabs Support (Source / Preview)

[Storybook Reference](https://eth-peach-lab.github.io/react-quiz-ui/?path=/docs/exercise-elements-coding-coding--docs)

### Text response exercise

In this exercise, the user is asked to write a text response based on a given question or problem.

#### Features:

- Vertical / horizontal alignment of the editor and the rendered markdown

[Storybook Reference](https://eth-peach-lab.github.io/react-quiz-ui/?path=/docs/exercise-elements-text-response-textresponse--docs)

### Custom exercise

Each ExerciseObject component asks for the same generic props `ExerciseProps<T extends IExerciseObject, E extends IExerciseAnswer,>`, where `T` and `E` are implemented according to the needs of its component.

[Example implementation for IExerciseObject](./src/components/exercise-elements//multiple-choice/types/IMultipleChoiceExercise.ts)

[Example implementation for IExerciseAnswer](./src/components/exercise-elements//multiple-choice/types/IMultipleChoiceAnswer.ts)

Then the following Component can be defined:

```typescript
const MultipleChoiceComponent: React.FC<
  ExerciseProps<IMultipleChoiceExercise, IMultipleChoiceAnswer>
> = (
  props: ExerciseProps<IMultipleChoiceExercise, IMultipleChoiceAnswer>
) => {};
```

### ExerciseProps

Consists of the exercise object(`IExerciseObject`), an initial answer (`IExerciseAnswer`) and a callback function that emits any changes made to the answer (`IExerciseAnswer`)

### IExerciseObject

Consists of a `metadata` object that contains additional information and configurations and may also have additional exercise-specific properties.

### IExerciseAnswer

Consists of an optional reference id to the exercise itself, and an answer object which is exercise-specific.

## Src elements

These small components are used as modular building blocks for the exercise elements.

### Markdown

Renders a markdown text.

[Storybook Reference](https://eth-peach-lab.github.io/react-quiz-ui/?path=/docs/src-elements-markdown-markdowncomponent--docs)

### Code

Provides a monaco code editor with language highlighting.

[Storybook Reference](https://eth-peach-lab.github.io/react-quiz-ui/?path=/docs/src-elements-code-object-code--docs)

### ISrcObject

This Interface consists of a `src` property which is rendered based on the implementation of the component

## Relations

!['relations'](./assets/uml.png)

## Technology

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [daisyUI](https://daisyui.com/)

Further packages can be found in the [package.json](./package.json)

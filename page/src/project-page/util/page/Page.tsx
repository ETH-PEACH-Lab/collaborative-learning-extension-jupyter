import React from 'react';
import { Container, ContainerProps } from '../container/Container';
export type PageProps = ContainerProps & {
  header: string;
};
export const Page: React.FC<PageProps> = (props: PageProps) => {
  return (
    <Container {...props}>
      <Container.Header>{props.header}</Container.Header>
      <Container.Content>{props.children}</Container.Content>
    </Container>
  );
};

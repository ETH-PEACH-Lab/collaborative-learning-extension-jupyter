import React from 'react';
import {
  ProjectPageHeader,
  ProjectPageHeaderProps
} from './part/header/ProjectPageHeader';
import { Page, PageProps } from './util/page/Page';

type ProjectPageProps = {
  children?: React.ReactNode;
};
export const ProjectPage: React.FC<ProjectPageProps> & {
  Header: React.FC<ProjectPageHeaderProps>;
  Page: React.FC<PageProps>;
} = (props: ProjectPageProps) => {
  return <div>{props.children}</div>;
};
ProjectPage.Header = ProjectPageHeader;
ProjectPage.Page = props => <Page {...props} />;
export default ProjectPage;

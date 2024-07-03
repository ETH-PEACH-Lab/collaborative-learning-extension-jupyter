import React from 'react';
import ImgUrl from '../../../assets/jupyterhub-architecture.svg?react';
export const JupyterHubContent: React.FC = () => {
  return (
    <>
      <p>
        To make the extension more accessible and also testable, we integrated a
        JupyterHub server into the ETH infrastructure. JupyterHub is an
        open-source platform designed to provide multi-user access to
        JupyterLab. It enables us to offer a scalable, shared computing
        environment where multiple users can interact with Jupyter notebooks
        simultaneously. The following figure demonstrates the architecture
        behind our setup.
      </p>
      <ImgUrl className="w-full md:w-[75%] m-auto my-8" />
      <p>
        It utilizes user authentication through GitHub OAuth integration,
        enabling users to log in with their GitHub accounts. DockerSpawner
        facilitates the deployment of JupyterLab instances within Docker
        containers, enabling customizable environments for each user.
        Administrators can dynamically manage user roles, designate
        administrators, create collaborative spaces, and control resource
        access. Additionally, a copier service ensures populating users' working
        directories.
      </p>
    </>
  );
};

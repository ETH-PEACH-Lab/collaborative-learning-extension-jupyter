FROM quay.io/jupyter/minimal-notebook:hub-4.1.3
USER root
RUN pip install jupyter-collaboration 
RUN pip install y_py
RUN pip install --no-cache -U collab_learning_extension
EXPOSE 8000
EXPOSE 8888
USER ${NB_USER}
CMD ["/bin/bash","-c", "jupyterhub-singleuser","--LabApp.collaborative=True"]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
# Copyright (c) Jupyter Development Team.
# Distributed under the terms of the Modified BSD License.
FROM quay.io/jupyterhub/jupyterhub:4.1.5

# Install dockerspawner, nativeauthenticator
# hadolint ignore=DL3013
RUN python3 -m pip install --no-cache-dir \
    dockerspawner \
    jupyterhub-nativeauthenticator \
    pyyaml
ENTRYPOINT ["/entry/entrypoint.sh"]
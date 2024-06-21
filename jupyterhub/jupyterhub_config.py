# Copyright (c) Jupyter Development Team.
# Distributed under the terms of the Modified BSD License.

# Configuration file for JupyterHub
import os
import yaml
with open('/project_config.yaml', 'r') as file:
    project_config = yaml.safe_load(file)
c = get_config()  # noqa: F821

# We rely on environment variables to configure JupyterHub so that we
# avoid having to rebuild the JupyterHub container every time we change a
# configuration parameter.

# Spawn single-user servers as Docker containers
c.JupyterHub.spawner_class = "dockerspawner.DockerSpawner"

# Spawn containers from this image
c.DockerSpawner.image = os.environ["DOCKER_NOTEBOOK_IMAGE"]
# Connect containers to this Docker network
network_name = os.environ["DOCKER_NETWORK_NAME"]
c.DockerSpawner.use_internal_ip = True
c.DockerSpawner.network_name = network_name

def pre_spawn_hook(spawner):
    group_names = {group.name for group in spawner.user.groups}
    if "collaborative" in group_names:
        spawner.log.info(f"Enabling RTC for user {spawner.user.name}")
        spawner.args.append("--LabApp.collaborative=True")
c.DockerSpawner.pre_spawn_hook = pre_spawn_hook
c.Spawner.ip = '0.0.0.0'

c.DockerSpawner.ip = c.Spawner.ip

c.Spawner.env_keep = [
    'JUPYTER_CONFIG_DIR'
]
c.DockerSpawner.env_keep = c.Spawner.env_keep

# Remove containers once they are stopped
c.DockerSpawner.remove = True

# For debugging arguments passed to spawned containers
c.DockerSpawner.debug = True

# User containers will access hub by container name on the Docker network
c.JupyterHub.hub_ip = "jupyterhub"
c.JupyterHub.hub_port = 8080

# Persist hub data on volume mounted inside container
c.JupyterHub.cookie_secret_file = "/data/jupyterhub_cookie_secret"
c.JupyterHub.db_url = "sqlite:////data/jupyterhub.sqlite"

# Authenticate users with Native Authenticator
c.JupyterHub.authenticator_class = "nativeauthenticator.NativeAuthenticator"
c.JupyterHub.load_roles = []

c.JupyterHub.load_groups = {
    "collaborative": [],
}
for project_name, project in project_config["projects"].items():
    # get the members of the project
    members = project.get("members", [])
    print(f"Adding project {project_name} with members {members}")
    # add them to a group for the project
    c.JupyterHub.load_groups[project_name] = members
    # define a new user for the collaboration
    collab_user = f"{project_name}-collab"
    # add the collab user to the 'collaborative' group
    # so we can identify it as a collab account
    c.JupyterHub.load_groups["collaborative"].append(collab_user)

    # finally, grant members of the project collaboration group
    # access to the collab user's server,
    # and the admin UI so they can start/stop the server
    c.JupyterHub.load_roles.append(
        {
            "name": f"collab-access-{project_name}",
            "scopes": [
                f"access:servers!user={collab_user}",
                f"admin:servers!user={collab_user}",
                "admin-ui",
                f"list:users!user={collab_user}",
            ],
            "groups": [project_name],
        }
    )
# Allow anyone to sign-up without approval
c.NativeAuthenticator.open_signup = True

# Allowed admins
admin = os.environ.get("JUPYTERHUB_ADMIN")
if admin:
    c.Authenticator.admin_users = [admin]
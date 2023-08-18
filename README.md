## artis-frontend

The project also contains a web application to interface with the API. The app is built using reactJS and is deployed on github pages under this URL [https://www.artis-project.github.io/artis-frontend/](https://www.artis-project.github.io/artis-frontend/)

### Local Development

to install the dependencies and start a local server run:

```bash
yarn install
yarn dev
```

### Deployment
The API url to the artis-server is stored as an environement variable in the `vite.config.js` file. This url must be in sync with the organization variable in order to reach the newest deployed API version.

To build and deploy a new version of the web app run:

```bash
npm run build
git add dist -f
git commit -m "new frontend build"
git subtree push --prefix dist origin gh-pages
```

Note: Some might run into a memory error when running vite build, a temporary workaround can be found [here](https://github.com/vitejs/vite/issues/2433).

## Learn More
If you want to know more about the project check out the full project report in the [artis-thesis](https://github.com/artis-project/artis-thesis) repository

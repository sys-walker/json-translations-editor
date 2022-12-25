# JSON Translations Editor


A simple editor for @ngx-translate/core library  written in HTML, JS, Boostrap.

*For @ngx-translate/core or another library that uses JSON for translations.*

## Getting Started
### For regular use

- :white_check_mark: **online**:  [JSON translation web](https://sys-walker.github.io/json-translations-editor/) 
- :white_check_mark: **offline v1**:  clone the repository then place elements of /public inside your webserver like `python3 -m http.server`
- :red_circle: **offline v2**: Download the bundle file translator [Not available]


### For development
**Important!**
to work with `ionic serve`  approaching live reload you must change baseHref in Angular.json to `"baseHref": "/"` and for production `"baseHref": "/json-translations-editor/"`.
This can be automated by running these commands
- Development baseHref:  `npm run url:dev`
- Production  baseHref:  `npm run url:prod` (in `npm run deploy:production` this is included)

**Prerequisites**
Requirements for the software and other tools to build, test and push 
- A code editor like [Vscode ](https://code.visualstudio.com/) or similar 
- Simple webserver like `python3 -m http.server`


#### Code style format:
Install prettier package for code style format

    npm install

Check code style

    npm run pretty-check

Run automatic code formatter

    npm run pretty-write

#### Edit the code:

The code is placed in the folder `src/`

## Deployment
To deploy code and place to `docs/` and making available for github page

    npm run deploy:production

To enable maintenance mode for github page

    npm run deploy:manteinance-mode



## Built With
  - [Ionic Frameowrk](https://ionicframework.com/) - Used for the editor
  - [Contributor Covenant](https://www.contributor-covenant.org/) - Used for the Code of Conduct
  - [Github pages](https://pages.github.com/) - Used to host and deploy  the web-app online

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code
of conduct, and the process for submitting pull requests to us.

## Versioning

We use [Semantic Versioning](http://semver.org/) for versioning. For the versions
available, see the [tags on this repository](https://github.com/sys-walker/json-translations-editor/tags).

## Authors

   - **Pere Rollon Baiges**  - *for 'JSON Translations Editor'* -  [sys-walker](https://github.com/sys-walker)

See also the list of [contributors](https://github.com/sys-walker/json-translations-editor/graphs/contributors) who participated in this project.


## License
This project is licensed under the [MIT License](LICENSE) - see the [LICENSE.md](LICENSE) file for details


## Acknowledgments

#### Eventbus implementation
  - [Luixaviles](https://github.com/luixaviles) - *For events management in the editor*
#### Boostrap creators
  - [Mark Otto](https://github.com/mdo)
  - [Jacob Thornton](https://github.com/fat)
    

#### Boostrap darkmode
  - [Vino Rodrigues](https://github.com/vinorodrigues) - *CSS dark-mode used in the  'JSON Translations Editor' (in `old-files/`)* - [bootstrap-dark-5](https://github.com/vinorodrigues/bootstrap-dark-5)

<img align="left" width="100" height="100" src="./docs/logo.png">

# Github Repositories Searching

![CI/CD](https://github.com/tpps88206/github-repo/workflows/CI/CD/badge.svg)
[![Codecov](https://img.shields.io/codecov/c/github/tpps88206/github-repo)](https://codecov.io/gh/tpps88206/github-repo)
![License](https://img.shields.io/github/license/tpps88206/github-repo)

* [Demo](#demo)
* [Setup and develop at local](#setup-and-develop-at-local)
* [Technologies](#technologies)
* [Features](#features)
    * [Search github repository with GitHub REST API](#search-github-repository-with-github-rest-api)
    * [Implement the infinite scroll without any third party library](#implement-the-infinite-scroll-without-any-third-party-library)
    * [Trigger the searching action when text field was changed](#trigger-the-searching-action-when-text-field-was-changed)
    * [Handle the error event or rate limit, and trigger the notification](#handle-the-error-event-or-rate-limit-and-trigger-the-notification)
* [Structure](#structure)
* [Unit Test](#unit-test)
* [Reference](#reference)

## Demo

* Github page

    [https://tpps88206.github.io/michael-github-repo/](https://tpps88206.github.io/michael-github-repo/)

* Desktop browser

    ![](docs/desktop_demo.gif)

* Mobile browser

    ![](docs/mobile_demo.gif)

## Setup and develop at local

* Clone the repository

    ```bash
    $ git clone https://github.com/tpps88206/michael-github-repo.git
    $ cd michael-github-repo/
    ```

* Install dependency and start with YARN

    ```bash
    $ yarn install
    $ yarn start
    ```

* With NPM

    ```bash
    $ npm install
    $ npm run start
    ```  

## Technologies

* Use **React Hook**
* Develop state management with [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/).
* Compose async actions with [Redux Observable](https://redux-observable.js.org/)
* Develop CSS style with [@material-ui/styles](https://material-ui.com/styles/basics/)
* Develop router management with [React Router](https://github.com/ReactTraining/react-router).
* Write unit test with **testing-library**.
* Use [Github Actions](https://github.com/features/actions) to implement CI/CD and deploy on **Github Page**.
* Use [Material UI](https://material-ui.com/zh/) to generate the beautiful components with Material Design.
* Use **OOCSS** to manage the general CSS style, it is following [Bootstrap](https://getbootstrap.com/).
* Use [Lodash](https://lodash.com/) to control logic methods.
* Use [Classnames](https://github.com/JedWatson/classnames) to manage CSS class name.
* Use [Husky](https://typicode.github.io/husky/#/) to handle pre-commit event.
* All icons are using [Material Icon](https://material-ui.com/components/material-icons/) and [Font Awesome](https://fontawesome.com/).
* Define coding style with [Prettier](https://prettier.io/) and **Eslint**.
* Implement **Responsive Web Design**

## Features

#### Search github repository with GitHub REST API

* src/api/search.js

    ```javascript
    let path = '/search/repositories';
    
    ...
    
    return ajax({
      method: 'GET',
      url: common.api_proxy_uri + `${path}`,
      headers: getHeaders(),
    });
    ```

#### Implement the infinite scroll without any third party library

* src/pages/SearchPage/index.js

    ```javascript
    const initObserver = () => {
      // Initialize IntersectionObserver and attaching to the footer div
      const observer = new IntersectionObserver(handleObserver, INTERSECTION_OBSERVER_OPTIONS);
      if (footerRef.current) {
        observer.observe(footerRef.current);
      }
    };
    
    const handleObserver = (entries, observer) => {
      entries.forEach(entry => {
        // How much of the target element is currently visible within the root's intersection ratio
        // Setting this can avoid calling duplicated action when element move out the windows
        if (entry.intersectionRatio === 1) {
          observer.disconnect();
          dispatch(loadMoreRepositories());
        }
      });
    };
    ```

#### Trigger the searching action when text field was changed

* src/pages/SearchPage/index.js

    ```javascript
    useEffect(() => {
    
      ...
      
      // Clear the time out and then reset it at the below
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
      // Set the time out to avoid triggering the event frequently 
      timerRef.current = window.setTimeout(async () => {
        timerRef.current = void 0;
        // Break the function if the value is empty or had been searched before
        if (!queryValue || executedMapRef.current === queryValue) {
          return;
        }
        // Record the current input value in the map
        executedMapRef.current = queryValue;
        dispatch(searchRepositories({ queryValue }));
      }, WAIT_DURATION);
    }, [inputValue, sortBy, orderBy]);
    ```

#### Handle the error event or rate limit, and trigger the notification

* src/redux/slices/error/index.js

    ```javascript
    export const epics = {
      addError: (action$, state$, action) => {
        const type = state$.value.error.type;
        const message = state$.value.error.message;
        // Fire the notification action when new error excuted
        return of(addNotification({ notification: { severity: type, message } }));
      }
    };
    ```

* src/components/Notification/index.js

    ```javascript
    // Trigger from redux state
    const open = useSelector(state => state.notification.open);
    return (
      <Snackbar open={open}>
        ...
      </Snackbar>
    )
    ```

## Structure

```
.
├─── .github
│   └─── workflows                      # The config of Github action
├─── docker                         # Build the Docker container with custom Dockerfile
├─── docs                           # The necessary files of README.md
├─── public
├─── src
│   ├─── api                            # The interface of APIs
│   ├─── assets                         # The resources like image or video
│   ├─── components                     # All of components which can be reused
│   │   ├─── AppFrame                       # The APP frame includes Header and main section
│   │   ├─── Card                           # The card section shows Github repository detail
│   │   ├─── Notification                   # The snackbar provide brief messages include successful message and error
│   │   ├─── Page                           # Basic layout element
│   │   │   └─── PageContent                    # The content section in Page component
│   │   └─── Progress                       # The progress animation, express an unspecified wait time of a process
│   ├─── config                         # Manage all environment include development and product for CI / CD
│   │   ├─── dev
│   │   └─── prod
│   ├─── constants                      # All constants include variable, color code, error code and others
│   │   └─── colors                         # Convey meaning through color
│   ├─── pages                          # The APP pages create by React Hook
│   │   ├─── ErrorPage
│   │   ├─── NotFound
│   │   └─── SearchPage
│   ├─── redux                          # Redux collection with Redux Toolkit
│   │   └─── slices
│   │       ├─── error                          # Handle all error event
│   │       ├─── notification                   # Handle notification
│   │       └─── search                         # The searching result and other detail
│   ├─── routes                         # Collection of navigational components that compose declaratively with APP
│   ├─── styles                         # Collect frequently used style classes
│   └─── utils                          # Collect frequently used tools or functions
```

## Unit Test

* Coverage report

    ![](docs/unit_test_report.png)

## Reference

* [Search repositories](https://docs.github.com/en/free-pro-team@latest/rest/reference/search#search-repositories--code-samples)
* [Constructing a search query](https://docs.github.com/en/free-pro-team@latest/rest/reference/search#constructing-a-search-query)
* [Searching for repositories](https://docs.github.com/en/free-pro-team@latest/github/searching-for-information-on-github/searching-for-repositories)
* [Understanding the search syntax](https://docs.github.com/en/free-pro-team@latest/github/searching-for-information-on-github/understanding-the-search-syntax)
* [Rate limit](https://docs.github.com/en/free-pro-team@latest/rest/reference/search#rate-limit)
* [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

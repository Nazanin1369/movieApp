## Instant Movie Search Progressive Web Application
![alt text](./images/popcorn.png "Movie App")

This application uses Open Movie Database API to perform an instant search on the movies. It uses Service Workers and follows best practices and accibility metrics of


### Technologies Used

- JavaScript
    This application is built with JavaScript only.( No UI View Framework )
    Node 10.x and npm 6.x is required to run the code in this repository.

- CSS
    No CSS processor has been used.

- Web Components
    Custom Web Components has been used to isolated each component logic  and also help modularizing the code. Each component is responsible for maininting it's own state and handling it's own events.

- Parcel
    Parcel is used for bundling JavaScript, CSS and other Assets.
    Parcel is a lighweight bundler and it is suitable for small applications. 

- RxJS
    When it comes to handling events RxJS can sometimes make it really easy.

- NProgress
    NProgress is a JavaScript Library for page-level progress bar.


### How to build and run the application

1- Install dependencies:

```
npm isntall
```

2- Build the project with Parcel:

```
npm run build
```

3- Start the server

```
npm run start
```

### Notes on implementation

#### Responsives
The page design has been done solely with CSS. Flexbox layout model has been used to ensure responsiveness of the multi-column layout. In addition to flexbox, utilization of media queries for different view sizes enabled 
having acceptable design in smaller devices.

#### Performance and Network requests

*  Instant Search Input

    When it comes to search inputs, it is crucial to know how to prevent generating a load of XHR calls for every letter typed in. We don't want to make an API request on every letter user types. On the other hand we would like to wait until user stopped typing, and then make an API call. This approach will reduce the number of triggered requests. To achieve this here, RxJS librariy is used.

    With RxJS we are subscribing to input events such as the "keyup" event. We use RxJS debounceTime function to create the pause we need before we make a request. But what if user already made an XHR call to the API server? That is why "switchMap" function is used to abort the previous busy XHR call user has already made.

    ``` javascript
    this._inputSubscription = fromEvent(this._searchInput, 'keyup')
        // Pass all input values on keyup
        .pipe(map(e => e.target.value === '' ?  'Strange' : e.target.value))
        // pause for 750 ms
        .pipe(debounceTime(750))
        // Pass events only if value has changed
        .pipe(distinctUntilChanged())
        // use switch map to cancel previous busy calls and make a new XHR call
        .pipe(switchMap(ApiService.searchByTitle))
        .subscribe(movies => {
            NProgress.done();
            DomService.drawMovieCards(movies);
        });
    ```

* Application Shell Architecture

* Service Workers and offline

* Browser Compatibility
This application is compatible with Chrome and Firefox.
I used web components for modularity and it did took away the compatibility for Microsoft Edge and Internet Explorer. Happily they soon are replaced with Chrome based browsers.


### Testing

[CodeceptJS](https://codecept.io/) and Puppeteer has been used for end-to-end testing of this application.
To tun tests simply run:

```
npm run test
```

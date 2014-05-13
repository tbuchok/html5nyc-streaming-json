nychtml5-streams
=======================

Demonstrating streaming JSON

## Motivation

Passing off data manipulation onto the client is interesting.

Throwing large sets of unstructured data at a browser can limit the amount of work the server. It could also lead to interesting JavaScript applications in the browser.

Let's take a look at what streaming JSON looks like.

## Installation

* Clone this repository
* `npm install`
* `npm run build`
* `npm start`

In a web browser visit:

```
http://localhost:3000?objects=10^3
```

And a bunch of random words will be printed to written to the DOM as they arrive.

Now let's buffer it!

```
http://localhost:3000?buffer=true&objects=10^3
```

That didn't look too different, now did it? Let's get a bigger data set.

```
http://localhost:3000?objects=10^5
```

Okay, now the buffer:

```
http://localhost:3000?buffer=true&objects=10^5
```

:(

Depending on the computer, it may crash the browser. It will also be slow to add items to the DOM, waiting until the entire object is downloaded.

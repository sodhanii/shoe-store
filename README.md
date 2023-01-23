# Shoe Store

## Tech Stack

### Client

- [React](https://pt-br.reactjs.org/)
- [Create React App](https://create-react-app.dev/)
- [MUI - Material UI - React](https://mui.com)
- [Plotly Read](https://plotly.com/javascript/react/)

### Server

- [Rails](https://rubyonrails.org/)
- [Postgres](https://graphql-ruby.org/)
- [Redis](https://redis.io/)

## Requirements

- [NodeJS & NPM](https://nodejs.org/en/)
- [Ruby & Rails](https://www.postgresql.org/)
- [Redis](https://redis.io/docs/getting-started/)
- This projects uses the popular library `websocketd` to send messages.

  If you're on a Mac, you can install `websocketd` using [Homebrew](http://brew.sh/). Just run `brew install websocketd`. For other operating systems, or if you don't want to use Homebrew, check out the link below.

  **[Download for Linux, OS X and Windows](https://github.com/joewalnes/websocketd/wiki/Download-and-install)**

  Note that a Ubuntu 64-bit version is already bundled here `bin/websocketd` for convenience.
  <br />

## Setup

1. Install and setup the requirements

2. If your Redis contains password, or is setup in a different port than _6379_, you should replace on : <blockquote>store-backend/config/cable.yml</blockquote>. Start redis server using the command below:

```
  redis-server
```

3. In the main folder, setup websocketd:

```
  cd bin
  websocketd --port=8080 ruby inventory.rb

```

4. In the subfolder of server, install the dependencies and start the server

```
  cd store-backend
  bundle install
  rails db:migrate
  rails s
```

5. In the subfolder of client, install the dependencies and start the server

```
  cd store-frontend
  yarn
  npm start
```

6. If the browser doesn't open automatically, open your browser in the page below:

```
  localhost:3001
```

<br />

## Screenshots


<img width="auto" height="200" src="https://raw.githubusercontent.com/sodhanii/shoe-store/master/images/dashboard.png">

<br />

<img width="auto" height="200" src="https://raw.githubusercontent.com/sodhanii/shoe-store/master/images/product_availability.png">


<br />

<img width="auto" height="200" src="https://raw.githubusercontent.com/sodhanii/shoe-store/master/images/searching_for_nearby_store_product_availability.png">

<br />

<img width="auto" height="200" src="https://raw.githubusercontent.com/sodhanii/shoe-store/master/images/store_inventory_details.png">

<br />


## Future improvements

- Setup project in a docker structure to get easier to manage environments, scale, and setup cross-env.
- Setup a better scale process for syncing inventory suggestions data.
- Setup advanced generic UI components to make maintenance and A/B tests easier.
- Transfer the box styling of Material UI from JSX into style files in a styled-components structure.
- Unit & Integrations testing.

<br /><br /><br />

# Original README file


## Synopsis

Aldo Shoes is having a huge flash sale online. You provide support to the inventory department. They want to react real-time to various inventory problems as they arise.

You adjust the inventory whenever a new sale is completed. The return value includes the store, the shoe model and the inventory left for that shoe model in the store.

```
{
  'store' => 'ALDO Ste-Catherine',
  'model' => 'ADERI',
  'inventory' => 10,
}
```

`ALDO Ste-Catherine` store sold a pair of `ADERI` shoes. `ALDO Ste-Catherine` now has 10 pairs of `ADERI` left.

## Goal

**Design an interface that would allow the inventory department to monitor Aldo's stores and shoes inventory.**

Hope you’ll have fun with this little test. I know I had designing it.
Go wild. It can be anything you want. I’ve seen results printed to console, displayed on a webpage, and even someone who did periodical database dumps.

Here are a few ideas if you need an extra challenge:

- Add some sort of alerting system, e.g. When a shoe model at a store goes too low, or too high.
- Add a REST JSON API, or GraphQL
- Suggest shoe transfers from one store to another according to inventory
- Your own crazy idea!

Share your repository with us when you’re done.

Happy Hacking :)

## Installation

This projects uses the popular library `websocketd` to send messages.

If you're on a Mac, you can install `websocketd` using [Homebrew](http://brew.sh/). Just run `brew install websocketd`. For other operating systems, or if you don't want to use Homebrew, check out the link below.

**[Download for Linux, OS X and Windows](https://github.com/joewalnes/websocketd/wiki/Download-and-install)**

Note that a Ubuntu 64-bit version is already bundled here `bin/websocketd` for convenience.

## Getting Started

### Inventory Server

Your WebSocket Server is the tap that aggregates inventories from all stores.

You can run it directly from your own machine.

Run the following to start tapping into the inventory events.

```
(bin/)websocketd --port=8080 ruby inventory.rb
```

You now have an active connection to their stores opened on port 8080.

### Start listening on each event

Listen and react on each event using a WebSocket client.

Various implementations are at your disposal. Whatever floats your boat.

They all work the same way. Provide a method or a block to be executed whenever a new event occurs.

Here are two examples for our favorite languages:

#### Javascript

Open a console on a non-secured page:

```
var ws = new WebSocket('ws://localhost:8080/');

ws.onmessage = function(event) {
  console.log(event.data);
};
```

#### Ruby

##### Installation

```
gem install faye-websocket
gem install eventmachine
```

##### Example

```
require 'faye/websocket'
require 'eventmachine'
require 'json'

EM.run {
  ws = Faye::WebSocket::Client.new('ws://localhost:8080/')

  ws.on :message do |event|
    p JSON.parse(event.data)
  end
}
```

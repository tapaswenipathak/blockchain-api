Blockchain API
==============

An implementation of Blockchain API. This implements blockchain and allows the user
to interact with the db using HTTP requests.


## Setup Instructions
* Clone the repository
* Install using: `nvm use && npm i`
* Run using: `npm start`

## Table of Contents

* [Features](#features)
* [Usage](#usage)

## Features

* Add block (POST)
  * `/block`
* Add node (POST)
  * `/block/:data`
* Get block by address (GET)
  * `/block/:address`
* Get block by index (GET)
  * `/block/:id`
* Add transaction (POST)
  * `/block/:transact`
* Validate blockchain (GET)
  * `/block/validate_blockchain`
* Delete block by address (DELETE)
  * `/block/delete::address`
* Delete all blocks from db (DELETE)
  * `/block/deleteblocks`

## Usage

Find more information and example curl commands [here](https://readthedocs.org/projects/blockchain-api/).


#### This uses:

* Express
* LevelDB

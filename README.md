Blockchain API
==============

A blockchain API.

## Setup Instructions
* Clone the repository
* Install using: `nvm use && npm i`
* Run using: `npm start`

## Table of Contents

* [Features](#features)
* [Usage](#usage)

## Features

* Get blockchain info (GET)
  * `/blockchain/info`
* Add block (POST)
  * `/blockchain/add/block`
* Add node (POST)
  * `/blockchain/block/:data`
* Get block by address (GET)
  * `/blockchain/block/:address`
* Get block by index (GET)
  * `/blockchain/block/:id`
* Add transaction (POST)
  * `/blockchain/transaction/new`
* Validate blockchain (GET)
  * `/blockchain/validate`
* Delete block by address (DELETE)
  * `/blockchain/delete/:address`
* Delete all blocks from db (DELETE)
  * `/blockchain/deleteblocks`

## Usage

Find more information and example curl commands [here](https://blockchain-api.readthedocs.io/en/latest/).


Uses:

* [Express.js](http://expressjs.com/)
* [LevelDB](http://leveldb.org/)

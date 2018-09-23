Blockchain API
==============

A blockchain API which allows the user to interact with the blockchain db using
HTTP requests.


Setup Instructions
==================

* Clone the repository
* Install using::

    nvm use && npm i

* Run using::

    npm start

Features
========

* Get blockchain info (GET)::

    /blockchain/info

* Add block (POST)::

    /blockchain/add/block

* Add node (POST)::

    /blockchain/block/:data

* Get block by address (GET)::

    /blockchain/block/:address

* Get block by index (GET)::

    /blockchain/block/:id

* Add transaction (POST)::

    /blockchain/transaction/new

* Validate blockchain (GET)::

    /blockchain/validate

* Delete block by address (DELETE)::

    /blockchain/delete/:address

* Delete all blocks from db (DELETE)::

    /blockchain/deleteblocks

CURL commands
=============

* curl "http://localhost:5000/blockchain/info"
* curl "http://localhost:5000/blockchain/validate"
* curl -X "POST" "http://localhost:5000/blockchain/add/block/" -H 'Content-Type: application/json; charset=utf-8' -d $'{"address":"sha", "data": "Adding new block."}}'
* curl -X "DELETE" "http://localhost:5000/blockchain/deleteblocks"

Uses
====

* express.js
* levelDB

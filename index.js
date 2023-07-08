// Copyright (c)2023 Quinn Michaels
// BUSINESS Deva

const fs = require('fs');
const path = require('path');

const package = require('./package.json');
const info = {
  id: package.id,
  name: package.name,
  describe: package.description,
  version: package.version,
  url: package.homepage,
  dir: __dirname,
  git: package.repository.url,
  bugs: package.bugs.url,
  author: package.author,
  license: package.license,
  copyright: package.copyright,
};

const data_path = path.join(__dirname, 'data.json');
const {agent,vars} = require(data_path).DATA;

const Deva = require('@indra.ai/deva');
const BUSINESS = new Deva({
  info,
  agent,
  vars,
  utils: {
    translate(input) {return input.trim();},
    parse(input) {return input.trim();},
    process(input) {return input.trim();}
  },
  listeners: {},
  modules: {},
  deva: {},
  func: {
    bus_question(packet) {return;},
    bus_answer(packet) {return;},
  },
  methods: {},
  onDone(data) {
    this.listen('devacore:question', packet => {
      if (packet.q.text.includes(this.vars.trigger)) return this.func.bus_question(packet);
    });
    this.listen('devacore:answer', packet => {
      if (packet.a.text.includes(this.vars.trigger)) return this.func.bus_answer(packet);
    });
    return Promise.resolve(data);
  },
});
module.exports = BUSINESS

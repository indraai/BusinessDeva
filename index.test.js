// Copyright (c):year: :copyright:
// :name: test file

const {expect} = require('chai')
const BusinessDeva = require('./index.js');

describe(BusinessDeva.me.name, () => {
  beforeEach(() => {
    return BusinessDeva.init()
  });
  it('Check the DEVA Object', () => {
    expect(BusinessDeva).to.be.an('object');
    expect(BusinessDeva).to.have.property('agent');
    expect(BusinessDeva).to.have.property('vars');
    expect(BusinessDeva).to.have.property('listeners');
    expect(BusinessDeva).to.have.property('methods');
    expect(BusinessDeva).to.have.property('modules');
  });
})

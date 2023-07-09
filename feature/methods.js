module.exports = {
  /**************
  method: service
  params: packet
  describe: The global service feature that installs with every agent
  ***************/
  business(packet) {
    this.context('feature');
    const business = this.business();
    const data = {};
    return new Promise((resolve, reject) => {
      this.question(`#docs raw feature/business`).then(doc => {
        data.doc = doc.a.data;
        const info = [
          `## Business`,
          `::begin:business:${business.id}`,
          `client: ${business.client_name}`,
          `concerns: ${business.concerns.join(', ')}`,
          `::end:business:${this.hash(business)}`,
        ].join('\n');
        const text = doc.a.text.replace(/::info::/g, info)
        return this.question(`#feecting parse ${text}`)
      }).then(feecting => {
        return resolve({
          text: feecting.a.text,
          html: feecting.a.html,
          data: business
        });
      }).catch(err => {
        return this.error(err, packet, reject);
      })
    });
  },
};

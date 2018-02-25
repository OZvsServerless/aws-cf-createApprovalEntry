'use strict';

class ReviewManager {
    constructor(env, docClient) {
      this.env = env;
      this.docClient = docClient;
    }

    addDocument(bucket, fileName) {
      let table = this.env.tableName || 'ReviewList';
      let params = {
          TableName: table,
          Item:{
              'bucketSrc': bucket,
              'docId': fileName
          }
      };
      console.log(params);

      return new Promise((resolve, reject) => {
          this.docClient.put(params, function(err, data) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(data);
            }
        });
      });
    }
}

module.exports = ReviewManager;

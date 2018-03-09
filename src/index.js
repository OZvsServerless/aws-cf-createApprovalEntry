'use strict';

const ReviewManager = require('./ReviewManager.js');
const AWS = require('aws-sdk');
// Setting region is necessary for SAM-local testing
AWS.config.update({region: 'us-west-2'});
const DocumentClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

exports.handler = (event, context, callback) => {
	let srcBucket = event.Records[0].s3.bucket.name;
	let srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
	let reviewManager = new ReviewManager(process.env, DocumentClient);

	reviewManager.addDocument(srcBucket, srcKey).then((data) => {
		callback(null, JSON.stringify(data, null, 2));
	}, (error) => {
		callback('Unable to add item.', JSON.stringify(error, null, 2));
	});
};

var ReviewManager = require('../src/ReviewManager');

describe('Review Manager Tests', function() {
	describe('Constructor', function() {
		it('should create an object', () => {
			 let reviewManager = new ReviewManager();
			 expect(reviewManager).toEqual(jasmine.any(ReviewManager));
		});
	});

	describe('Method: Add Document', function() {
		beforeEach(() => {
			this.reviewManager = new ReviewManager({
				tableName: 'testTable'
			}, {
				put: (params, callback) => {
					setTimeout(function() {
						callback(false, 'test successful');
					}, 1);
				}
			});
		});

		it('execute', (done) => {
			this.reviewManager.addDocument('Test Bucket Source', 'test file').then((data) => {
				expect(data).toBe('test successful');
				done();
			});
		});
	});
});

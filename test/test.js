// Load dependency
var solrSmartClient = require('../index');

// Define options
options = {
    zkConnectionString: 'localhost:2181',
    zkLiveNodes: '/live_nodes',
    solrProtocol: 'http',
    solrCollectionsGetEndPoint: '/admin/collections?action=LIST',
    ssh: {},
    // Passed verbatim to node-zookeeper-client
    zk: {
        sessionTimeout: 3000,
        spinDelay : 1000,
        retries : 1
    },
    // Passed verbatim to node-rest-client
    rest: {
        requestConfig: {
            timeout: 3000
        },
        responseConfig: {
            timeout: 3000
        }
    }
};

// Create Solr client, execute query and print number of documents in response.
solrSmartClient.createClient('products', options, function (err, solrClient) {
    if (err) {
        return console.log(err);
    }
    solrClient.search('q=title:disney', function (err, obj) {
        if (err) {
            return console.log(err);
        }
        //console.log('Number of documents found: %d', obj.response.numFound);
        console.dir(obj.response);
    })
});
